
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import getMySQLInstance from './mySqlDb';

export const mySqlQuery = <T extends RowDataPacket[] | RowDataPacket[][] | ResultSetHeader>(
  query: string,
  values?: any[]
): Promise<T> => {
  return getMySQLInstance().query<T>(query, values);
};
