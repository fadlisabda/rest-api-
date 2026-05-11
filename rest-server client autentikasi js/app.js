const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const port = 4000;
app.use(express.json());
const SECRET_KEY = "tes";
const users = [
  {
    id: 1,
    username: "john",
    password: "password123",
  },
  {
    id: 2,
    username: "jane",
    password: "password456",
  },
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).send("Invalid username or password");
  }
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

function verifyToken(req, res, next) {
  const authHeader = req.header("Authorization");
  const token = authHeader ? authHeader.replace("Bearer ", "") : null;
  if (!token) {
    return res.status(403).send("Token is required");
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }
    req.user = decoded;
    next();
  });
}

app.get("/protected", verifyToken, (req, res) => {
  res.send(`Hello,${req.user.username}. You have access to this protected route!`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
