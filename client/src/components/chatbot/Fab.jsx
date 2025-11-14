import { useState } from "react";

export default function ChatbotFab() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([
    { from: "bot", text: "Hi! I'm your demo AI helper." },
  ]);

  function send() {
    if (!input.trim()) return;
    setMsgs((prev) => [
      ...prev,
      { from: "you", text: input },
      { from: "bot", text: `(demo) You said: ${input}` },
    ]);
    setInput("");
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          right: 16,
          bottom: 16,
          borderRadius: "9999px",
          padding: "14px 18px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
          border: "none",
        }}
        className="bg-blue-600 text-white"
        title="Chatbot"
      >
        💬
      </button>

      {open && (
        <div
          style={{ position: "fixed", right: 16, bottom: 80, width: 320 }}
          className="rounded-lg border bg-white shadow-lg"
        >
          <div className="p-3 font-semibold border-b">VidyaMarg Assistant</div>
          <div className="p-3 max-h-64 overflow-auto space-y-2">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={m.from === "bot" ? "text-sm" : "text-right text-sm"}
              >
                <span
                  className={
                    m.from === "bot"
                      ? "bg-gray-100 p-2 rounded"
                      : "bg-blue-50 p-2 rounded inline-block"
                  }
                >
                  {m.text}
                </span>
              </div>
            ))}
          </div>
          <div className="p-3 flex gap-2 border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded px-2 py-1"
              placeholder="Type a message..."
            />
            <button
              onClick={send}
              className="px-3 py-1 rounded bg-blue-600 text-white"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
