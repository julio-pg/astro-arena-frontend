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

// Get player data
export async function getPlayerData(id: string) {
  const response = await AxiosInstance.get(`/astro-arena/player/${id}`);
  return response.data;
}
