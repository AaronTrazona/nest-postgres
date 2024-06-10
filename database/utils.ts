export const tableTrigger = (tableName: string, columnName: string) => `
    DROP TRIGGER IF EXISTS ${tableName}_${columnName} ON ${tableName};
    CREATE TRIGGER ${tableName}_${columnName}
    BEFORE UPDATE ON ${tableName}
    FOR EACH ROW
    EXECUTE PROCEDURE moddatetime (${columnName});
`