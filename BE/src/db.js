import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'myapp',
  password: 'admin123',
  port: 5432,
});

pool.query('SELECT NOW()')
  .then(res => console.log(res.rows[0]))
  .catch(err => console.error(err));