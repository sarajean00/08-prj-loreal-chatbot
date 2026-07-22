/* DOM elements */
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");

// The class worker URL can be pasted here or entered at runtime.
let workerUrl = "https://loreal-chatbot.your-subdomain.workers.dev/";

if (workerUrl.includes("your-subdomain")) {
  const enteredUrl = prompt("Paste your class Cloudflare Worker URL:");
  if (enteredUrl) {
    workerUrl = enteredUrl;
  }
}

// Set initial message
chatWindow.textContent = "👋 Hello! How can I help you today?";

/* Handle form submit */
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = userInput.value.trim();
  if (!message) {
    return;
  }

  chatWindow.textContent = "Thinking...";

  try {
    if (workerUrl.includes("your-subdomain")) {
      throw new Error(
        "Please replace the worker URL in script.js with the class-provided Cloudflare Worker URL.",
      );
    }

    const response = await fetch(workerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-5.6",
        messages: [{ role: "user", content: message }],
      }),
    });

    if (!response.ok) {
      throw new Error("The chatbot could not respond right now.");
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response.";

    chatWindow.textContent = reply;
  } catch (error) {
    chatWindow.textContent = `Sorry, something went wrong. ${error.message}`;
  }
});
