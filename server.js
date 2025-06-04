const apiKey = "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";

async function fetchGPTResponse(userInput) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openrouter/chatgpt",
      messages: [{ role: "user", content: userInput }]
    })
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "응답이 없어요.";
}
