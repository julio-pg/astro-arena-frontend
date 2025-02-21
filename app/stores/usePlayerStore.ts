import { create } from "zustand";
import { defaultPlayer } from "~/config";

type PlayerStore = {
  sourceMonsters: Monster[];
  setSourceMonsters: (monsters: Monster[]) => void;
  activeMonster: Monster | null;
  setActiveMonster: (monster: Monster | null) => void;
  eliminatedMonsters: Monster[];
  setEliminatedMonsters: (monsters: Monster[]) => void;
  isDamaged: boolean;
  setIsDamaged: (isDamaged: boolean) => void;
  attackModal: boolean;
  setAttackModal: (attackModal: boolean) => void;
  battleData: Battle | null;
  setBattleData: (battleData: Battle | null) => void;
  pointsOfDamage: number;
  setPointsOfDamage: (pointsOfDamage: number) => void;
  currentTurn: string;
  setCurrentTurn: (currentTurn: string) => void;
};

const usePlayerStore = create<PlayerStore>((set) => ({
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
  battleData: null,
  setBattleData: (battleData) => set({ battleData }),
  pointsOfDamage: 0,
  setPointsOfDamage: (pointsOfDamage) => set({ pointsOfDamage }),
  currentTurn: defaultPlayer,
  setCurrentTurn: (currentTurn) => set({ currentTurn }),
}));

export default usePlayerStore;
