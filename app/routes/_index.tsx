import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import CardModal from "~/components/CardModal";
import CardsContainer from "~/components/CardsContainer";
import Coin from "~/components/Coin";
import useMonsterStore from "~/stores/useMonsterStore";

export const meta: MetaFunction = () => {
  return [
    { title: "Astro Arena" },
    { name: "description", content: "Astro Arena card game" },
  ];
};
export async function loader() {
  const testMonsters: Monster[] = [
    {
      id: 1,
      name: "Cinderwing Dragon",
      image: "/cards/dragon.jpg",
      type: "fire",
      healthPoints: 30,
      abilities: [
        {
          name: "Scratch",
          description: "a basic scratch attack",
          power: 10,
        },
      ],
    },
    {
      id: 2,
      name: "Cyber-Gator",
      image: "/cards/alligator.jpg",
      type: "water",
      healthPoints: 30,
      abilities: [
        {
          name: "Scratch",
          description: "a basic scratch attack",
          power: 10,
        },
      ],
    },
    {
      id: 3,
      name: "Bramble Bear",
      image: "/cards/bear.jpg",
      type: "grass",
      healthPoints: 30,
      abilities: [
        {
          name: "Scratch",
          description: "a basic scratch attack",
          power: 10,
        },
      ],
    },
    {
      id: 167,
      name: "Cinderwing Dragon",
      image: "/cards/dragon.jpg",
      type: "fire",
      healthPoints: 30,
      abilities: [
        {
          name: "Scratch",
          description: "a basic scratch attack",
          power: 10,
        },
      ],
    },
    {
      id: 123,
      name: "Cinderwing Dragon",
      image: "/cards/dragon.jpg",
      type: "fire",
      healthPoints: 30,
      abilities: [
        {
          name: "Scratch",
          description: "a basic scratch attack",
          power: 10,
        },
      ],
    },
  ];
  return testMonsters;
}

function Index() {
  const monsters = useLoaderData<typeof loader>();
  const { setSourceMonsters, attackModal, setSoundRef } = useMonsterStore();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setSourceMonsters(monsters);
    setSoundRef(audioRef);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 p-4 relative grid grid-rows-2">
      <audio ref={audioRef} src="/sounds/FireAttackEffect.mp3">
        <track kind="captions" srcLang="en" label="english_captions" />
      </audio>
      {attackModal && <CardModal />}
      {/* coin */}
      <Coin />
      {/* Opponent's Side */}
      <CardsContainer isOpponent={true} />
      {/* Center Field */}

      {/* Player's Side */}
      <CardsContainer isOpponent={false} />

      {/* Pokémon Logo Watermark */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full flex items-center justify-center opacity-10">
          <div className="w-96 h-96 border-[16px] rounded-full border-blue-400/30 transform -rotate-45" />
        </div>
      </div>
    </div>
  );
}

export default Index;
