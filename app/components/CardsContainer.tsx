import { DndContext, DragEndEvent } from "@dnd-kit/core";
import DraggableCard from "./DraggableCard";
import DroppableCard from "./DroppableCard";
import { handleActiveMonster } from "~/services/battles";
import { defaultPlayer } from "~/config";
import usePlayerStore from "~/stores/usePlayerStore";
import useOpponentStore from "~/stores/useOpponentStore";

type Props = {
  Monsters: Monster[];
  isOpponent: boolean;
};
export default function CardsContainer({ isOpponent, Monsters }: Props) {
  const {
    setActiveMonster,
    setSourceMonsters,
    battleData,
    eliminatedMonsters,
  } = usePlayerStore();
  const { opponentEliminatedMonsters } = useOpponentStore();
  const handleDragEnd = (event: DragEndEvent) => {
    const { active } = event;
    // Find the dragged monster
    const draggedMonster = Monsters.find((m) => m.id === active.id);
    const availableMonsters = Monsters.filter((m) => m.id !== active.id);

    if (draggedMonster) {
      handleActiveMonster(defaultPlayer, draggedMonster.id, battleData!.id);
      // Add to droppedMonsters and remove from sourceMonsters
      setActiveMonster(draggedMonster);
      setSourceMonsters(availableMonsters);
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
        <div className="col-span-1 relative">
          <div
            className={`border-2 border-blue-400/30 rounded-lg h-44
             bg-blue-500/10 backdrop-blur-sm shadow-lg transition-all hover:border-blue-400/50 flex items-center justify-center`}
          >
            <img
              className="h-full object-cover"
              src="/cards/back-card.png"
              alt="back-card"
            />
            <p className="absolute text-6xl font-bold text-black">X6</p>
          </div>
        </div>
        <div className="col-span-8">
          <div
            className={`relative z-30 border-2 border-blue-400/30 rounded-lg 
              h-32 bg-blue-500/10 backdrop-blur-sm shadow-lg transition-all hover:border-blue-400/50 flex justify-center gap-3`}
          >
            {Monsters.map((monster) => (
              <DraggableCard
                key={monster.id}
                monster={monster}
                isOpponent={isOpponent}
              />
            ))}
          </div>
        </div>
        <div className="col-span-1">
          <div
            className={`border-2 border-blue-400/30 rounded-lg h-44 bg-blue-500/10 backdrop-blur-sm shadow-lg transition-all hover:border-blue-400/50 flex items-center justify-center`}
          >
            <img
              className="h-full object-cover"
              src="/cards/back-card.png"
              alt="back-card"
            />
            {isOpponent && opponentEliminatedMonsters.length > 0 && (
              <p className="absolute text-6xl font-bold text-black">
                X{opponentEliminatedMonsters.length}
              </p>
            )}
            {!isOpponent && eliminatedMonsters.length > 0 && (
              <p className="absolute text-6xl font-bold text-black">
                X{eliminatedMonsters.length}
              </p>
            )}
          </div>
        </div>
        <div
          className={`absolute z-10 ${
            isOpponent ? "bottom-0" : "top-0 "
          } left-1/2 -translate-x-1/2`}
        >
          <DroppableCard isOpponent={isOpponent} />
        </div>
      </div>
    </DndContext>
  );
}
