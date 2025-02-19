import { defaultPlayer } from "~/config";
import { handleAttack } from "~/services/battles";
import useMonsterStore from "~/stores/useMonsterStore";

// TODO:fix the use of the use-sound library so then I can add sound effects to the game
export default function AttackButton() {
  // 2. Initialize the hook with the audio ref
  const {
    setIsDamaged,
    setAttackModal,
    soundRef,
    battleData,
    activeMonster,
    opponentActiveMonster,
  } = useMonsterStore();
  const handleDamage = () => {
    setIsDamaged(true);
    soundRef.current?.play();
    setTimeout(() => setIsDamaged(false), 2000); // Reset after animation
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
