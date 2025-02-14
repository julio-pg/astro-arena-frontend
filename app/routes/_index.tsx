import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CardsContainer from "~/components/CardsContainer";
import Coin from "~/components/Coin";

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
      abilities: [
        {
          name: "Scratch",
          description: "a basic scratch attack",
          power: 10,
        },
      ],
    },
    {
      id: 1,
      name: "Cinderwing Dragon",
      image: "/cards/dragon.jpg",
      type: "fire",
      abilities: [
        {
          name: "Scratch",
          description: "a basic scratch attack",
          power: 10,
        },
      ],
    },
    {
      id: 1,
      name: "Cinderwing Dragon",
      image: "/cards/dragon.jpg",
      type: "fire",
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 p-4 relative">
      {/* coin */}
      <Coin />
      {/* Game Board Container */}
      <div className="max-w-7xl mx-auto h-screen relative">
        {/* Opponent's Side */}
        <CardsContainer Monsters={monsters} isOpponent={true} />
        {/* Center Field */}

        {/* Player's Side */}
        <CardsContainer Monsters={monsters} isOpponent={false} />

        {/* Pokémon Logo Watermark */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full flex items-center justify-center opacity-10">
            <div className="w-96 h-96 border-[16px] rounded-full border-blue-400/30 transform -rotate-45" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
