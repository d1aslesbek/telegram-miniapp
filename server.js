const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Разрешаем все домены (временно для теста)
app.use(cors());
app.use(express.json());

// Тестовый route
app.get("/", (req, res) => {
    res.json({ status: "OK", message: "Server is working!" });
});

// API endpoint
app.post("/api/chat", async (req, res) => {
    try {
        const { question } = req.body;
        
        if (!question) {
            return res.status(400).json({ error: "Question is required" });
        }

        // Простой ответ
        const answer = question.toLowerCase().includes("привет") 
            ? "Здравствуйте! Чем могу помочь?"
            : "Я получил ваш вопрос: " + question;

        res.json({ answer: answer });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});