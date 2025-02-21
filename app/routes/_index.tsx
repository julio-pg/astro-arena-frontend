import type { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import BattleRow from "~/components/BattleRow";
import { getLastBattles } from "~/services/battles";

export const meta: MetaFunction = () => {
  return [
    { title: "Astro Arena" },
    { name: "description", content: "Astro Arena card game" },
  ];
};

export async function loader() {
  const lastBattles = await getLastBattles();
  return { lastBattles };
}
function Index() {
  const { lastBattles } = useLoaderData<typeof loader>();
  return (
    <div className="min-h-screen textured-background p-4 relative ">
      <audio src="/sounds/FireAttackEffect.mp3">
        <track kind="captions" srcLang="en" label="english_captions" />
      </audio>

      <div className="min-h-[90vh] w-full lg:px-32 md:px-12 px-8 py-5 grid grid-rows-3 gap-6">
        <div className="row-span-1 w-full animate-intro-fade-down flex">
          <Link
            to={"/game"}
            className="w-full max-h-max bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 animate-gradient-x hover:opacity-80 transition-opacity text-center text-6xl font-bold rounded-lg py-10 "
          >
            Start Game
          </Link>
        </div>
        <div className="rounded-lg p-6 row-span-2 animate-intro-fade-up  bg-indigo-900 bg-opacity-50 backdrop-blur-sm shadow-lg  max-sm:overflow-x-scroll">
          <div className="text-4xl font-bold">Battles Historial</div>
          <div className="flex flex-col gap-4 min-w-[30rem]">
            <div className="flex font-bold text-lg border-b border-white py-3">
              <p className="w-1/4">Date</p>
              <p className="w-1/4 ">Winner</p>
            </div>
            {lastBattles.map((battle) => (
              <BattleRow key={battle.id} battle={battle} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
