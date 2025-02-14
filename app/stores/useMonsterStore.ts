import { create } from "zustand";

type MonsterStore = {
  // Monsters in the CardsContainer
  sourceMonsters: Monster[];
  // Monsters in the DroppableArea
  activeMonster: Monster | null;
  // Update the dropped monsters
  setActiveMonster: (monster: Monster | null) => void;
};

const useMonsterStore = create<MonsterStore>((set) => ({
  sourceMonsters: [],
  activeMonster: null,
  setActiveMonster: (monster) => set({ activeMonster: monster }),
}));

export default useMonsterStore;
