const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000; // Порт, на котором будет работать сервер

// --- Настройка сервера ---

// Разрешаем Cross-Origin Resource Sharing (CORS).
// Это ОБЯЗАТЕЛЬНО, чтобы твой Mini App (Frontend) мог
// отправлять запросы на твой Backend (они на разных доменах).
// --- Настройка сервера ---

// Разрешаем Cross-Origin Resource Sharing (CORS).
// Это ОБЯЗАТЕЛЬНО, чтобы твой Mini App (Frontend) мог
// отправлять запросы на твой Backend.

// Указываем, какому домену мы доверяем (твой сайт на Netlify)
const corsOptions = {
  origin: 'https://symphonious-dragon-6b690a.netlify.app',
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions)); // ✅ добавь эту строку

// Разрешаем серверу принимать JSON в теле запроса
app.use(express.json());



// --- "Интеллектуальная" часть ---

/**
 * Здесь будет ядро твоей диссертации.
 * Эта функция имитирует обработку NLP.
 * @param {string} question - Вопрос от студента
 * @returns {Promise<string>} - Ответ от "ИИ"
 */
async function getIntellectualAnswer(question) {
    console.log(`Получен вопрос: ${question}`);

    // --- !!! МЕСТО ДЛЯ ТВОЕЙ ЛОГИКИ !!! ---
    //
    // Здесь ты будешь:
    // 1. Анализировать `question` (NLP).
    // 2. Искать ответ в базе знаний.
    // 3. Или... отправлять запрос к внешней AI-модели (например, YandexGPT,
    //    OpenAI API, или к твоей собственной модели).
    //
    // ВАЖНО: API-ключи к внешним сервисам (OpenAI и т.д.)
    // должны храниться ТОЛЬКО ЗДЕСЬ, на сервере. 
    // Никогда не вставляй их в Frontend (app.js)!
    //
    // --- Конец твоей логики ---

    // Имитируем задержку, как будто "ИИ" думает
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    // Простой "заглушечный" ответ
    let answer = "";
    if (question.toLowerCase().includes("фотосинтез")) {
        answer = "Фотосинтез — это процесс, при котором зеленые растения и некоторые другие организмы преобразуют световую энергию в химическую.";
    } else if (question.toLowerCase().includes("привет")) {
        answer = "Здравствуйте! Какой у вас учебный вопрос?";
    } else {
        answer = "Я пока не знаю ответ на этот вопрос. Моя база знаний пополняется. Попробуйте спросить что-нибудь о фотосинтезе.";
    }
    
    return answer;
}


// --- API Эндпоинт (точка входа) ---

// Создаем "эндпоинт" /api/chat. 
// Именно на этот URL будет обращаться твой `app.js` (Frontend).
app.post("/api/chat", async (req, res) => {
    try {
        const { question } = req.body; // Получаем вопрос из тела запроса

        if (!question) {
            return res.status(400).json({ error: "Отсутствует 'question' в теле запроса" });
        }

        // Вызываем нашу "интеллектуальную" функцию
        const answer = await getIntellectualAnswer(question);

        // Отправляем ответ обратно на Frontend
        res.json({ answer: answer });

    } catch (error) {
        console.error("Ошибка в /api/chat:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
});

// --- Запуск сервера ---
app.listen(PORT, () => {
    console.log(`Сервер "мозга" чат-бота запущен на http://localhost:${PORT}`);
});