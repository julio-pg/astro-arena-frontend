import React from "react";
import { create } from "zustand";

type MonsterStore = {
  sourceMonsters: Monster[];
  setSourceMonsters: (monsters: Monster[]) => void;
  activeMonster: Monster | null;
  setActiveMonster: (monster: Monster | null) => void;
  opponentMonsters: Monster[];
  setOpponentMonsters: (monsters: Monster[]) => void;
  opponentActiveMonster: Monster | null;
  setOpponentActiveMonster: (monster: Monster | null) => void;
  eliminatedMonsters: Monster[];
  setEliminatedMonsters: (monsters: Monster[]) => void;
  isDamaged: boolean;
  setIsDamaged: (isDamaged: boolean) => void;
  attackModal: boolean;
  setAttackModal: (attackModal: boolean) => void;
  soundRef: React.RefObject<HTMLAudioElement>;
  setSoundRef: (soundRef: React.RefObject<HTMLAudioElement>) => void;
  battleData: Battle | null;
  setBattleData: (battleData: Battle | null) => void;
  pointsOfDamage: number;
  setPointsOfDamage: (pointsOfDamage: number) => void;
  OpponentPointsOfDamage: number;
  setOpponentPointsOfDamage: (OpponentPointsOfDamage: number) => void;
};

const useMonsterStore = create<MonsterStore>((set) => ({
  sourceMonsters: [],
  setSourceMonsters: (monsters) => set({ sourceMonsters: monsters }),
  activeMonster: null,
  setActiveMonster: (monster) => set({ activeMonster: monster }),
  opponentMonsters: [],
  setOpponentMonsters: (monsters) => set({ opponentMonsters: monsters }),
  opponentActiveMonster: null,
  setOpponentActiveMonster: (monster) =>
    set({ opponentActiveMonster: monster }),
  eliminatedMonsters: [],
  setEliminatedMonsters: (monsters) => set({ eliminatedMonsters: monsters }),
  isDamaged: false,
  setIsDamaged: (isDamaged) => set({ isDamaged }),
  attackModal: false,
  setAttackModal: (attackModal) => set({ attackModal }),
  soundRef: React.createRef<HTMLAudioElement>(),
  setSoundRef: (soundRef) => set({ soundRef }),
  battleData: null,
  setBattleData: (battleData) => set({ battleData }),
  pointsOfDamage: 0,
  setPointsOfDamage: (pointsOfDamage) => set({ pointsOfDamage }),
  OpponentPointsOfDamage: 0,
  setOpponentPointsOfDamage: (OpponentPointsOfDamage) =>
    set({ OpponentPointsOfDamage }),
}));

export default useMonsterStore;
