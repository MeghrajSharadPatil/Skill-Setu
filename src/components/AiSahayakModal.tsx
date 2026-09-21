import React, { useState, useRef, useEffect } from "react";
import { OfficialProfile } from "../types";
import { 
  Sparkles, 
  Send, 
  X, 
  Bot, 
  User, 
  BookOpen, 
  ShieldCheck, 
  MessageSquare,
  HelpCircle,
  Cpu
} from "lucide-react";

interface AiSahayakModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: OfficialProfile;
  language: "en" | "hi";
}

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export const AiSahayakModal: React.FC<AiSahayakModalProps> = ({
  isOpen,
  onClose,
  profile,
  language,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-0",
      sender: "bot",
      text: `Namaste ${profile.name}! I am your Karmayogi Statistical AI Sahayak, trained on MoSPI manuals, NSSTA training calendars, and the iGOT Karmayogi framework. How can I assist your capacity building today?`,
      timestamp: "Just now",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "How are sampling weights (multipliers) calculated in NSS?",
    "Explain GVA at basic prices in SNA 2008.",
    "Recommend an iGOT course to close my Python skill gap.",
    "What does DPDP Act 2023 say about survey microdata?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/gemini/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          profile: {
            name: profile.name,
            designation: profile.designation,
            cadre: profile.cadre,
            department: profile.department,
          },
        }),
      });

      const data = await response.json();
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.reply || "I am processing your query regarding official statistical methodologies.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("AI assistant call failed:", err);
      const errorMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "Apologies, I encountered a brief network delay. In general, MoSPI and NSSTA prioritize rule-to-role competency mapping. Feel free to explore the recommended pathways or launch an assessment!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full h-[620px] shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#0B4F9C] text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-inner">
              <Bot className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm sm:text-base">
                  {language === "hi" ? "कर्मयोगी सांख्यिकी एआई सहायक" : "Karmayogi Statistical AI Sahayak"}
                </h3>
                <span className="bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-1.5 py-0.2 rounded">
                  Online
                </span>
              </div>
              <p className="text-xs text-blue-200">
                MoSPI & NSSTA Capacity Building Virtual Mentor
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50">
          {messages.map((msg) => {
            const isBot = msg.sender === "bot";
            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-2.5 ${isBot ? "" : "flex-row-reverse space-x-reverse"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    isBot ? "bg-[#0B4F9C] text-white" : "bg-amber-500 text-slate-950"
                  }`}
                >
                  {isBot ? "क" : "U"}
                </div>

                <div
                  className={`p-3.5 rounded-2xl max-w-[80%] text-xs leading-relaxed ${
                    isBot
                      ? "bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-tl-xs"
                      : "bg-[#0B4F9C] text-white shadow-2xs rounded-tr-xs"
                  }`}
                >
                  <div className="whitespace-pre-line font-normal">{msg.text}</div>
                  <div
                    className={`text-[10px] mt-1 text-right ${
                      isBot ? "text-slate-400" : "text-blue-200"
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center space-x-2 text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-200 w-fit">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
              <span>Consulting MoSPI compendiums and official statistical standards...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries Chips */}
        <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center space-x-2 overflow-x-auto text-[11px]">
          <span className="text-slate-400 font-bold whitespace-nowrap">Suggested:</span>
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="bg-slate-100 hover:bg-blue-50 hover:text-[#0B4F9C] text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap transition border border-slate-200"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Ask about sampling formulas, SNA 2008, PLFS, or iGOT courses..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C]"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isLoading}
            className="bg-[#0B4F9C] hover:bg-[#083a75] disabled:opacity-50 text-white p-2.5 rounded-xl transition cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
