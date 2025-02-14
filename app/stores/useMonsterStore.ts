import { create } from "zustand";

type MonsterStore = {
  // Monsters in the CardsContainer
  sourceMonsters: Monster[];
  setSourceMonsters: (monsters: Monster[]) => void;
  // Monsters in the DroppableArea
  activeMonster: Monster | null;
  // Update the dropped monsters
  setActiveMonster: (monster: Monster | null) => void;
  eliminatedMonsters: Monster[];
  setEliminatedMonsters: (monsters: Monster[]) => void;
  isDamaged: boolean;
  setIsDamaged: (isDamaged: boolean) => void;
  attackModal: boolean;
  setAttackModal: (attackModal: boolean) => void;
};

const useMonsterStore = create<MonsterStore>((set) => ({
  sourceMonsters: [],
  setSourceMonsters: (monsters) => set({ sourceMonsters: monsters }),
  activeMonster: null,
  setActiveMonster: (monster) => set({ activeMonster: monster }),
  eliminatedMonsters: [],
  setEliminatedMonsters: (monsters) => set({ eliminatedMonsters: monsters }),
  isDamaged: false,
  setIsDamaged: (isDamaged) => set({ isDamaged }),
  attackModal: false,
  setAttackModal: (attackModal) => set({ attackModal }),
}));

export default useMonsterStore;
