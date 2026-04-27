const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "flowdesk_secret";

// fake DB (luego lo cambias a Mongo)
let users = [];
let tasks = [];
let expenses = [];

// 🔐 REGISTER
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = { id: Date.now(), email, password: hashed };
  users.push(user);

  res.json({ message: "Usuario creado" });
});

// 🔐 LOGIN
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ error: "No existe" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Password incorrecta" });

  const token = jwt.sign({ id: user.id }, SECRET);

  res.json({ token });
});

// 🔒 MIDDLEWARE
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
};

// 📋 TASKS
app.get("/api/tasks", auth, (req, res) => {
  res.json(tasks.filter(t => t.userId === req.user.id));
});

app.post("/api/tasks", auth, (req, res) => {
  const task = {
    id: Date.now(),
    ...req.body,
    userId: req.user.id
  };
  tasks.push(task);
  res.json(task);
});

app.delete("/api/tasks/:id", auth, (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.json({ ok: true });
});

// 💸 EXPENSES
app.get("/api/expenses", auth, (req, res) => {
  res.json(expenses.filter(e => e.userId === req.user.id));
});

app.post("/api/expenses", auth, (req, res) => {
  const exp = {
    id: Date.now(),
    ...req.body,
    userId: req.user.id
  };
  expenses.push(exp);
  res.json(exp);
});

app.delete("/api/expenses/:id", auth, (req, res) => {
  expenses = expenses.filter(e => e.id != req.params.id);
  res.json({ ok: true });
});

app.listen(3000, () => console.log("🚀 Backend en http://localhost:3000"));