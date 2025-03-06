import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TopFeatured = () => {
  const games = useSelector((store) => store.game.games);
  const navigate = useNavigate();

  const topMultiplayer = [...games]
    ?.filter((game) => game.multiplayer === true)
    .sort((a, b) => b.sold_copies - a.sold_copies)
    .slice(0, 5);

  const topOnline = [...games]
    ?.filter((game) => game.genre === "Horror")
    .sort((a, b) => b.sold_copies - a.sold_copies)
    .slice(0, 5);

  const topAction = [...games]
    ?.filter((game) => game.genre === "Action")
    .sort((a, b) => b.sold_copies - a.sold_copies)
    .slice(0, 5);

  return (
    <section className="w-full bg-black text-white font-kdam py-10 transition-all duration-500">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          {/* Top Horror Section */}
          <div>
            <h2 className="text-2xl font-bold border-b-2 border-gray-600 pb-2">
              Top Horror Games
            </h2>
            <div className="mt-5 space-y-4">
              {topOnline?.map((game, index) => (
                // <div
                //   key={index}
                //   className="flex items-center gap-4 p-3 rounded-lg"
                //   onClick={() => navigate(`/game/${game?._id}`)}
                // >
                //   <img
                //     className="rounded-xl w-10 sm:w-12 md:w-16 lg:w-20 xl:w-24 hover:cursor-pointer transform hover:scale-105 transition-all duration-300"
                //     src={game?.banner_img}
                //     alt={`${game?.title} cover`}
                //   />
                //   <div>
                //     <h3 className="text-lg font-medium hover:text-red-400 hover:cursor-pointer transition-all duration-300">
                //       {game?.title}
                //     </h3>
                //     <p className="opacity-50 text-sm">$ {game?.price}</p>
                //   </div>
                // </div>
                <div
                  key={index}
                  className="glass-list-item flex cursor-pointer items-center gap-4 p-3 rounded-lg"
                  onClick={() => navigate(`/game/${game?._id}`)}
                >
                  <div className="glass-list-item-image">
                    <img
                      className="rounded-xl w-10 sm:w-12 md:w-16 lg:w-20 xl:w-24 hover:cursor-pointer"
                      src={game?.banner_img}
                      alt={`${game?.title} cover`}
                    />
                  </div>
                  <div>
                    <h3 className="glass-list-item-title text-lg font-medium hover:cursor-pointer">
                      {game?.title}
                    </h3>
                    <p className="glass-list-item-price opacity-50 text-sm">
                      $ {game?.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block w-px bg-gray-600"></div>

          {/* Top Action Section */}
          <div>
            <h2 className="text-2xl font-bold border-b-2 border-gray-600 pb-2">
              Top Action Games
            </h2>
            <div className="mt-5 space-y-4">
              {topAction?.map((game, index) => (
                <div
                key={index}
                className="glass-list-item flex cursor-pointer items-center gap-4 p-3 rounded-lg"
                onClick={() => navigate(`/game/${game?._id}`)}
              >
                <div className="glass-list-item-image">
                  <img
                    className="rounded-xl w-10 sm:w-12 md:w-16 lg:w-20 xl:w-24 hover:cursor-pointer"
                    src={game?.banner_img}
                    alt={`${game?.title} cover`}
                  />
                </div>
                <div>
                  <h3 className="glass-list-item-title text-lg font-medium hover:cursor-pointer">
                    {game?.title}
                  </h3>
                  <p className="glass-list-item-price opacity-50 text-sm">
                    $ {game?.price}
                  </p>
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
              {topMultiplayer?.map((game, index) => (
              <div
              key={index}
              className="glass-list-item flex cursor-pointer items-center gap-4 p-3 rounded-lg"
              onClick={() => navigate(`/game/${game?._id}`)}
            >
              <div className="glass-list-item-image">
                <img
                  className="rounded-xl w-10 sm:w-12 md:w-16 lg:w-20 xl:w-24 hover:cursor-pointer"
                  src={game?.banner_img}
                  alt={`${game?.title} cover`}
                />
              </div>
              <div>
                <h3 className="glass-list-item-title text-lg font-medium hover:cursor-pointer">
                  {game?.title}
                </h3>
                <p className="glass-list-item-price opacity-50 text-sm">$ {game?.price}</p>
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
