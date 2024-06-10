import { ReactNode } from "react";
import Badge from "./Badge";
import { ChallengeType } from "./Challenges";
import { motion } from "framer-motion";

type ChallengeTab = {
  [key: string]: ChallengeType[];
};

function Tab({
  isSelected,
  onSelect,
  badgeCaption,
  children,
}: {
  isSelected: boolean;
  onSelect: () => void;
  badgeCaption: number;
  children: ReactNode;
}) {
  return (
    <li>
      <button
        className={isSelected ? "selected" : undefined}
        onClick={onSelect}
      >
        {children}
        {/* if add key on the element and change the value that's assigned to the key,
        React will basically destroy the old component instance and render a new one
        -> reset any internal state -> re trigger entry animations */}
        <Badge key={badgeCaption} caption={badgeCaption}></Badge>
      </button>
      {isSelected && (
        <motion.div layoutId="tab-indicator" className="active-tab-indicator" />
      )}
    </li>
  );
}

export default function ChallengeTabs({
  selectedType,
  onSelectType,
  challenges,
  children,
}: {
  selectedType: string;
  onSelectType: (key: string) => void;
  challenges: ChallengeTab;
  children: ReactNode;
}) {
  return (
    <>
      <menu id="tabs">
        <Tab
          isSelected={selectedType === "active"}
          onSelect={() => onSelectType("active")}
          badgeCaption={challenges.active.length}
        >
          Active
        </Tab>
        <Tab
          isSelected={selectedType === "completed"}
          onSelect={() => onSelectType("completed")}
          badgeCaption={challenges.completed.length}
        >
          Completed
        </Tab>
        <Tab
          isSelected={selectedType === "failed"}
          onSelect={() => onSelectType("failed")}
          badgeCaption={challenges.failed.length}
        >
          Failed
        </Tab>
      </menu>
      <div>{children}</div>
    </>
  );
}
