const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const OPENROUTER_API_KEY = "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";

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          { role: "system", content: "당신은 보홀 여행 전문 상담가입니다." },
          { role: "user", content: message }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data.choices?.[0]?.message?.content || "답변을 가져오지 못했어요 😢";
    res.json({ reply });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({ error: "API 호출 실패" });
  }
});

app.get("/", (req, res) => {
  res.send("GPT Proxy Server is running.");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
