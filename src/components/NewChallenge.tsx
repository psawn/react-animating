import { FormEvent, useContext, useRef, useState } from "react";
import { ChallengesContext } from "../store/challenges-context";
import Modal from "./Modal";
import images from "../assets/images";
import { ImageType } from "./Challenges";
import { motion } from "framer-motion";

export default function NewChallenge({ onDone }: { onDone: () => void }) {
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const deadline = useRef<HTMLInputElement>(null);

  const [selectedImage, setSelectedImage] = useState<ImageType>({
    alt: "",
    src: "",
  });
  const challengeCtx = useContext(ChallengesContext);

  function handleSelectImage(image: ImageType) {
    setSelectedImage(image);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const challenge = {
      title: title.current!.value,
      description: description.current!.value,
      deadline: deadline.current!.value,
      image: selectedImage,
    };

    if (
      !challenge.title.trim() ||
      !challenge.description.trim() ||
      !challenge.deadline.trim() ||
      !challenge.image
    ) {
      return;
    }

    onDone();
    challengeCtx?.addChallenge(challenge);
  }

  return (
    <Modal title="New Challenge" onClose={onDone}>
      <form id="new-challenge" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="title">Title</label>
          <input ref={title} type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input ref={deadline} type="date" name="deadline" id="deadline" />
        </p>

        <ul id="new-challenge-images">
          {images.map((image) => (
            <motion.li
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ type: "spring" }}
              exit={{ opacity: 1, scale: 1 }}
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? "selected" : undefined}
            >
              <img {...image} />
            </motion.li>
          ))}
        </ul>

        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}
