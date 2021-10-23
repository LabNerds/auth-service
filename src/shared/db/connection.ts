import 'dotenv/config';

import { getConnectionOptions, getConnection } from 'typeorm';

export const getDbConnectionOptions = async (connectionName = 'default') => {
  const options = await getConnectionOptions(
    process.env.NODE_ENV || 'development',
  );
  return {
    ...options,
    name: connectionName,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
  };
};

export const getDbConnection = async (connectionName = 'default') => {
  return getConnection(connectionName);
};

export const runDbMigrations = async (connectionName = 'default') => {
  const conn = await getDbConnection(connectionName);
  await conn.runMigrations();
};
