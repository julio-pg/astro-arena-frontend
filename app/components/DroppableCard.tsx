import { useDroppable } from "@dnd-kit/core";
import useMonsterStore from "~/stores/useMonsterStore";
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
    opponentActiveMonster,
    pointsOfDamage,
  } = useMonsterStore();

  // attack logic
  function handleAttack() {
    setAttackModal(true);
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={` border-2 border-blue-400/30 rounded-lg h-32 bg-blue-500/10 backdrop-blur-sm shadow-lg transition-all  w-32  ${
        isDamaged && isOpponent && "scratch-effect"
      }`}
    >
      {pointsOfDamage > 0 && (
        <div className="bg-yellow-500 rounded-full inline p-2 shadow-lg border border-white absolute font-bold">
          -{pointsOfDamage}
        </div>
      )}

      {activeMonster && (
        <button
          onClick={isOpponent ? undefined : handleAttack}
          style={{ background: "none", border: "none", padding: 0 }}
        >
          <img
            src={
              isOpponent ? opponentActiveMonster?.image : activeMonster.image
            }
            alt={isOpponent ? opponentActiveMonster?.name : activeMonster.name}
            style={{ cursor: "pointer" }}
          />
        </button>
      )}
    </div>
  );
}
