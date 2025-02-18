import { io } from "socket.io-client";
import AxiosInstance from "./axios";

export const socket = io(import.meta.env.VITE_API_URL, {
  autoConnect: false,
}); // NestJS server URL
// Listen for battle updates

// Send an attack
export function handleAttack(payload: {
  battleId: string;
  attackerId: string;
  attackerMonsterId: string;
  abilityName: string;
  defenderMonsterId: string;
}) {
  socket.emit("attack", payload);
}

// Get player data
export async function getPlayerData(id: string) {
  const response = await AxiosInstance.get(`/astro-arena/player/${id}`);
  return response.data;
}
