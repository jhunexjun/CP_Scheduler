USE [TOTAL_OFFROAD_Practice3]
GO
/****** Object:  Table [dbo].[USR_schedules]    Script Date: 5/10/2023 11:12:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USR_schedules](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[subject] [nvarchar](100) NOT NULL,
	[utcDateFrom] [datetime] NOT NULL,
	[utcDateTo] [datetime] NOT NULL,
	[description] [nvarchar](250) NULL,
	[utcCreatedDate] [datetime] NOT NULL,
	[utcUpdateDate] [datetime] NULL,
	[invoiceNo] [varchar](50) NULL,
	[allDay] [char](1) NULL,
	[recurrenceRule] [varchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USR_schedules_technicians]    Script Date: 5/10/2023 11:12:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USR_schedules_technicians](
	[schedId] [int] NOT NULL,
	[technicianId] [nvarchar](20) NOT NULL,
 CONSTRAINT [PK_USR_sched_members2] PRIMARY KEY CLUSTERED 
(
	[schedId] ASC,
	[technicianId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USR_sessions_schedules]    Script Date: 5/10/2023 11:12:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USR_sessions_schedules](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userId] [dbo].[T_USR_ID] NOT NULL,
	[locationId] [dbo].[T_LOC_ID] NOT NULL,
	[createdUtcDate] [dbo].[T_DAT] NOT NULL,
	[expiryUtcDate] [dbo].[T_DAT] NOT NULL,
	[sessionId] [dbo].[T_GUID] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USR_SmsInbox]    Script Date: 5/10/2023 11:12:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USR_SmsInbox](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[sender] [nvarchar](14) NOT NULL,
	[message] [nvarchar](160) NOT NULL,
	[messageSid] [nvarchar](34) NOT NULL,
	[dateTimeReceived] [datetime] NOT NULL,
	[dateCreated] [datetime] NOT NULL,
	[customerName] [nvarchar](50) NOT NULL,
	[toCountry] [nvarchar](2) NOT NULL,
	[toState] [nvarchar](2) NOT NULL,
	[smsMessageSid] [nvarchar](34) NOT NULL,
	[numMedia] [nvarchar](2) NOT NULL,
	[toCity] [nvarchar](30) NOT NULL,
	[fromZip] [nvarchar](6) NOT NULL,
	[smsSid] [nvarchar](34) NOT NULL,
	[fromState] [nvarchar](20) NOT NULL,
	[smsStatus] [nvarchar](15) NOT NULL,
	[fromCity] [nvarchar](10) NOT NULL,
	[body] [nvarchar](640) NOT NULL,
	[fromCountry] [nvarchar](2) NOT NULL,
	[to] [nvarchar](14) NOT NULL,
	[toZip] [nvarchar](5) NOT NULL,
	[numSegments] [nvarchar](3) NOT NULL,
	[accountSid] [nvarchar](34) NOT NULL,
	[from] [nvarchar](14) NOT NULL,
	[apiVersion] [nvarchar](10) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USR_SmsMessages]    Script Date: 5/10/2023 11:12:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USR_SmsMessages](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](15) NOT NULL,
	[AlertId] [int] NOT NULL,
	[Recipient] [nvarchar](14) NOT NULL,
	[Sms] [nvarchar](160) NOT NULL,
	[UtcToBeSentOn] [datetime] NOT NULL,
	[Status] [nvarchar](10) NOT NULL,
	[MessageSid] [nvarchar](20) NULL,
	[utcDateTimeSent] [datetime] NULL,
	[DateCreated] [datetime] NOT NULL,
	[utcUpdateDate] [datetime] NULL,
	[LastTrySending] [datetime] NULL,
	[LastTrySendingErr] [nvarchar](150) NULL,
	[customerNo] [dbo].[T_CUST_NO] NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[USR_schedules] ADD  CONSTRAINT [DF_USR_SCHEDULER2_createdDate]  DEFAULT (getutcdate()) FOR [utcCreatedDate]
GO
ALTER TABLE [dbo].[USR_sessions_schedules] ADD  CONSTRAINT [DF_USR_sessions_schedules_createdDate]  DEFAULT (getutcdate()) FOR [createdUtcDate]
GO
ALTER TABLE [dbo].[USR_SmsMessages] ADD  CONSTRAINT [defaultDateTime]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
/****** Object:  StoredProcedure [dbo].[USER_CheckSessionValidity]    Script Date: 5/10/2023 11:12:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--The check validity is also in the javascript back-end but for now, in back-end is used for dynamic sql

CREATE PROCEDURE [dbo].[USER_CheckSessionValidity]
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
/****** Object:  StoredProcedure [dbo].[USER_CustomersGet]    Script Date: 5/10/2023 11:12:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_CustomersGet]
	@sessionId T_GUID,
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;

	-------------------------------------------------------------------------------------
	exec USER_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	-------------------------------------------------------------------------------------

	declare @STR_ID T_LOC_ID;

	set @STR_ID = (select locationId from USR_sessions_schedules where sessionId = @sessionId);

	--select CUST_NO, NAM, ADRS_1, EMAIL_ADRS_1, PHONE_1 from AR_CUST where STR_ID = @STR_ID;
	select CUST_NO, NAM, ADRS_1, EMAIL_ADRS_1, PHONE_1, STR_ID
	from AR_CUST
	where CUST_NO IN (select HDR.CUST_NO
						from VI_PS_DOC_HDR HDR left join VI_PS_DOC_NOTE NOTES 
							on HDR.DOC_ID = NOTES.DOC_ID 
							and HDR.STA_ID = NOTES.STA_ID and hdr.STR_ID = NOTES.STR_ID 
						where HDR.DOC_TYP = 'O' and HDR.STR_ID = @STR_ID)
	order by NAM
END
GO
/****** Object:  StoredProcedure [dbo].[USER_extendSession]    Script Date: 5/10/2023 11:12:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_extendSession]
	@sessionId T_GUID,
	@expiryInMinutes int, -- the session expiry in minutes.
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;
	-------------------------------------------------------------------------------------
	exec USER_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

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
/****** Object:  StoredProcedure [dbo].[USER_getLocationBySessionId]    Script Date: 5/10/2023 11:12:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_getLocationBySessionId]
	@sessionId T_GUID,
	--@robot CHAR(1) = 'Y',	-- We must assume all requests are robot so bc of the time inactivity auto logout.
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;
	-------------------------------------------------------------------------------------
	--exec USER_CheckSessionValidity @sessionId, @robot, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT
	exec USER_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	-------------------------------------------------------------------------------------
	
	select userId, locationId FROM USR_sessions_schedules where sessionId = @sessionId
END
GO
/****** Object:  StoredProcedure [dbo].[USER_InvoiceGet]    Script Date: 5/10/2023 11:12:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_InvoiceGet]
	@sessionId T_GUID,
	@invoiceNo T_DOC_NO,
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;

	-------------------------------------------------------------------------------------
	--exec USER_CheckSessionValidity @sessionId, @robot, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT
	exec USER_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

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
/****** Object:  StoredProcedure [dbo].[USER_InvoiceNotesGet]    Script Date: 5/10/2023 11:12:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_InvoiceNotesGet]
	@sessionId T_GUID,
	@invoiceNo T_DOC_NO,
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;

	-------------------------------------------------------------------------------------
	--exec USER_CheckSessionValidity @sessionId, @robot, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT
	exec USER_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

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
/****** Object:  StoredProcedure [dbo].[USER_InvoicesListGet]    Script Date: 5/10/2023 11:12:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_InvoicesListGet]
	@sessionId T_GUID,
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;

	-------------------------------------------------------------------------------------
	--exec USER_CheckSessionValidity @sessionId, @robot, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT
	exec USER_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

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
		--HDR.CUST_NO,
		--HDR.SLS_REP,
		HDR.BILL_NAM,
		HDR.BILL_PHONE_1,
		--NOTES.NOTE_TXT,
		HDR.USR_LIC_PLATE
	from VI_PS_DOC_HDR HDR
		left join VI_PS_DOC_NOTE NOTES on HDR.DOC_ID = NOTES.DOC_ID 
			and HDR.STA_ID = NOTES.STA_ID and hdr.STR_ID = NOTES.STR_ID 
	where HDR.DOC_TYP = 'O' and HDR.STR_ID = @STR_ID
	order by HDR.TKT_DT desc;
END
GO
/****** Object:  StoredProcedure [dbo].[USER_scheduleAdd]    Script Date: 5/10/2023 11:12:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_scheduleAdd]
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
	--exec USER_CheckSessionValidity @sessionId, @robot, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT
	exec USER_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	----------------------------------------------------------------------------------------

	insert into USR_schedules([subject], utcDateFrom, utcDateTo, [description], invoiceNo)
						values(@subject, @utcDateFrom, @utcDateTo, @description, @invoiceNo);

	select @@identity as newId
END
GO
/****** Object:  StoredProcedure [dbo].[USER_schedulesGet]    Script Date: 5/10/2023 11:12:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_schedulesGet]
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
	--exec USER_CheckSessionValidity @sessionId, @robot, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT
	exec USER_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	----------------------------------------------------------------------------------------
	--if (@robot = 'N')
	--	update USR_sessions_schedules set expiryUtcDate = DATEADD(mi, 10, GETUTCDATE()) where sessionId = @sessionId

	if (@technicianId = 'ALL')	-- No filtering of technicians
	begin
		select scheds.id, scheds.subject, scheds.utcDateFrom, scheds.utcDateTo, scheds.description, scheds.invoiceNo, schedTech.technicianId
			, allDay, recurrenceRule
		from USR_schedules scheds left join USR_schedules_technicians schedTech on scheds.id = schedTech.schedId
		order by scheds.id
	end
	else
	begin
		select scheds.id, scheds.subject, scheds.utcDateFrom, scheds.utcDateTo, scheds.description, scheds.invoiceNo, schedTech.technicianId
			, allDay, recurrenceRule
		from USR_schedules scheds left join USR_schedules_technicians schedTech on scheds.id = schedTech.schedId
		where schedTech.technicianId = @technicianId
		order by scheds.id
	end	
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SessionCreate]    Script Date: 5/10/2023 11:12:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SessionCreate]
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
/****** Object:  StoredProcedure [dbo].[USER_SmsAdd]    Script Date: 5/10/2023 11:12:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SmsAdd]
	@sessionId T_GUID,
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
	exec USER_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	----------------------------------------------------------------------------------------
	DECLARE @userId NVARCHAR(15);
	SET @userId = (select userId from USR_sessions_schedules where sessionId = @sessionId);

	insert into USR_SmsMessages(UserId, AlertId, Recipient, Sms, utcToBeSentOn, MessageSid, utcDateTimeSent, [Status], DateCreated)
						values(@userId,    0,   @recipient, @sms, GETUTCDATE(), @messageSid, @dateTimeSent, @status,  GETUTCDATE());
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SmsGet]    Script Date: 5/10/2023 11:12:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SmsGet]
	@sessionId T_GUID,
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;
	-------------------------------------------------------------------------------------
	exec USER_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

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
/****** Object:  StoredProcedure [dbo].[USER_SmsGetByCustomer]    Script Date: 5/10/2023 11:12:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SmsGetByCustomer]
	@sessionId T_GUID,
	@custNo T_CUST_NO,
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	SET NOCOUNT ON;
	-------------------------------------------------------------------------------------
	exec USER_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	----------------------------------------------------------------------------------------
	--DECLARE @userId NVARCHAR(15);
	--SET @userId = (select userId from USR_sessions_schedules where sessionId = @sessionId);

	select Id, customerNo,       UserId [name], Recipient, Sms,       [Status],   MessageSid, utcDateTimeSent,    'sentItems' [fromTable] from USR_SmsMessages
	where customerNo = @custNo
	union all
	select id, customerNo, customerName [name],  '',       [message], 'Received', messageSid, dateTimeReceived,  'inbox' [fromTable] from USR_SmsInbox
	where customerNo = @custNo
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SmsInboxAdd]    Script Date: 5/10/2023 11:12:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SmsInboxAdd]
	@sessionId T_GUID,
	@recipient CHAR(12),
	@sms NVARCHAR(160),
	@dateTimeSent datetime,
	@status NVARCHAR(10),
	@alertId int = 0,
	--------------------------------------
	@sender nvarchar(14),
	@message nvarchar(160),
	@messageSid nvarchar(34),
	@dateTimeReceived [datetime],
	@dateCreated [datetime],
	@customerName nvarchar(50),
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
	@apiVersion nvarchar(10),
	--------------------------------------
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;
	-------------------------------------------------------------------------------------
	exec USER_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	----------------------------------------------------------------------------------------
	DECLARE @userId NVARCHAR(15);
	SET @userId = (select userId from USR_sessions_schedules where sessionId = @sessionId);

	INSERT INTO [dbo].[USR_SmsInbox]
           ([sender]
           ,[message]
           ,[messageSid]
           ,[dateTimeReceived]
           ,[dateCreated]
           ,[customerName]
           ,[toCountry]
           ,[toState]
           ,[smsMessageSid]
           ,[numMedia]
           ,[toCity]
           ,[fromZip]
           ,[smsSid]
           ,[fromState]
           ,[smsStatus]
           ,[fromCity]
           ,[body]
           ,[fromCountry]
           ,[to]
           ,[toZip]
           ,[numSegments]
           ,[accountSid]
           ,[from]
           ,[apiVersion])
     VALUES
           (@sender
           ,@message
           ,@messageSid
           ,@dateTimeReceived
           ,@dateCreated
           ,@customerName
           ,@toCountry
           ,@toState
           ,@smsMessageSid
           ,@numMedia
           ,@toCity
           ,@fromZip
           ,@smsSid
           ,@fromState
           ,@smsStatus
           ,@fromCity
           ,@body
           ,@fromCountry
           ,@to
           ,@toZip
           ,@numSegments
           ,@accountSid
           ,@from
           ,@apiVersion)
END
GO
/****** Object:  StoredProcedure [dbo].[USER_TechniciansGet]    Script Date: 5/10/2023 11:12:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_TechniciansGet]
	@sessionId T_GUID,
	--@robot CHAR(1) = 'Y',	-- We must assume all requests are robot so bc of the time inactivity auto logout.
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;
	-------------------------------------------------------------------------------------
	--exec USER_CheckSessionValidity @sessionId, @robot, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT
	exec USER_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

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
/****** Object:  StoredProcedure [dbo].[USER_WorkOrdersGet]    Script Date: 5/10/2023 11:12:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_WorkOrdersGet]
	@sessionId T_GUID,
	--@robot CHAR(1) = 'Y',	-- We must assume all requests are robot so bc of the time inactivity auto logout.
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;

	-------------------------------------------------------------------------------------
	--exec USER_CheckSessionValidity @sessionId, @robot, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT
	exec USER_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	-------------------------------------------------------------------------------------

	declare @STR_ID T_LOC_ID;

	set @STR_ID = (select locationId from USR_sessions_schedules where sessionId = @sessionId);

	--if (@robot = 'N')
	--	update USR_sessions_schedules set expiryUtcDate = DATEADD(mi, 10, GETUTCDATE()) where sessionId = @sessionId

	select HDR.TKT_NO, HDR.DOC_ID, NOTES.NOTE_TXT, HDR.CUST_NO, HDR.BILL_NAM, BILL_PHONE_1, USR_LIC_PLATE, USR_SERVICE_TYP, NOTE_DAT, NOTES.USR_ID
	from VI_PS_DOC_HDR HDR left join VI_PS_DOC_NOTE NOTES 
		on HDR.DOC_ID = NOTES.DOC_ID 
		and HDR.STA_ID = NOTES.STA_ID and hdr.STR_ID = NOTES.STR_ID 
	where HDR.DOC_TYP = 'O' and HDR.STR_ID = @STR_ID
	order by HDR.TKT_DT desc
END
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Populate with utc date.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'USR_sessions_schedules', @level2type=N'COLUMN',@level2name=N'expiryUtcDate'
GO
