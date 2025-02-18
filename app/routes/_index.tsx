import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useEffect } from "react";
import { socket } from "~/services/battles";

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
  useEffect(() => {
    socket.connect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 p-4 relative  ">
      <audio src="/sounds/FireAttackEffect.mp3">
        <track kind="captions" srcLang="en" label="english_captions" />
      </audio>
      <div className="min-h-[90vh] w-full mx-auto max-w-7xl lg:px-32 md:px-12 px-8 py-5 grid grid-rows-2 gap-6">
        <div className="rounded-lg border border-white flex p-6">
          <Link
            to={"/game"}
            className="w-full bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 animate-gradient-x hover:opacity-80 transition-opacity text-center m-auto text-6xl font-bold rounded-lg py-10"
          >
            Start Game
          </Link>
        </div>
        {/* TODO:add the last three battles */}
        <div className="rounded-lg border border-white flex p-6">
          <div>battles Historial</div>
        </div>
      </div>
    </div>
  );
}

export default Index;
