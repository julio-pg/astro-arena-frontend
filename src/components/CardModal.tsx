import usePlayerStore from "@/stores/usePlayerStore";
import AttackButton from "./AttackButton";

export default function CardModal() {
  const { activeMonster } = usePlayerStore();

  return (
    <dialog className="scene w-full h-96 flex justify-end items-center pr-48 z-50 bg-transparent pt-56">
      <div className="card-container rounded-lg ">
        <div className="card rounded-lg shadow-lg">
          <img src={activeMonster?.image} alt="Active-card" className="w-64" />
          <AttackButton />
        </div>
      </div>
    </dialog>
  );
}
