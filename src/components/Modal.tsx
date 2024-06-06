import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export default function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  // const hiddenAnimationState = { opacity: 0, y: 400 };

  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <motion.dialog
        variants={{
          hidden: { opacity: 0, y: -30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden" // state when element apprear in DOM
        animate="visible" // steate right after element apprear
        exit="hidden" // steate when element was removed from DOM
        open
        className="modal"
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")!
  );
}
