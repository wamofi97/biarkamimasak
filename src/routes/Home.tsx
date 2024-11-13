
import meme from "../assets/meme.jpg"
import { useState } from "react"
import IngredientInputSection from "../components/ingredient-input";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import useSound from 'use-sound';
import lethimcook from "/lethimcook.mp3"
import lethimcook2 from "/lethimcook2.mp3"
import { ModeToggle } from "@/components/mode-toggle";
import ShimmeringText from "@/components/shimmeringtext"

export default function Home() {
  const music = [lethimcook, lethimcook2];
  const [musicIndex, setMusicIndex] = useState(1);
  const [play] = useSound(music[musicIndex], { volume: 0.5 });

  const toggleMusic = () => {
    setMusicIndex((prevIndex) => (prevIndex + 1) % music.length);
  };

  return (
    <div className="min-h-screen max-w-4xl flex flex-col mx-auto py-10 ">
      <div className="flex flex-col justify-center items-center ">
        {/* <div className="absolute top-0 z-[-2] h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div> */}
        
        <div className="">
            <div className="text-center w-full pt-4">
              <h1 className="text-3xl font-logo font-bold my-2"><span>🧑‍🍳</span><ShimmeringText text="Biar Kami Masak" /><span>🍴</span></h1>
              <h2>A smart recipe recommender that provide the best recipe based on your available ingredients.</h2>
            </div>
            
            <div className=" w-full px-4 mt-4">
              <div className="flex items-center">
                <p className="italic">let-him-cook </p>
                <Button onClick={() => play()} onClickCapture={toggleMusic}  variant="outline" className="ml-2 h-8 w-8"><Volume2/> </Button>
              </div>
              <p className="text-sm">Definition : to let someone do what they are doing because it's interesting or it may result in something. <span className="group inline-block relative w-20">
                <p className="text-sm italic  opacity-80  underline">Source</p>
                <img className="absolute -top-4 scale-[0.1] opacity-0 rounded-2xl w-20 h-16 group-hover:scale-125 group-hover:opacity-100 transition-transform duration-300" src={meme} alt="trust me bro meme" />
              </span></p>
              
            </div>
        </div>      

        <IngredientInputSection />

        <div className="fixed bottom-0 w-full max-w-4xl">
          <div className="absolute bottom-0 right-0 p-4">
              <ModeToggle />
          </div>  
        </div>
      </div>
    </div>
  )
}
