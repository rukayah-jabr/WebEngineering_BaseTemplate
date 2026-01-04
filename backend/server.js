const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
});
