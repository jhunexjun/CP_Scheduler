const msSql = require('mssql');
const msSqlConnect = require('../dbConnections/msSqlConnect');
const schedulerSql = require('../sqlStatements/schedulerSql');

// const Request = require('tedious').Request;
// const TYPES = require('tedious').TYPES;
const utils = require('../utils/util');

module.exports = {
  getScheduleAsync,
  addSchedule,
  updateSchedule,
  deleteSchedule,
}

async function getScheduleAsync(req) {
  try {
    let sql = ''; let ret;
    if (req.query.dateRange === 'custom') {
      sql = schedulerSql.getAppointmentsByDateRange();

      ret = msSqlConnect.getInstance().then(pool => {
              return pool.request()
                .input('sessionId', msSql.VarChar, req.query.sessionId)
                .input('technicianIds', msSql.VarChar, req.query.technicianIds)
                .input('utcDateFrom', msSql.DateTime, req.query.utcDateFrom)
                .input('utcDateTo', msSql.DateTime, req.query.utcDateTo)
                .query(sql)
            });
    } else if (req.query.dateRange.toLowerCase() === 'all') {
      sql = schedulerSql.getAppointments();

      ret = msSqlConnect.getInstance().then(pool => {
              return pool.request()
                .input('sessionId', msSql.VarChar, req.query.sessionId)
                .input('technicianIds', msSql.VarChar, req.query.technicianIds)
                .query(sql)
            });
    } else {
      return { status: 'Error', message: "dateRange param only accepts 'custom' and 'all'."}
    }

    return await ret.then(result => {
      if (result.recordset.length <= 0 || result.recordset[0].hasOwnProperty('errorNo')) {
        return { status: 'OK', data: result.recordset }
      } else {
        let schedsGroupedById = result.recordset.reduce((prevValue, currentValue) => {
          const { id } = currentValue;
          let obj = prevValue.find(o => o.id === id);

          if (obj === undefined) {
            let x = { id: id,
                  subject: currentValue.subject,
                  utcDateFrom: currentValue.utcDateFrom,
                  utcDateTo: currentValue.utcDateTo,
                  description: currentValue.description,
                  technicianIds: (currentValue.technicianId == null) ? [] : [currentValue.technicianId],
                  invoiceNo: currentValue.invoiceNo,  // invoice no. is mandatory.
                  allDay: currentValue.allDay,
                  recurrenceRule: currentValue.recurrenceRule,
                  createdBy: currentValue.createdBy,
                };
            prevValue.push(x);
          } else {
            obj.technicianIds.push(currentValue.technicianId);
          }

          return prevValue;
        }, []);

        return { status: 'OK', data: schedsGroupedById }
        // return schedsGroupedById;
      }
    }).catch(err => {
      console.log(err);
    });
  } catch(e) {
    throw e;
  }
}

async function addSchedule(req) {
  try {
    let sql = schedulerSql.addSchedule(
      utils.isSet(req.body, 'allDay'),
      utils.isSet(req.body, 'recurrenceRule')
    );

    return await msSqlConnect.getInstance().then(pool => {
      let poolRequest = pool.request()
        .input('sessionId', msSql.NVarChar, req.query.sessionId)
        .input('subject', msSql.NVarChar, req.body.subject)
        .input('utcDateFrom', msSql.DateTime, req.body.utcDateFrom)
        .input('utcDateTo', msSql.DateTime, req.body.utcDateTo)
        .input('description', msSql.NVarChar, utils.isSet(req.body, "description") ? req.body.description : null)
        .input('invoiceNo', msSql.NVarChar, req.body.invoiceNo)

      if (utils.isSet(req.body, 'allDay'))
        poolRequest.input('allDay', msSql.Char, 'Y');
      if (utils.isSet(req.body, 'recurrenceRule'))
        poolRequest.input('recurrenceRule', msSql.NVarChar, req.body.recurrenceRule)

      return poolRequest.query(sql)
    }).then(async result => {
      req.body.id = result.recordset[0].newId;
      req.body.technicianIds = req.body.technicianIds.split(","); // string to array.

      await insertIntoSchedTechnicians(req);

      return { status: "OK" , message: "New schedule was added successfully", data: { id: result.recordset[0].newId } };
    }).catch(err => {
      console.log(err);
    });
  } catch(e) {
    throw e;
  }
}

function datesAreValid(params) {
  if (params === undefined || params == null)
    return { status: "Error", message: "Object params not found." };

  /*************************************************************/
  let date1 = new Date(params.utcDateFrom).getTime();
  let date2 = new Date(params.utcDateTo).getTime();

  if (date1 > date2)
    return { status: "Error", "message": "From date is greater than To date." };
  else
    return { status: "OK"};
  /*************************************************************/
}

async function updateSchedule(req) {
  try {
    if (utils.isSet(req.body, "utcDateFrom") && utils.isSet(req.body, "utcDateTo")) {
      let retVal = datesAreValid(req.body);
      if (retVal.status == "Error")
        return retVal;
    }

    let sql = "update USR_schedules set invoiceNo = @invoiceNo, utcUpdateDate = getutcdate()";

    if (utils.isSet(req.body, "utcDateFrom"))
      sql += ", utcDateFrom = @utcDateFrom";
    if (utils.isSet(req.body, "utcDateTo"))
      sql += ", utcDateTo = @utcDateTo";
    if (utils.isSet(req.body, "subject"))
      sql += ", subject = @subject";
    if (utils.isSet(req.body, "description"))
      sql += ", description = @description";

    if (utils.isSet(req.body, "allDay") && (req.body.allDay === 'true'))
      sql += ", allDay = 'Y'";
    else if (utils.isSet(req.body, "allDay") && (req.body.allDay === 'false'))
      sql += ", allDay = 'N'";

    if (utils.isSet(req.body, 'recurrenceRule'))
      sql += ", recurrenceRule = @recurrenceRule";

    sql += " where id = @id /*and sessionId = @sessionId*/";


    await msSqlConnect.getInstance().then(pool => {
        let poolRequest = pool.request();

        if (utils.isSet(req.body, "subject"))
          poolRequest.input('subject', msSql.NVarChar, req.body.subject)
          // request.addParameter('subject', TYPES.NVarChar, req.body.subject);
        if (utils.isSet(req.body, "utcDateFrom"))
          poolRequest.input('utcDateFrom', msSql.DateTime, req.body.utcDateFrom)
          // request.addParameter('utcDateFrom', TYPES.DateTime, req.body.utcDateFrom);
        if (utils.isSet(req.body, "utcDateTo"))
          poolRequest.input('utcDateTo', msSql.DateTime, req.body.utcDateTo)
          // request.addParameter('utcDateTo', TYPES.DateTime, req.body.utcDateTo);
        if (utils.isSet(req.body, "description"))
          poolRequest.input('description', msSql.NVarChar, req.body.description)
          // request.addParameter('description', TYPES.NVarChar, req.body.description);
        if (utils.isSet(req.body, 'recurrenceRule'))
          poolRequest.input('recurrenceRule', msSql.NVarChar, req.body.recurrenceRule)
          // request.addParameter('recurrenceRule', TYPES.NVarChar, req.body.recurrenceRule);


        // request.addParameter('invoiceNo', TYPES.NVarChar, req.body.invoiceNo);
        // request.addParameter('id', TYPES.Int, parseInt(req.body.id));

        poolRequest.input('invoiceNo', msSql.NVarChar, req.body.invoiceNo)
        poolRequest.input('id', msSql.Int, parseInt(req.body.id))

        return poolRequest.query(sql)
      }).catch(err => {
        console.log(err);
      });

    await updateSchedsCustomers(req);

    return { status: "OK" , message: "Schedule was updated successfully" };
  } catch(e) {
    throw e;
  }

  ///////////////////////////////
  // try {
    // if (utils.isSet(req.body, "utcDateFrom") && utils.isSet(req.body, "utcDateTo")) {
    //   let retVal = datesAreValid(req.body);
    //   if (retVal.status == "Error")
    //     return retVal;
    // }

    // let sql = "update USR_schedules set invoiceNo = @invoiceNo, utcUpdateDate = getutcdate()";

    // if (utils.isSet(req.body, "utcDateFrom"))
    //   sql += ", utcDateFrom = @utcDateFrom";
    // if (utils.isSet(req.body, "utcDateTo"))
    //   sql += ", utcDateTo = @utcDateTo";
    // if (utils.isSet(req.body, "subject"))
    //   sql += ", subject = @subject";
    // if (utils.isSet(req.body, "description"))
    //   sql += ", description = @description";
    // if (utils.isSet(req.body, "allDay") && (req.body.allDay === 'true'))
    //   sql += ", allDay = 'Y'";
    // else if (utils.isSet(req.body, "allDay") && (req.body.allDay === 'false'))
    //   sql += ", allDay = 'N'";
    // if (utils.isSet(req.body, 'recurrenceRule'))
    //   sql += ", recurrenceRule = @recurrenceRule";

    // sql += " where id = @id /*and sessionId = @sessionId*/";

    // let request = new Request(sql, (err, rowCount) => {
    //   if (err)
    //     console.log(err);
    // });

    // if (utils.isSet(req.body, "subject"))
    //   request.addParameter('subject', TYPES.NVarChar, req.body.subject);
    // if (utils.isSet(req.body, "utcDateFrom"))
    //   request.addParameter('utcDateFrom', TYPES.DateTime, req.body.utcDateFrom);
    // if (utils.isSet(req.body, "utcDateTo"))
    //   request.addParameter('utcDateTo', TYPES.DateTime, req.body.utcDateTo);
    // if (utils.isSet(req.body, "description"))
    //   request.addParameter('description', TYPES.NVarChar, req.body.description);
    // if (utils.isSet(req.body, 'recurrenceRule'))
    //   request.addParameter('recurrenceRule', TYPES.NVarChar, req.body.recurrenceRule);


    // request.addParameter('invoiceNo', TYPES.NVarChar, req.body.invoiceNo);
    // request.addParameter('id', TYPES.Int, parseInt(req.body.id));
    // await utils.executeRequestAsync(request); // We just assume running sql was successful bc it's not capturing the rows affected.

    // await updateSchedsCustomers(req);

    // return { status: "OK" , message: "Schedule was updated successfully" };
  // } catch(e) {
  //   throw e;
  // }
}

async function updateSchedsCustomers(req) {
  try {
    if (!utils.isSet(req.body, 'technicianIds'))
      return { status: "Error" , message: "Technician id is missing. " };

    // const sql = `delete USR_schedules_technicians where schedId = @schedId`;

    return await msSqlConnect.getInstance().then(pool => {
        return pool.request()
          .input('schedId', msSql.Int, parseInt(req.body.id))
          .query(`delete USR_schedules_technicians where schedId = @schedId`)
      }).then(async () => {
        const newArray = req.body.technicianIds.replace("'", "").split(",");
        req.body.technicianIds = newArray;

        await insertIntoSchedTechnicians(req);
      }).catch(err => {
        console.log(err);
      });
  } catch(e) {
    throw e;
  }
  ////////////////////////////////////////////////////

  // try {
  //   if (!utils.isSet(req.body, 'technicianIds'))
  //     return { status: "Error" , message: "Technician id is missing. " };

  //   const sql = `delete USR_schedules_technicians where schedId = @schedId`;
  //   let request = new Request(sql, (err, rowCount) => {
  //     if (err)
  //       console.log(err);
  //   });
  //   request.addParameter('schedId', TYPES.Int, parseInt(req.body.id));

  //   await utils.executeRequestAsync(request);

  //   const newArray = req.body.technicianIds.replace("'", "").split(",");
  //   req.body.technicianIds = newArray;

  //   await insertIntoSchedTechnicians(req);
  // } catch(e) {
  //   throw e;
  // }
}

async function insertIntoSchedTechnicians(req) {
  if (!utils.isSet(req.body, "technicianIds"))
    return { status: "Error" , message: "Technician id is missing." };

  let sql = "";
  req.body.technicianIds.forEach((value) => { // there's a better way to do this.
    sql += `insert into USR_schedules_technicians(schedId, technicianId) values(${req.body.id}, '${value}');`;
  })

  return await msSqlConnect.getInstance().then(pool => {
        return pool.request()
          .query(sql)
      }).then(result => {
        return result.recordset;
      }).catch(err => {
        console.log(err);
      });
}

async function deleteSchedule(req) {
  try {
    return await msSqlConnect.getInstance().then(pool =>
        pool.request()
          .input('id', msSql.Int, parseInt(req.body.id))
          .query(schedulerSql.deleteSchedule())
      ).then(() => {
        return { status: "OK" , message: "A schedule was deleted successfully" };
      }).catch(err => {
        console.log(err);
      });
  } catch(e) {
    throw e;
  }

  /////////////////////////////////////////////////
  // try {
  //   let sql = schedulerSql.deleteSchedule();
  //   let request = new Request(sql, (err) => {
  //     if (err)
  //       console.log(err);
  //   });
  //   request.addParameter('id', TYPES.Int, parseInt(req.body.id));

  //   await utils.executeRequestAsync(request);
  //   return { status: "OK" , message: "A schedule was deleted successfully" };
  // } catch(e) {
  //   throw e;
  // }
}