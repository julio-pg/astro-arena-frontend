// We can safely track hydration in memory state
// outside of the component because it is only
// updated once after the version instance of
// `SomeComponent` has been hydrated. From there,
// the browser takes over rendering duties across
// route changes and we no longer need to worry
// about hydration mismatches until the page is

import { useEffect, useState } from "react";
import useSound from "use-sound";

// reloaded and `isHydrating` is reset to true.
let isHydrating = true;
// TODO:fix the use of the use-sound library so then I can add sound effects to the game
export default function AttackButton() {
  const [isHydrated, setIsHydrated] = useState(!isHydrating);
  const [play] = useSound("/scratch-sound.mp3");
  useEffect(() => {
    isHydrating = false;
    setIsHydrated(true);
  }, []);

  if (isHydrated) {
    return <button onClick={() => play()}>Boop!</button>;
  } else {
    return null;
  }
}
