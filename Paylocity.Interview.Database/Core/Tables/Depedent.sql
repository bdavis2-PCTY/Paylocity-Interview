CREATE TABLE [Core].[Dependent] (
    [Id]                  INT              NOT NULL IDENTITY(1,1),
    [Guid]                UNIQUEIDENTIFIER NOT NULL,
    [FirstName]           NVARCHAR (MAX)   NOT NULL,
    [LastName]            NVARCHAR (MAX)   NOT NULL,
    [CreatedDateTime]     DATETIME         NOT NULL,
    CONSTRAINT [DependentPK] PRIMARY KEY NONCLUSTERED ([Id] ASC)
);
GO

CREATE UNIQUE NONCLUSTERED INDEX [EmployeeU1]
    ON [Core].[Dependent]([Guid])
GO