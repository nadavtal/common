import mysql, { Pool, PoolOptions, RowDataPacket, ResultSetHeader } from 'mysql2/promise';

class MySQL {
  private pool: Pool;

  constructor(options: PoolOptions) {
    this.pool = mysql.createPool(options);
  }

  async query<T extends RowDataPacket[] | RowDataPacket[][] | ResultSetHeader>(
    sql: string,
    values?: any[]
  ): Promise<T> {
    const [results] = await this.pool.query<T>(sql, values);
    return results;
  }

  async execute<T extends RowDataPacket[] | RowDataPacket[][] | ResultSetHeader>(
    sql: string,
    values?: any[]
  ): Promise<T> {
    const [results] = await this.pool.execute<T>(sql, values);
    return results;
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}

const options: PoolOptions = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
};

let mySQLInstance: MySQL | null = null;

const getMySQLInstance = (): MySQL => {
  if (!mySQLInstance) {
    console.log('Initializing MySQL connection...');
    mySQLInstance = new MySQL(options);
  }
  return mySQLInstance;
};

export default getMySQLInstance;
export { MySQL };
