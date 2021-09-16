CREATE TABLE [Core].[Employee] (
    [Id]                  INT              NOT NULL IDENTITY(1,1),
    [Guid]                UNIQUEIDENTIFIER NOT NULL,
    [FirstName]           NVARCHAR (MAX)   NOT NULL,
    [LastName]            NVARCHAR (MAX)   NOT NULL,
    [Email]               NVARCHAR (MAX)   NOT NULL,
    [PhoneNumber]         NVARCHAR (15)    NOT NULL,
    [PrimaryAddressGuid]  UNIQUEIDENTIFIER NOT NULL,
    [CreatedDateTime]     DATETIME         NOT NULL,
    [IsActive]            BIT              NOT NULL,
    CONSTRAINT [EmployeePK] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

CREATE UNIQUE NONCLUSTERED INDEX [EmployeeU1]
    ON [Core].[Employee]([Guid])
GO

CREATE NONCLUSTERED INDEX [EmployeeU2]
    ON [Core].[Employee]([IsActive])
GO