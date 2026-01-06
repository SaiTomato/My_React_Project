import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const app = express();

// app.use(cors()); // 允许跨域，否则localhost不同会被CORS阻挡。

// // 一个接口
// app.get('/api/todos', (req, res) => {
//   res.json([
//     { id: 1, title: 'Learn React' },
//     { id: 2, title: 'Learn Backend' },
//   ]);
// });

app.use(express.json());

app.get('/api/todos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

app.post('/api/todos', async (req, res) => {
  const { title } = req.body;

  const result = await pool.query(
    'INSERT INTO todos (title) VALUES ($1) RETURNING *',
    [title]
  );

  res.json(result.rows[0]);
});

// 启动服务器
app.listen(3000, () => {
  console.log('Backend running at http://localhost:3000');
});