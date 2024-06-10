import { useContext, useState } from "react";

import { ChallengesContext } from "../store/challenges-context";
import ChallengeItem from "./ChallengeItem";
import ChallengeTabs from "./ChallengeTabs";
import { AnimatePresence, motion } from "framer-motion";

export type ImageType = {
  alt: string;
  src: string;
};

export type ChallengeType = {
  id: string;
  deadline: string;
  description: string;
  image: ImageType;
  status: string;
  title: string;
};

export default function Challenges() {
  const challengeCtx = useContext(ChallengesContext);
  const challenges = challengeCtx?.challenges;
  const [selectedType, setSelectedType] = useState("active");
  const [expanded, setExpanded] = useState<null | string>(null);

  function handleSelectType(newType: string) {
    setSelectedType(newType);
  }

  function handleViewDetails(id: string) {
    setExpanded((prevId) => {
      if (prevId === id) {
        return null;
      }

      return id;
    });
  }

  const filteredChallenges: { [key: string]: ChallengeType[] } = {
    active:
      challenges?.filter((challenge) => challenge.status === "active") ?? [],
    completed:
      challenges?.filter((challenge) => challenge.status === "completed") ?? [],
    failed:
      challenges?.filter((challenge) => challenge.status === "failed") ?? [],
  };

  const displayedChallenges = filteredChallenges[selectedType];

  return (
    <div id="challenges">
      <ChallengeTabs
        challenges={filteredChallenges}
        onSelectType={handleSelectType}
        selectedType={selectedType}
      >
        <AnimatePresence mode="wait">
          {displayedChallenges!.length > 0 && (
            <motion.ol
              key="list"
              initial={{ opacity: -30, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ y: -30, opacity: 0 }}
              className="challenge-items"
            >
              <AnimatePresence>
                {displayedChallenges!.map((challenge) => (
                  <ChallengeItem
                    key={challenge.id}
                    challenge={challenge}
                    onViewDetails={() => handleViewDetails(challenge.id)}
                    isExpanded={expanded === challenge.id}
                  />
                ))}
              </AnimatePresence>
            </motion.ol>
          )}
          {displayedChallenges!.length === 0 && (
            <motion.p
              key="fallback"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              No challenges found.
            </motion.p>
          )}
        </AnimatePresence>
      </ChallengeTabs>
    </div>
  );
}
