
import "./App.css";
import AddPlayer from "./Components/AddPlayer/AddPlayer";
import ListPlayers from "./Components/ListPlayers/ListPlayers";

function App() {
  return (
    <div>
      <h1 className="text-[50px] text-center font-mono ">Truco</h1>
      <h2 className="text-[30px] text-center font-mono ">Anotador Puntos</h2>
      <AddPlayer/>
      <ListPlayers/>
      <section className="flex mt-80">
        <div className="bg-green-400 w-[50%] h-[100vh]">s</div>
        <div className="bg-green-600 w-[50%] h-[100vh]">a</div>
      </section>
    </div>
  );
}

export default App;
