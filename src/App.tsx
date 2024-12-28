import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { getGeminiResponse } from './lib/gemini';

interface Message {
  text: string;
  isBot: boolean;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    setMessages(prev => [...prev, { text: message, isBot: false }]);
    setLoading(true);

    try {
      const response = await getGeminiResponse(message);
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: 'Sorry, I encountered an error. Please try again.', isBot: true }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 to-purple-900 flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-purple-800 bg-purple-950/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <Brain size={32} className="text-purple-300" />
          <h1 className="text-2xl font-bold text-white">ChatGPT Clone</h1>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-purple-300 p-8">
                <Brain size={48} className="mx-auto mb-4 opacity-50" />
                <h2 className="text-xl font-semibold mb-2">Welcome to ChatGPT Clone!</h2>
                <p>Start a conversation by typing a message below.</p>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <ChatMessage key={index} message={message.text} isBot={message.isBot} />
            ))
          )}
          {loading && (
            <div className="p-6 text-purple-300">
              <div className="animate-pulse flex gap-4">
                <div className="w-8 h-8 bg-purple-800 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-purple-800 rounded w-3/4" />
                  <div className="h-4 bg-purple-800 rounded w-1/2" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Input */}
      <ChatInput onSend={handleSendMessage} disabled={loading} />
    </div>
  );
}

export default App;