CREATE TABLE [Core].[Address] (
    [Id]                  INT              NOT NULL IDENTITY(1,1),
    [Guid]                UNIQUEIDENTIFIER NOT NULL,
    [AddressLine1]        NVARCHAR (MAX)   NULL,
    [AddressLine2]        NVARCHAR (MAX)   NULL,
    [City]                NVARCHAR (MAX)   NULL,
    [State]               NVARCHAR (MAX)   NULL,
    [PostalCode]          NVARCHAR (MAX)   NULL,
    [CountryCode]         NVARCHAR (3)     NULL,
    [EmployeeGuid]        UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [AddressPK] PRIMARY KEY NONCLUSTERED ([Id] ASC)
);
GO

CREATE UNIQUE CLUSTERED INDEX [AddressU1]
    ON [Core].[Address]([Guid])
GO


CREATE UNIQUE CLUSTERED INDEX [AddressU2]
    ON [Core].[Address]([EmployeeGuid])
GO