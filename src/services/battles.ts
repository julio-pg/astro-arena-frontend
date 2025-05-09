import { io } from "socket.io-client";
import AxiosInstance from "./axios";

export const socket = io(import.meta.env.VITE_API_URL, {
  autoConnect: false,
}); // NestJS server URL
// Listen for battle updates
export function handleActiveMonster(
  playerId: string,
  monsterId: string,
  battleId: string
) {
  socket.emit("activeMonster", {
    playerId: playerId,
    monsterId: monsterId,
    battleId: battleId,
  });
}
// Send an attack
export function handleAttack(
  battleId: string,
  attackerId: string,
  attackerMonsterId: string,
  abilityName: string,
  defenderMonsterId: string
) {
  socket.emit("attack", {
    battleId,
    attackerId,
    attackerMonsterId,
    abilityName,
    defenderMonsterId,
  });
}
export function handleEndBattle(battleId: string, winnerId: string) {
  socket.emit("endBattle", { battleId, winnerId });
}
export function handlePcActiveMonster(
  battleId: string,
  playerMonster: Monster,
  availableMonsters: Monster[]
) {
  socket.emit("pcMonster", { battleId, playerMonster, availableMonsters });
}
export function handlePcAttack(battleId: string, pcMonsterId: string) {
  socket.emit("pcAttack", { battleId, pcMonsterId });
}
// Get player data
export async function getPlayerData(id: string) {
  const response = await AxiosInstance.get(`/astro-arena/player/${id}`);
  return response.data;
}

export async function getLastBattles() {
  try {
    const response = await AxiosInstance.get<Battle[]>("/astro-arena/battles");
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
