import { motion } from "framer-motion";

export default function PageWrapper({ children }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.div>
  );
}