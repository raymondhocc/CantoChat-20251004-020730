import { motion } from 'framer-motion';
const dotVariants = {
  initial: {
    y: '0%',
  },
  animate: {
    y: '100%',
  },
};
const containerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};
export function TypingIndicator() {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="flex items-center justify-center gap-1.5 p-3"
    >
      {[...Array(3)].map((_, i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-current"
          variants={dotVariants}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}
    </motion.div>
  );
}