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
  resetOpponentDamage: () => void;
  resetOpponentState: () => void;
};

const useOpponentStore = create<OpponentStore>((set, get) => ({
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
  setOpponentPointsOfDamage: (damage) => {
    // Use `get()` to access the latest state
    const currentPoints = get().OpponentPointsOfDamage;
    set({ OpponentPointsOfDamage: currentPoints + damage });
  },
  resetOpponentDamage: () => set({ OpponentPointsOfDamage: 0 }),

  resetOpponentState() {
    set({
      opponentMonsters: [],
      opponentActiveMonster: null,
      opponentEliminatedMonsters: [],
      opponentIsDamaged: false,
      OpponentPointsOfDamage: 0,
    });
  },
}));

export default useOpponentStore;
