import { join } from 'path';
export default {
  type: 'mysql',
  host: '47.95.192.172',
  port: 3306,
  username: 'SLD_dB',
  password: 'sldSLD123',
  database: 'SLD_dB',
  timezone: 'Z',
  // host: '106.13.56.184',
  // port: 3306,
  // username: 'root',
  // password: '123456',
  // database: 'test',
  entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')], //与数据库的映射字段
  synchronize: true,
};
