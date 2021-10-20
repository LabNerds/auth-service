import { getConnectionOptions, getConnection } from 'typeorm';

export const getDbConnectionOptions = async (
  connectionName = 'default',
  databaseInfo = {},
) => {
  const options = await getConnectionOptions(
    process.env.NODE_ENV || 'development',
  );
  return {
    ...options,
    ...databaseInfo,
    name: connectionName,
  };
};

export const getDbConnection = async (connectionName = 'default') => {
  return getConnection(connectionName);
};

export const runDbMigrations = async (connectionName = 'default') => {
  const conn = await getDbConnection(connectionName);
  await conn.runMigrations();
};

export const closeDbConnection = async (connectionName = 'default') => {
  const conn = await getDbConnection(connectionName);
  if (conn.isConnected) {
    await conn.close();
  }
};

export const clearDb = async (connectionName = 'default') => {
  const conn = await getDbConnection(connectionName);
  const entities = conn.entityMetadatas;

  for (const entity of entities) {
    const repository = conn.getRepository(entity.name);
    await repository.query(`DELETE FROM ${entity.tableName};`);
  }
};
