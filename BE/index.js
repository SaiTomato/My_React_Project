import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors()); // 允许跨域，否则localhost不同会被CORS阻挡。

// 一个接口
app.get('/api/todos', (req, res) => {
  res.json([
    { id: 1, title: 'Learn React' },
    { id: 2, title: 'Learn Backend' },
  ]);
});

// 启动服务器
app.listen(3000, () => {
  console.log('Backend running at http://localhost:3000');
});