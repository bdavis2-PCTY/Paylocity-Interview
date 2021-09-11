CREATE TABLE [Core].[Address] (
    [Id]                  INT              NOT NULL IDENTITY(1,1),
    [Guid]                UNIQUEIDENTIFIER NOT NULL,
    [AddressLine1]        NVARCHAR (MAX)   NOT NULL,
    [AddressLine2]        NVARCHAR (MAX)   NOT NULL,
    [City]                NVARCHAR (MAX)   NOT NULL,
    [State]               NVARCHAR (MAX)   NOT NULL,
    [PostalCode]          NVARCHAR (MAX)   NOT NULL,
    [CountryCode]         NVARCHAR (3)     NOT NULL,
    [EmployeeGuid]        UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [AddressPK] PRIMARY KEY NONCLUSTERED ([Id] ASC)
);
GO

CREATE UNIQUE NONCLUSTERED INDEX [AddressU1]
    ON [Core].[Address]([Guid])
GO


CREATE UNIQUE NONCLUSTERED INDEX [AddressU2]
    ON [Core].[Address]([EmployeeGuid])
GO