import "./App.css";
import { useGlobalContext } from "./context";
import Modal from "./components/Modal";
import Menu from "./components/Menu";
import GameBoard from "./components/GameBoard";
import Attribution from "./components/Attribution";

function App() {
  const ctx = useGlobalContext();

  return (
    <main>
      {ctx.showMenu && <Menu />}
      {ctx.showModal && <Modal />}
      {ctx.showGame && <GameBoard />}
      <Attribution />
    </main>
  );
}

export default App;
