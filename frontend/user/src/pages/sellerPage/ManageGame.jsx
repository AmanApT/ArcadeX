/* eslint-disable react/prop-types */
const ManageGame = ({ games, setGames }) => {
  // const handleDelete = (game) => {
  //   setGames(games.filter((g) => g !== game));
  // };

  return (
    <section>
      <h2 className="text-2xl font-bold text-purple-400">Manage Games</h2>
      <div className="mt-6 space-y-4">
        {games.map((game, i) => (
          <div
            key={i}
            className="flex justify-between p-4 bg-gray-800 rounded-lg border border-gray-700 shadow-md"
          >
            <span className="text-lg">{game.title}</span>
            <button
              // onClick={() => handleDelete(game)}
              className="bg-red-500 px-3 py-2 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ManageGame;
