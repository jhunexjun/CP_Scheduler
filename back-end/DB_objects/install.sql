USE [TOTAL_OFFROAD_12052023]
GO
/****** Object:  UserDefinedFunction [dbo].[ufnGetMobileNo]    Script Date: 2/6/2024 12:10:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[ufnGetMobileNo]
(
	@mobileNo nvarchar(20)
)
RETURNS nvarchar(16)
AS
BEGIN
	-- Declare the return variable here
	DECLARE @mobileNumber nvarchar(16);

	set @mobileNumber = (select REPLACE(@mobileNo, ' ', ''))
	set @mobileNumber = (select REPLACE(@mobileNumber, '(', ''));
	set @mobileNumber = (select REPLACE(@mobileNumber, ')', ''));
	set @mobileNumber = (select REPLACE(@mobileNumber, '-', ''));
	set @mobileNumber = (select REPLACE(@mobileNumber, '.', ''));
	--set @mobileNumber = (select REPLACE(@mobileNumber, '+', ''));

	RETURN @mobileNumber;

END
GO
/****** Object:  Table [dbo].[USER_items]    Script Date: 2/6/2024 12:10:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USER_items](
	[itemNo] [dbo].[T_ITEM_NO] NOT NULL,
	[descr] [dbo].[T_DESCR] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USER_SmsInbox]    Script Date: 2/6/2024 12:10:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USER_SmsInbox](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[from] [nvarchar](14) NOT NULL,
	[customerNo] [dbo].[T_COD] NOT NULL,
	[messageSid] [nvarchar](34) NOT NULL,
	[message] [nvarchar](160) NOT NULL,
	[twilioDateTimeReceived] [datetime] NOT NULL,
	[processedUtcDateTime] [datetime] NOT NULL,
	[read] [char](1) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USER_workorders]    Script Date: 2/6/2024 12:10:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USER_workorders](
	[workorderNo] [dbo].[T_DOC_NO] NOT NULL,
	[documentIsSigned] [nvarchar](1) NOT NULL,
	[signatureImg] [text] NULL,
	[utcDateSigned] [datetime] NOT NULL,
	[createdBy] [dbo].[T_USR_ID] NOT NULL,
	[utcUpdateDate] [datetime] NULL,
	[updatedBy] [dbo].[T_USR_ID] NULL,
 CONSTRAINT [PK_USER_PDFs] PRIMARY KEY CLUSTERED 
(
	[workorderNo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USER_workordersLineItems]    Script Date: 2/6/2024 12:10:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USER_workordersLineItems](
	[workorderNo] [dbo].[T_DOC_NO] NOT NULL,
	[lineItemNo] [smallint] NOT NULL,
	[descr] [dbo].[T_DESCR] NOT NULL,
	[itemNo] [dbo].[T_ITEM_NO] NOT NULL,
	[qty] [dbo].[T_QTY] NULL,
	[reasonId] [dbo].[T_SMALLINT] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USR_schedules]    Script Date: 2/6/2024 12:10:38 PM ******/
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
	[recurrenceRule] [varchar](50) NULL,
	[locationId] [dbo].[T_LOC_ID] NULL,
	[createdBy] [dbo].[T_USR_ID] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USR_schedules_technicians]    Script Date: 2/6/2024 12:10:38 PM ******/
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
/****** Object:  Table [dbo].[USR_sessions_schedules]    Script Date: 2/6/2024 12:10:38 PM ******/
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
/****** Object:  Table [dbo].[USR_SmsMessages]    Script Date: 2/6/2024 12:10:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USR_SmsMessages](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](15) NULL,
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
/****** Object:  Table [dbo].[USR_twilioInbox]    Script Date: 2/6/2024 12:10:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USR_twilioInbox](
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
	[apiVersion] [nvarchar](10) NOT NULL,
	[dateTimeReceived] [datetime] NOT NULL,
	[processed] [varchar](1) NOT NULL,
	[id] [uniqueidentifier] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USR_users]    Script Date: 2/6/2024 12:10:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USR_users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[email] [nvarchar](50) NOT NULL,
	[username] [nvarchar](50) NOT NULL,
	[password] [nvarchar](50) NOT NULL,
	[createdDate] [datetime] NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[USER_SmsInbox] ADD  CONSTRAINT [DF_USR_SmsInbox_dateCreated]  DEFAULT (getutcdate()) FOR [processedUtcDateTime]
GO
ALTER TABLE [dbo].[USER_workorders] ADD  CONSTRAINT [DF_USER_PDFs_utcDateSigned]  DEFAULT (getutcdate()) FOR [utcDateSigned]
GO
ALTER TABLE [dbo].[USR_schedules] ADD  CONSTRAINT [DF_USR_SCHEDULER2_createdDate]  DEFAULT (getutcdate()) FOR [utcCreatedDate]
GO
ALTER TABLE [dbo].[USR_sessions_schedules] ADD  CONSTRAINT [DF_USR_sessions_schedules_createdDate]  DEFAULT (getutcdate()) FOR [createdUtcDate]
GO
ALTER TABLE [dbo].[USR_SmsMessages] ADD  CONSTRAINT [defaultDateTime]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[USR_twilioInbox] ADD  CONSTRAINT [DF_USR_twilioInbox_dateTimeReceived]  DEFAULT (getutcdate()) FOR [dateTimeReceived]
GO
ALTER TABLE [dbo].[USR_twilioInbox] ADD  CONSTRAINT [DF_USR_twilioInbox_processed]  DEFAULT ('N') FOR [processed]
GO
ALTER TABLE [dbo].[USR_users] ADD  CONSTRAINT [DF_USR_users1_createdDate]  DEFAULT (getdate()) FOR [createdDate]
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_CheckSessionValidity]    Script Date: 2/6/2024 12:10:38 PM ******/
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
/****** Object:  StoredProcedure [dbo].[USER_SP_CustomersGet]    Script Date: 2/6/2024 12:10:38 PM ******/
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
			newSmsMsg = (select count(*) from USER_SmsInbox where AR_CUST.CUST_NO = customerNo and [read] = 'N')
	from AR_CUST
	where CUST_NO IN (select HDR.CUST_NO
						from VI_PS_DOC_HDR HDR left join VI_PS_DOC_NOTE NOTES 
							on HDR.DOC_ID = NOTES.DOC_ID 
							and HDR.STA_ID = NOTES.STA_ID and hdr.STR_ID = NOTES.STR_ID 
						where HDR.DOC_TYP = 'O' and HDR.STR_ID = @STR_ID)
	order by NAM
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_extendSession]    Script Date: 2/6/2024 12:10:38 PM ******/
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
/****** Object:  StoredProcedure [dbo].[USER_SP_getLocationBySessionId]    Script Date: 2/6/2024 12:10:38 PM ******/
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
/****** Object:  StoredProcedure [dbo].[USER_SP_GetTotalPymtByPayCode]    Script Date: 2/6/2024 12:10:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[USER_SP_GetTotalPymtByPayCode]
	@dateFrom Date,
	@dateTo Date
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	declare @payCodeType nvarchar(1);

	declare curPayCode cursor for		
		select PAY_COD_TYP
		from PS_DOC_HDR H2 JOIN VI_PS_DOC_PMT ON H2.DOC_ID = VI_PS_DOC_PMT.DOC_ID
		where PMT_LIN_TYP <> 'J' and H2.TKT_TYP = 'T' AND H2.DOC_TYP = 'T'
		group by PAY_COD_TYP;

	open curPayCode fetch next from curPayCode into @payCodeType;
	while @@FETCH_STATUS = 0
	begin
		select 1;
		fetch next from curPayCode into @payCodeType;
	end
	close curPayCode;
	deallocate curPayCode;
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_InvoiceGet]    Script Date: 2/6/2024 12:10:38 PM ******/
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
		(case when LINES.ITEM_TYP ='S' then 1 else LINES.ORIG_QTY end)[SalesQty],	
		usrLines.qty as newQty,
		usrLines.reasonId
	from VI_PS_DOC_HDR HDR inner join VI_PS_DOC_LIN LINES on HDR.DOC_ID = LINES.DOC_ID
		left join USER_workordersLineItems usrLines ON usrLines.itemNo = LINES.ITEM_NO
			and usrLines.workorderNo = HDR.TKT_NO
			and usrLines.descr = LINES.DESCR	-- Note: description equality is included.
	where HDR.DOC_TYP = 'O' and HDR.TKT_NO = @invoiceNo
	order by HDR.TKT_DT desc;
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_InvoiceNotesGet]    Script Date: 2/6/2024 12:10:38 PM ******/
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
/****** Object:  StoredProcedure [dbo].[USER_SP_InvoicesListGet]    Script Date: 2/6/2024 12:10:38 PM ******/
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
/****** Object:  StoredProcedure [dbo].[USER_SP_notificationsGet]    Script Date: 2/6/2024 12:10:38 PM ******/
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

	declare @STR_ID T_COD;
	set @STR_ID = (select locationId from USR_sessions_schedules where sessionId = @sessionId);

	SELECT id, [from], customerNo,[message], twilioDateTimeReceived, NAM
	FROM USER_SmsInbox join AR_CUST on USER_SmsInbox.customerNo = AR_CUST.CUST_NO
	where [read] = 'N'
		and AR_CUST.CUST_NO IN (select HDR.CUST_NO -- This block of code is from USER_SP_CustomersGet bc we only want notification from list of customers in the listview.
								from VI_PS_DOC_HDR HDR left join VI_PS_DOC_NOTE NOTES 
									on HDR.DOC_ID = NOTES.DOC_ID 
									and HDR.STA_ID = NOTES.STA_ID and hdr.STR_ID = NOTES.STR_ID 
								where HDR.DOC_TYP = 'O' and HDR.STR_ID = @STR_ID)
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_PDFSave]    Script Date: 2/6/2024 12:10:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SP_PDFSave]
	@sessionId T_GUID,
	@workOrderNo T_DOC_NO,
	@documentIsSigned VARCHAR(1),
	@jsonAnnotation NTEXT,
	@signatureImg TEXT,
	@outputErrNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;

	-------------------------------------------------------------------------------------
	exec USER_SP_CheckSessionValidity @sessionId, @outputErrNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrNo = -1)
	begin
		select @outputErrNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	-------------------------------------------------------------------------------------

	declare @userId T_USR_ID;

	set @userId = (select userId from USR_sessions_schedules where sessionId = @sessionId);

	declare @newId T_DOC_NO;

	if NOT EXISTS(select workorderNo from USER_PDFs where workorderNo = @workOrderNo)
	begin
		insert into USER_PDFs(workorderNo, documentIsSigned, annotations, signatureImg, createdBy)
			values(@workOrderNo, @documentIsSigned, @jsonAnnotation, @signatureImg, @userId);

		select @workOrderNo as [newId];
	end
	else
	begin
		update USER_PDFs
			set documentIsSigned = @documentIsSigned,
				annotations = @jsonAnnotation,
				signatureImg = @signatureImg,
				updatedBy = @userId,
				utcUpdateDate = GETUTCDATE(),
				@newId = workorderNo
		where workorderNo = @workOrderNo;
		select @newId as [newId];
	end	
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_ProcessTwilioSms]    Script Date: 2/6/2024 12:10:38 PM ******/
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
		-- To do: Number should be unique in MBL_PHONE_1. Restrict it in Counterpoint.
		-- Currently, US number are the only working. Better starts with +1.
		select top 1 @customerNo = CUST_NO from AR_CUST where dbo.ufnGetMobileNo(MBL_PHONE_1) = @from;

		if (@@ROWCOUNT = 0)
		begin	-- if no found, just iterate
			goto continueCount; 
		end

		if NOT exists(select messageSid from USER_SmsInbox where messageSid = @smsMessageSid)
		begin	-- @from = @sender; @body = [message]
			INSERT INTO dbo.USER_SmsInbox([from],[message],[messageSid],[twiliodateTimeReceived], [processedUtcDateTime], [customerNo], [read])
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
/****** Object:  StoredProcedure [dbo].[USER_SP_scheduleAdd]    Script Date: 2/6/2024 12:10:38 PM ******/
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
/****** Object:  StoredProcedure [dbo].[USER_SP_schedulesGet]    Script Date: 2/6/2024 12:10:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- returns all appointments
CREATE PROCEDURE [dbo].[USER_SP_schedulesGet]
	@sessionId T_GUID,
	-- @technicianId nvarchar(20),
	@technicianIds nvarchar(500),
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	-------------------------------------------------------------------------------------
	exec USER_SP_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return;
	end
	----------------------------------------------------------------------------------------
	declare @locationId T_LOC_ID;
	set @locationId = (select locationId from USR_sessions_schedules where sessionId = @sessionId);

	if (@technicianIds = 'ALL')	-- No filtering of technicians
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
		-- where schedTech.technicianId = @technicianId and scheds.locationId = @locationId
		where schedTech.technicianId IN (select * from STRING_SPLIT(@technicianIds, ','))
			and scheds.locationId = @locationId
		order by scheds.utcDateFrom desc
	end	
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_schedulesGetByDateRange]    Script Date: 2/6/2024 12:10:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SP_schedulesGetByDateRange]
	@sessionId T_GUID,
	@technicianIds nvarchar(500),
	@utcDateFrom datetimeoffset,
	@utcDateTo datetimeoffset,
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	-------------------------------------------------------------------------------------
	exec USER_SP_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	----------------------------------------------------------------------------------------
	declare @locationId T_LOC_ID;
	set @locationId = (select locationId from USR_sessions_schedules where sessionId = @sessionId);

	if (@technicianIds = 'ALL')	-- No filtering of technicians
	begin
		select scheds.id, scheds.subject, scheds.utcDateFrom, scheds.utcDateTo, scheds.description, scheds.invoiceNo, schedTech.technicianId
			, allDay, recurrenceRule, scheds.locationId, scheds.createdBy
		from USR_schedules scheds left join USR_schedules_technicians schedTech on scheds.id = schedTech.schedId
		where scheds.locationId = @locationId
			and scheds.utcDateFrom >= @utcDateFrom and scheds.utcDateTo <= @utcDateTo
		order by scheds.utcDateFrom desc
	end
	else
	begin
		select scheds.id, scheds.subject, scheds.utcDateFrom, scheds.utcDateTo, scheds.description, scheds.invoiceNo, schedTech.technicianId
			, allDay, recurrenceRule, scheds.locationId, scheds.createdBy
		from USR_schedules scheds left join USR_schedules_technicians schedTech on scheds.id = schedTech.schedId
		-- where schedTech.technicianId = @technicianId and scheds.locationId = @locationId
		where schedTech.technicianId IN (select * from STRING_SPLIT(@technicianIds, ','))
			and scheds.locationId = @locationId
			and scheds.utcDateFrom >= @utcDateFrom and scheds.utcDateTo <= @utcDateTo
		order by scheds.utcDateFrom desc
	end	
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_SessionCreate]    Script Date: 2/6/2024 12:10:38 PM ******/
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
/****** Object:  StoredProcedure [dbo].[USER_SP_setWorkorderLineItems]    Script Date: 2/6/2024 12:10:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SP_setWorkorderLineItems]
	@sessionId T_GUID,
	@workorderNo T_DOC_NO,
	@documentIsSigned VARCHAR(1),
	@jsonAnnotation NTEXT,
	@signatureImg TEXT,
	@outputErrNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;

	-------------------------------------------------------------------------------------
	exec USER_SP_CheckSessionValidity @sessionId, @outputErrNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrNo = -1)
	begin
		select @outputErrNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	-------------------------------------------------------------------------------------

	declare @userId T_USR_ID;

	set @userId = (select userId from USR_sessions_schedules where sessionId = @sessionId);

	declare @newId T_DOC_NO;

	if NOT EXISTS(select workorderNo from USER_PDFs where workorderNo = @workOrderNo)
	begin
		insert into USER_PDFs(workorderNo, documentIsSigned, annotations, signatureImg, createdBy)
			values(@workOrderNo, @documentIsSigned, @jsonAnnotation, @signatureImg, @userId);

		select @workOrderNo as [newId];
	end
	else
	begin
		update USER_PDFs
			set documentIsSigned = @documentIsSigned,
				annotations = @jsonAnnotation,
				signatureImg = @signatureImg,
				updatedBy = @userId,
				utcUpdateDate = GETUTCDATE(),
				@newId = workorderNo
		where workorderNo = @workOrderNo;
		select @newId as [newId];
	end	
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_SmsAdd]    Script Date: 2/6/2024 12:10:38 PM ******/
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
	@checkSessionId NVARCHAR(1),
	@alertId int = 0,
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;

	DECLARE @userId NVARCHAR(15) = null;

	-------------------------------------------------------------------------------------
	if (@checkSessionId = 'Y')
	begin
		exec USER_SP_CheckSessionValidity @sessionId, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

		if (@outputErrorNo = -1)
		begin
			select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
			return
		end
		
		SET @userId = (select userId from USR_sessions_schedules where sessionId = @sessionId);
	end
	----------------------------------------------------------------------------------------

	insert into USR_SmsMessages(UserId, AlertId, customerNo, Recipient, Sms, utcToBeSentOn, MessageSid, utcDateTimeSent, [Status], DateCreated)
						values(@userId,    0,     @custNo,   @recipient, @sms, GETUTCDATE(), @messageSid, @dateTimeSent, @status,  GETUTCDATE());
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_SmsGet]    Script Date: 2/6/2024 12:10:38 PM ******/
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
/****** Object:  StoredProcedure [dbo].[USER_SP_SmsGetByCustomer]    Script Date: 2/6/2024 12:10:38 PM ******/
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
			from USER_SmsInbox	-- USR_SmsInbox = processed Twilio incoming SMS.
				join AR_CUST on USER_SmsInbox.customerNo = AR_CUST.CUST_NO
			where customerNo = @custNo
		) AllSmsMessages
	order by utcDdateAndTime;

	-- Because in the front, customer has been selected, then set all SMS to read = 'Y'
	update USER_SmsInbox set [read] = 'Y' where customerNo = @custNo;
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_TechniciansGet]    Script Date: 2/6/2024 12:10:38 PM ******/
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
/****** Object:  StoredProcedure [dbo].[USER_SP_TwilioSmsAdd]    Script Date: 2/6/2024 12:10:38 PM ******/
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

	begin try
		declare @idGuid uniqueidentifier;
		set @idGuid = NewID();

		INSERT INTO [dbo].[USR_twilioInbox](id, [toCountry], [toState], [smsMessageSid], [numMedia], [toCity], [fromZip], [smsSid], [fromState], [smsStatus],
											[fromCity], [body], [fromCountry], [to], [toZip], [numSegments], [accountSid], [from], [apiVersion], dateTimeReceived)
								   VALUES(@idGuid, @toCountry, @toState,  @smsMessageSid,  @numMedia,  @toCity,  @fromZip,  @smsSid,  @fromState,  @smsStatus,
											@fromCity,  @body,  @fromCountry,  @to,  @toZip,  @numSegments,   @accountSid,  @from, @apiVersion,  GETUTCDATE());

		-- Execute this as stand-alone SP when there's an unprocessed Twilio SMS.
		exec dbo.USER_SP_ProcessTwilioSms;

		select @idGuid as id;
	end try
	begin catch
		delete USR_twilioInbox where id = @idGuid;
	end catch;
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_WorkorderPdfSave]    Script Date: 2/6/2024 12:10:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROCEDURE [dbo].[USER_SP_WorkorderPdfSave]
	@sessionId T_GUID,
	@workorderNo T_DOC_NO,
	@documentIsSigned VARCHAR(1),
	--@jsonAnnotation NTEXT,
	@signatureImg TEXT,
	@outputErrNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;

	-------------------------------------------------------------------------------------
	exec USER_SP_CheckSessionValidity @sessionId, @outputErrNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrNo = -1)
	begin
		select @outputErrNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	-------------------------------------------------------------------------------------

	declare @userId T_USR_ID;

	set @userId = (select userId from USR_sessions_schedules where sessionId = @sessionId);

	declare @newId T_DOC_NO;

	if NOT EXISTS(select workorderNo from USER_workorders where workorderNo = @workorderNo)
	begin
		insert into USER_workorders(workorderNo, documentIsSigned, signatureImg, createdBy)
			values(@workorderNo, @documentIsSigned, @signatureImg, @userId);

		select @workorderNo as [newId];
	end
	else
	begin
		update USER_workorders
			set documentIsSigned = @documentIsSigned,
				--annotations = @jsonAnnotation,
				signatureImg = @signatureImg,
				updatedBy = @userId,
				utcUpdateDate = GETUTCDATE(),
				@newId = workorderNo
		where workorderNo = @workorderNo;
		select @newId as [newId];
	end	
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_WorkOrdersGet]    Script Date: 2/6/2024 12:10:38 PM ******/
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
			BILL_PHONE_1, USR_LIC_PLATE, USR_SERVICE_TYP,NOTE_DAT, NOTES.USR_ID,
			scheduled = (case when
							(select workorderNo from USER_workorders wo where wo.workorderNo = HDR.TKT_NO) is not null
							then 'Y'
							else 'N'
						end)
	from VI_PS_DOC_HDR HDR left join VI_PS_DOC_NOTE NOTES 
		on HDR.DOC_ID = NOTES.DOC_ID 
		and HDR.STA_ID = NOTES.STA_ID and hdr.STR_ID = NOTES.STR_ID 
	where HDR.DOC_TYP = 'O' and HDR.STR_ID = @STR_ID
	order by HDR.TKT_DT desc
END
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Populate with utc date.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'USR_sessions_schedules', @level2type=N'COLUMN',@level2name=N'expiryUtcDate'
GO
