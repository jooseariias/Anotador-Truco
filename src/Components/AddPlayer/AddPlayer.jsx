import  { useState  } from "react";

export default function AddPlayer() {
  const [player, setPlayer] = useState({ Nombre: "", Puntos: 0 });

  const handleAddPlayer = () => {
    if (player.Nombre) {
      const playerId = new Date().getTime();
      const newPlayer = { id: playerId, Nombre: player.Nombre, Puntos: player.Puntos };
      
      const players = JSON.parse(localStorage.getItem("players")) || {};
      players[playerId] = newPlayer;

      localStorage.setItem("players", JSON.stringify(players));
      setPlayer({ Nombre: "", Puntos: 0 });
      
      // Simplemente agregamos un evento personalizado que se dispara cada vez que se agrega un jugador
      const event = new Event('playerAdded');
      window.dispatchEvent(event);
    }
  }
  return (
    <div>
      <section>
        <div className="flex justify-center mt-5 mb-5">
          <button
            className="btn"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Agregar Jugador
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Nombre del Jugador"
                    className="input input-bordered input-info w-full max-w-xs"
                    value={player.Nombre}
                    onChange={(e) => setPlayer({ Nombre: e.target.value, Puntos: player.Puntos })} // Actualiza el estado
                  />
                  <div>
                    <button className="btn btn-success" onClick={handleAddPlayer}>Agregar</button>
                  </div>
                  <div>
                    <button className="btn bg-red-500">x</button>
                  </div>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      </section>
    </div>
  );
}
