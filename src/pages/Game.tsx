import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BattleEndedModal from "@/components/BattleEndedModal";
import CardModal from "@/components/CardModal";
import CardsContainer from "@/components/CardsContainer";
import Coin from "@/components/Coin";
import { defaultPlayer } from "@/config";
import {
  handleEndBattle,
  handlePcActiveMonster,
  handlePcAttack,
  socket,
} from "@/services/battles";
import useOpponentStore from "@/stores/useOpponentStore";
import usePlayerStore from "@/stores/usePlayerStore";
import { playAudio } from "@/utils/utils";

export default function Game() {
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
    activeMonster,
  } = usePlayerStore();
  const {
    setOpponentMonsters,
    opponentMonsters,
    setOpponentActiveMonster,
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
      setCurrentTurn(data.currentTurn);
      toast(data.message);
    });
    // listen when the players select or change the active monster
    socket.on(
      "monsterActivated",
      ({ message, nextTurn }: activeMonsterEvent) => {
        // setAnimate(true); // Trigger animation
        toast(message, {
          position: "bottom-center",
        });
        // setAnimate(false);
        setCurrentTurn(nextTurn);
      }
    );

    // listen the player battle updates
    socket.on(
      "battleUpdate",
      ({ damage, message, nextTurn }: attackMonsterEvent) => {
        playAudio("/sounds/FireAttackEffect.mp3");
        setOpponentIsDamaged(true);
        setOpponentPointsOfDamage(damage);
        toast(message, {
          position: "bottom-center",
        });
        setTimeout(() => {
          setOpponentIsDamaged(false);
          setCurrentTurn(nextTurn);
        }, 2000); // Reset after animation
      }
    );
    // listen the pc battle updates
    socket.on(
      "pcUpdate",
      ({ damage, message, nextTurn }: attackMonsterEvent) => {
        playAudio("/sounds/FireAttackEffect.mp3");
        setIsDamaged(true);
        setPointsOfDamage(damage);
        toast(message);
        setTimeout(() => {
          setIsDamaged(false);
          setCurrentTurn(nextTurn);
        }, 2000); // Reset after animation
      }
    );

    socket.on("battleEnded", (data) => {
      setBattleEnded({ ended: true, winner: data.winner });
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
      socket.off("pcUpdate");
      socket.off("pcMonsterActivated");
      socket.off("error");
    };
  }, []);
  useEffect(() => {
    if (!opponentActiveMonster && currentTurn !== defaultPlayer) {
      handlePcActiveMonster(battleData!.id, activeMonster!, opponentMonsters);
    }
    if (
      opponentActiveMonster &&
      activeMonster &&
      currentTurn !== defaultPlayer
    ) {
      handlePcAttack(battleData!.id, opponentActiveMonster.id);
    }
  }, [opponentActiveMonster, currentTurn]);
  useEffect(() => {
    if (battleData) {
      if (opponentMonsters.length === 0 && !opponentActiveMonster) {
        handleEndBattle(battleData.id, defaultPlayer);
      } else if (sourceMonsters.length === 0 && !activeMonster) {
        const pcWinner = battleData.participants.find(
          (p) => p.id !== defaultPlayer
        );
        handleEndBattle(battleData.id, pcWinner!.id);
      }
    }
  }, [sourceMonsters, opponentMonsters, activeMonster, opponentActiveMonster]);
  socket.on(
    "pcMonsterActivated",
    ({ message, monsterId, nextTurn }: activeMonsterEvent) => {
      toast(message);
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
        className={`absolute left-10 bottom-1/2 translate-y-1/2 text-6xl text-red-500 font-bold `}
      >
        VS
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
