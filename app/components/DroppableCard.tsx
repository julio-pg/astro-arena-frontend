import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";
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
  const { activeMonster, isDamaged, setIsDamaged } = useMonsterStore();

  // attack logic

  const handleDamage = () => {
    setIsDamaged(true);
    setTimeout(() => setIsDamaged(false), 500); // Reset after animation
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={` border-2 border-blue-400/30 rounded-lg h-32 bg-blue-500/10 backdrop-blur-sm shadow-lg transition-all  w-32  ${
        isDamaged && "scratch-effect"
      }`}
    >
      <button onClick={handleDamage}>test</button>
      <div className="bg-yellow-500 rounded-full inline p-2 shadow-lg border border-white absolute font-bold">
        -10
      </div>

      {activeMonster && !isOpponent && (
        <img src={activeMonster.image} alt={activeMonster.name} />
      )}
    </div>
  );
}
