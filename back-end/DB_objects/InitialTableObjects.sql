USE [TestGolf_1]
GO
/****** Object:  Table [dbo].[USR_access_tokens]    Script Date: 2/15/2023 3:54:01 AM ******/
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
/****** Object:  Table [dbo].[USR_locations]    Script Date: 2/15/2023 3:54:01 AM ******/
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
/****** Object:  Table [dbo].[USR_members]    Script Date: 2/15/2023 3:54:01 AM ******/
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
/****** Object:  Table [dbo].[USR_oauth_clients]    Script Date: 2/15/2023 3:54:01 AM ******/
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
/****** Object:  Table [dbo].[USR_schedules]    Script Date: 2/15/2023 3:54:01 AM ******/
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
/****** Object:  Table [dbo].[USR_schedules_technicians]    Script Date: 2/15/2023 3:54:01 AM ******/
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
/****** Object:  Table [dbo].[USR_sessions]    Script Date: 2/15/2023 3:54:01 AM ******/
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
/****** Object:  Table [dbo].[USR_users]    Script Date: 2/15/2023 3:54:01 AM ******/
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
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'c35ba1cc8371fef04f00e4a5d4fd7673737c1f4f', CAST(N'2022-11-22T22:19:54.447' AS DateTime), N'cbae9a607e40716b12321746f22e753ec95aa449', CAST(N'2022-12-06T21:19:54.447' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'934dbe6141a6f543ad64bb9a49c8d9c055cf6c68', CAST(N'2022-11-23T13:41:48.763' AS DateTime), N'109dc06b48cdea32bfb92ee4e70109b6d6c60d92', CAST(N'2022-12-07T12:41:48.763' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'2a8bccddb73aba57b6f4a96d81804d025f87a8d7', CAST(N'2022-11-23T16:06:37.150' AS DateTime), N'034b5bd70021e612d42f70727a1c4d7a7cdfb942', CAST(N'2022-12-07T15:06:37.150' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'ff75f3780bf871e9d2b025042dcc89b8162b2238', CAST(N'2022-11-23T16:09:45.317' AS DateTime), N'594e1899622849aecde868d29d790f2db428d4df', CAST(N'2022-12-07T15:09:45.317' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'a3bafec1c67ae42c9aedb56f634aa76b21aa29da', CAST(N'2022-11-23T16:10:56.303' AS DateTime), N'bc7e3be3c3d1eda778b4765fbe0ed9e0f0c48e3d', CAST(N'2022-12-07T15:10:56.303' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'403d0732fec6363983abc096327ef41173c4dd76', CAST(N'2022-11-23T16:13:16.207' AS DateTime), N'73db4f9259fd7274e8fa36b91f6c0a01a7db4549', CAST(N'2022-12-07T15:13:16.207' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'91eea1c883a3796bd0ab60a9dc8c5607e7287c3c', CAST(N'2022-11-23T19:58:39.717' AS DateTime), N'5f9bb7e7be69b689269257e24f25d2d4786243cc', CAST(N'2022-12-07T18:58:39.717' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'c42f663ffe4f4c469517114a0dfb477616426762', CAST(N'2022-11-23T20:00:48.487' AS DateTime), N'26a60ec387fd2c97182e56adcd299511255c4b39', CAST(N'2022-12-07T19:00:48.487' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'0e23c10adf4e611acbc5719101cca8f575e52f00', CAST(N'2022-11-23T21:06:59.070' AS DateTime), N'8c720416b635c4b177ee6cd43d8767f63dabea44', CAST(N'2022-12-07T20:06:59.070' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'b609f6f848ae83e270ca86f5c8272c830f24d850', CAST(N'2022-11-23T21:07:58.693' AS DateTime), N'24f8436feaadca7b1656044684b58f0592ac7824', CAST(N'2022-12-07T20:07:58.693' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'3e599969aeafe3f6c877d7bcf1f262c678cc27e3', CAST(N'2022-11-23T21:11:58.967' AS DateTime), N'fd582529be007cb0230a494870bd23d57813227b', CAST(N'2022-12-07T20:11:58.967' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'15b4e7187995a274d1d99156af57ac6456f2f593', CAST(N'2022-11-23T21:23:36.813' AS DateTime), N'ff45b36f0566857cbc7324d2ec09efb887abaedb', CAST(N'2022-12-07T20:23:36.813' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'949290fdf86d154a3282cd8cc15a9abde90cf32e', CAST(N'2022-11-24T01:20:19.427' AS DateTime), N'7b223e503c9deb36793fcecd5cecd7cec8d814b4', CAST(N'2022-12-08T00:20:19.430' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'a90a7b723b5a83a3681f72aa5c23d820bb460d43', CAST(N'2022-11-24T01:20:55.473' AS DateTime), N'fb39215baeda29d2178a755057447da4a61fbe0e', CAST(N'2022-12-08T00:20:55.473' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'3eb2ced6c2b0875c2741663e1276b174a89124b1', CAST(N'2022-11-24T01:21:36.417' AS DateTime), N'f5adeebd3cddb2abb5cc399306374024a37b7d3c', CAST(N'2022-12-08T00:21:36.417' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'1a4ac1de6746606302a576a3d1516161c38b9567', CAST(N'2022-11-24T01:22:48.143' AS DateTime), N'cd95aba03a033adf19b1b27f38e141c21d53e3c0', CAST(N'2022-12-08T00:22:48.143' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'ba00e0d05ab75304482ef490d7504d36820b9c67', CAST(N'2022-11-24T03:31:10.583' AS DateTime), N'2b20939aaf6006263bbcd2072e688b8428525453', CAST(N'2022-12-08T02:31:10.583' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'7b063c12173a9f75d0c5d4680146dd58de8cffbb', CAST(N'2022-11-24T03:31:49.307' AS DateTime), N'f03557ee798d7fd335440d929e25ca0e42c48c7d', CAST(N'2022-12-08T02:31:49.307' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'5542024d26dd49d5c5dfc55e7b5fe08a367feb98', CAST(N'2022-11-24T03:33:54.077' AS DateTime), N'368a5c28bee74e7e042ceeaf7839b7dce6638f65', CAST(N'2022-12-08T02:33:54.077' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'6f64ee4d565839198a288e604c266d096a56913f', CAST(N'2022-11-24T03:34:17.743' AS DateTime), N'0e367a044a2d8c3e098ab03216029f86af9f7fac', CAST(N'2022-12-08T02:34:17.743' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'761f7575713afc55ce3c0819b11e76d3d2eb92d0', CAST(N'2022-11-24T03:35:52.300' AS DateTime), N'13798ea1c2e4c088d302ecb8aee0e898cbdd92ed', CAST(N'2022-12-08T02:35:52.300' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'7eb9d63afcec3436ff652b897892ba642ffe1fce', CAST(N'2022-11-24T03:36:19.020' AS DateTime), N'7be871c18ddbdb35ab3996e5b80584b2e90eab5f', CAST(N'2022-12-08T02:36:19.020' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'c1971167c05201220139ff3d44e34477aa8bcb70', CAST(N'2022-11-24T03:37:00.060' AS DateTime), N'882174d6d07c7c8e39503bf81ce576999bbef061', CAST(N'2022-12-08T02:37:00.060' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'9d91614635e12a8071a36ce17c8bcb5b3a62587e', CAST(N'2022-11-24T03:42:33.300' AS DateTime), N'89ea4852fdf164bc881648843957c70d119168ed', CAST(N'2022-12-08T02:42:33.300' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'3c455cc69df5c7033f5c81ab5155f37635638d95', CAST(N'2022-11-24T03:45:07.467' AS DateTime), N'be61179082c34ec385e822eda7d2e61f2e576f45', CAST(N'2022-12-08T02:45:07.467' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'5065a3a385ac29cad609926677f98de0d228132d', CAST(N'2022-11-24T04:07:18.440' AS DateTime), N'99cd0e83bfeadef89dc3af603f76663efaba5553', CAST(N'2022-12-08T03:07:18.440' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'146f2855ed9fde89fea7fb4399c2ac70dc57c1a0', CAST(N'2022-11-24T04:23:22.707' AS DateTime), N'eae3000623a873599005094211c2d62a872417e6', CAST(N'2022-12-08T03:23:22.707' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'a47ad4e0fda547acba563dc80ebdf6867469e07f', CAST(N'2022-11-24T04:23:55.477' AS DateTime), N'dcc799cec26a9a3c815fefabf8b808b50f8baccf', CAST(N'2022-12-08T03:23:55.477' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'6ced0d360129abdb027155159914e334121c7e34', CAST(N'2022-11-24T04:27:58.307' AS DateTime), N'38c0ac0de323f3e6115809506716ae148f51cbeb', CAST(N'2022-12-08T03:27:58.307' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'25e3a9b0b520b5ef185c739e268cb744edf4365a', CAST(N'2022-11-24T04:28:22.813' AS DateTime), N'44573cd97d8d708926c7da40fa55d6f51fbb26db', CAST(N'2022-12-08T03:28:22.813' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'1b07f5e3414461263940cf53426843a31d4832f3', CAST(N'2022-11-24T04:30:43.870' AS DateTime), N'df482f4cf8e52c5267a7a5548006c469394b4a64', CAST(N'2022-12-08T03:30:43.870' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'c0ad1ad36199196a9739891e20efe01d367d0e5d', CAST(N'2022-11-24T04:31:20.127' AS DateTime), N'83cd490a7ac5305cd55b8909e601a1b5946a43b4', CAST(N'2022-12-08T03:31:20.127' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'8cf64678c5675a76fca5d29d1639f6b5ef958141', CAST(N'2022-11-24T04:33:46.657' AS DateTime), N'aaf79161148c8e4354821c91aa962b89beece7b3', CAST(N'2022-12-08T03:33:46.657' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'f98ec4136905ad3f9f816357c216c7657ddd412e', CAST(N'2022-11-24T04:33:57.160' AS DateTime), N'ab60cfbf09ee1adb0d90eaf5a643591be44ac144', CAST(N'2022-12-08T03:33:57.160' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'369f8a6605cab4ff86726dd23e6eb0eec5af49ed', CAST(N'2022-11-24T04:34:58.007' AS DateTime), N'51b664d2a4f126f1007afdcd172f830f7db100e4', CAST(N'2022-12-08T03:34:58.007' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'0b8b39a2acd5d9bbf228c90cf84c878ac48644ba', CAST(N'2022-11-24T04:36:08.757' AS DateTime), N'd1a142ca76ba72723df402c5d4be30a752ccf91e', CAST(N'2022-12-08T03:36:08.757' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'c0c424c72da2073e9ddbb148fb4fc76194cc6552', CAST(N'2022-11-24T04:36:43.703' AS DateTime), N'28f569c2e12f3cddf4f27019ed711242aa982923', CAST(N'2022-12-08T03:36:43.703' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'a4608055c19783ac0b9f912bf5dd9ecccbada153', CAST(N'2022-11-24T04:37:28.450' AS DateTime), N'f5e4f55ec62607f663e185669d8f2bcb5c9d652f', CAST(N'2022-12-08T03:37:28.450' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'c2cdf195cdf1427a7bd04daaa304fc20b1dbfcab', CAST(N'2022-11-24T04:38:14.983' AS DateTime), N'90a6aaaaa28709bcc1274aa2651d92993d932a0b', CAST(N'2022-12-08T03:38:14.983' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'f0e78666d9a07342e0be79121ff40b55af582219', CAST(N'2022-11-24T05:25:04.420' AS DateTime), N'6d99c54f18eaf32d0ed8415872a1bddfacc7ef07', CAST(N'2022-12-08T04:25:04.420' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'786c4bbdcb01d4183b51339a5e918488dfae147f', CAST(N'2022-11-24T05:44:02.223' AS DateTime), N'7a2650413c39d4546173513c7c99b99cc12a7512', CAST(N'2022-12-08T04:44:02.223' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'74295fc1af56133fa95e33a0df4f66e0562e507a', CAST(N'2022-11-24T05:46:38.410' AS DateTime), N'79f1a374615484fb6b7c6e0db32ab732755c5ff8', CAST(N'2022-12-08T04:46:38.410' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'b0d46cd6d3dd959d6f9bc2c5d6524c278bb3d511', CAST(N'2022-11-24T05:49:38.367' AS DateTime), N'22317af26600de22e382f336d3512c04cbba1364', CAST(N'2022-12-08T04:49:38.367' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'cac390bc6197ba95e2613a3ff03c98103e20d4c3', CAST(N'2022-11-24T06:27:55.430' AS DateTime), N'96988954ca2e2afab77760d66c2c5b4e20725805', CAST(N'2022-12-08T05:27:55.430' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'01b6b3bc4409626982584349068c8bd0481231a1', CAST(N'2022-11-24T06:28:28.680' AS DateTime), N'057843ada69c7e92c33556d7fb33e37ee4b1d79c', CAST(N'2022-12-08T05:28:28.680' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'b98ecc6a244ef85aa76249f428dd12a373caff1c', CAST(N'2022-11-24T06:32:49.520' AS DateTime), N'1db80789943a32b0ff8ee86206916fac0b0e5dc2', CAST(N'2022-12-08T05:32:49.520' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'a9fb09c47592c5c53a34396c224deb25ce118e4c', CAST(N'2022-11-24T06:33:39.317' AS DateTime), N'2be86e0ce61d742749a2e9a6cfa092398a109762', CAST(N'2022-12-08T05:33:39.317' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'baf34b07ccaefb55f71166f7976889b4354db036', CAST(N'2022-11-24T06:36:40.347' AS DateTime), N'afdb1b586a9b356a529eda48aac26c0f51658dca', CAST(N'2022-12-08T05:36:40.347' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'34de65406a053dbf842cff63b6fb6200d97949cf', CAST(N'2022-11-24T06:38:17.253' AS DateTime), N'98b37bc60b094067157afc2fb90e30dd4782a14a', CAST(N'2022-12-08T05:38:17.253' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'90f80490dc6d23b6cdf93c21d6b809b0da6e42c9', CAST(N'2022-11-24T06:40:57.433' AS DateTime), N'54b71fb521d297cf8708f4671582eaae6f48a6db', CAST(N'2022-12-08T05:40:57.433' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'081d7f56a3171b7ae284e7d59bd5701fe4c7b7eb', CAST(N'2022-11-24T06:41:26.587' AS DateTime), N'8baf781d50ec2c9af95295ee5c5993c57bafefb6', CAST(N'2022-12-08T05:41:26.587' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'3ccf1602f1912528e3d711d57f265cc291c936bf', CAST(N'2022-11-24T06:48:11.380' AS DateTime), N'4207a5e6a849e3584c7d5f8284f4798f3c2a3fc4', CAST(N'2022-12-08T05:48:11.380' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'446098149d814d4f9c02ddb7697b47c4548e9bdf', CAST(N'2022-11-24T06:57:37.663' AS DateTime), N'181bd54b2f90c406b4cff3717d59889583510353', CAST(N'2022-12-08T05:57:37.663' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'69465d3607a8885392972d2a9d2c70ebf29771fa', CAST(N'2022-11-24T06:58:46.613' AS DateTime), N'2598102709dec88eab67dc7f1fb854e768ee5671', CAST(N'2022-12-08T05:58:46.613' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'5c5fd492c8eb0c5a84550e185a16671715dbe26b', CAST(N'2022-11-24T07:05:49.640' AS DateTime), N'fb6c50ed9456d07612671a915fff03c715d3dc91', CAST(N'2022-12-08T06:05:49.640' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'4bf96982887646272e0d2f9907a032c20fb8a6ac', CAST(N'2022-11-24T08:08:53.733' AS DateTime), N'5ee34bb011294d9067ea33e531479c591783a59b', CAST(N'2022-12-08T07:08:53.733' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'd987417197785216fac71804838466502afef7c7', CAST(N'2022-11-24T08:09:02.473' AS DateTime), N'65b84339d27cfe86e7d30c0104b984888db352b6', CAST(N'2022-12-08T07:09:02.473' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'b0e5c334c3b78e7f123dab681dc357b6981dde8c', CAST(N'2022-11-24T12:02:03.770' AS DateTime), N'7314df26b306c313edb2be21a6b9618d25b98a57', CAST(N'2022-12-08T11:02:03.770' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'b2a1cdde5aa188bbda50e121cc2b2fb5f93c9d27', CAST(N'2022-11-24T12:15:51.540' AS DateTime), N'4bee0143f3fcaf9104fd5d7da5be245e805811db', CAST(N'2022-12-08T11:15:51.540' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'68c442e072f3def5116e480374d40ef1d269d043', CAST(N'2022-11-30T02:26:28.423' AS DateTime), N'fe17bc3716352f2e3218f5776aaed455a4c5bd3d', CAST(N'2022-12-14T01:26:28.423' AS DateTime))
INSERT [dbo].[USR_access_tokens] ([client_id], [user_id], [access_token], [access_token_expires_on], [refresh_token], [refresh_token_expires_on]) VALUES (N'computant', 1, N'08cf96cc6a26ee8a46b3ee3ab68ce4b2b48cd60b', CAST(N'2022-11-30T22:56:43.633' AS DateTime), N'e85a1bc8bfa1bab788d6e07e2c9a6d8194c1b119', CAST(N'2022-12-14T21:56:43.633' AS DateTime))
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

INSERT [dbo].[USR_schedules] ([id], [subject], [utcDateFrom], [utcDateTo], [description], [utcCreatedDate], [utcUpdateDate], [invoiceNo], [allDay], [recurrenceRule]) VALUES (34, N'Email Lupicia (lzuru)', CAST(N'2023-02-19T16:00:00.000' AS DateTime), CAST(N'2023-02-19T16:00:00.000' AS DateTime), N'Check if everything''s okay.', CAST(N'2023-01-20T02:39:35.243' AS DateTime), CAST(N'2023-02-14T09:22:20.307' AS DateTime), N'100527', N'Y', NULL)
INSERT [dbo].[USR_schedules] ([id], [subject], [utcDateFrom], [utcDateTo], [description], [utcCreatedDate], [utcUpdateDate], [invoiceNo], [allDay], [recurrenceRule]) VALUES (76, N'Wheel alignment.', CAST(N'2023-01-26T01:00:00.000' AS DateTime), CAST(N'2023-01-26T01:30:00.000' AS DateTime), N'repair.', CAST(N'2023-01-23T22:39:49.217' AS DateTime), CAST(N'2023-01-24T23:20:04.920' AS DateTime), N'70030', NULL, NULL)
INSERT [dbo].[USR_schedules] ([id], [subject], [utcDateFrom], [utcDateTo], [description], [utcCreatedDate], [utcUpdateDate], [invoiceNo], [allDay], [recurrenceRule]) VALUES (93, N'Test allDay 33', CAST(N'2023-02-07T16:00:00.000' AS DateTime), CAST(N'2023-02-07T16:00:00.000' AS DateTime), N'test allDay. desc 33', CAST(N'2023-01-31T22:27:02.750' AS DateTime), CAST(N'2023-02-14T03:41:57.060' AS DateTime), N'70036', N'Y', NULL)
INSERT [dbo].[USR_schedules] ([id], [subject], [utcDateFrom], [utcDateTo], [description], [utcCreatedDate], [utcUpdateDate], [invoiceNo], [allDay], [recurrenceRule]) VALUES (86, N'Test Async 2', CAST(N'2023-02-28T00:30:00.000' AS DateTime), CAST(N'2023-02-28T01:00:00.000' AS DateTime), N'Test Async 2.', CAST(N'2023-01-27T19:43:54.350' AS DateTime), CAST(N'2023-02-01T05:21:20.957' AS DateTime), N'70047', N'N', NULL)
INSERT [dbo].[USR_schedules] ([id], [subject], [utcDateFrom], [utcDateTo], [description], [utcCreatedDate], [utcUpdateDate], [invoiceNo], [allDay], [recurrenceRule]) VALUES (85, N'Subject here.', CAST(N'2023-01-27T00:00:00.000' AS DateTime), CAST(N'2023-01-27T10:00:00.000' AS DateTime), N'Desc here.', CAST(N'2023-01-27T12:34:37.350' AS DateTime), NULL, N'70038', NULL, NULL)
INSERT [dbo].[USR_schedules] ([id], [subject], [utcDateFrom], [utcDateTo], [description], [utcCreatedDate], [utcUpdateDate], [invoiceNo], [allDay], [recurrenceRule]) VALUES (96, N'Recurrence test. 2234', CAST(N'2023-02-20T16:00:00.000' AS DateTime), CAST(N'2023-02-20T16:00:00.000' AS DateTime), N'Recurrence test. 2234', CAST(N'2023-02-20T16:00:05.000' AS DateTime), CAST(N'2023-02-01T06:07:42.270' AS DateTime), N'70039', N'Y', NULL)
INSERT [dbo].[USR_schedules] ([id], [subject], [utcDateFrom], [utcDateTo], [description], [utcCreatedDate], [utcUpdateDate], [invoiceNo], [allDay], [recurrenceRule]) VALUES (97, N'Meeting with Lupicia', CAST(N'2023-02-13T01:00:00.000' AS DateTime), CAST(N'2023-02-13T01:30:00.000' AS DateTime), N'Lupicia meeting for the reported error.', CAST(N'2023-02-10T23:25:13.993' AS DateTime), NULL, N'80010', NULL, NULL)
INSERT [dbo].[USR_schedules] ([id], [subject], [utcDateFrom], [utcDateTo], [description], [utcCreatedDate], [utcUpdateDate], [invoiceNo], [allDay], [recurrenceRule]) VALUES (98, N'Repair', CAST(N'2023-02-22T00:00:00.000' AS DateTime), CAST(N'2023-02-22T00:30:00.000' AS DateTime), N'Repair.', CAST(N'2023-02-11T00:54:16.613' AS DateTime), NULL, N'70046', NULL, NULL)
INSERT [dbo].[USR_schedules] ([id], [subject], [utcDateFrom], [utcDateTo], [description], [utcCreatedDate], [utcUpdateDate], [invoiceNo], [allDay], [recurrenceRule]) VALUES (99, N'Manager replace tire. 2 2', CAST(N'2023-02-14T00:00:00.000' AS DateTime), CAST(N'2023-02-14T00:30:00.000' AS DateTime), N'All 4 tires to replace. 2 2', CAST(N'2023-02-12T03:08:52.130' AS DateTime), CAST(N'2023-02-14T10:58:45.947' AS DateTime), N'70034', N'N', NULL)
INSERT [dbo].[USR_schedules] ([id], [subject], [utcDateFrom], [utcDateTo], [description], [utcCreatedDate], [utcUpdateDate], [invoiceNo], [allDay], [recurrenceRule]) VALUES (100, N'Valentines Day!!! 2', CAST(N'2023-02-14T00:00:00.000' AS DateTime), CAST(N'2023-02-14T00:30:00.000' AS DateTime), N'Valentines Day!!! 2', CAST(N'2023-02-14T09:08:36.610' AS DateTime), CAST(N'2023-02-14T09:18:13.530' AS DateTime), N'70047', N'N', NULL)
INSERT [dbo].[USR_schedules] ([id], [subject], [utcDateFrom], [utcDateTo], [description], [utcCreatedDate], [utcUpdateDate], [invoiceNo], [allDay], [recurrenceRule]) VALUES (101, N'sertert', CAST(N'2023-02-15T00:00:00.000' AS DateTime), CAST(N'2023-02-15T03:00:00.000' AS DateTime), N'ertertert', CAST(N'2023-02-14T09:18:23.397' AS DateTime), CAST(N'2023-02-14T09:24:40.137' AS DateTime), N'100528', N'N', NULL)
INSERT [dbo].[USR_schedules] ([id], [subject], [utcDateFrom], [utcDateTo], [description], [utcCreatedDate], [utcUpdateDate], [invoiceNo], [allDay], [recurrenceRule]) VALUES (70, N'Email Customer 1', CAST(N'2023-02-18T01:45:00.000' AS DateTime), CAST(N'2023-02-18T02:15:00.000' AS DateTime), N'Email Customer 1', CAST(N'2023-01-23T21:10:29.390' AS DateTime), CAST(N'2023-02-01T05:21:14.040' AS DateTime), N'100529', N'N', NULL)
INSERT [dbo].[USR_schedules] ([id], [subject], [utcDateFrom], [utcDateTo], [description], [utcCreatedDate], [utcUpdateDate], [invoiceNo], [allDay], [recurrenceRule]) VALUES (75, N'Paint', CAST(N'2023-01-24T01:00:00.000' AS DateTime), CAST(N'2023-01-24T01:30:00.000' AS DateTime), N'Service work.', CAST(N'2023-01-23T21:49:56.250' AS DateTime), CAST(N'2023-01-24T23:19:43.523' AS DateTime), N'100528', NULL, NULL)
SET IDENTITY_INSERT [dbo].[USR_schedules] OFF
GO
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (34, N'MGR2')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (34, N'POS1')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (70, N'Z')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (75, N'POS1')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (76, N'MGR2')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (85, N'MGR')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (86, N'Z')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (87, N'Z')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (88, N'Z')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (89, N'Z')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (90, N'Z')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (93, N'Z')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (96, N'Z')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (97, N'Z2')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (98, N'Z')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (98, N'Z2')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (99, N'MGR')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (100, N'MGR2')
INSERT [dbo].[USR_schedules_technicians] ([schedId], [technicianId]) VALUES (101, N'MGR2')
GO
INSERT [dbo].[USR_sessions] ([sid], [session], [expires]) VALUES (N'1CDqXndz5Ph4rGms4h8NXpCegRZ3gaIH', N'{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"accessToken":"36e9ff30e22a1ffc87414b56221f7c771c54d347"}', CAST(N'2022-11-23T21:18:21.527' AS DateTime))
INSERT [dbo].[USR_sessions] ([sid], [session], [expires]) VALUES (N'r8kWsWxGZ5HCSiDr5x108xFjQUCRysU-', N'{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}', CAST(N'2022-11-23T21:19:20.357' AS DateTime))
INSERT [dbo].[USR_sessions] ([sid], [session], [expires]) VALUES (N'tnQzpCcuH6shXc4YYnTYLAKDz7cRWZmT', N'{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"accessToken":"c35ba1cc8371fef04f00e4a5d4fd7673737c1f4f"}', CAST(N'2022-11-23T21:19:54.450' AS DateTime))
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
ALTER TABLE [dbo].[USR_users] ADD  CONSTRAINT [DF_USR_users1_createdDate]  DEFAULT (getdate()) FOR [createdDate]
GO
