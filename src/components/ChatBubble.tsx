import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ChatMessage } from '@/stores/chat-store';
interface ChatBubbleProps {
  message: ChatMessage;
}
export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn('flex w-full items-start gap-2.5', isUser ? 'justify-end' : 'justify-start')}
    >
      <div
        className={cn(
          'relative max-w-[80%] rounded-2xl px-4 py-2.5 text-base font-medium',
          isUser
            ? 'rounded-br-sm bg-[rgb(0,122,255)] text-white'
            : 'rounded-bl-sm bg-[rgb(242,242,247)] text-[rgb(28,28,30)]'
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>
    </motion.div>
  );
}