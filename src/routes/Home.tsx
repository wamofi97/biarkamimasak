import { useState } from "react";
import IngredientInputSection from "../components/ingredient-input";
import useSound from "use-sound";
import lethimcook from "/lethimcook.mp3";
import lethimcook2 from "/lethimcook2.mp3";
import { ModeToggle } from "@/components/mode-toggle";
import ShimmeringText from "@/components/shimmeringtext";

export default function Home() {
  const music = [lethimcook, lethimcook2];
  const [musicIndex, setMusicIndex] = useState(1);
  const [play] = useSound(music[musicIndex], { volume: 0.5 });

  const toggleMusic = () => {
    setMusicIndex((prevIndex) => (prevIndex + 1) % music.length);
  };

  return (
    <div className="min-h-screen max-w-4xl flex flex-col justify-center mx-auto py-10 sm:py-8 ">
      <div className="flex flex-col justify-center items-center ">
        <div className="pt-4 px-3">
          <div className=" text-center w-full ">
            <h1
              onClick={() => play()}
              onClickCapture={toggleMusic}
              className="cursor-pointer md:text-4xl text-2xl font-logo font-bold my-4"
            >
              <span>🧑‍🍳</span>
              <ShimmeringText text="Let Him Cook" />
              <span>🍴</span>
            </h1>
            <h2>
              A smart recipe recommender that provide the best recipe based on
              your available ingredients.
            </h2>
          </div>
        </div>

        <IngredientInputSection />

        <div className="fixed bottom-0 w-full max-w-4xl">
          <div className="absolute bottom-0 right-0 py-8">
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
