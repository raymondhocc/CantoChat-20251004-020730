import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { chatService } from '@/lib/chat';
import type { Message } from '../../worker/types';
export type ChatRole = 'user' | 'assistant';
export type ChatMessage = Message;
type ChatState = {
  messages: ChatMessage[];
  userInput: string;
  isProcessing: boolean;
};
type ChatActions = {
  setUserInput: (input: string) => void;
  sendMessage: () => Promise<void>;
  initializeChat: () => void;
};
export const useChatStore = create<ChatState & ChatActions>()(
  immer((set, get) => ({
    messages: [],
    userInput: '',
    isProcessing: false,
    initializeChat: () => {
      set((state) => {
        state.messages = [
          {
            id: 'welcome-message',
            role: 'assistant',
            content: '你好！我係 CantoChat。你想練習廣東話，可以隨時同我傾偈。\n(Hello! I\'m CantoChat. If you want to practice Cantonese, you can chat with me anytime.)',
            timestamp: Date.now(),
          },
        ];
      });
    },
    setUserInput: (input: string) => {
      set((state) => {
        state.userInput = input;
      });
    },
    sendMessage: async () => {
      const userInput = get().userInput.trim();
      if (!userInput || get().isProcessing) return;
      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content: userInput,
        timestamp: Date.now(),
      };
      const assistantMessageId = crypto.randomUUID();
      set((state) => {
        state.messages.push(userMessage);
        // Add a placeholder for the assistant's response
        state.messages.push({
          id: assistantMessageId,
          role: 'assistant',
          content: '',
          timestamp: Date.now(),
        });
        state.userInput = '';
        state.isProcessing = true;
      });
      try {
        await chatService.sendMessage(userInput, undefined, (chunk) => {
          set((state) => {
            const messageToUpdate = state.messages.find(
              (msg) => msg.id === assistantMessageId
            );
            if (messageToUpdate) {
              messageToUpdate.content += chunk;
            }
          });
        });
      } catch (error) {
        console.error('Error sending message:', error);
        set((state) => {
          const messageToUpdate = state.messages.find(
            (msg) => msg.id === assistantMessageId
          );
          if (messageToUpdate) {
            messageToUpdate.content =
              'Sorry, I encountered an error. Please try again.';
          }
        });
      } finally {
        set((state) => {
          state.isProcessing = false;
        });
      }
    },
  }))
);