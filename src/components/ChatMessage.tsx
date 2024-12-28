import React from 'react';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
}

export function ChatMessage({ message, isBot }: ChatMessageProps) {
  return (
    <div className={`flex gap-4 p-6 ${isBot ? 'bg-purple-900/30' : ''}`}>
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-600">
        {isBot ? <Bot size={20} className="text-white" /> : <User size={20} className="text-white" />}
      </div>
      <div className="flex-1 text-white">
        <ReactMarkdown>{message}</ReactMarkdown>
      </div>
    </div>
  );
}