CREATE TABLE [Core].[Dependent] (
    [Id]                  INT              NOT NULL IDENTITY(1,1),
    [Guid]                UNIQUEIDENTIFIER NOT NULL,
    [FirstName]           NVARCHAR (MAX)   NOT NULL,
    [LastName]            NVARCHAR (MAX)   NOT NULL,
    [EmployeeGuid]        UNIQUEIDENTIFIER NOT NULL,
    [CreatedDateTime]     DATETIME         NOT NULL,
    CONSTRAINT [DependentPK] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

CREATE NONCLUSTERED INDEX [DependentU1]
    ON [Core].[Dependent]([EmployeeGuid])
GO

CREATE UNIQUE NONCLUSTERED INDEX [DependentU2]
    ON [Core].[Dependent]([Guid])
GO