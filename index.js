const express = require("express");
const app = express();

app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("🎉 Bingo Server is Running!");
});

// Submit winner (example for your Telegram bot)
app.post("/winner", (req, res) => {
  const data = req.body;

  console.log("Winner received:", data);

  res.json({
    success: true,
    message: "Winner received successfully",
    data: data
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

