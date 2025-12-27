// import { useState } from "react";

// export default function Chatbot() {
//   const [input, setInput] = useState("");
//   const [chat, setChat] = useState([]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     const userMsg = { sender: "user", text: input };
//     setChat((prev) => [...prev, userMsg]);
//     setInput("");

//     const res = await fetch("http://localhost:8080/api/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ message: input }),
//     });

//     const data = await res.json();
//     const botMsg = { sender: "bot", text: data.reply };
//     setChat((prev) => [...prev, botMsg]);
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow mt-10">
//       <h2 className="text-xl font-semibold mb-3">🤖 StudyBuddy</h2>
//       <div className="space-y-2 max-h-64 overflow-y-auto border p-2 rounded">
//         {chat.map((msg, i) => (
//           <div
//             key={i}
//             className={`p-2 rounded ${
//               msg.sender === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <div className="flex gap-2 mt-4">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="flex-1 border rounded px-2 py-1"
//           placeholder="Ask something..."
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-500 text-white px-3 py-1 rounded"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botReply = { sender: "bot", text: data.reply };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error("Chatbot error:", err);
      const errorMessage = {
        sender: "bot",
        text: "Oops! Something went wrong. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-5 right-5 bg-slate-700 hover:bg-slate-900  text-white p-3 rounded-full shadow-lg transition-all z-50"
        title="Ask AI"
      >
        ✏️ Study Buddy...!
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-20 right-5 w-80 bg-white rounded-xl shadow-xl border p-4 transition-all duration-300 z-40 ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <h2 className="text-lg font-semibold text-blue-600 mb-2">AI Assistant</h2>

        <div className="h-60 overflow-y-auto border p-2 mb-2 rounded bg-gray-50 text-sm space-y-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded max-w-[90%] ${
                msg.sender === "user"
                  ? "ml-auto bg-blue-100 text-right"
                  : "mr-auto bg-gray-200 text-left"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border rounded p-2 text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask me anything..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
