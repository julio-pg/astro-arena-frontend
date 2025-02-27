import { Link } from "react-router";
import useOpponentStore from "@/stores/useOpponentStore";
import usePlayerStore from "@/stores/usePlayerStore";

export default function BattleEndedModal({ winner }: { winner: string }) {
  const { resetOpponentState } = useOpponentStore();
  const { resetPlayerState } = usePlayerStore();
  const handleResetState = () => {
    resetOpponentState();
    resetPlayerState();
  };
  return (
    <dialog className="w-full h-full  z-50 grid place-items-center bg-indigo-900/75 text-4xl">
      <div className="rounded-lg border border-white p-6 flex flex-col justify-center items-center gap-3">
        <h1>Battle Ended</h1>
        <h2>Winner: {winner}</h2>
        <Link
          to={"/"}
          onClick={handleResetState}
          className=" bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 animate-gradient-x hover:opacity-80 transition-opacity text-center text-2xl font-bold rounded-lg p-10"
        >
          Back to Main Menu
        </Link>
      </div>
    </dialog>
  );
}
