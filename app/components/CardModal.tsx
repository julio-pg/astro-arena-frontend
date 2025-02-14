import useMonsterStore from "~/stores/useMonsterStore";

export default function CardModal() {
  const { activeMonster, setIsDamaged } = useMonsterStore();
  const handleDamage = () => {
    setIsDamaged(true);
    setTimeout(() => setIsDamaged(false), 500); // Reset after animation
  };
  return (
    <dialog className="scene z-50 bg-transparent mr-44 ">
      {" "}
      <div className="card-container">
        {" "}
        <div className="card rounded-lg shadow-lg border-2 border-black">
          <img
            src={activeMonster?.image}
            alt="Active-card"
            className="w-full"
          />
          <button className="w-full bg-green-500" onClick={handleDamage}>
            Attack
          </button>
        </div>
      </div>
    </dialog>
  );
}
