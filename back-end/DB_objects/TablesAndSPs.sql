USE [TOTAL_OFFROAD_Practice]
GO
/****** Object:  Table [dbo].[USR_access_tokens]    Script Date: 3/5/2023 2:22:33 PM ******/
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
/****** Object:  Table [dbo].[USR_locations]    Script Date: 3/5/2023 2:22:33 PM ******/
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
/****** Object:  Table [dbo].[USR_members]    Script Date: 3/5/2023 2:22:33 PM ******/
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
/****** Object:  Table [dbo].[USR_oauth_clients]    Script Date: 3/5/2023 2:22:33 PM ******/
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
/****** Object:  Table [dbo].[USR_schedules]    Script Date: 3/5/2023 2:22:33 PM ******/
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
/****** Object:  Table [dbo].[USR_schedules_technicians]    Script Date: 3/5/2023 2:22:33 PM ******/
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
/****** Object:  Table [dbo].[USR_sessions]    Script Date: 3/5/2023 2:22:33 PM ******/
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
/****** Object:  Table [dbo].[USR_sessions_schedules]    Script Date: 3/5/2023 2:22:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USR_sessions_schedules](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userId] [dbo].[T_USR_ID] NOT NULL,
	[locationId] [dbo].[T_LOC_ID] NOT NULL,
	[createdDate] [dbo].[T_DAT] NOT NULL,
	[expiryDate] [dbo].[T_DAT] NOT NULL,
	[sessionId] [dbo].[T_GUID] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USR_users]    Script Date: 3/5/2023 2:22:33 PM ******/
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
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'fe878c406bc9d8c69e10fac13c3a2939eaf3e702', CAST(N'2022-12-01T20:27:49.627' AS DateTime), N'5a924ea6d6849b04ca5e95dda1a7c51c64caa4b9', CAST(N'2022-12-15T19:27:49.627' AS DateTime))
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

INSERT [dbo].[USR_schedules] ([id], [subject], [utcDateFrom], [utcDateTo], [description], [utcCreatedDate], [utcUpdateDate], [invoiceNo], [allDay], [recurrenceRule]) VALUES (107, N'Weekly Tech Meetings. 234', CAST(N'2023-03-01T00:30:00.000' AS DateTime), CAST(N'2023-03-01T01:30:00.000' AS DateTime), N'To attend the meeting. 234', CAST(N'2023-02-21T18:32:59.170' AS DateTime), CAST(N'2023-02-28T20:26:53.767' AS DateTime), N'PEL-W-214020', N'N', NULL)
INSERT [dbo].[USR_schedules] ([id], [subject], [utcDateFrom], [utcDateTo], [description], [utcCreatedDate], [utcUpdateDate], [invoiceNo], [allDay], [recurrenceRule]) VALUES (110, N'dsfsdfsdfsdfsf', CAST(N'2023-03-05T01:00:00.000' AS DateTime), CAST(N'2023-03-05T01:30:00.000' AS DateTime), N'', CAST(N'2023-03-04T07:17:30.653' AS DateTime), CAST(N'2023-03-05T01:08:01.190' AS DateTime), N'PEL-W-214020', N'N', NULL)
INSERT [dbo].[USR_schedules] ([id], [subject], [utcDateFrom], [utcDateTo], [description], [utcCreatedDate], [utcUpdateDate], [invoiceNo], [allDay], [recurrenceRule]) VALUES (111, N'Test from sp', CAST(N'2023-03-15T12:00:00.000' AS DateTime), CAST(N'2023-03-15T13:00:00.000' AS DateTime), N'The is the description', CAST(N'2023-03-04T12:58:53.610' AS DateTime), NULL, N'PEL-W-214020', NULL, NULL)
INSERT [dbo].[USR_schedules] ([id], [subject], [utcDateFrom], [utcDateTo], [description], [utcCreatedDate], [utcUpdateDate], [invoiceNo], [allDay], [recurrenceRule]) VALUES (112, N'Test for the SP. 3', CAST(N'2023-03-05T02:00:00.000' AS DateTime), CAST(N'2023-03-05T02:30:00.000' AS DateTime), N'Test for the SP. 3', CAST(N'2023-03-04T13:41:39.373' AS DateTime), CAST(N'2023-03-05T01:08:12.440' AS DateTime), N'RCH-W600024', N'N', NULL)
INSERT [dbo].[USR_schedules] ([id], [subject], [utcDateFrom], [utcDateTo], [description], [utcCreatedDate], [utcUpdateDate], [invoiceNo], [allDay], [recurrenceRule]) VALUES (113, N'Test for GREENVILLE', CAST(N'2023-03-05T01:00:00.000' AS DateTime), CAST(N'2023-03-05T01:30:00.000' AS DateTime), N'Test for GREENVILLE

Perform Steering/Suspension Inspection 
Customer states has squeak noise coming from the rear while driving
', CAST(N'2023-03-05T05:53:44.967' AS DateTime), NULL, N'GRN-W500012', NULL, NULL)
SET IDENTITY_INSERT [dbo].[USR_schedules] OFF
GO
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (102, N'AARON P')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (105, N'DEBRA')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (105, N'TOBY K')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (106, N'AARON P')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (107, N'AARON P')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (110, N'ANTHONY')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (112, N'ANTHONY')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (113, N'ADAML')
GO
INSERT [dbo].[USR_sessions] ([sid], [session], [expires]) VALUES (N'1CDqXndz5Ph4rGms4h8NXpCegRZ3gaIH', N'{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"accessToken":"36e9ff30e22a1ffc87414b56221f7c771c54d347"}', CAST(N'2022-11-23T21:18:21.527' AS DateTime))
INSERT [dbo].[USR_sessions] ([sid], [session], [expires]) VALUES (N'r8kWsWxGZ5HCSiDr5x108xFjQUCRysU-', N'{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', CAST(N'2022-11-23T21:19:20.357' AS DateTime))
INSERT [dbo].[USR_sessions] ([sid], [session], [expires]) VALUES (N'tnQzpCcuH6shXc4YYnTYLAKDz7cRWZmT', N'{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"accessToken":"c35ba1cc8371fef04f00e4a5d4fd7673737c1f4f"}', CAST(N'2022-11-23T21:19:54.450' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[USR_sessions_schedules] ON 

INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdDate], [expiryDate], [sessionId]) VALUES (11, N'CCCI', N'RICHMOND', CAST(N'2023-03-03T17:03:07.560' AS DateTime), CAST(N'2023-03-10T17:33:07.560' AS DateTime), N'6796b252-7279-47d1-9be9-986edd99d6c8')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdDate], [expiryDate], [sessionId]) VALUES (12, N'ADAML', N'GREENVILLE', CAST(N'2023-03-03T18:37:12.077' AS DateTime), CAST(N'2023-03-10T19:07:12.077' AS DateTime), N'40861d3e-bd62-4c96-bc72-6a1def6a7309')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdDate], [expiryDate], [sessionId]) VALUES (13, N'ADAML', N'GREENVILLE', CAST(N'2023-03-03T20:56:26.360' AS DateTime), CAST(N'2023-03-03T21:26:26.360' AS DateTime), N'0f4b6fee-ff87-4fb5-886c-71c8f0e0a680')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdDate], [expiryDate], [sessionId]) VALUES (10, N'CCCI', N'RICHMOND', CAST(N'2023-03-03T17:02:45.167' AS DateTime), CAST(N'2023-03-03T17:32:45.167' AS DateTime), N'aa195c4b-7de0-465e-98e2-9e2c4562d9dc')
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
ALTER TABLE [dbo].[USR_sessions_schedules] ADD  CONSTRAINT [DF_USR_sessions_schedules_createdDate]  DEFAULT (getutcdate()) FOR [createdDate]
GO
ALTER TABLE [dbo].[USR_users] ADD  CONSTRAINT [DF_USR_users1_createdDate]  DEFAULT (getdate()) FOR [createdDate]
GO
/****** Object:  StoredProcedure [dbo].[USER_CheckSessionValidity]    Script Date: 3/5/2023 2:22:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--The check validity is also in the javascript back-end but for now, in back-end is used for dynamic sql

CREATE PROCEDURE [dbo].[USER_CheckSessionValidity]
	@sessionId T_GUID
AS
BEGIN
	SET NOCOUNT ON;

    declare @STR_ID T_LOC_ID;

	set @STR_ID = (select locationId from USR_sessions_schedules where sessionId = @sessionId and expiryDate > GETUTCDATE());
	IF (ISNULL(@STR_ID, '') = '')
	begin
		select -1 as errorNo, 'Expired session' as statusMsg;
	end
	else
	begin
		select 0 as errorNo, 'Session is valid' as statusMsg;
	end
END
GO
/****** Object:  StoredProcedure [dbo].[USER_getWorkOrders]    Script Date: 3/5/2023 2:22:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_getWorkOrders]
	@sessionId T_GUID
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;

	declare @STR_ID T_LOC_ID;

	set @STR_ID = (select locationId from USR_sessions_schedules where sessionId = @sessionId and expiryDate > GETUTCDATE());

    IF (ISNULL(@STR_ID, '') = '')
	begin
		select -1 as errorNo, 'Expired session' as errMsg;
		return;
	end

	select HDR.TKT_NO, HDR.DOC_ID, NOTES.NOTE_TXT, HDR.CUST_NO, HDR.BILL_NAM 
	from VI_PS_DOC_HDR HDR left join VI_PS_DOC_NOTE NOTES 
		on HDR.DOC_ID = NOTES.DOC_ID 
		and HDR.STA_ID = NOTES.STA_ID and hdr.STR_ID = NOTES.STR_ID 
	where HDR.DOC_TYP = 'O' and HDR.STR_ID = @STR_ID
	order by HDR.TKT_DT desc
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SCHD_Add]    Script Date: 3/5/2023 2:22:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SCHD_Add]
	@sessionId T_GUID,
	@subject NVARCHAR(100),
	@utcDateFrom T_DAT,
	@utcDateTo T_DAT,
	@description NVARCHAR(500),
	@invoiceNo T_DOC_NO
	--@allDay CHAR(1),
	--@recurrenceRule CHAR(1),

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    declare @STR_ID T_LOC_ID;

	set @STR_ID = (select locationId from USR_sessions_schedules where sessionId = @sessionId and expiryDate > GETUTCDATE());
	IF (ISNULL(@STR_ID, '') = '')
	begin
		select -1 as errorNo, 'Expired session' as errMsg;
		return;
	end

	insert into USR_schedules([subject], utcDateFrom, utcDateTo, [description], invoiceNo)
	values(@subject, @utcDateFrom, @utcDateTo, @description, @invoiceNo);

	select @@identity as newId
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_GET_Schedules]    Script Date: 3/5/2023 2:22:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SP_GET_Schedules]
	@sessionId T_GUID,
	@technicianId nvarchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	declare @STR_ID T_LOC_ID;

	set @STR_ID = (select locationId from USR_sessions_schedules where sessionId = @sessionId and expiryDate > GETUTCDATE());

    IF (ISNULL(@STR_ID, '') != '')
	begin -- if session not yet expired
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
		
	end
	else
	begin
		select -1 as errorNo, 'Expired session' as errMsg;
	end
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_GET_Technicians]    Script Date: 3/5/2023 2:22:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SP_GET_Technicians]
	@sessionId T_GUID
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;

	IF EXISTS(select id from USR_sessions_schedules where sessionId = @sessionId and expiryDate > GETUTCDATE())
		select USR_ID, NAM, PHONE_1 from SY_USR where LST_STR_ID = (select locationId from USR_sessions_schedules where sessionId = @sessionId);
	else
		select -1 as errorNo, 'Expired session' as errMsg;
END
GO
/****** Object:  StoredProcedure [dbo].[USER_SP_Scheduler_Sessions]    Script Date: 3/5/2023 2:22:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SP_Scheduler_Sessions]
	@userId T_USR_ID
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	declare @STR_ID T_LOC_ID, @GUID	T_GUID --, @newSchedulerId T_INT;

    set @STR_ID = (select LST_STR_ID from SY_USR where USR_ID = @userId);
	set @GUID = NewID();

	insert into USR_sessions_schedules(userId, locationId, sessionId, expiryDate)
		values(@userId, @STR_ID, @GUID, DATEADD(mi, 30, GETUTCDATE()));

	--set @newSchedulerId = (select @@identity);
	select sessionId from USR_sessions_schedules where id = (select @@identity);
END
GO
