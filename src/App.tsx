import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Game from "./pages/Game";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
