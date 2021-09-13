CREATE TABLE [Core].[Address] (
    [Id]                  INT              NOT NULL IDENTITY(1,1),
    [Guid]                UNIQUEIDENTIFIER NOT NULL,
    [AddressLine1]        NVARCHAR (MAX)   NOT NULL,
    [AddressLine2]        NVARCHAR (MAX)   NOT NULL,
    [City]                NVARCHAR (250)   NOT NULL,
    [State]               NVARCHAR (250)   NOT NULL,
    [PostalCode]          NVARCHAR (250)   NOT NULL,
    [CountryCode]         NVARCHAR (2)     NOT NULL,
    [EmployeeGuid]        UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [AddressPK] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

CREATE UNIQUE NONCLUSTERED INDEX [AddressU1]
    ON [Core].[Address]([Guid])
GO


CREATE NONCLUSTERED INDEX [AddressU2]
    ON [Core].[Address]([EmployeeGuid])
GO