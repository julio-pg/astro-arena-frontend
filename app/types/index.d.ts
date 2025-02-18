interface Monster {
  id: number; // Unique identifier (matches the token ID in the smart contract)
  name: string; // Name of the monster (e.g., "Nebula Wisp")
  image: string; // URL or IPFS link to the monster's image
  type: string; // Type of the monster (e.g., "Energy", "Mechanical")
  healthPoints: number;
  abilities: Ability[]; // List of abilities the monster has
}

interface Ability {
  name: string; // Name of the ability (e.g., "Energy Drain")
  description: string; // Description of the ability
  power: number; // Power level of the ability (e.g., 50)
}

interface Player {
  id: string;
  name: string;
  monsters: Monster[];
}
interface Battle {
  id: string;
  participants: Player[];
  currentTurn: string;
  logs: string[];
  status: "active" | "completed";
  winner: string;
}
