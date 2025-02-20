import { create } from "zustand";

type OpponentStore = {
  opponentMonsters: Monster[];
  setOpponentMonsters: (monsters: Monster[]) => void;
  opponentActiveMonster: Monster | null;
  setOpponentActiveMonster: (monster: Monster | null) => void;
  opponentEliminatedMonsters: Monster[];
  setOpponentEliminatedMonsters: (monsters: Monster[]) => void;
  opponentIsDamaged: boolean;
  setOpponentIsDamaged: (isDamaged: boolean) => void;
  OpponentPointsOfDamage: number;
  setOpponentPointsOfDamage: (OpponentPointsOfDamage: number) => void;
};

const useOpponentStore = create<OpponentStore>((set) => ({
  opponentMonsters: [],
  setOpponentMonsters: (monsters) => set({ opponentMonsters: monsters }),
  opponentActiveMonster: null,
  setOpponentActiveMonster: (monster) =>
    set({ opponentActiveMonster: monster }),
  opponentEliminatedMonsters: [],
  setOpponentEliminatedMonsters: (monsters) =>
    set({ opponentEliminatedMonsters: monsters }),
  opponentIsDamaged: false,
  setOpponentIsDamaged: (opponentIsDamaged) => set({ opponentIsDamaged }),
  OpponentPointsOfDamage: 0,
  setOpponentPointsOfDamage: (OpponentPointsOfDamage) =>
    set({ OpponentPointsOfDamage }),
}));

export default useOpponentStore;
