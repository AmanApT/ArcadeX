import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TopSellers = () => {
  const [bgImage, setBgImage] = useState("/src/assets/card_img.webp");
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const { games } = useSelector((store) => store.game);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const containerLeft = containerRef.current.getBoundingClientRect().left;

      let firstVisibleCard = null;
      for (let card of cardsRef.current) {
        if (!card) continue;
        const cardRect = card.getBoundingClientRect();

        if (cardRect.right > containerLeft) {
          firstVisibleCard = card;
          break;
        }
      }

      if (firstVisibleCard) {
        setBgImage(firstVisibleCard.dataset.bg);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (container) container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className=" text-white relative transition-all duration-500 font-kdam">
      <div className="absolute inset-0 brightness-25 -z-1 bg-black"></div>
      <div className="p-20 flex flex-col gap-10">
        <div>
          <h1 className="!text-4xl">Top Sellers</h1>
        </div>

        <div
          ref={containerRef}
          className="scroll-container p-4 flex gap-8 overflow-x-auto scrollbar-hide"
        >
          {/* {games.map((eachGame, index) => (
            <div
              key={index}
              data-bg={eachGame.banner_img}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-cover  cursor-pointer hover:scale-105 hover:shadow-2xl shadow-red-400 transition-all ease-in bg-center w-60 h-84 rounded-xl shrink-0"
              style={{ backgroundImage: `url(${eachGame.banner_img})` }}
              onClick={() => navigate(`/game/${eachGame?._id}`)}
            ></div>
          ))} */}
          {games.map((eachGame, index) => (
            <div
              key={index}
              data-bg={eachGame.banner_img}
              ref={(el) => (cardsRef.current[index] = el)}
              className="game-card bg-cover cursor-pointer w-60 h-84 rounded-xl shrink-0"
              style={{ backgroundImage: `url(${eachGame.banner_img})` }}
              onClick={() => navigate(`/game/${eachGame?._id}`)}
            >
              <div className="game-card-content">
                <h3 className="text-lg font-bold truncate">{eachGame.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm opacity-90">
                    {eachGame.genre || "Adventure"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-8 my-4 p-4">
          <div
            onClick={() => navigate(`/game/${games[games?.length - 1]._id}`)}
            style={{
              backgroundImage: `url(${games[games?.length - 1].banner_img})`,
            }}
            className="game-card bg-cover cursor-pointer bg-center w-[25%] h-84 rounded-xl shrink-0"
          >
            <div className="game-card-content">
              <h3 className="text-xl font-bold truncate">
                {games[games?.length - 1].title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm opacity-90">
                  {games[games?.length - 1].genre || "Featured Game"}
                </span>
              </div>
            </div>
          </div>
          <div
            onClick={() => navigate(`/game/${games[games?.length - 2]._id}`)}
            style={{
              backgroundImage: `url(${games[games?.length - 2].banner_img})`,
            }}
            className="game-card bg-cover cursor-pointer bg-center w-[25%] h-84 rounded-xl shrink-0"
          >
            <div className="game-card-content">
              <h3 className="text-xl font-bold truncate">
                {games[games?.length - 2].title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm opacity-90">
                  {games[games?.length - 2].genre || "Featured Game"}
                </span>
              </div>
            </div>
          </div>
          <div
            onClick={() => navigate(`/game/${games[games?.length - 3]._id}`)}
            style={{
              backgroundImage: `url(${games[games?.length - 3].banner_img})`,
            }}
            className="game-card bg-cover cursor-pointer bg-center w-[25%] h-84 rounded-xl shrink-0"
          >
            <div className="game-card-content">
              <h3 className="text-xl font-bold truncate">
                {games[games?.length - 3].title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm opacity-90">
                  {games[games?.length - 3].genre || "Featured Game"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
