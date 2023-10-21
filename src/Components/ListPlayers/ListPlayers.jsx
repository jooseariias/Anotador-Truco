import { useState, useEffect } from "react";
import img from "../../assets/user.png";
export default function ListPlayers() {
  const [players, setPlayers] = useState({}); // Estado para la lista de jugadores

  // Función para eliminar un jugador por su ID
  const deletePlayer = (playerId) => {
    const updatedPlayers = { ...players };
    delete updatedPlayers[playerId];
    setPlayers(updatedPlayers);
    // Actualiza el localStorage
    localStorage.setItem("players", JSON.stringify(updatedPlayers));
  };

  // Función para aumentar o disminuir los puntos de un jugador
  const updatePoints = (playerId, increment) => {
    const updatedPlayers = { ...players };
    if (updatedPlayers[playerId]) {
      updatedPlayers[playerId].Puntos += increment;
      setPlayers(updatedPlayers);
      // Actualiza el localStorage
      localStorage.setItem("players", JSON.stringify(updatedPlayers));
    }
  };

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem("players"));
    setPlayers(storedPlayers);

    // Agregamos un "escuchador" de eventos personalizado para actualizar la lista de jugadores cuando se agrega uno nuevo
    const updatePlayersList = () => {
      const storedPlayers = JSON.parse(localStorage.getItem("players"));
      setPlayers(storedPlayers);
    };
    window.addEventListener('playerAdded', updatePlayersList);

    return () => {
      // Limpia el "escuchador" de eventos cuando el componente se desmonta
      window.removeEventListener('playerAdded', updatePlayersList);
    };
  }, []);

  return (
    <div>
      <h2 className="text-center underline mb-8">Lista de Jugadores</h2>
      <div>
        {" "}
        {Object.keys(players).length > 0 ? (
          <ul>
            {Object.keys(players).map((playerId) => {
              const player = players[playerId]; 
              return (
                <li
                  className="flex justify-evenly mt-5 items-center border-b-current p-4 border"
                  key={player.id}
                >
                  <div className="flex gap-3  items-center">
                    <p className="flex items-center gap-2 font-semibold ">
                      <img className="w-10 h-10" src={img} alt="User" />
                      {player.Nombre}
                    </p>
                    Puntos:{" "}
                    <p className="text-[#304776] text-[25px] font-extrabold">
                      {player.Puntos}
                      
                    </p>{" "}
                  </div>
                  <div>
                    <button
                      className="bg-green-500 btn hover:bg-green-700 w-10 rounded-md h-10"
                      onClick={() => updatePoints(playerId, 1)}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <button
                      className="bg-blue-300 btn hover:bg-blue-500 w-10 rounded-md h-10"
                      onClick={() => updatePoints(playerId, -1)}
                    >
                      -
                    </button>
                  </div>
                   <div>
                  <button
                    className="bg-red-500 btn hover-bg-red-700 w-10 rounded-[5px]"
                    onClick={() => deletePlayer(playerId)}
                  >
                    Eliminar
                  </button>
                </div>
                  
                </li>
              );
            })}
          </ul>
        ) : (
          <p className=" font-bold text-center text-[20px] underline">
            No hay jugadores en la lista.
          </p>
        )}
      </div>
    </div>
  );
}
