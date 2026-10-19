
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Send,
  Bot,
  User,
  Plus,
  Menu,
  MessageSquare,
  Sparkles,
  X,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Navbar from "../components/Navbar";

const SKILLS = [
  "electrician",
  "plumber",
  "carpenter",
  "painter",
  "mechanic",
  "mason",
  "welder",
  "cleaner",
];

const OFF_TOPIC_REPLY =
  "🚫 Not allowed. I can only answer questions about this website — finding skilled workers, posting a job, or how the site works. Please ask me about the website.";

const BLOCKED_WORDS = [
  "weather",
  "news",
  "recipe",
  "cricket",
  "football",
  "movie",
  "song",
  "joke",
  "story",
  "poem",
  "code",
  "coding",
  "javascript",
  "python",
  "math",
  "homework",
  "essay",
  "translate",
  "history",
  "politic",
  "election",
  "president",
  "bitcoin",
  "crypto",
  "stock",
  "doctor",
  "medicine",
  "religion",
  "chatgpt",
  "openai",
  "google",
  "facebook",
  "instagram",
  "tiktok",
  "game",
  "sports",
  "capital of",
];

const TOPICS = [
  {
    id: "greeting",
    keywords: [
      "hi",
      "hello",
      "hey",
      "salam",
      "assalam",
      "good morning",
      "good evening",
    ],
    exact: true,
    answer:
      "Hello! 👋 Welcome to SkillConnect. How can I help you with the website today?",
  },
  {
    id: "thanks",
    keywords: ["thanks", "thank you", "shukria"],
    exact: true,
    answer:
      "You're welcome! 😊 Let me know if you need anything else about SkillConnect.",
  },
  {
    id: "about",
    keywords: [
      "what is this",
      "this website",
      "this site",
      "website",
      "your site",
      "how does this",
      "how it work",
      "platform",
      "skill connect",
    ],
    answer:
      "SkillConnect connects skilled workers with people who need work done. You can find a skilled worker near you or post a job and let workers know what you need.",
    links: [
      { label: "Find Workers", to: "/find-workers" },
      { label: "Post a Job", to: "/post-job" },
    ],
  },
  {
    id: "find",
    keywords: [
      "find worker",
      "find a worker",
      "search worker",
      "hire",
      "worker",
      "workers",
      "skilled",
      "worker near me",
    ],
    answer:
      "To find a worker, open the Find Workers page and select the skill you need. You can then view available workers and contact them directly.",
    links: [{ label: "Find Workers", to: "/find-workers" }],
  },
  {
    id: "post",
    keywords: [
      "post a job",
      "post job",
      "post work",
      "job post",
      "work request",
      "need work done",
      "add work",
    ],
    answer:
      "To post a job, open the Post a Job page, describe the work you need, add the required details, and submit your request.",
    links: [{ label: "Post a Job", to: "/post-job" }],
  },
  {
    id: "contact",
    keywords: [
      "whatsapp",
      "contact worker",
      "contact a worker",
      "contact them",
      "contact",
    ],
    answer:
      "You can contact workers directly through WhatsApp. Open a worker profile on the Find Workers page and use the WhatsApp button.",
    links: [{ label: "Find Workers", to: "/find-workers" }],
  },
  {
    id: "price",
    keywords: ["price", "cost", "charges", "how much", "payment"],
    answer:
      "You can discuss the price and work details directly with the worker through WhatsApp before starting the work.",
  },
  {
    id: "skills",
    keywords: [
      "skills",
      "services",
      "categories",
      "what workers",
      "which workers",
      "types of",
    ],
    answer: `SkillConnect currently supports: ${SKILLS.join(", ")}.`,
    links: [{ label: "Browse Workers", to: "/find-workers" }],
  },
  {
    id: "home",
    keywords: [
      "home page",
      "homepage",
      "main page",
      "navigate",
      "where is",
      "which page",
    ],
    answer:
      "The main SkillConnect pages include Home, Find Workers, Post a Job, Find Work, and AI Chat. Tell me what you want to do and I'll guide you.",
    links: [
      { label: "Find Workers", to: "/find-workers" },
      { label: "Post a Job", to: "/post-job" },
    ],
  },
];

const normalize = (text) =>
  " " +
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim() +
  " ";

const hasKeyword = (normalized, keyword, exact = false) =>
  normalized.includes(" " + keyword + (exact ? " " : ""));

function getReply(input) {
  const normalized = normalize(input);

  const isBlocked = BLOCKED_WORDS.some((word) =>
    hasKeyword(normalized, word)
  );

  if (isBlocked) {
    return {
      text: OFF_TOPIC_REPLY,
      blocked: true,
    };
  }

  const skill = SKILLS.find((skillName) =>
    hasKeyword(normalized, skillName)
  );

  if (skill) {
    return {
      text: `Looking for a ${skill}? Open the link below to see available ${skill}s and contact them directly.`,
      links: [
        {
          label: `Find ${skill}s`,
          to: `/find-workers?skill=${skill}`,
        },
      ],
    };
  }

  let best = null;
  let bestScore = 0;

  for (const topic of TOPICS) {
    const score = topic.keywords.filter((keyword) =>
      hasKeyword(normalized, keyword, topic.exact)
    ).length;

    if (score > bestScore) {
      best = topic;
      bestScore = score;
    }
  }

  if (best) {
    return {
      text: best.answer,
      links: best.links,
    };
  }

  return {
    text: OFF_TOPIC_REPLY,
    blocked: true,
  };
}

const WELCOME = {
  id: 1,
  role: "assistant",
  text: "Hello! 👋 I'm the SkillConnect assistant. I can help you find skilled workers, post a job, or understand how the website works.",
};

const SUGGESTIONS = [
  {
    text: "How do I find an electrician?",
    icon: "⚡",
  },
  {
    text: "How do I post a job?",
    icon: "📋",
  },
  {
    text: "How does SkillConnect work?",
    icon: "💡",
  },
];

function MainChat() {
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);

  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  const sendMessage = (customText) => {
    const text = (customText ?? message).trim();

    if (!text || typing) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: "user",
        text,
      },
    ]);

    setMessage("");
    setTyping(true);

    const reply = getReply(text);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          ...reply,
        },
      ]);

      setTyping(false);
    }, 650);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startNewChat = () => {
    setMessages([
      {
        ...WELCOME,
        id: Date.now(),
      },
    ]);

    setMessage("");
    setTyping(false);
    setMobileSidebar(false);
  };

  return (
    <>
      <Navbar />

      <div className="relative flex h-[calc(100vh-72px)] overflow-hidden bg-slate-50">
        {/* Mobile Overlay */}
        {mobileSidebar && (
          <div
            onClick={() => setMobileSidebar(false)}
            className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm md:hidden"
          />
        )}

        {/* Sidebar */}
        <aside
          className={`absolute inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 md:relative md:z-0 md:translate-x-0 md:shadow-none ${
            mobileSidebar
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 p-5 md:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200">
                <Bot size={21} />
              </div>

              <div>
                <h2 className="font-extrabold text-slate-900">
                  SkillConnect
                </h2>
                <p className="text-xs text-slate-500">AI Assistant</p>
              </div>
            </div>

            <button
              onClick={() => setMobileSidebar(false)}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4">
            <button
              onClick={startNewChat}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-200"
            >
              <Plus
                size={18}
                className="transition-transform group-hover:rotate-90"
              />
              New Chat
            </button>
          </div>

          <div className="px-4">
            <p className="mb-3 px-2 text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              Recent Chats
            </p>

            <button
              onClick={startNewChat}
              className="flex w-full items-center gap-3 rounded-xl bg-blue-50 px-3 py-3 text-left text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              <MessageSquare size={17} />
              <span className="truncate">New conversation</span>
            </button>
          </div>

          <div className="mt-auto p-4">
            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-blue-600" />
                <span className="text-xs font-bold text-blue-700">
                  Website Assistant
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-600">
                Ask about finding workers, posting jobs, skills, or using
                SkillConnect.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Area */}
        <section className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-xl sm:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileSidebar(true)}
                className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm transition hover:bg-slate-50 md:hidden"
              >
                <Menu size={20} />
              </button>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200">
                <Bot size={22} />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-extrabold text-slate-900">
                    SkillConnect AI
                  </h1>

                  <span className="hidden rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-600 sm:inline-flex">
                    ONLINE
                  </span>
                </div>

                <p className="text-xs text-slate-500">
                  Your website assistant
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500 sm:flex">
              <Sparkles size={14} className="text-blue-600" />
              SkillConnect Assistant
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
              {messages.length === 1 && (
                <div className="mb-10 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-200">
                    <Sparkles size={28} />
                  </div>

                  <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                    How can I help you?
                  </h2>

                  <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
                    Ask me anything about finding skilled workers, posting
                    jobs, or using SkillConnect.
                  </p>
                </div>
              )}

              <div className="space-y-7">
                {messages.map((item) => (
                  <div
                    key={item.id}
                    className={`flex gap-3 ${
                      item.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {item.role === "assistant" && (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-100">
                        <Bot size={17} />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] sm:max-w-[75%] ${
                        item.role === "user" ? "order-1" : ""
                      }`}
                    >
                      <div
                        className={`rounded-2xl px-4 py-3.5 text-sm leading-7 shadow-sm ${
                          item.role === "user"
                            ? "rounded-br-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                            : item.blocked
                            ? "rounded-bl-md border border-red-200 bg-red-50 text-red-700"
                            : "rounded-bl-md border border-slate-200 bg-white text-slate-700"
                        }`}
                      >
                        {item.text}

                        {item.links?.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.links.map((link) => (
                              <Link
                                key={link.to}
                                to={link.to}
                                className="group inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-blue-600"
                              >
                                {link.label}
                                <ArrowRight
                                  size={13}
                                  className="transition-transform group-hover:translate-x-0.5"
                                />
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>

                      <p
                        className={`mt-1.5 text-[10px] font-medium text-slate-400 ${
                          item.role === "user" ? "text-right" : ""
                        }`}
                      >
                        {item.role === "user"
                          ? "You"
                          : "SkillConnect AI"}
                      </p>
                    </div>

                    {item.role === "user" && (
                      <div className="order-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-200 text-slate-600">
                        <User size={17} />
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing */}
                {typing && (
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-100">
                      <Bot size={17} />
                    </div>

                    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-5 py-4 shadow-sm">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:150ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:300ms]" />
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                {messages.length === 1 && !typing && (
                  <div className="grid gap-3 pl-0 sm:grid-cols-3 sm:pl-12">
                    {SUGGESTIONS.map((suggestion) => (
                      <button
                        key={suggestion.text}
                        onClick={() => sendMessage(suggestion.text)}
                        className="group rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="text-xl">
                            {suggestion.icon}
                          </span>

                          <ArrowRight
                            size={16}
                            className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600"
                          />
                        </div>

                        <p className="mt-3 text-xs font-bold leading-5 text-slate-700">
                          {suggestion.text}
                        </p>
                      </button>
                    ))}
                  </div>
                )}

                <div ref={bottomRef} />
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="shrink-0 border-t border-slate-200 bg-white px-4 py-4 sm:px-6">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-sm transition focus-within:border-blue-300 focus-within:bg-white focus-within:shadow-lg focus-within:shadow-blue-50">
                <div className="flex items-end gap-2">
                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    maxLength={300}
                    placeholder="Ask about finding workers, posting a job..."
                    rows={1}
                    className="max-h-32 min-h-[48px] flex-1 resize-none border-0 bg-transparent px-3 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0"
                  />

                  <button
                    onClick={() => sendMessage()}
                    disabled={!message.trim() || typing}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-200 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between px-1">
                <p className="text-[10px] text-slate-400 sm:text-xs">
                  SkillConnect AI only answers questions about this website.
                </p>

                <p className="hidden text-[10px] text-slate-400 sm:block sm:text-xs">
                  Enter to send · Shift + Enter for new line
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default MainChat;
