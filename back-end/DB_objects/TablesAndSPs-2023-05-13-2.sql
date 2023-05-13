USE [TOTAL_OFFROAD_Practice3]
GO
/****** Object:  Table [dbo].[USR_schedules]    Script Date: 5/13/2023 12:28:06 PM ******/
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
/****** Object:  Table [dbo].[USR_schedules_technicians]    Script Date: 5/13/2023 12:28:07 PM ******/
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
/****** Object:  Table [dbo].[USR_sessions_schedules]    Script Date: 5/13/2023 12:28:07 PM ******/
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
/****** Object:  Table [dbo].[USR_SmsInbox]    Script Date: 5/13/2023 12:28:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USR_SmsInbox](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[from] [nvarchar](14) NOT NULL,
	[customerNo] [dbo].[T_COD] NOT NULL,
	[messageSid] [nvarchar](34) NOT NULL,
	[message] [nvarchar](160) NOT NULL,
	[twilioDateTimeReceived] [datetime] NOT NULL,
	[processedUtcDateTime] [datetime] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USR_SmsMessages]    Script Date: 5/13/2023 12:28:07 PM ******/
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
/****** Object:  Table [dbo].[USR_twilioInbox]    Script Date: 5/13/2023 12:28:07 PM ******/
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
	[processed] [varchar](1) NOT NULL
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[USR_schedules] ON 

INSERT [dbo].[USR_schedules] ([id], [subject], [utcDateFrom], [utcDateTo], [description], [utcCreatedDate], [utcUpdateDate], [invoiceNo], [allDay], [recurrenceRule]) VALUES (1, N'TEST schedule.', CAST(N'2023-04-20T13:30:00.000' AS DateTime), CAST(N'2023-04-20T14:30:00.000' AS DateTime), N'This is a test only.', CAST(N'2023-04-20T23:57:16.363' AS DateTime), NULL, N'NAP-W900020', NULL, NULL)
INSERT [dbo].[USR_schedules] ([id], [subject], [utcDateFrom], [utcDateTo], [description], [utcCreatedDate], [utcUpdateDate], [invoiceNo], [allDay], [recurrenceRule]) VALUES (2, N'LEATHER', CAST(N'2023-04-21T13:00:00.000' AS DateTime), CAST(N'2023-04-21T14:30:00.000' AS DateTime), N'Replacement', CAST(N'2023-04-21T05:47:03.343' AS DateTime), NULL, N'CIN-W1000161', NULL, NULL)
INSERT [dbo].[USR_schedules] ([id], [subject], [utcDateFrom], [utcDateTo], [description], [utcCreatedDate], [utcUpdateDate], [invoiceNo], [allDay], [recurrenceRule]) VALUES (3, N'LEATHER', CAST(N'2023-04-22T01:00:00.000' AS DateTime), CAST(N'2023-04-22T02:00:00.000' AS DateTime), N'This is a test appointment.', CAST(N'2023-04-21T20:19:00.527' AS DateTime), NULL, N'CIN-W1000161', NULL, NULL)
SET IDENTITY_INSERT [dbo].[USR_schedules] OFF
GO
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (1, N'BILLY')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (2, N'BRIANB')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (3, N'BRIANB')
GO
SET IDENTITY_INSERT [dbo].[USR_sessions_schedules] ON 

INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (1, N'CCCI', N'01', CAST(N'2023-04-20T23:25:20.673' AS DateTime), CAST(N'2023-04-20T23:36:40.113' AS DateTime), N'a941c46a-56b7-4130-8c9b-9b79850b0263')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (2, N'CCCI', N'01', CAST(N'2023-04-20T23:43:51.757' AS DateTime), CAST(N'2023-04-20T23:53:51.757' AS DateTime), N'00f8b95a-2128-4053-bde8-7c4c6cb1daf3')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (3, N'CCCI', N'01', CAST(N'2023-04-20T23:54:33.343' AS DateTime), CAST(N'2023-04-21T00:04:45.150' AS DateTime), N'480dd8f3-e97c-4198-a2dc-6de21493fb32')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (4, N'BILLY', N'NAPERVILLE', CAST(N'2023-04-20T23:55:02.290' AS DateTime), CAST(N'2023-04-21T00:08:38.970' AS DateTime), N'7e8722b7-3255-4016-9655-3195b376d3ac')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (6, N'BILLY', N'NAPERVILLE', CAST(N'2023-04-21T03:32:17.037' AS DateTime), CAST(N'2023-04-21T03:42:17.037' AS DateTime), N'e0ac6cca-55df-4abe-b816-ce666b8e8bce')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (7, N'BILLY', N'NAPERVILLE', CAST(N'2023-04-21T03:32:19.337' AS DateTime), CAST(N'2023-04-21T03:42:19.337' AS DateTime), N'a11e6c5d-a527-4cf2-94dc-3f391d0ab987')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (8, N'BILLY', N'NAPERVILLE', CAST(N'2023-04-21T04:33:42.123' AS DateTime), CAST(N'2023-04-21T04:37:13.207' AS DateTime), N'706014b7-c234-4eed-9e39-c4aef9c58309')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (10, N'CCCI', N'01', CAST(N'2023-04-21T05:23:14.800' AS DateTime), CAST(N'2023-04-21T05:33:23.770' AS DateTime), N'1559d469-ad3c-4dab-8e95-1b136d8e2732')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (13, N'CCCI', N'CINCINNATI', CAST(N'2023-04-21T05:39:05.657' AS DateTime), CAST(N'2023-04-21T05:50:01.023' AS DateTime), N'1d8362cd-a95e-4839-9d39-f228af720c00')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (14, N'CCCI', N'CINCINNATI', CAST(N'2023-04-21T05:46:29.040' AS DateTime), CAST(N'2023-04-21T06:19:17.790' AS DateTime), N'93a28066-fd06-49dd-9ebf-1c61859572ff')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (16, N'CCCI', N'CINCINNATI', CAST(N'2023-04-21T20:16:56.573' AS DateTime), CAST(N'2023-04-22T08:17:58.673' AS DateTime), N'40fd37ab-4ae1-4d2e-a7af-2e51af2cc8d4')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (17, N'CCCI', N'CINCINNATI', CAST(N'2023-04-22T02:32:27.060' AS DateTime), CAST(N'2023-04-24T09:16:02.043' AS DateTime), N'5e9c6b13-b96a-4e63-b7dc-c5dd72d65f2b')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (18, N'BILLY', N'NAPERVILLE', CAST(N'2023-05-02T10:27:38.953' AS DateTime), CAST(N'2023-05-02T18:29:02.350' AS DateTime), N'a3c5cc13-a346-4d64-9e4f-332ae2157c7f')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (19, N'BILLY', N'NAPERVILLE', CAST(N'2023-05-02T12:29:37.033' AS DateTime), CAST(N'2023-05-05T18:41:03.427' AS DateTime), N'5eef3312-6fb4-4258-a61e-f2f82091ed0b')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (20, N'CCCI', N'CINCINNATI', CAST(N'2023-05-05T18:57:11.703' AS DateTime), CAST(N'2023-05-05T18:56:45.047' AS DateTime), N'251af7f9-b1e2-4afe-960d-87ddf4e14ca5')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (21, N'BILLY', N'NAPERVILLE', CAST(N'2023-05-05T18:57:51.820' AS DateTime), CAST(N'2023-05-07T23:30:40.510' AS DateTime), N'056fdb71-6d3a-4f42-b871-795bf4911ed6')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (22, N'BILLY', N'NAPERVILLE', CAST(N'2023-05-07T23:33:03.480' AS DateTime), CAST(N'2023-05-08T18:17:29.543' AS DateTime), N'0e2d8164-a642-4e86-8996-c945464f3325')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (23, N'BILLY', N'NAPERVILLE', CAST(N'2023-05-08T18:21:11.113' AS DateTime), CAST(N'2023-05-09T18:20:41.280' AS DateTime), N'b83d7692-c0c8-4731-81bb-f721e4a30f26')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (25, N'BILLY', N'NAPERVILLE', CAST(N'2023-05-10T19:13:18.823' AS DateTime), CAST(N'2023-05-11T05:31:09.353' AS DateTime), N'c468c487-0eea-4549-8ebf-2fadcfdae493')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (26, N'BILLY', N'NAPERVILLE', CAST(N'2023-05-13T03:37:35.187' AS DateTime), CAST(N'2023-05-13T12:25:26.177' AS DateTime), N'817b838a-bbb3-4795-aad6-4074295dc6a2')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (5, N'BILLY', N'NAPERVILLE', CAST(N'2023-04-21T02:01:11.503' AS DateTime), CAST(N'2023-04-21T02:11:21.080' AS DateTime), N'72aaea7e-52d5-4e5e-b1f2-55c4957b2c83')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (9, N'BILLY', N'NAPERVILLE', CAST(N'2023-04-21T04:38:23.693' AS DateTime), CAST(N'2023-04-21T04:47:34.253' AS DateTime), N'420e0106-9787-4301-aa77-40b8303f915e')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (11, N'CCCI', N'01', CAST(N'2023-04-21T05:34:10.577' AS DateTime), CAST(N'2023-04-21T05:34:14.067' AS DateTime), N'b8ee6445-0984-4a36-b7a2-537fda04a321')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (15, N'CCCI', N'CINCINNATI', CAST(N'2023-04-21T06:23:12.130' AS DateTime), CAST(N'2023-04-21T06:33:31.273' AS DateTime), N'0d5d2107-98c7-4e12-bff9-530908466599')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (12, N'CCCI', N'01', CAST(N'2023-04-21T05:35:22.490' AS DateTime), CAST(N'2023-04-21T05:45:42.650' AS DateTime), N'4c8cc19a-c2c4-43ca-8f47-39c2b2479512')
INSERT [dbo].[USR_sessions_schedules] ([id], [userId], [locationId], [createdUtcDate], [expiryUtcDate], [sessionId]) VALUES (24, N'BILLY', N'NAPERVILLE', CAST(N'2023-05-09T22:04:48.550' AS DateTime), CAST(N'2023-05-10T18:41:26.290' AS DateTime), N'8571520f-bb6e-403a-90fc-da8ea5f127cb')
SET IDENTITY_INSERT [dbo].[USR_sessions_schedules] OFF
GO
SET IDENTITY_INSERT [dbo].[USR_SmsInbox] ON 

INSERT [dbo].[USR_SmsInbox] ([id], [from], [customerNo], [messageSid], [message], [twilioDateTimeReceived], [processedUtcDateTime]) VALUES (8, N'+18083419365', N'9000205', N'SM21942ce32b42604f428ab9823f44ba34', N'Got it', CAST(N'2023-05-13T02:00:00.000' AS DateTime), CAST(N'2023-05-13T03:26:19.003' AS DateTime))
INSERT [dbo].[USR_SmsInbox] ([id], [from], [customerNo], [messageSid], [message], [twilioDateTimeReceived], [processedUtcDateTime]) VALUES (9, N'+18083419365', N'9000205', N'SM71ce31d2c287101c7ccaf4e1d5755613', N'No problem. Got it', CAST(N'2023-05-13T02:05:00.000' AS DateTime), CAST(N'2023-05-13T03:26:19.007' AS DateTime))
SET IDENTITY_INSERT [dbo].[USR_SmsInbox] OFF
GO
SET IDENTITY_INSERT [dbo].[USR_SmsMessages] ON 

INSERT [dbo].[USR_SmsMessages] ([Id], [UserId], [AlertId], [Recipient], [Sms], [UtcToBeSentOn], [Status], [MessageSid], [utcDateTimeSent], [DateCreated], [utcUpdateDate], [LastTrySending], [LastTrySendingErr], [customerNo]) VALUES (1, N'CCCI', 0, N'+18083419365', N'Hello Jhun....', CAST(N'2023-04-22T03:12:26.767' AS DateTime), N'Sent', N'dfdsf86ndmeh1l', CAST(N'2023-04-22T03:12:26.000' AS DateTime), CAST(N'2023-04-22T03:12:26.767' AS DateTime), NULL, NULL, NULL, NULL)
INSERT [dbo].[USR_SmsMessages] ([Id], [UserId], [AlertId], [Recipient], [Sms], [UtcToBeSentOn], [Status], [MessageSid], [utcDateTimeSent], [DateCreated], [utcUpdateDate], [LastTrySending], [LastTrySendingErr], [customerNo]) VALUES (2, N'CCCI', 0, N'+18083419365', N'Hello my Smart number. This is Jhun.', CAST(N'2023-04-22T03:18:52.380' AS DateTime), N'Outbox', N'0', CAST(N'2023-04-22T03:18:52.000' AS DateTime), CAST(N'2023-04-22T03:18:52.380' AS DateTime), NULL, NULL, NULL, NULL)
INSERT [dbo].[USR_SmsMessages] ([Id], [UserId], [AlertId], [Recipient], [Sms], [UtcToBeSentOn], [Status], [MessageSid], [utcDateTimeSent], [DateCreated], [utcUpdateDate], [LastTrySending], [LastTrySendingErr], [customerNo]) VALUES (3, N'CCCI', 0, N'+18083419365', N'Hello my Smart number. This is Jhun.', CAST(N'2023-04-22T03:20:32.873' AS DateTime), N'Outbox', N'0', CAST(N'2023-04-22T03:20:32.000' AS DateTime), CAST(N'2023-04-22T03:20:32.873' AS DateTime), NULL, NULL, NULL, NULL)
INSERT [dbo].[USR_SmsMessages] ([Id], [UserId], [AlertId], [Recipient], [Sms], [UtcToBeSentOn], [Status], [MessageSid], [utcDateTimeSent], [DateCreated], [utcUpdateDate], [LastTrySending], [LastTrySendingErr], [customerNo]) VALUES (4, N'BILLY', 0, N'+1+639065165', N'test message from Scheduler', CAST(N'2023-05-06T03:08:00.907' AS DateTime), N'Outbox', N'0', CAST(N'2023-05-06T03:08:00.000' AS DateTime), CAST(N'2023-05-06T03:08:00.907' AS DateTime), NULL, NULL, NULL, NULL)
INSERT [dbo].[USR_SmsMessages] ([Id], [UserId], [AlertId], [Recipient], [Sms], [UtcToBeSentOn], [Status], [MessageSid], [utcDateTimeSent], [DateCreated], [utcUpdateDate], [LastTrySending], [LastTrySendingErr], [customerNo]) VALUES (5, N'BILLY', 0, N'+63906516512', N'test', CAST(N'2023-05-06T04:06:26.247' AS DateTime), N'Sent', N'SM4ae06cea263b1e060f', CAST(N'2023-05-06T04:06:26.000' AS DateTime), CAST(N'2023-05-06T04:06:26.247' AS DateTime), NULL, NULL, NULL, NULL)
INSERT [dbo].[USR_SmsMessages] ([Id], [UserId], [AlertId], [Recipient], [Sms], [UtcToBeSentOn], [Status], [MessageSid], [utcDateTimeSent], [DateCreated], [utcUpdateDate], [LastTrySending], [LastTrySendingErr], [customerNo]) VALUES (6, N'BILLY', 0, N'808-341-9365', N'Hi... this is Jhun. This is a test message using free account.', CAST(N'2023-05-06T04:55:10.050' AS DateTime), N'Sent', N'SMe5c473d5cd80ebd720', CAST(N'2023-05-06T04:55:10.000' AS DateTime), CAST(N'2023-05-06T04:55:10.050' AS DateTime), NULL, NULL, NULL, N'9000205')
INSERT [dbo].[USR_SmsMessages] ([Id], [UserId], [AlertId], [Recipient], [Sms], [UtcToBeSentOn], [Status], [MessageSid], [utcDateTimeSent], [DateCreated], [utcUpdateDate], [LastTrySending], [LastTrySendingErr], [customerNo]) VALUES (7, N'BILLY', 0, N'808-341-9365', N'Hi... this is Jhun. This is a test message using free account.', CAST(N'2023-05-06T04:55:47.613' AS DateTime), N'Sent', N'SMf3559e5c53e0653baf', CAST(N'2023-05-06T04:55:47.000' AS DateTime), CAST(N'2023-05-06T04:55:47.613' AS DateTime), NULL, NULL, NULL, N'9000205')
INSERT [dbo].[USR_SmsMessages] ([Id], [UserId], [AlertId], [Recipient], [Sms], [UtcToBeSentOn], [Status], [MessageSid], [utcDateTimeSent], [DateCreated], [utcUpdateDate], [LastTrySending], [LastTrySendingErr], [customerNo]) VALUES (8, N'BILLY', 0, N'808-341-9365', N'Hi this is Jhun.
A test message only.', CAST(N'2023-05-06T04:59:55.030' AS DateTime), N'Sent', N'SMa678b93d793259966d', CAST(N'2023-05-06T04:59:55.000' AS DateTime), CAST(N'2023-05-06T04:59:55.030' AS DateTime), NULL, NULL, NULL, N'9000205')
INSERT [dbo].[USR_SmsMessages] ([Id], [UserId], [AlertId], [Recipient], [Sms], [UtcToBeSentOn], [Status], [MessageSid], [utcDateTimeSent], [DateCreated], [utcUpdateDate], [LastTrySending], [LastTrySendingErr], [customerNo]) VALUES (10, N'BILLY', 0, N'808-341-9365', N'Hi sir...', CAST(N'2023-05-09T02:03:17.180' AS DateTime), N'Sent', N'SM745254b743354bcff1', CAST(N'2023-05-09T02:03:17.000' AS DateTime), CAST(N'2023-05-09T02:03:17.180' AS DateTime), NULL, NULL, NULL, N'9000205')
INSERT [dbo].[USR_SmsMessages] ([Id], [UserId], [AlertId], [Recipient], [Sms], [UtcToBeSentOn], [Status], [MessageSid], [utcDateTimeSent], [DateCreated], [utcUpdateDate], [LastTrySending], [LastTrySendingErr], [customerNo]) VALUES (11, N'BILLY', 0, N'808-341-9365', N'Sir last nalang for today. Kindly reply daw sir. :)', CAST(N'2023-05-09T03:07:21.063' AS DateTime), N'Sent', N'SM2c107c97ca3eed1998', CAST(N'2023-05-09T03:07:21.000' AS DateTime), CAST(N'2023-05-09T03:07:21.063' AS DateTime), NULL, NULL, NULL, N'9000205')
INSERT [dbo].[USR_SmsMessages] ([Id], [UserId], [AlertId], [Recipient], [Sms], [UtcToBeSentOn], [Status], [MessageSid], [utcDateTimeSent], [DateCreated], [utcUpdateDate], [LastTrySending], [LastTrySendingErr], [customerNo]) VALUES (12, N'BILLY', 0, N'808-341-9365', N'Another test message.', CAST(N'2023-05-10T20:07:13.207' AS DateTime), N'Sent', N'SMee6fb39699d48cb2dd', CAST(N'2023-05-10T20:07:13.000' AS DateTime), CAST(N'2023-05-10T20:07:13.207' AS DateTime), NULL, NULL, NULL, N'9000205')
INSERT [dbo].[USR_SmsMessages] ([Id], [UserId], [AlertId], [Recipient], [Sms], [UtcToBeSentOn], [Status], [MessageSid], [utcDateTimeSent], [DateCreated], [utcUpdateDate], [LastTrySending], [LastTrySendingErr], [customerNo]) VALUES (9, N'BILLY', 0, N'808-341-9365', N'Hi sir, did receive this?', CAST(N'2023-05-08T22:07:45.417' AS DateTime), N'Sent', N'SM1c3974fbd284c3a918', CAST(N'2023-05-08T22:07:45.000' AS DateTime), CAST(N'2023-05-08T22:07:45.417' AS DateTime), NULL, NULL, NULL, N'9000205')
INSERT [dbo].[USR_SmsMessages] ([Id], [UserId], [AlertId], [Recipient], [Sms], [UtcToBeSentOn], [Status], [MessageSid], [utcDateTimeSent], [DateCreated], [utcUpdateDate], [LastTrySending], [LastTrySendingErr], [customerNo]) VALUES (13, N'BILLY', 0, N'808-341-9365', N'Sir, probably last test message for today. Testing the webhook.', CAST(N'2023-05-10T21:24:05.170' AS DateTime), N'Sent', N'SM0463544571d8e763f9', CAST(N'2023-05-10T21:24:05.000' AS DateTime), CAST(N'2023-05-10T21:24:05.170' AS DateTime), NULL, NULL, NULL, N'9000205')
SET IDENTITY_INSERT [dbo].[USR_SmsMessages] OFF
GO
INSERT [dbo].[USR_twilioInbox] ([toCountry], [toState], [smsMessageSid], [numMedia], [toCity], [fromZip], [smsSid], [fromState], [smsStatus], [fromCity], [body], [fromCountry], [to], [toZip], [numSegments], [accountSid], [from], [apiVersion], [dateTimeReceived], [processed]) VALUES (N'US', N'NY', N'SM21942ce32b42604f428ab9823f44ba34', N'0', N'LE ROY', N'96826', N'SM21942ce32b42604f428ab9823f44ba34', N'HI', N'received', N'MILILANI', N'Got it', N'US', N'+15855801228', N'14482', N'1', N'AC913e0edf383e17e02989f4464255edf3', N'+18083419365', N'2010-04-01', CAST(N'2023-05-13T02:00:00.000' AS DateTime), N'Y')
INSERT [dbo].[USR_twilioInbox] ([toCountry], [toState], [smsMessageSid], [numMedia], [toCity], [fromZip], [smsSid], [fromState], [smsStatus], [fromCity], [body], [fromCountry], [to], [toZip], [numSegments], [accountSid], [from], [apiVersion], [dateTimeReceived], [processed]) VALUES (N'US', N'NY', N'SM71ce31d2c287101c7ccaf4e1d5755613', N'0', N'LE ROY', N'96826', N'SM71ce31d2c287101c7ccaf4e1d5755613', N'HI', N'received', N'MILILANI', N'No problem. Got it', N'US', N'+15855801228', N'14482', N'1', N'AC913e0edf383e17e02989f4464255edf3', N'+18083419365', N'2010-04-01', CAST(N'2023-05-13T02:05:00.000' AS DateTime), N'Y')
GO
ALTER TABLE [dbo].[USR_schedules] ADD  CONSTRAINT [DF_USR_SCHEDULER2_createdDate]  DEFAULT (getutcdate()) FOR [utcCreatedDate]
GO
ALTER TABLE [dbo].[USR_sessions_schedules] ADD  CONSTRAINT [DF_USR_sessions_schedules_createdDate]  DEFAULT (getutcdate()) FOR [createdUtcDate]
GO
ALTER TABLE [dbo].[USR_SmsInbox] ADD  CONSTRAINT [DF_USR_SmsInbox_dateCreated]  DEFAULT (getutcdate()) FOR [processedUtcDateTime]
GO
ALTER TABLE [dbo].[USR_SmsMessages] ADD  CONSTRAINT [defaultDateTime]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[USR_twilioInbox] ADD  CONSTRAINT [DF_USR_twilioInbox_dateTimeReceived]  DEFAULT (getutcdate()) FOR [dateTimeReceived]
GO
ALTER TABLE [dbo].[USR_twilioInbox] ADD  CONSTRAINT [DF_USR_twilioInbox_processed]  DEFAULT ('N') FOR [processed]
GO
/****** Object:  StoredProcedure [dbo].[USER_CheckSessionValidity]    Script Date: 5/13/2023 12:28:07 PM ******/
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
/****** Object:  StoredProcedure [dbo].[USER_CustomersGet]    Script Date: 5/13/2023 12:28:07 PM ******/
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
/****** Object:  StoredProcedure [dbo].[USER_extendSession]    Script Date: 5/13/2023 12:28:07 PM ******/
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
/****** Object:  StoredProcedure [dbo].[USER_getLocationBySessionId]    Script Date: 5/13/2023 12:28:07 PM ******/
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
/****** Object:  StoredProcedure [dbo].[USER_InvoiceGet]    Script Date: 5/13/2023 12:28:07 PM ******/
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
/****** Object:  StoredProcedure [dbo].[USER_InvoiceNotesGet]    Script Date: 5/13/2023 12:28:07 PM ******/
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
/****** Object:  StoredProcedure [dbo].[USER_InvoicesListGet]    Script Date: 5/13/2023 12:28:07 PM ******/
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
/****** Object:  StoredProcedure [dbo].[USER_ProcessTwilioSms]    Script Date: 5/13/2023 12:28:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_ProcessTwilioSms]
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
		select top 1 @customerNo = CUST_NO from AR_CUST where PHONE_1 = @from;

		if (ISNULL(@customerNo, 'NULL') = 'NULL')
		begin	-- if NULL then just iterate
			fetch next from curTwilioInbox into @toCountry,@toState,@smsMessageSid,@numMedia,@toCity,@fromZip,@smsSid,@fromState,@smsStatus,@fromCity,@body,@fromCountry,@to,@toZip
		  ,@numSegments,@accountSid,@from,@apiVersion
		  ,@dateTimeReceived;
		end

		if NOT exists(select messageSid from USR_SmsInbox where messageSid = @smsMessageSid)
		begin	-- @from = @sender; @body = [message]
			INSERT INTO dbo.USR_SmsInbox([from],[message],[messageSid],[twiliodateTimeReceived], [processedUtcDateTime], [customerNo])
								  VALUES(@from, @body,  @smsMessageSid, @dateTimeReceived,        GETUTCDATE(),          @customerNo)
		end

		update USR_twilioInbox set processed = 'Y' where smsMessageSid = @smsMessageSid;	

		fetch next from curTwilioInbox into @toCountry,@toState,@smsMessageSid,@numMedia,@toCity,@fromZip,@smsSid,@fromState,@smsStatus,@fromCity,@body,@fromCountry,@to,@toZip
		  ,@numSegments,@accountSid,@from,@apiVersion
		  ,@dateTimeReceived;
	end
	close curTwilioInbox;
	deallocate curTwilioInbox;	
END
GO
/****** Object:  StoredProcedure [dbo].[USER_scheduleAdd]    Script Date: 5/13/2023 12:28:07 PM ******/
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
/****** Object:  StoredProcedure [dbo].[USER_schedulesGet]    Script Date: 5/13/2023 12:28:07 PM ******/
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
/****** Object:  StoredProcedure [dbo].[USER_SessionCreate]    Script Date: 5/13/2023 12:28:07 PM ******/
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
/****** Object:  StoredProcedure [dbo].[USER_SmsAdd]    Script Date: 5/13/2023 12:28:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_SmsAdd]
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
/****** Object:  StoredProcedure [dbo].[USER_SmsGet]    Script Date: 5/13/2023 12:28:07 PM ******/
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
/****** Object:  StoredProcedure [dbo].[USER_SmsGetByCustomer]    Script Date: 5/13/2023 12:28:07 PM ******/
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

	/* select Id, customerNo, UserId [name], Recipient,  Sms,       [Status],   MessageSid,  utcDateTimeSent,    'sentItems' [fromTable] from USR_SmsMessages -- USR_SmsMessages = sent items.
	where customerNo = @custNo
	union all
	select id, customerNo, '' [name],     '',      [message],   'Received', messageSid, twilioDateTimeReceived,'inbox' [fromTable] from USR_SmsInbox	-- USR_SmsInbox = processed Twilio incoming SMS.
	where customerNo = @custNo */

	select * from (
			select Id, customerNo, UserId [name], Recipient,  Sms,       [Status],   MessageSid,  utcDateTimeSent [utcDdateAndTime],    'sentItems' [fromTable] from USR_SmsMessages -- USR_SmsMessages = sent items.
			where customerNo = @custNo
			union all
			select id, customerNo, '' [name],     '',      [message],   'Received', messageSid, twilioDateTimeReceived,'inbox' [fromTable] from USR_SmsInbox	-- USR_SmsInbox = processed Twilio incoming SMS.
			where customerNo = @custNo
		) AllSmsMessages
	order by utcDdateAndTime
END
GO
/****** Object:  StoredProcedure [dbo].[USER_TechniciansGet]    Script Date: 5/13/2023 12:28:07 PM ******/
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
/****** Object:  StoredProcedure [dbo].[USER_TwilioSmsAdd]    Script Date: 5/13/2023 12:28:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USER_TwilioSmsAdd]
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

	exec dbo.USER_ProcessTwilioSms;
END
GO
/****** Object:  StoredProcedure [dbo].[USER_WorkOrdersGet]    Script Date: 5/13/2023 12:28:07 PM ******/
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
