import { useDroppable } from "@dnd-kit/core";
import useMonsterStore from "~/stores/useMonsterStore";

export default function DroppableCard() {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
  };
  const { activeMonster } = useMonsterStore();

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border-2 border-blue-400/30 rounded-lg h-32 bg-blue-500/10 backdrop-blur-sm shadow-lg transition-all hover:border-blue-400/50 w-32 "
    >
      {activeMonster && (
        <img src={activeMonster.image} alt={activeMonster.name} />
      )}
    </div>
  );
}
