import { getConnectionOptions, createConnection } from 'typeorm';

const bootstrap = async () => {
  const options = await getConnectionOptions('testdb');

  const conn = await createConnection(options);
  console.log('접속 성공: ', conn.isConnected);
};

export default bootstrap;
