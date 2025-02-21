import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import BattleEndedModal from "~/components/BattleEndedModal";
import CardModal from "~/components/CardModal";
import CardsContainer from "~/components/CardsContainer";
import Coin from "~/components/Coin";
import { defaultPlayer } from "~/config";
import {
  handleEndBattle,
  handlePcActiveMonster,
  socket,
} from "~/services/battles";
import useOpponentStore from "~/stores/useOpponentStore";
import usePlayerStore from "~/stores/usePlayerStore";
import { playAudio } from "~/utils/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "Astro Arena" },
    { name: "description", content: "Astro Arena card game" },
  ];
};
// export async function loader() {
//   const testMonsters: Monster[] = [
//     {
//       id: 1,
//       name: "Cinderwing Dragon",
//       image: "/cards/dragon.jpg",
//       type: "fire",
//       healthPoints: 30,
//       abilities: [
//         {
//           name: "Scratch",
//           description: "a basic scratch attack",
//           power: 10,
//         },
//       ],
//     },
//     {
//       id: 2,
//       name: "Cyber-Gator",
//       image: "/cards/alligator.jpg",
//       type: "water",
//       healthPoints: 30,
//       abilities: [
//         {
//           name: "Scratch",
//           description: "a basic scratch attack",
//           power: 10,
//         },
//       ],
//     },
//     {
//       id: 3,
//       name: "Bramble Bear",
//       image: "/cards/bear.jpg",
//       type: "grass",
//       healthPoints: 30,
//       abilities: [
//         {
//           name: "Scratch",
//           description: "a basic scratch attack",
//           power: 10,
//         },
//       ],
//     },
//     {
//       id: 167,
//       name: "Cinderwing Dragon",
//       image: "/cards/dragon.jpg",
//       type: "fire",
//       healthPoints: 30,
//       abilities: [
//         {
//           name: "Scratch",
//           description: "a basic scratch attack",
//           power: 10,
//         },
//       ],
//     },
//     {
//       id: 123,
//       name: "Cinderwing Dragon",
//       image: "/cards/dragon.jpg",
//       type: "fire",
//       healthPoints: 30,
//       abilities: [
//         {
//           name: "Scratch",
//           description: "a basic scratch attack",
//           power: 10,
//         },
//       ],
//     },
//   ];
//   return testMonsters;
// }
export default function Game() {
  const [playerMessage, setPlayerMessage] = useState("");
  const [OpponentMessage, setOpponentMessage] = useState("");
  const [battleEnded, setBattleEnded] = useState({ ended: false, winner: "" });
  // const [animate, setAnimate] = useState(false);
  const {
    setSourceMonsters,
    attackModal,
    sourceMonsters,
    setBattleData,
    setIsDamaged,
    setPointsOfDamage,
    battleData,
    currentTurn,
    setCurrentTurn,
    pointsOfDamage,
  } = usePlayerStore();
  const {
    setOpponentMonsters,
    opponentMonsters,
    setOpponentActiveMonster,
    OpponentPointsOfDamage,
    setOpponentPointsOfDamage,
    setOpponentIsDamaged,
    opponentActiveMonster,
  } = useOpponentStore();

  useEffect(() => {
    socket.connect();
    socket.emit("startBattle", { playerId: defaultPlayer });
    // Listen for 'battleStarted' event
    socket.on("battleStarted", (data: Battle) => {
      setBattleData(data);
      const localPlayer = data.participants.find(
        ({ id }) => id == defaultPlayer
      );
      const pcPlayer = data.participants.find(({ id }) => id !== defaultPlayer);
      setSourceMonsters(localPlayer!.monsters);
      setOpponentMonsters(pcPlayer!.monsters);
    });

    // Listen for 'battleEnded' event
    socket.on("battleEnded", (data) => {
      console.log("Battle ended:", data);
    });

    // Listen for errors
    socket.on("error", (error) => {
      console.error("WebSocket error:", error);
    });

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.off("connect");
      socket.off("battleStarted");
      socket.off("battleUpdate");
      socket.off("monsterActivated");
    };
  }, []);
  useEffect(() => {
    if (!opponentActiveMonster && currentTurn !== defaultPlayer) {
      handlePcActiveMonster(battleData!.id, opponentMonsters);
    }
  }, [opponentActiveMonster, currentTurn]);
  useEffect(() => {
    if (battleData) {
      if (opponentMonsters.length === 0) {
        handleEndBattle(battleData.id, defaultPlayer);
      } else if (sourceMonsters.length === 0) {
        const pcWinner = battleData.participants.find(
          (p) => p.id !== defaultPlayer
        );
        handleEndBattle(battleData.id, pcWinner!.id);
      }
    }
  }, [sourceMonsters, opponentMonsters]);
  // listen when the players select or change the active monster
  socket.on("monsterActivated", ({ message, nextTurn }: activeMonsterEvent) => {
    // setAnimate(true); // Trigger animation
    setPlayerMessage(message);
    // setAnimate(false);
    setCurrentTurn(nextTurn);
  });

  // listen the player battle updates
  socket.on("battleUpdate", ({ damage, message }: attackMonsterEvent) => {
    playAudio("/sounds/FireAttackEffect.mp3");
    setOpponentIsDamaged(true);
    setTimeout(() => setOpponentIsDamaged(false), 2000); // Reset after animation
    setOpponentPointsOfDamage(OpponentPointsOfDamage + damage);
    setPlayerMessage(message);
  });
  // listen the pc battle updates
  socket.on("pcUpdate", ({ damage, message }: attackMonsterEvent) => {
    playAudio("/sounds/FireAttackEffect.mp3");
    setIsDamaged(true);
    setTimeout(() => setIsDamaged(false), 2000); // Reset after animation
    setPointsOfDamage(pointsOfDamage + damage);
    setOpponentMessage(message);
  });
  socket.on(
    "pcMonsterActivated",
    ({ message, monsterId, nextTurn }: activeMonsterEvent) => {
      setOpponentMessage(message);
      setOpponentActiveMonster(
        opponentMonsters.find((m) => m.id === monsterId)!
      );
      const availableMonsters = opponentMonsters.filter(
        (m) => m.id !== monsterId
      );
      setOpponentMonsters(availableMonsters);
      setCurrentTurn(nextTurn);
    }
  );
  socket.on("battleEnded", (data) => {
    setBattleEnded({ ended: true, winner: data.winner });
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 p-4 relative grid grid-rows-2">
      {/* <audio ref={audioRef} src="/sounds/FireAttackEffect.mp3">
        <track kind="captions" srcLang="en" label="english_captions" />
      </audio> */}
      {attackModal && <CardModal />}
      {/* coin */}
      <Coin />
      {/* Opponent's Side */}
      <CardsContainer isOpponent={true} Monsters={opponentMonsters} />
      {/* Center Field */}

      {/* Player's Side */}
      <CardsContainer isOpponent={false} Monsters={sourceMonsters} />
      <p
        className={`absolute left-32 top-[35%] -translate-y-1/2 text-2xl font-bold`}
      >
        {OpponentMessage}
      </p>
      <p
        className={`absolute left-10 bottom-1/2 translate-y-1/2 text-6xl text-red-500 font-bold`}
      >
        VS
      </p>
      <p className={`absolute left-32 bottom-[35%] text-2xl font-bold`}>
        {playerMessage}
      </p>

      {/* Pokémon Logo Watermark */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full flex items-center justify-center opacity-10">
          <div className="w-96 h-96 border-[16px] rounded-full border-blue-400/30 transform -rotate-45" />
        </div>
      </div>
      {battleEnded.ended && <BattleEndedModal winner={battleEnded.winner} />}
    </div>
  );
}
