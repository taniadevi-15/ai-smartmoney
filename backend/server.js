import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 📊 Money Score API
app.post("/score", (req, res) => {
  const { income, expenses } = req.body;

  let savings = income - expenses;
  let score = Math.max(0, Math.min(100, (savings / income) * 100));

  let suggestion = savings > 0
    ? "Good! Try to invest your savings."
    : "You are overspending. Reduce expenses.";

  res.json({ score: Math.round(score), suggestion });
});

// 🤖 Chatbot API

app.post("/chat", (req, res) => {
  const { message } = req.body;

  let msg = message.toLowerCase();
  let reply = "";

  // smart keyword + fallback logic
  if (msg.includes("save")) {
    reply = "A good rule is to save at least 20% of your income and cut unnecessary expenses.";
  } 
  else if (msg.includes("invest")) {
    reply = "You can start with SIPs in mutual funds for safe long-term investment.";
  } 
  else if (msg.includes("budget")) {
    reply = "Follow the 50-30-20 rule to manage your budget effectively.";
  } 
  else if (msg.includes("loan")) {
    reply = "Avoid unnecessary loans and always compare interest rates before borrowing.";
  } 
  else if (msg.includes("tax")) {
    reply = "You can save tax using options like ELSS, PPF, and insurance plans.";
  } 
  else {
    // 🔥 universal AI-style response
    reply = `That's a great question! Based on your situation, it's important to manage your finances wisely, track your expenses, and make informed decisions about saving and investing.`;
  }

  res.json({ reply });
});
app.listen(5000, () => console.log("Server running on port 5000"));