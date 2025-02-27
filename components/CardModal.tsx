import usePlayerStore from "@/stores/usePlayerStore";
import AttackButton from "./AttackButton";

export default function CardModal() {
  const { activeMonster } = usePlayerStore();

  return (
    <dialog className="scene z-50 bg-transparent mr-44 mt-16">
      <div className="card-container rounded-lg ">
        <div className="card rounded-lg shadow-lg">
          <img
            src={activeMonster?.image}
            alt="Active-card"
            className="w-full"
          />
          <AttackButton />
        </div>
      </div>
    </dialog>
  );
}
