const express = require('express');
const path = require('path');

// http://localhost:5173/web_model/urburn
// http://localhost:5173/web_model/road
// http://localhost:5173/web_model/tree

const app = express();
const port = 3030;

// 设置安全响应头和MIME类型
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  
  // 为.wasm文件设置正确的MIME类型
  if (req.url.endsWith('.wasm')) {
    res.setHeader('Content-Type', 'application/wasm');
  }
  next();
});

// 配置静态资源中间件
app.use(express.static(path.join(__dirname, '../dist')));

// 所有路由都返回index.html，支持SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});