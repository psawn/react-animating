import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NewChallenge from "./NewChallenge";

export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState<
    undefined | boolean
  >();

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  // use AnimatePresence as warapper around code that conditionally display or remove element

  return (
    <>
      <AnimatePresence>
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>

      <header id="main-header">
        <h1>Your Challenges</h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={handleStartAddNewChallenge}
          className="button"
        >
          Add Challenge
        </motion.button>
      </header>
    </>
  );
}
