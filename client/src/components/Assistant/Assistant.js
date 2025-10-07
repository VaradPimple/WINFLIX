import React, { useState, useRef, useEffect } from "react";
import "./Assistant.css";

function Assistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm Flixer 🤖. How can I assist you today?" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [conversationState, setConversationState] = useState(null); // tracks active flow
  const chatEndRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Preset buttons
  const presets = [
    "Cancel Order",
    "Refund Status",
    "Subscription Info",
    "How to Watch",
    "Contact Support"
  ];

  const handlePresetClick = (preset) => {
    addMessage("user", preset);
    handleBotResponse(preset.toLowerCase());
  };

  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  const handleBotResponse = (input) => {
    const text = input.toLowerCase();

    // Interactive flows
    if (conversationState === "cancelOrder") {
      addMessage("bot", `Got it! Your order ID "${text}" is now marked for cancellation. Refund will be processed in 5-7 business days.`);
      setConversationState(null);
      return;
    }

    if (conversationState === "refundStatus") {
      addMessage("bot", `Checking refund status for order ID "${text}"... Your refund has been processed successfully!`);
      setConversationState(null);
      return;
    }

    if (conversationState === "subscription") {
      addMessage("bot", `Thank you! Your account email "${text}" is associated with the Premium Subscription plan. Next billing date: 15th of next month.`);
      setConversationState(null);
      return;
    }

    // Trigger flows based on preset or keywords
    if (text.includes("cancel order")) {
      addMessage("bot", "Sure! Can you provide your Order ID?");
      setConversationState("cancelOrder");
      return;
    }

    if (text.includes("refund")) {
      addMessage("bot", "I can help with refund status. Please provide your Order ID.");
      setConversationState("refundStatus");
      return;
    }

    if (text.includes("subscription")) {
      addMessage("bot", "I can give you subscription details. Please enter your account email.");
      setConversationState("subscription");
      return;
    }

    if (text.includes("how to watch") || text.includes("watch")) {
      addMessage("bot", "You can watch WinFlix on web, mobile, or smart TV. Just log in with your account and start streaming!");
      return;
    }

    if (text.includes("contact") || text.includes("support")) {
      addMessage("bot", "You can contact WinFlix support at support@winflix.com or call 1800-123-4567.");
      return;
    }

    // Default fallback
    addMessage("bot", "I’m not sure I understood. Can you try one of the options below?");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    addMessage("user", userInput);
    handleBotResponse(userInput);
    setUserInput("");
  };

  return (
    <div className={`assistant-container ${isOpen ? "open" : ""}`}>
      <div className="assistant-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="assistant-title">
          Flixer 🤖
        </div>
        <div className="assistant-toggle">{isOpen ? "−" : "+"}</div>
      </div>

      {isOpen && (
        <div className="assistant-body">
          <div className="assistant-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === "bot" ? "bot" : "user"}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>

          <div className="assistant-presets">
            {presets.map((p) => (
              <button key={p} onClick={() => handlePresetClick(p)}>
                {p}
              </button>
            ))}
          </div>

          <form className="assistant-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={userInput}
              placeholder="Type your message..."
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Assistant;
