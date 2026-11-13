import React from "react";
import {Composition} from "remotion";
import {Video} from "./Video";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="BeatCBS"
      component={Video}
      durationInFrames={1200}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{
        whatsapp: "083899597502",
        dp: "Rp600 RIBU",
        presenter: "SALES HONDA",
        // Setelah public/voiceover.mp3 tersedia, isi menjadi "voiceover.mp3".
        voiceover: "",
      }}
    />
  );
};
