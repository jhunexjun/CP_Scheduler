USE [TOTAL_OFFROAD_Practice3]
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_CheckSessionValidity]    Script Date: 9/15/2023 11:45:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--The check validity is also in the javascript back-end but for now, in back-end is used for dynamic sql

CREATE PROCEDURE [dbo].[USER_SP_CheckSessionValidity]
	@sessionId T_GUID,
	--@robot CHAR(1) = 'Y',	-- We must assume all requests are robot bc of the time inactivity auto logout.
	@outputErrorNo INT OUTPUT,
	@outputStatusMsg NVARCHAR(200) OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

    declare @id int;

	set @id = (select id from USR_sessions_schedules where sessionId = @sessionId and expiryUtcDate > GETUTCDATE());
	IF (ISNULL(@id, 0) = 0)
	begin
		select @outputErrorNo = -1, @outputStatusMsg = 'Expired session'
		return
	end

	--declare @expiryInMinutes int = 10 -- the session expiry in minutes.

	--if (@robot = 'N')
	--	update USR_sessions_schedules set expiryUtcDate = DATEADD(mi, @expiryInMinutes, GETUTCDATE()) where sessionId = @sessionId

	select @outputErrorNo = 0, @outputStatusMsg = 'Session is valid';
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_CustomersGet]    Script Date: 9/15/2023 11:45:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SP_CustomersGet]
	@sessionId T_GUID,
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;

	-------------------------------------------------------------------------------------
	exec USER_SP_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	-------------------------------------------------------------------------------------

	declare @STR_ID T_LOC_ID;

	set @STR_ID = (select locationId from USR_sessions_schedules where sessionId = @sessionId);

	--select CUST_NO, NAM, ADRS_1, EMAIL_ADRS_1, PHONE_1 from AR_CUST where STR_ID = @STR_ID;
	-- Customers will only show in the list if he/she has been tagged in a Work Order.
	select CUST_NO,
			NAM,
			ADRS_1,
			EMAIL_ADRS_1,
			MBL_PHONE_1,
			STR_ID,
			newSmsMsg = (select count(*) from USR_SmsInbox where AR_CUST.CUST_NO = customerNo and [read] = 'N')
	from AR_CUST
	where CUST_NO IN (select HDR.CUST_NO
						from VI_PS_DOC_HDR HDR left join VI_PS_DOC_NOTE NOTES 
							on HDR.DOC_ID = NOTES.DOC_ID 
							and HDR.STA_ID = NOTES.STA_ID and hdr.STR_ID = NOTES.STR_ID 
						where HDR.DOC_TYP = 'O' and HDR.STR_ID = @STR_ID)
	order by NAM
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_extendSession]    Script Date: 9/15/2023 11:45:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SP_extendSession]
	@sessionId T_GUID,
	@expiryInMinutes int, -- the session expiry in minutes.
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;
	-------------------------------------------------------------------------------------
	exec USER_SP_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	-------------------------------------------------------------------------------------
	update USR_sessions_schedules set expiryUtcDate = DATEADD(mi, @expiryInMinutes, GETUTCDATE()) where sessionId = @sessionId
	
	select @sessionId as sessionId;
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_getLocationBySessionId]    Script Date: 9/15/2023 11:45:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SP_getLocationBySessionId]
	@sessionId T_GUID,
	--@robot CHAR(1) = 'Y',	-- We must assume all requests are robot so bc of the time inactivity auto logout.
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;
	-------------------------------------------------------------------------------------
	--exec USER_SP_CheckSessionValidity @sessionId, @robot, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT
	exec USER_SP_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	-------------------------------------------------------------------------------------
	
	select userId, locationId FROM USR_sessions_schedules where sessionId = @sessionId
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_InvoiceGet]    Script Date: 9/15/2023 11:45:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SP_InvoiceGet]
	@sessionId T_GUID,
	@invoiceNo T_DOC_NO,
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;

	-------------------------------------------------------------------------------------
	--exec USER_SP_CheckSessionValidity @sessionId, @robot, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT
	exec USER_SP_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	-------------------------------------------------------------------------------------

	declare @STR_ID T_LOC_ID;

	set @STR_ID = (select locationId from USR_sessions_schedules where sessionId = @sessionId);

	select HDR.TKT_NO,
		HDR.TKT_DAT,
		HDR.TERMS_COD,
		HDR.CUST_PO_NO,
		HDR.CUST_NO,
		HDR.SLS_REP,
		HDR.BILL_NAM,
		CONCAT(HDR.BILL_ADRS_1, ' ', HDR.BILL_ADRS_2, ' ', HDR.BILL_ADRS_3) billAddress,
		HDR.BILL_CITY,
		HDR.BILL_STATE,
		HDR.BILL_ZIP_COD,
		HDR.BILL_PHONE_1,
		HDR.BILL_EMAIL_ADRS_1,
		HDR.SHIP_DAT,
		HDR.SHIP_VIA_COD,
		HDR.SHIP_NAM,
		CONCAT(HDR.SHIP_ADRS_1, ' ', HDR.SHIP_ADRS_1, ' ', HDR.SHIP_ADRS_1) shipAddress,
		HDR.SHIP_CITY,
		HDR.SHIP_STATE,
		HDR.SHIP_ZIP_COD,
		HDR.SHIP_PHONE_1,
		HDR.USR_LIC_PLATE,
		HDR.USR_YR,
		HDR.USR_MAKE,
		HDR.USR_MODEL,
		HDR.USR_VIN_NO,
		HDR.USR_EXTERIOR,
		HDR.USR_WHEEL_LOCK,
		HDR.USR_SERVICE_TYP,
		HDR.USR_ODOMETER_IN,
		HDR.USR_ODOMETER_OUT,
		HDR.USR_RETAIN_PARTS,
		HDR.USR_CUSTOMER_OWN_PARTS,
		HDR.USR_APPT_DAT,
		HDR.USR_APPT_TIM,
		HDR.USR_SERVICE_IN_DAT,
		HDR.USR_SERVICE_IN_TIM,
		HDR.USR_SERVICE_OUT_DAT,
		HDR.USR_SERVICE_OUT_TIM,
		HDR.USR_VEHICLE_INFO,
		LINES.ITEM_NO,
		LINES.DESCR,
		LINES.ITEM_TYP,
		(case when LINES.ITEM_TYP = 'S' then LINES.QTY_SOLD else 0 end)[hours],
		(case when LINES.ITEM_TYP ='S' then 1 else LINES.ORIG_QTY end)[SalesQty]
		--,
		--NOTES.NOTE_TXT,
		--NOTES.NOTE_DAT,
		--NOTES.USR_ID
	from VI_PS_DOC_HDR HDR inner join VI_PS_DOC_LIN LINES on HDR.DOC_ID = LINES.DOC_ID
		--left join VI_PS_DOC_NOTE NOTES on HDR.DOC_ID = NOTES.DOC_ID 
		--	and HDR.STA_ID = NOTES.STA_ID and hdr.STR_ID = NOTES.STR_ID 
	where HDR.DOC_TYP = 'O' and HDR.TKT_NO = @invoiceNo
	order by HDR.TKT_DT desc;
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_InvoiceNotesGet]    Script Date: 9/15/2023 11:45:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SP_InvoiceNotesGet]
	@sessionId T_GUID,
	@invoiceNo T_DOC_NO,
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;

	-------------------------------------------------------------------------------------
	--exec USER_SP_CheckSessionValidity @sessionId, @robot, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT
	exec USER_SP_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	-------------------------------------------------------------------------------------

	declare @STR_ID T_LOC_ID;

	set @STR_ID = (select locationId from USR_sessions_schedules where sessionId = @sessionId);

	select NOTES.NOTE_TXT,
		NOTES.NOTE_DAT,
		NOTES.USR_ID
	from VI_PS_DOC_HDR HDR left join VI_PS_DOC_NOTE NOTES on HDR.DOC_ID = NOTES.DOC_ID 
		and HDR.STA_ID = NOTES.STA_ID and hdr.STR_ID = NOTES.STR_ID 
	where HDR.DOC_TYP = 'O' and HDR.TKT_NO = @invoiceNo
	order by HDR.TKT_DT desc;
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_InvoicesListGet]    Script Date: 9/15/2023 11:45:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SP_InvoicesListGet]
	@sessionId T_GUID,
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;

	-------------------------------------------------------------------------------------
	--exec USER_SP_CheckSessionValidity @sessionId, @robot, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT
	exec USER_SP_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	-------------------------------------------------------------------------------------

	declare @STR_ID T_LOC_ID;

	set @STR_ID = (select locationId from USR_sessions_schedules where sessionId = @sessionId);

	select HDR.TKT_NO,
		HDR.TKT_DAT,
		HDR.BILL_NAM,
		HDR.BILL_PHONE_1,
		HDR.USR_MAKE,
		HDR.USR_MODEL,
		HDR.USR_LIC_PLATE,
		HDR.USR_VIN_NO
	from VI_PS_DOC_HDR HDR
	where HDR.DOC_TYP = 'O' and HDR.STR_ID = @STR_ID
	order by HDR.TKT_DT desc;
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_notificationsGet]    Script Date: 9/15/2023 11:45:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SP_notificationsGet]
	@sessionId T_GUID,
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;

	-- Always add this in every secured stored proc.
	-------------------------------------------------------------------------------------
	exec dbo.USER_SP_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	-------------------------------------------------------------------------------------

	SELECT id, [from], customerNo,[message], twilioDateTimeReceived, NAM
	FROM USR_SmsInbox join AR_CUST on USR_SmsInbox.customerNo = AR_CUST.CUST_NO
	where [read] = 'N'
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_ProcessTwilioSms]    Script Date: 9/15/2023 11:45:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SP_ProcessTwilioSms]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;

	declare @sender varchar(14), @message varchar(640)
           ,@messageSid varchar(34)
           --,@dateTimeReceived
           --,@dateCreated
		   ,@customerNo varchar(10)
           --,@customerName varchar(100);
	declare @toCountry nvarchar(2), @toState nvarchar(2), @smsMessageSid nvarchar(34), @numMedia nvarchar(2), @toCity nvarchar(30), @fromZip nvarchar(6)
		,@smsSid nvarchar(34), @fromState nvarchar(20), @smsStatus nvarchar(15), @fromCity nvarchar(10), @body nvarchar(640), @fromCountry nvarchar(2)
		,@to nvarchar(14), @toZip nvarchar(5), @numSegments nvarchar(3), @accountSid nvarchar(34), @from nvarchar(14), @apiVersion nvarchar(10)
		,@dateTimeReceived datetime;

	declare curTwilioInbox cursor for
		SELECT toCountry,toState,smsMessageSid,numMedia,toCity,fromZip,smsSid,fromState,smsStatus,fromCity,body,fromCountry,[to],toZip,
		  numSegments,accountSid,[from],apiVersion
		  ,dateTimeReceived FROM dbo.USR_twilioInbox
		where processed = 'N';

	open curTwilioInbox fetch next from curTwilioInbox into
		 @toCountry,@toState,@smsMessageSid,@numMedia,@toCity,@fromZip,@smsSid,@fromState,@smsStatus,@fromCity,@body,@fromCountry,@to,@toZip
		  ,@numSegments,@accountSid,@from,@apiVersion
		  ,@dateTimeReceived
	while @@FETCH_STATUS = 0
	begin
		-- JLM 5/12/2023: Maybe CP accepts duplicate mobile number, so select the top most.
		-- All numbers must use and start the international format i.e. +1.
		select top 1 @customerNo = CUST_NO from AR_CUST where dbo.ufnGetMobileNo(MBL_PHONE_1) = @from;

		if (@@ROWCOUNT = 0)
		begin	-- if no found, just iterate
			goto continueCount;
		end

		if NOT exists(select messageSid from USR_SmsInbox where messageSid = @smsMessageSid)
		begin	-- @from = @sender; @body = [message]
			INSERT INTO dbo.USR_SmsInbox([from],[message],[messageSid],[twiliodateTimeReceived], [processedUtcDateTime], [customerNo], [read])
								  VALUES(@from, @body,  @smsMessageSid, @dateTimeReceived,        GETUTCDATE(),          @customerNo,    'N')
		end

		update USR_twilioInbox set processed = 'Y' where smsMessageSid = @smsMessageSid;

		continueCount:
			fetch next from curTwilioInbox into @toCountry,@toState,@smsMessageSid,@numMedia,@toCity,@fromZip,@smsSid,@fromState,@smsStatus,@fromCity,@body,@fromCountry,@to,@toZip
			  ,@numSegments,@accountSid,@from,@apiVersion
			  ,@dateTimeReceived;
	end
	close curTwilioInbox;
	deallocate curTwilioInbox;	
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_scheduleAdd]    Script Date: 9/15/2023 11:45:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SP_scheduleAdd]
	@sessionId T_GUID,
	@subject NVARCHAR(100),
	@utcDateFrom T_DAT,
	@utcDateTo T_DAT,
	@description NVARCHAR(500),
	@invoiceNo T_DOC_NO,
	--@allDay CHAR(1),
	--@recurrenceRule CHAR(1),
	--@robot CHAR(1) = 'Y',	-- We must assume all requests are robot so bc of the time inactivity auto logout.
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -------------------------------------------------------------------------------------
	--exec USER_SP_CheckSessionValidity @sessionId, @robot, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT
	exec USER_SP_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	----------------------------------------------------------------------------------------
	declare @locationId T_LOC_ID, @currentUser T_USR_ID;
	select @locationId = locationId,
			@currentUser = userId 
	from USR_sessions_schedules where sessionId = @sessionId;

	insert into USR_schedules([subject], utcDateFrom,  utcDateTo,   [description],  invoiceNo,   locationId, createdBy)
						values(@subject, @utcDateFrom, @utcDateTo, @description, @invoiceNo,    @locationId, @currentUser);

	select @@identity as newId
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_schedulesGet]    Script Date: 9/15/2023 11:45:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SP_schedulesGet]
	@sessionId T_GUID,
	@technicianId nvarchar(20),
	--@robot CHAR(1) = 'Y',	-- We must assume all requests are robot so bc of the time inactivity auto logout.
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	-------------------------------------------------------------------------------------
	--exec USER_SP_CheckSessionValidity @sessionId, @robot, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT
	exec USER_SP_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	----------------------------------------------------------------------------------------
	--if (@robot = 'N')
	--	update USR_sessions_schedules set expiryUtcDate = DATEADD(mi, 10, GETUTCDATE()) where sessionId = @sessionId

	declare @locationId T_LOC_ID;
	set @locationId = (select locationId from USR_sessions_schedules where sessionId = @sessionId);

	if (@technicianId = 'ALL')	-- No filtering of technicians
	begin
		select scheds.id, scheds.subject, scheds.utcDateFrom, scheds.utcDateTo, scheds.description, scheds.invoiceNo, schedTech.technicianId
			, allDay, recurrenceRule, scheds.locationId, scheds.createdBy
		from USR_schedules scheds left join USR_schedules_technicians schedTech on scheds.id = schedTech.schedId
		where scheds.locationId = @locationId
		order by scheds.utcDateFrom desc
	end
	else
	begin
		select scheds.id, scheds.subject, scheds.utcDateFrom, scheds.utcDateTo, scheds.description, scheds.invoiceNo, schedTech.technicianId
			, allDay, recurrenceRule, scheds.locationId, scheds.createdBy
		from USR_schedules scheds left join USR_schedules_technicians schedTech on scheds.id = schedTech.schedId
		where schedTech.technicianId = @technicianId and scheds.locationId = @locationId
		order by scheds.utcDateFrom desc
	end	
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_SessionCreate]    Script Date: 9/15/2023 11:45:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SP_SessionCreate]
	@userId T_USR_ID,
	@expiryInMinutes int -- the session expiry in minutes.
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	declare @STR_ID T_LOC_ID, @GUID	T_GUID

    select @STR_ID = (CASE WHEN LST_STR_ID IS NULL THEN WRKGRP_ID ELSE LST_STR_ID END) from SY_USR where USR_ID = @userId;

	if (@@ROWCOUNT = 0)
	begin
		select '-1' as errorNo, 'Location not found' as errMsg
		return
	end

	set @GUID = NewID();

	--declare @expiryInMinutes int = 10 -- the session expiry in minutes.
	insert into USR_sessions_schedules(userId, locationId, sessionId, expiryUtcDate)
		               values(@userId, @STR_ID, @GUID, DATEADD(mi, @expiryInMinutes, GETUTCDATE()));

	select sessionId from USR_sessions_schedules where id = (select @@identity);
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_SmsAdd]    Script Date: 9/15/2023 11:45:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SP_SmsAdd]
	@sessionId T_GUID,
	@custNo T_CUST_NO,
	@recipient CHAR(12),
	@sms NVARCHAR(160),
	@messageSid NVARCHAR(20),
	@dateTimeSent datetime,
	@status NVARCHAR(10),
	@alertId int = 0,
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;
	-------------------------------------------------------------------------------------
	exec USER_SP_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	----------------------------------------------------------------------------------------
	DECLARE @userId NVARCHAR(15);
	SET @userId = (select userId from USR_sessions_schedules where sessionId = @sessionId);

	insert into USR_SmsMessages(UserId, AlertId, customerNo, Recipient, Sms, utcToBeSentOn, MessageSid, utcDateTimeSent, [Status], DateCreated)
						values(@userId,    0,     @custNo,   @recipient, @sms, GETUTCDATE(), @messageSid, @dateTimeSent, @status,  GETUTCDATE());
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_SmsGet]    Script Date: 9/15/2023 11:45:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SP_SmsGet]
	@sessionId T_GUID,
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;
	-------------------------------------------------------------------------------------
	exec USER_SP_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	----------------------------------------------------------------------------------------
	DECLARE @userId NVARCHAR(15);
	SET @userId = (select userId from USR_sessions_schedules where sessionId = @sessionId);

	select Id,UserId,Recipient,Sms,[Status], MessageSid, utcDateTimeSent from USR_SmsMessages
	where UserId = @userId
	order by Id desc
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_SmsGetByCustomer]    Script Date: 9/15/2023 11:45:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SP_SmsGetByCustomer]
	@sessionId T_GUID,
	@custNo T_CUST_NO,
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	SET NOCOUNT ON;
	-------------------------------------------------------------------------------------
	exec USER_SP_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	----------------------------------------------------------------------------------------
	select * from (
			select Id, customerNo,		UserId [name], Recipient,  Sms,       [Status],   MessageSid,  utcDateTimeSent [utcDdateAndTime],    'sentItems' [fromTable] from USR_SmsMessages -- USR_SmsMessages = sent items.
			where customerNo = @custNo
			union all
			select id, customerNo, AR_CUST.NAM [name],     '',      [message],   'Received', messageSid, twilioDateTimeReceived,'inbox' [fromTable]
			from USR_SmsInbox	-- USR_SmsInbox = processed Twilio incoming SMS.
				join AR_CUST on USR_SmsInbox.customerNo = AR_CUST.CUST_NO
			where customerNo = @custNo
		) AllSmsMessages
	order by utcDdateAndTime;

	-- Because in the front, customer has been selected, then set all SMS to read = 'Y'
	update USR_SmsInbox set [read] = 'Y' where customerNo = @custNo;
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_TechniciansGet]    Script Date: 9/15/2023 11:45:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SP_TechniciansGet]
	@sessionId T_GUID,
	--@robot CHAR(1) = 'Y',	-- We must assume all requests are robot so bc of the time inactivity auto logout.
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;
	-------------------------------------------------------------------------------------
	--exec USER_SP_CheckSessionValidity @sessionId, @robot, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT
	exec USER_SP_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	----------------------------------------------------------------------------------------
	--if (@robot = 'N')
	--	update USR_sessions_schedules set expiryUtcDate = DATEADD(mi, 10, GETUTCDATE()) where sessionId = @sessionId

	select USR_ID, NAM, PHONE_1 from SY_USR where LST_STR_ID = (select locationId from USR_sessions_schedules where sessionId = @sessionId)
	order by USR_ID;
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_TwilioSmsAdd]    Script Date: 9/15/2023 11:45:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SP_TwilioSmsAdd]
	@toCountry nvarchar(2),
	@toState nvarchar(2),
	@smsMessageSid nvarchar(34),
	@numMedia nvarchar(2),
	@toCity nvarchar(30),
	@fromZip nvarchar(6),
	@smsSid nvarchar(34),
	@fromState nvarchar(20),
	@smsStatus nvarchar(15),
	@fromCity nvarchar(10),
	@body nvarchar(640),
	@fromCountry nvarchar(2),
	@to nvarchar(14),
	@toZip nvarchar(5),
	@numSegments nvarchar(3),
	@accountSid nvarchar(34),
	@from nvarchar(14),
	@apiVersion nvarchar(10)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;

	INSERT INTO [dbo].[USR_twilioInbox]([toCountry]
					,[toState], [smsMessageSid], [numMedia], [toCity], [fromZip], [smsSid], [fromState], [smsStatus], [fromCity], [body]
					,[fromCountry], [to], [toZip], [numSegments], [accountSid], [from], [apiVersion], dateTimeReceived)
							   VALUES(@toCountry
					,@toState,  @smsMessageSid,  @numMedia,  @toCity,  @fromZip,  @smsSid,  @fromState,  @smsStatus,  @fromCity, @body
					,@fromCountry,  @to,  @toZip, @numSegments, @accountSid,  @from, @apiVersion, GETUTCDATE());

	exec dbo.USER_SP_ProcessTwilioSms;
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_WorkOrdersGet]    Script Date: 9/15/2023 11:45:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SP_WorkOrdersGet]
	@sessionId T_GUID,
	--@robot CHAR(1) = 'Y',	-- We must assume all requests are robot so bc of the time inactivity auto logout.
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;

	-------------------------------------------------------------------------------------
	--exec USER_SP_CheckSessionValidity @sessionId, @robot, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT
	exec USER_SP_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	-------------------------------------------------------------------------------------

	declare @STR_ID T_LOC_ID;

	set @STR_ID = (select locationId from USR_sessions_schedules where sessionId = @sessionId);

	select HDR.TKT_NO, HDR.DOC_ID, HDR.TKT_DT, NOTES.NOTE_TXT, HDR.CUST_NO, HDR.BILL_NAM,
			BILL_PHONE_1, USR_LIC_PLATE, USR_SERVICE_TYP,NOTE_DAT, NOTES.USR_ID
	from VI_PS_DOC_HDR HDR left join VI_PS_DOC_NOTE NOTES 
		on HDR.DOC_ID = NOTES.DOC_ID 
		and HDR.STA_ID = NOTES.STA_ID and hdr.STR_ID = NOTES.STR_ID 
	where HDR.DOC_TYP = 'O' and HDR.STR_ID = @STR_ID
	order by HDR.TKT_DT desc
END
GO
