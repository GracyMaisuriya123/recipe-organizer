document.addEventListener("DOMContentLoaded", () => {
    const chatInput = document.getElementById("chat-input");
    const chatSubmit = document.getElementById("chat-submit");
    const chatResponse = document.getElementById("chat-response");

    if (!chatInput || !chatSubmit || !chatResponse) {
        console.error("Chatbot elements not found. Make sure your HTML contains the correct IDs.");
        return;
    }

    const responses = {
        "hello": "Hi there! How can I help?",
        "recipe": "You can add recipes by filling out the form above.",
        "favorite": "You can mark a recipe as a favorite by clicking the star icon.",
        "search": "Use the search bar to find recipes by ingredients.",
        "default": "I'm not sure about that. Try asking about recipes!"
    };

    chatSubmit.addEventListener("click", () => {
        const userMessage = chatInput.value.trim().toLowerCase();
        if (!userMessage) return;

        const reply = responses[userMessage] || responses["default"];
        chatResponse.innerHTML = `<p><strong>Chatbot:</strong> ${reply}</p>`;

        chatInput.value = ""; // Clear input after sending
    });
});



