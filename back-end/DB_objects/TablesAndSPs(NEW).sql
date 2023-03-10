USE [TOTAL_OFFROAD_Practice]
GO
/****** Object:  Table [dbo].[USR_access_tokens]    Script Date: 3/10/2023 9:55:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USR_access_tokens](
	[client_id] [nvarchar](10) NULL,
	[user_id] [int] NULL,
	[access_token] [nvarchar](40) NULL,
	[access_token_expires_on] [datetime] NULL,
	[refresh_token] [nvarchar](40) NULL,
	[refresh_token_expires_on] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USR_locations]    Script Date: 3/10/2023 9:55:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USR_locations](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[text] [nvarchar](50) NOT NULL,
	[createdDate] [datetime] NOT NULL,
	[updateDate] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USR_members]    Script Date: 3/10/2023 9:55:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USR_members](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[text] [nvarchar](50) NOT NULL,
	[color] [nvarchar](50) NULL,
	[createdDate] [datetime] NOT NULL,
	[updateDate] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USR_oauth_clients]    Script Date: 3/10/2023 9:55:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USR_oauth_clients](
	[client_id] [nvarchar](15) NULL,
	[client_secret] [nvarchar](15) NULL,
	[redirect_uri] [nvarchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USR_schedules]    Script Date: 3/10/2023 9:55:23 PM ******/
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
/****** Object:  Table [dbo].[USR_schedules_technicians]    Script Date: 3/10/2023 9:55:23 PM ******/
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
/****** Object:  Table [dbo].[USR_sessions]    Script Date: 3/10/2023 9:55:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USR_sessions](
	[sid] [nvarchar](255) NOT NULL,
	[session] [nvarchar](max) NOT NULL,
	[expires] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[sid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USR_sessions_schedules]    Script Date: 3/10/2023 9:55:23 PM ******/
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
/****** Object:  Table [dbo].[USR_users]    Script Date: 3/10/2023 9:55:23 PM ******/
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
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'36e9ff30e22a1ffc87414b56221f7c771c54d347', CAST(N'2022-11-22T22:18:21.513' AS DateTime), N'497397c855a59e4620b47e204a3077a0f9367b42', CAST(N'2022-12-06T21:18:21.513' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[USR_locations] ON 

INSERT [dbo].[USR_locations] ([id], [text], [createdDate], [updateDate]) VALUES (1, N'Room 1', CAST(N'2023-01-22T05:12:42.337' AS DateTime), NULL)
INSERT [dbo].[USR_locations] ([id], [text], [createdDate], [updateDate]) VALUES (2, N'Room 2', CAST(N'2023-01-22T05:12:46.283' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[USR_locations] OFF
GO
SET IDENTITY_INSERT [dbo].[USR_members] ON 

INSERT [dbo].[USR_members] ([id], [text], [color], [createdDate], [updateDate]) VALUES (1, N'Andrew Glover', N'Yellow', CAST(N'2023-01-22T05:09:29.720' AS DateTime), NULL)
INSERT [dbo].[USR_members] ([id], [text], [color], [createdDate], [updateDate]) VALUES (2, N'Arnie Schwartz', N'Red', CAST(N'2023-01-22T05:09:15.110' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[USR_members] OFF
GO
INSERT [dbo].[USR_oauth_clients] ([client_id], [client_secret], [redirect_uri]) VALUES (N'computant', N'nightworld', NULL)
GO
SET IDENTITY_INSERT [dbo].[USR_schedules] ON 

INSERT [dbo].[USR_schedules] ([id], [subject], [utcDateFrom], [utcDateTo], [description], [utcCreatedDate], [utcUpdateDate], [invoiceNo], [allDay], [recurrenceRule]) VALUES (129, N'Subject here.', CAST(N'2023-03-10T01:00:00.000' AS DateTime), CAST(N'2023-03-10T01:30:00.000' AS DateTime), N'Desc here. 2', CAST(N'2023-03-10T12:30:53.607' AS DateTime), CAST(N'2023-03-10T13:06:10.360' AS DateTime), N'RCH-W600024', N'N', NULL)
INSERT [dbo].[USR_schedules] ([id], [subject], [utcDateFrom], [utcDateTo], [description], [utcCreatedDate], [utcUpdateDate], [invoiceNo], [allDay], [recurrenceRule]) VALUES (140, N'Subject 4443434', CAST(N'2023-03-10T03:00:00.000' AS DateTime), CAST(N'2023-03-10T03:30:00.000' AS DateTime), N'Desc 545445555', CAST(N'2023-03-10T13:49:23.533' AS DateTime), NULL, N'RCH-W600004', NULL, NULL)
INSERT [dbo].[USR_schedules] ([id], [subject], [utcDateFrom], [utcDateTo], [description], [utcCreatedDate], [utcUpdateDate], [invoiceNo], [allDay], [recurrenceRule]) VALUES (141, N'Sub 67676', CAST(N'2023-03-10T01:30:00.000' AS DateTime), CAST(N'2023-03-10T02:00:00.000' AS DateTime), N'Desc 888', CAST(N'2023-03-10T13:51:13.297' AS DateTime), NULL, N'RCH-W600005', NULL, NULL)
SET IDENTITY_INSERT [dbo].[USR_schedules] OFF
GO
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (129, N'ANTHONY')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (140, N'ANTHONY')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (141, N'ANTHONY')
GO
INSERT [dbo].[USR_sessions] ([sid], [session], [expires]) VALUES (N'1CDqXndz5Ph4rGms4h8NXpCegRZ3gaIH', N'{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"accessToken":"36e9ff30e22a1ffc87414b56221f7c771c54d347"}', CAST(N'2022-11-23T21:18:21.527' AS DateTime))
INSERT [dbo].[USR_sessions] ([sid], [session], [expires]) VALUES (N'r8kWsWxGZ5HCSiDr5x108xFjQUCRysU-', N'{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', CAST(N'2022-11-23T21:19:20.357' AS DateTime))
INSERT [dbo].[USR_sessions] ([sid], [session], [expires]) VALUES (N'tnQzpCcuH6shXc4YYnTYLAKDz7cRWZmT', N'{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"accessToken":"c35ba1cc8371fef04f00e4a5d4fd7673737c1f4f"}', CAST(N'2022-11-23T21:19:54.450' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[USR_sessions_schedules] ON 

INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (11, N'CCCI', N'RICHMOND', CAST(N'2023-03-03T17:03:07.560' AS DateTime), CAST(N'2023-03-10T14:01:21.223' AS DateTime), N'6796b252-7279-47d1-9be9-986edd99d6c8')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (12, N'ADAML', N'GREENVILLE', CAST(N'2023-03-03T18:37:12.077' AS DateTime), CAST(N'2023-03-10T19:07:12.077' AS DateTime), N'40861d3e-bd62-4c96-bc72-6a1def6a7309')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (13, N'ADAML', N'GREENVILLE', CAST(N'2023-03-03T20:56:26.360' AS DateTime), CAST(N'2023-03-03T21:26:26.360' AS DateTime), N'0f4b6fee-ff87-4fb5-886c-71c8f0e0a680')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (10, N'CCCI', N'RICHMOND', CAST(N'2023-03-03T17:02:45.167' AS DateTime), CAST(N'2023-03-03T17:32:45.167' AS DateTime), N'aa195c4b-7de0-465e-98e2-9e2c4562d9dc')
SET IDENTITY_INSERT [dbo].[USR_sessions_schedules] OFF
GO
SET IDENTITY_INSERT [dbo].[USR_users] ON 

INSERT [dbo].[USR_users] ([id], [email], [username], [password], [createdDate]) VALUES (1, N'jhunexjun@gmail.com', N'jhun', N'jhun', CAST(N'2022-12-02T14:49:02.560' AS DateTime))
SET IDENTITY_INSERT [dbo].[USR_users] OFF
GO
ALTER TABLE [dbo].[USR_locations] ADD  CONSTRAINT [DF_USR_locations_createdDate]  DEFAULT (getutcdate()) FOR [createdDate]
GO
ALTER TABLE [dbo].[USR_members] ADD  CONSTRAINT [DF_USR_OWNER_createdDate]  DEFAULT (getutcdate()) FOR [createdDate]
GO
ALTER TABLE [dbo].[USR_schedules] ADD  CONSTRAINT [DF_USR_SCHEDULER2_createdDate]  DEFAULT (getutcdate()) FOR [utcCreatedDate]
GO
ALTER TABLE [dbo].[USR_sessions_schedules] ADD  CONSTRAINT [DF_USR_sessions_schedules_createdDate]  DEFAULT (getutcdate()) FOR [createdUtcDate]
GO
ALTER TABLE [dbo].[USR_users] ADD  CONSTRAINT [DF_USR_users1_createdDate]  DEFAULT (getdate()) FOR [createdDate]
GO
/****** Object:  StoredProcedure [dbo].[USER_CheckSessionValidity]    Script Date: 3/10/2023 9:55:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--The check validity is also in the javascript back-end but for now, in back-end is used for dynamic sql

CREATE PROCEDURE [dbo].[USER_CheckSessionValidity]
	@sessionId T_GUID,
	@robot CHAR(1) = 'Y',	-- We must assume all requests are robot so bc of the time inactivity auto logout.
	@outputErrorNo INT OUTPUT,
	@outputStatusMsg NVARCHAR(200) OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

    declare @STR_ID T_LOC_ID;

	set @STR_ID = (select locationId from USR_sessions_schedules where sessionId = @sessionId and expiryUtcDate > GETUTCDATE());
	IF (ISNULL(@STR_ID, '') = '')
	begin
		select @outputErrorNo = -1, @outputStatusMsg = 'Expired session'
		return
	end
	
	if (@robot = 'N')
		update USR_sessions_schedules set expiryUtcDate = DATEADD(mi, 100, GETUTCDATE()) where sessionId = @sessionId

	select @outputErrorNo = 0, @outputStatusMsg = 'Session is valid';
END
GO
/****** Object:  StoredProcedure [dbo].[USER_getLocationBySessionId]    Script Date: 3/10/2023 9:55:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_getLocationBySessionId]
	@sessionId T_GUID,
	@robot CHAR(1) = 'Y',	-- We must assume all requests are robot so bc of the time inactivity auto logout.
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;
	-------------------------------------------------------------------------------------
	exec USER_CheckSessionValidity @sessionId, @robot, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	-------------------------------------------------------------------------------------
	--declare @STR_ID T_LOC_ID;

	--set @STR_ID = (select locationId from USR_sessions_schedules where sessionId = @sessionId and expiryUtcDate > GETUTCDATE());

    --IF (ISNULL(@STR_ID, '') = '')
	--begin
	--	select -1 as errorNo, 'Expired session' as errMsg;
	--	return;
	--end
	   
	--if (@robot = 'N')
	--	update USR_sessions_schedules set expiryUtcDate = DATEADD(mi, 10, GETUTCDATE()) where sessionId = @sessionId

	select userId, locationId FROM USR_sessions_schedules where sessionId = @sessionId
END
GO
/****** Object:  StoredProcedure [dbo].[USER_scheduleAdd]    Script Date: 3/10/2023 9:55:23 PM ******/
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
	@robot CHAR(1) = 'Y',	-- We must assume all requests are robot so bc of the time inactivity auto logout.
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -------------------------------------------------------------------------------------
	exec USER_CheckSessionValidity @sessionId, @robot, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

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
/****** Object:  StoredProcedure [dbo].[USER_schedulesGet]    Script Date: 3/10/2023 9:55:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_schedulesGet]
	@sessionId T_GUID,
	@technicianId nvarchar(20),
	@robot CHAR(1) = 'Y',	-- We must assume all requests are robot so bc of the time inactivity auto logout.
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	-------------------------------------------------------------------------------------
	exec USER_CheckSessionValidity @sessionId, @robot, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	----------------------------------------------------------------------------------------
	if (@robot = 'N')
		update USR_sessions_schedules set expiryUtcDate = DATEADD(mi, 10, GETUTCDATE()) where sessionId = @sessionId

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
/****** Object:  StoredProcedure [dbo].[USER_SessionCreate]    Script Date: 3/10/2023 9:55:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SessionCreate]
	@userId T_USR_ID
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	declare @STR_ID T_LOC_ID, @GUID	T_GUID

    set @STR_ID = (select LST_STR_ID from SY_USR where USR_ID = @userId);
	set @GUID = NewID();

	insert into USR_sessions_schedules(userId, locationId, sessionId, expiryUtcDate)
		values(@userId, @STR_ID, @GUID, DATEADD(mi, 10, GETUTCDATE()));

	select sessionId from USR_sessions_schedules where id = (select @@identity);
END
GO
/****** Object:  StoredProcedure [dbo].[USER_TechniciansGet]    Script Date: 3/10/2023 9:55:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_TechniciansGet]
	@sessionId T_GUID,
	@robot CHAR(1) = 'Y',	-- We must assume all requests are robot so bc of the time inactivity auto logout.
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;
	-------------------------------------------------------------------------------------
	exec USER_CheckSessionValidity @sessionId, @robot, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	----------------------------------------------------------------------------------------
	if (@robot = 'N')
		update USR_sessions_schedules set expiryUtcDate = DATEADD(mi, 10, GETUTCDATE()) where sessionId = @sessionId

	select USR_ID, NAM, PHONE_1 from SY_USR where LST_STR_ID = (select locationId from USR_sessions_schedules where sessionId = @sessionId);
END
GO
/****** Object:  StoredProcedure [dbo].[USER_WorkOrdersGet]    Script Date: 3/10/2023 9:55:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_WorkOrdersGet]
	@sessionId T_GUID,
	@robot CHAR(1) = 'Y',	-- We must assume all requests are robot so bc of the time inactivity auto logout.
	@outputErrorNo INT = 0 OUTPUT,
	@outputStatusMsg NVARCHAR(200) = '' OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;

	-------------------------------------------------------------------------------------
	exec USER_CheckSessionValidity @sessionId, @robot, @outputErrorNo OUTPUT, @outputStatusMsg OUTPUT

	if (@outputErrorNo = -1)
	begin
		select @outputErrorNo as errorNo, @outputStatusMsg as errMsg
		return
	end
	-------------------------------------------------------------------------------------

	declare @STR_ID T_LOC_ID;

	set @STR_ID = (select locationId from USR_sessions_schedules where sessionId = @sessionId);

	if (@robot = 'N')
		update USR_sessions_schedules set expiryUtcDate = DATEADD(mi, 10, GETUTCDATE()) where sessionId = @sessionId

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
