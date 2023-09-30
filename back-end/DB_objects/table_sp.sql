USE [TOTAL_OFFROAD_09152023]
GO
/****** Object:  Table [dbo].[USR_schedules]    Script Date: 9/16/2023 8:27:18 AM ******/
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
/****** Object:  Table [dbo].[USR_schedules_technicians]    Script Date: 9/16/2023 8:27:18 AM ******/
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
/****** Object:  Table [dbo].[USR_sessions_schedules]    Script Date: 9/16/2023 8:27:18 AM ******/
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
/****** Object:  Table [dbo].[USR_SmsInbox]    Script Date: 9/16/2023 8:27:18 AM ******/
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
	[processedUtcDateTime] [datetime] NOT NULL,
	[read] [char](1) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USR_SmsMessages]    Script Date: 9/16/2023 8:27:18 AM ******/
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
/****** Object:  Table [dbo].[USR_twilioInbox]    Script Date: 9/16/2023 8:27:18 AM ******/
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
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Populate with utc date.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'USR_sessions_schedules', @level2type=N'COLUMN',@level2name=N'expiryUtcDate'
GO
