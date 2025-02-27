import { defaultPlayer } from "@/config";
import { handleAttack } from "@/services/battles";
import useOpponentStore from "@/stores/useOpponentStore";
import usePlayerStore from "@/stores/usePlayerStore";

// TODO:fix the use of the use-sound library so then I can add sound effects to the game
export default function AttackButton() {
  // 2. Initialize the hook with the audio ref
  const { setAttackModal, battleData, activeMonster } = usePlayerStore();
  const { opponentActiveMonster } = useOpponentStore();
  const handleDamage = () => {
    setAttackModal(false);
    handleAttack(
      battleData!.id,
      defaultPlayer,
      activeMonster!.id,
      "tackle",
      opponentActiveMonster!.id
    );
  };

  return (
    <>
      <button
        className="w-full bg-gradient-to-r from-green-400 via-emerald-500 to-lime-500 animate-gradient-x hover:opacity-80 transition-opacity"
        onClick={handleDamage}
      >
        Attack
      </button>
    </>
  );
}
