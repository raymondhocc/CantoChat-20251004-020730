import { useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SendHorizonal } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { useChatStore } from '@/stores/chat-store';
import { ChatBubble } from '@/components/ChatBubble';
import { TypingIndicator } from '@/components/TypingIndicator';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
export function HomePage() {
  const { messages, userInput, isProcessing } = useChatStore(
    useShallow((state) => ({
      messages: state.messages,
      userInput: state.userInput,
      isProcessing: state.isProcessing,
    }))
  );
  const { setUserInput, sendMessage, initializeChat } = useChatStore();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    initializeChat();
  }, [initializeChat]);
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isProcessing]);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const handleTextareaInput = (event: FormEvent<HTMLTextAreaElement>) => {
    const textarea = event.currentTarget;
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = `${Math.min(textarea.scrollHeight, 96)}px`; // Set new height up to a max
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (userInput.trim()) {
      sendMessage();
      if (inputRef.current) {
        inputRef.current.style.height = 'auto'; // Reset height on send
      }
    }
  };
  return (
    <div className="app-container font-sans">
      <header className="sticky top-0 z-10 border-b border-gray-200/80 bg-white/80 py-3 backdrop-blur-lg dark:border-gray-800/80 dark:bg-black/80">
        <h1 className="text-center text-lg font-semibold text-[rgb(28,28,30)] dark:text-gray-100">
          CantoChat
        </h1>
      </header>
      <main ref={scrollAreaRef} className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
          <AnimatePresence>
            {isProcessing &&
              messages.length > 0 &&
              messages[messages.length - 1].role === 'assistant' &&
              !messages[messages.length - 1].content && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex justify-start"
              >
                <div className="rounded-2xl rounded-bl-sm bg-[rgb(242,242,247)] text-[rgb(28,28,30)]">
                  <TypingIndicator />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <footer className="sticky bottom-0 z-10 border-t border-gray-200/80 bg-white/95 p-2 dark:border-gray-800/80 dark:bg-black/95">
        <form onSubmit={handleSubmit} className="flex w-full items-end gap-2">
          <Textarea
            ref={inputRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onInput={handleTextareaInput}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Message"
            rows={1}
            className="max-h-24 flex-1 resize-none self-center rounded-full border-gray-300 bg-gray-100 px-4 py-2 text-base focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-[rgb(0,122,255)] dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            disabled={isProcessing}
          />
          <Button
            type="submit"
            size="icon"
            className="h-9 w-9 shrink-0 rounded-full bg-[rgb(0,122,255)] text-white transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 disabled:scale-100 disabled:bg-gray-300 dark:disabled:bg-gray-600"
            disabled={!userInput.trim() || isProcessing}
          >
            <SendHorizonal className="h-5 w-5" />
          </Button>
        </form>
         <p className="px-4 text-center text-xs text-gray-400 pt-2">
          AI responses may be inaccurate. You need to configure your own API keys for the AI to work.
        </p>
      </footer>
    </div>
  );
}