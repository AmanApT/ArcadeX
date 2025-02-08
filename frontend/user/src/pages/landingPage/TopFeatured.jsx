const TopFeatured = () => {
  const games = [
    { name: "Fortnite", price: "Free", img: "src/assets/card_img2.jpg" },
    { name: "GTA V", price: "$29.99", img: "src/assets/card_img2.jpg" },
    {
      name: "Cyberpunk 2077",
      price: "$49.99",
      img: "src/assets/card_img2.jpg",
    },
    { name: "Minecraft", price: "$19.99", img: "src/assets/card_img2.jpg" },
    { name: "Apex Legends", price: "Free", img: "src/assets/card_img2.jpg" },
  ];

  return (
    <section className="w-full bg-black text-white font-kdam py-10 transition-all duration-500">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          {/* Top Add-Ons Section */}
          <div>
            <h2 className="text-2xl font-bold border-b-2 border-gray-600 pb-2">
              Top Add-Ons
            </h2>
            <div className="mt-5 space-y-4">
              {games.map((game, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg"
                >
                  <img
                    className="rounded-xl w-10 sm:w-12 md:w-16 lg:w-20 xl:w-24 hover:cursor-pointer transform hover:scale-105 transition-all duration-300"
                    src={game.img}
                    alt={`${game.name} cover`}
                  />
                  <div>
                    <h3 className="text-lg font-medium hover:text-blue-400 hover:cursor-pointer transition-all duration-300">
                      {game.name}
                    </h3>
                    <p className="opacity-50 text-sm">{game.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block w-px bg-gray-600"></div>

          {/* Top Open-World Section */}
          <div>
            <h2 className="text-2xl font-bold border-b-2 border-gray-600 pb-2">
              Top Open-World
            </h2>
            <div className="mt-5 space-y-4">
              {games.map((game, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg"
                >
                  <img
                    className="rounded-xl w-10 sm:w-12 md:w-16 lg:w-20 xl:w-24 hover:cursor-pointer transform hover:scale-105 transition-all duration-300"
                    src={game.img}
                    alt={`${game.name} cover`}
                  />
                  <div>
                    <h3 className="text-lg font-medium hover:text-blue-400 hover:cursor-pointer transition-all duration-300">
                      {game.name}
                    </h3>
                    <p className="opacity-50 text-sm">{game.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block w-px bg-gray-600"></div>

          {/* Top Multiplayer Section */}
          <div>
            <h2 className="text-2xl font-bold border-b-2 border-gray-600 pb-2">
              Top Multiplayer
            </h2>
            <div className="mt-5 space-y-4">
              {games.map((game, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg"
                >
                  <img
                    className="rounded-xl w-10 sm:w-12 md:w-16 lg:w-20 xl:w-24 hover:cursor-pointer transform hover:scale-105 transition-all duration-300"
                    src={game.img}
                    alt={`${game.name} cover`}
                  />
                  <div>
                    <h3 className="text-lg font-medium hover:text-blue-400 hover:cursor-pointer transition-all duration-300">
                      {game.name}
                    </h3>
                    <p className="opacity-50 text-sm">{game.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopFeatured;
