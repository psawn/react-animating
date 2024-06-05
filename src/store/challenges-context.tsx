import { createContext, ReactNode, useState } from "react";
import { ChallengeType } from "../components/Challenges";

type ChallengesContextType = {
  challenges: Array<ChallengeType>;
  addChallenge: (challenge: Omit<ChallengeType, "id" | "status">) => void;
  updateChallengeStatus: (id: string, status: string) => void;
};

export const ChallengesContext = createContext<ChallengesContextType | null>(null);

export default function ChallengesContextProvider({ children }: { children: ReactNode }) {
  const [challenges, setChallenges] = useState<ChallengeType[]>([]);

  function addChallenge(challenge: Omit<ChallengeType, "id" | "status">) {
    setChallenges((prevChallenges) => [
      { ...challenge, id: Math.random().toString(), status: "active" },
      ...prevChallenges,
    ]);
  }

  function deleteChallenge(challengeId: string) {
    setChallenges((prevChallenges) =>
      prevChallenges.filter((challenge) => challenge.id !== challengeId)
    );
  }

  function updateChallengeStatus(challengeId: string, newStatus: string) {
    setChallenges((prevChallenges) =>
      prevChallenges.map((challenge) => {
        if (challenge.id === challengeId) {
          return { ...challenge, status: newStatus };
        }
        return challenge;
      })
    );
  }

  const challengesContext = {
    challenges,
    addChallenge,
    deleteChallenge,
    updateChallengeStatus,
  };

  return (
    <ChallengesContext.Provider value={challengesContext}>{children}</ChallengesContext.Provider>
  );
}
