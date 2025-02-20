import { useDroppable } from "@dnd-kit/core";
import { useEffect } from "react";
import useOpponentStore from "~/stores/useOpponentStore";
import usePlayerStore from "~/stores/usePlayerStore";
type Props = {
  isOpponent: boolean;
};
export default function DroppableCard({ isOpponent }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
  };
  const {
    activeMonster,
    isDamaged,
    setAttackModal,
    pointsOfDamage,
    setEliminatedMonsters,
    eliminatedMonsters,
    setActiveMonster,
    setPointsOfDamage,
  } = usePlayerStore();
  const {
    setOpponentActiveMonster,
    opponentActiveMonster,
    OpponentPointsOfDamage,
    setOpponentEliminatedMonsters,
    opponentEliminatedMonsters,
    opponentIsDamaged,
    setOpponentPointsOfDamage,
  } = useOpponentStore();
  // attack logic
  function handleAttack() {
    setAttackModal(true);
  }
  useEffect(() => {
    if (!opponentActiveMonster) {
      return;
    }
    if (opponentActiveMonster?.healthPoints <= OpponentPointsOfDamage) {
      setOpponentEliminatedMonsters([
        ...opponentEliminatedMonsters,
        opponentActiveMonster!,
      ]);
      setOpponentActiveMonster(null);
      setOpponentPointsOfDamage(0);
    }
  }, [OpponentPointsOfDamage]);

  useEffect(() => {
    if (!activeMonster) {
      return;
    }
    if (activeMonster?.healthPoints <= pointsOfDamage) {
      setEliminatedMonsters([...eliminatedMonsters, activeMonster!]);
      setActiveMonster(null);
      setPointsOfDamage(0);
    }
  }, [pointsOfDamage]);
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={` border-2 border-blue-400/30 rounded-lg h-32 bg-blue-500/10 backdrop-blur-sm shadow-lg transition-all  w-32  ${
        isDamaged && !isOpponent && "scratch-effect"
      } ${opponentIsDamaged && isOpponent && "scratch-effect"}`}
    >
      {pointsOfDamage > 0 && !isOpponent && (
        <div className="bg-yellow-500 rounded-full inline p-2 shadow-lg border border-white absolute font-bold">
          -{pointsOfDamage}
        </div>
      )}
      {OpponentPointsOfDamage > 0 && isOpponent && (
        <div className="bg-yellow-500 rounded-full inline p-2 shadow-lg border border-white absolute font-bold">
          -{OpponentPointsOfDamage}
        </div>
      )}

      {!isOpponent ? (
        <button
          onClick={handleAttack}
          style={{ background: "none", border: "none", padding: 0 }}
        >
          <img
            src={activeMonster?.image}
            alt={activeMonster?.name}
            style={{ cursor: "pointer" }}
          />
        </button>
      ) : (
        <img
          src={opponentActiveMonster?.image}
          alt={opponentActiveMonster?.name}
          style={{ cursor: "pointer" }}
        />
      )}
    </div>
  );
}
