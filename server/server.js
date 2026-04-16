const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
 
const app = express();
const PORT = 8000;
 
const POSTS_FILE = path.join(__dirname, "posts.json");
const USERS_FILE = path.join(__dirname, "users.json");
 
app.use(cors());
app.use(express.json());
 
// Basic Auth
app.use((req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).set("WWW-Authenticate", 'Basic realm="API"').json({ error: "Требуется авторизация" });
  }
  const decoded = Buffer.from(authHeader.split(" ")[1], "base64").toString("utf-8");
  const [username, password] = decoded.split(":");
  if (username !== "admin" || password !== "123") {
    return res.status(403).json({ error: "Неверный логин или пароль" });
  }
  next();
});
 
function readFile(filePath) {
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify([], null, 2));
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}
 
function writeFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
 
function nextId(items) {
  return items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
}
 
// ── POSTS ──────────────────────────────────────────────────────────────────────
 
app.get("/api/posts", (req, res) => {
  const posts = readFile(POSTS_FILE);
  const limit = parseInt(req.query._limit) || posts.length;
  const start = parseInt(req.query._start) || 0;
  res.json(posts.slice(start, start + limit));
});
 
app.get("/api/posts/:id", (req, res) => {
  const posts = readFile(POSTS_FILE);
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: "Пост не найден" });
  res.json(post);
});
 
app.post("/api/posts", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: "title и content обязательны" });
  const posts = readFile(POSTS_FILE);
  const newPost = { id: nextId(posts), title, content };
  posts.push(newPost);
  writeFile(POSTS_FILE, posts);
  res.status(201).json(newPost);
});
 
app.put("/api/posts/:id", (req, res) => {
  const posts = readFile(POSTS_FILE);
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Пост не найден" });
  posts[index] = { ...posts[index], ...req.body };
  writeFile(POSTS_FILE, posts);
  res.json(posts[index]);
});
 
app.delete("/api/posts/:id", (req, res) => {
  const posts = readFile(POSTS_FILE);
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Пост не найден" });
  const deleted = posts.splice(index, 1)[0];
  writeFile(POSTS_FILE, posts);
  res.json({ message: "Пост удалён", post: deleted });
});
 
app.post("/api/demo-data", (req, res) => {
  const demo = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Пост номер ${i + 1}`,
    content: `Это содержимое поста номер ${i + 1}. Здесь мог быть ваш текст.`,
  }));
  writeFile(POSTS_FILE, demo);
  res.json({ message: "Тестовые данные созданы", count: demo.length });
});
 
// ── USERS ──────────────────────────────────────────────────────────────────────
 
app.get("/api/users", (req, res) => {
  res.json(readFile(USERS_FILE));
});
 
app.get("/api/users/:id", (req, res) => {
  const users = readFile(USERS_FILE);
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "Пользователь не найден" });
  res.json(user);
});
 
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "name и email обязательны" });
  const users = readFile(USERS_FILE);
  const newUser = { id: nextId(users), name, email };
  users.push(newUser);
  writeFile(USERS_FILE, users);
  res.status(201).json(newUser);
});
 
app.put("/api/users/:id", (req, res) => {
  const users = readFile(USERS_FILE);
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Пользователь не найден" });
  users[index] = { ...users[index], ...req.body };
  writeFile(USERS_FILE, users);
  res.json(users[index]);
});
 
app.delete("/api/users/:id", (req, res) => {
  const users = readFile(USERS_FILE);
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Пользователь не найден" });
  const deleted = users.splice(index, 1)[0];
  writeFile(USERS_FILE, users);
  res.json({ message: "Пользователь удалён", user: deleted });
});
 
app.post("/api/demo-users", (req, res) => {
  const demo = [
    { id: 1, name: "Алексей Иванов", email: "alexey@example.com" },
    { id: 2, name: "Мария Петрова", email: "maria@example.com" },
    { id: 3, name: "Дмитрий Сидоров", email: "dmitry@example.com" },
    { id: 4, name: "Анна Козлова", email: "anna@example.com" },
    { id: 5, name: "Сергей Новиков", email: "sergey@example.com" },
  ];
  writeFile(USERS_FILE, demo);
  res.json({ message: "Тестовые пользователи созданы", count: demo.length });
});
 
// ── START ──────────────────────────────────────────────────────────────────────
 
app.listen(PORT, () => {
  console.log(`\n✅  API запущен: http://localhost:${PORT}`);
  console.log(`    Логин: admin  |  Пароль: 123`);
  console.log(`\n── Posts ───────────────────────────────`);
  console.log(`    GET    /api/posts?_limit=N&_start=N`);
  console.log(`    POST   /api/posts`);
  console.log(`    PUT    /api/posts/:id`);
  console.log(`    DELETE /api/posts/:id`);
  console.log(`    POST   /api/demo-data`);
  console.log(`\n── Users ───────────────────────────────`);
  console.log(`    GET    /api/users`);
  console.log(`    POST   /api/users`);
  console.log(`    PUT    /api/users/:id`);
  console.log(`    DELETE /api/users/:id`);
  console.log(`    POST   /api/demo-users\n`);
});