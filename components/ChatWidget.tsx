
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, MicOff, Volume2, ArrowDown, Sparkles } from 'lucide-react';
import { getChatResponse } from '../services/gemini';
import { LiveVoiceAgent } from '../services/liveApi';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Welcome to My Dentist. How can I help you with your dental care today?',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const voiceAgentRef = useRef<LiveVoiceAgent | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const toggleVoiceMode = async () => {
    if (!isVoiceMode) {
      const agent = new LiveVoiceAgent();
      const success = await agent.start(
        (text, isModel) => {
          if (text) {
             setMessages(prev => {
                const role = isModel ? 'assistant' : 'user';
                const lastMsg = prev[prev.length - 1];
                // Check if last message belongs to the same speaker to update it for streaming
                if (lastMsg && lastMsg.role === role) {
                   const newMessages = [...prev];
                   newMessages[newMessages.length - 1] = {
                      ...lastMsg,
                      content: text
                   };
                   return newMessages;
                }
                // Otherwise, append a new message bubble
                return [...prev, {
                  id: Date.now().toString(),
                  role,
                  content: text,
                  timestamp: new Date()
                }];
             });
          }
        },
        (err) => console.error(err)
      );
      if (success) {
        voiceAgentRef.current = agent;
        setIsVoiceMode(true);
      }
    } else {
      voiceAgentRef.current?.stop();
      voiceAgentRef.current = null;
      setIsVoiceMode(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const response = await getChatResponse(input, messages.map(m => ({ role: m.role, content: m.content })));
    
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response || 'I apologize, I could not generate a response.',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-6 w-80 md:w-[380px] h-[550px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100 transition-all duration-500 transform origin-bottom-right scale-100">
          {/* Header */}
          <div className="bg-white border-b border-slate-100 p-5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-sky-500 rounded-2xl flex items-center justify-center text-white">
                  <Sparkles size={20} />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Assistant AI</h3>
                <p className="text-[11px] text-slate-400 font-medium">
                  {isVoiceMode ? 'Listening to you...' : 'Ready to help'}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="hover:bg-slate-50 p-2 rounded-xl text-slate-400 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-5 space-y-5 bg-white">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-[20px] px-4 py-3 text-[13.5px] leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-sky-500 text-white rounded-tr-none shadow-md shadow-sky-100' 
                    : 'bg-slate-50 text-slate-700 rounded-tl-none border border-slate-100/50'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-50 rounded-[20px] rounded-tl-none px-4 py-3 flex space-x-1.5">
                  <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-5 bg-white">
            <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-2 border border-slate-100 transition-all focus-within:border-sky-200 focus-within:ring-4 focus-within:ring-sky-500/5">
              <button 
                onClick={toggleVoiceMode}
                className={`p-2 rounded-xl transition-all ${isVoiceMode ? 'bg-red-500 text-white shadow-lg shadow-red-100' : 'text-slate-400 hover:text-sky-500 hover:bg-white'}`}
                title={isVoiceMode ? "Stop Voice" : "Voice Assistant"}
              >
                {isVoiceMode ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isVoiceMode ? "Speaking..." : "Ask a question..."}
                disabled={isVoiceMode}
                className="flex-grow bg-transparent text-sm focus:outline-none placeholder:text-slate-400 disabled:opacity-50"
              />
              <button 
                onClick={handleSend}
                disabled={isVoiceMode || !input.trim()}
                className="text-sky-500 p-2 rounded-xl hover:bg-white disabled:opacity-30 transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 bg-sky-500 text-white rounded-[20px] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 hover:bg-sky-600 transition-all duration-300 group chat-pulse`}
      >
        {isOpen ? <ArrowDown /> : <MessageCircle className="group-hover:rotate-12 transition-transform" />}
      </button>
    </div>
  );
};
