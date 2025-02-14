import { DndContext, DragEndEvent } from "@dnd-kit/core";
import DraggableCard from "./DraggableCard";
import DroppableCard from "./DroppableCard";
import useMonsterStore from "~/stores/useMonsterStore";

type Props = {
  Monsters: Monster[];
  isOpponent: boolean;
};
export default function CardsContainer({ Monsters, isOpponent }: Props) {
  const { setActiveMonster } = useMonsterStore();
  const handleDragEnd = (event: DragEndEvent) => {
    const { active } = event;
    // Find the dragged monster
    const draggedMonster = Monsters.find((m) => m.id === active.id);

    if (draggedMonster) {
      // Add to droppedMonsters and remove from sourceMonsters
      setActiveMonster(draggedMonster);
    }
  };
  return (
    <DndContext
      onDragEnd={(e) => {
        isOpponent ? null : handleDragEnd(e);
      }}
    >
      <div
        className={`grid grid-cols-10 gap-4 mb-4 relative ${
          isOpponent ? "items-start" : "items-end"
        } `}
      >
        <div className="col-span-1 flex">
          <div
            className={`border-2 border-blue-400/30 rounded-lg flex flex-col ${
              isOpponent ? "h-60" : "h-80"
            } bg-blue-500/10 backdrop-blur-sm shadow-lg transition-all hover:border-blue-400/50`}
          >
            {Array(5)
              .fill(1)
              .map((_, index) => (
                <img
                  key={index}
                  className={`h-auto object-contain ${index != 0 && "-mt-20"}`}
                  src="/cards/back-card.png"
                  alt="back-card"
                />
              ))}
          </div>
        </div>
        <div className="col-span-8">
          <div
            className={`relative z-30 border-2 border-blue-400/30 rounded-lg ${
              isOpponent ? "h-20" : "h-44"
            }  bg-blue-500/10 backdrop-blur-sm shadow-lg transition-all hover:border-blue-400/50 flex justify-center gap-3`}
          >
            {Monsters.map((monster) => (
              <DraggableCard key={monster.id} monster={monster} />
            ))}
          </div>
        </div>
        <div className="col-span-1">
          <div
            className={`border-2 border-blue-400/30 rounded-lg ${
              isOpponent ? "h-20" : "h-44"
            } bg-blue-500/10 backdrop-blur-sm shadow-lg transition-all hover:border-blue-400/50 flex items-center justify-center`}
          >
            <img
              className="h-full object-cover"
              src="/cards/back-card.png"
              alt="back-card"
            />
          </div>
        </div>
        <div
          className={`absolute z-10 ${
            isOpponent ? "bottom-0" : "top-0 "
          } left-1/2 -translate-x-1/2`}
        >
          <DroppableCard />
        </div>
      </div>
    </DndContext>
  );
}
