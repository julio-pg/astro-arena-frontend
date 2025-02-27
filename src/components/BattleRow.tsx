export default function BattleRow({ battle }: { battle: Battle }) {
  const winnerData = battle.participants.find((p) => p.id === battle.winner);
  const opponentData = battle.participants.find((p) => p.id !== battle.winner);
  const createdAt = new Date(battle.createdAt).toLocaleString("en");
  return (
    <div
      key={battle.id}
      className="flex justify-between items-center border-b border-white py-3 font-semibold text-lg w-full"
    >
      <p className="w-1/4">{createdAt}</p>
      <p className="w-1/4">{winnerData?.name}</p>
      <div className="w-1/4 flex items-center">
        <p>{winnerData?.name}</p>{" "}
        <p className="w-full text-center text-4xl font-semibold text-red-500">
          vs
        </p>
      </div>
      <p className="w-1/4">{opponentData?.name}</p>
    </div>
  );
}
