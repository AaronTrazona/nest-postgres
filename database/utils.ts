export const tableTrigger = (tableName: string, columnName: string) => `
    CREATE TRIGGER ${tableName}_${tableName}
    BEFORE UPDATE ON ${tableName}
    FOR EACH ROW
    EXECUTE PROCEDURE moddatetime (${columnName});
`