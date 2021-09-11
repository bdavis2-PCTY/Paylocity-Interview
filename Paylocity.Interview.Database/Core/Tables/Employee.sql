﻿CREATE TABLE [Core].[Employee] (
    [Id]                  INT              NOT NULL IDENTITY(1,1),
    [Guid]                UNIQUEIDENTIFIER NOT NULL,
    [FirstName]           NVARCHAR (MAX)   NOT NULL,
    [LastName]            NVARCHAR (MAX)   NOT NULL,
    [PrimaryAddressGuid]  UNIQUEIDENTIFIER NOT NULL,
    [CreatedDateTime]     DATETIME         NOT NULL,
    [StartDate]           DATE             NOT NULL,
    [EndDate]             DATE             NULL,
    CONSTRAINT [EmployeePK] PRIMARY KEY NONCLUSTERED ([Id] ASC)
);
GO

CREATE UNIQUE CLUSTERED INDEX [EmployeeU1]
    ON [Core].[Employee]([Guid])
GO