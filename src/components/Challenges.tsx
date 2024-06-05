import { useContext, useState } from "react";

import { ChallengesContext } from "../store/challenges-context";
import ChallengeItem from "./ChallengeItem";
import ChallengeTabs from "./ChallengeTabs";

export type ImageType = {
  alt: string,
  src: string,
}

export type ChallengeType = {
  id: string,
  deadline: string,
  description: string,
  image: ImageType,
  status: string,
  title: string,
}

export default function Challenges() {
  const challengeCtx = useContext(ChallengesContext);
  const challenges  = challengeCtx?.challenges;
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
    active: challenges?.filter((challenge) => challenge.status === "active") ?? [],
    completed: challenges?.filter((challenge) => challenge.status === "completed") ?? [],
    failed: challenges?.filter((challenge) => challenge.status === "failed") ?? [],
  };

  const displayedChallenges = filteredChallenges[selectedType];

  return (
    <div id="challenges">
      <ChallengeTabs
        challenges={filteredChallenges}
        onSelectType={handleSelectType}
        selectedType={selectedType}
      >
        {displayedChallenges!.length > 0 && (
          <ol className="challenge-items">
            {displayedChallenges!.map((challenge) => (
              <ChallengeItem
                key={challenge.id}
                challenge={challenge}
                onViewDetails={() => handleViewDetails(challenge.id)}
                isExpanded={expanded === challenge.id}
              />
            ))}
          </ol>
        )}
        {displayedChallenges!.length === 0 && <p>No challenges found.</p>}
      </ChallengeTabs>
    </div>
  );
}
