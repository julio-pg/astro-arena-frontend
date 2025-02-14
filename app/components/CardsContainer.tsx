type Props = {
  Monsters: Monster[];
  isOpponent: boolean;
};
export default function CardsContainer({ Monsters, isOpponent }: Props) {
  return (
    <div
      className={`grid grid-cols-10 gap-4 mb-4 ${
        isOpponent ? "items-start" : "items-end"
      } `}
    >
      <div className="col-span-1 flex">
        <div
          className={
            "border-2 border-blue-400/30 rounded-lg h-72 bg-blue-500/10 backdrop-blur-sm shadow-lg transition-all hover:border-blue-400/50"
          }
        >
          <img
            className="h-auto object-contain"
            src="/cards/back-card.png"
            alt="back-card"
          />
        </div>
      </div>
      <div className="col-span-8">
        <div
          className={`border-2 border-blue-400/30 rounded-lg ${
            isOpponent ? "h-20" : "h-32"
          }  bg-blue-500/10 backdrop-blur-sm shadow-lg transition-all hover:border-blue-400/50 flex justify-center gap-3`}
        >
          {Monsters.map(({ image, id, name }) => (
            <img
              className={`object-contain  cursor-pointer ${
                !isOpponent &&
                "hover:shadow-lg hover:border-2 hover:border-neutral-200 hover:scale-125 transition-transform"
              } rounded-lg`}
              src={image}
              key={id}
              alt={name}
            />
          ))}
        </div>
      </div>
      <div className="col-span-1">
        <div className="border-2 border-blue-400/30 rounded-lg h-32 bg-blue-500/10 backdrop-blur-sm shadow-lg transition-all hover:border-blue-400/50 flex items-center">
          <img
            className=" h-auto object-contain"
            src="/cards/back-card.png"
            alt="back-card"
          />
        </div>
      </div>
    </div>
  );
}
