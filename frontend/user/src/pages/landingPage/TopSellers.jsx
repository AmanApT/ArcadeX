import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const TopSellers = () => {
  const [bgImage, setBgImage] = useState("/src/assets/card_img.webp");
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  // const { games } = useSelector((store) => store.game);

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
      <div
        className="absolute inset-0 brightness-25 -z-1 bg-black"
        // style={{
        //   backgroundImage: `url(${bgImage})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        // }}
      ></div>
      <div className="p-20 flex flex-col gap-10">
        <div>
          <h1 className="!text-4xl">Top Sellers</h1>
        </div>

        <div
          ref={containerRef}
          className="scroll-container flex gap-8 overflow-x-auto scrollbar-hide"
        >
          {[
            "/src/assets/card_img.webp",
            "/src/assets/card_img2.jpg",
            "/src/assets/card_img3.jpg",
            "/src/assets/card_img4.jpg",
            "/src/assets/card_img5.jpg",
            "/src/assets/card_img6.jpg",
            "/src/assets/card_img6.jpg",
            "/src/assets/card_img6.jpg",
            "/src/assets/card_img6.jpg",
            "/src/assets/card_img6.jpg",
            "/src/assets/card_img6.jpg",
            "/src/assets/card_img6.jpg",
            "/src/assets/card_img6.jpg",
          ].map((img, index) => (
            <div
              key={index}
              data-bg={img}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-cover bg-center w-60 h-84 rounded-xl shrink-0"
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          ))}
        </div>

        {/* <div
          ref={containerRef}
          className="scroll-container flex gap-8 overflow-x-auto scrollbar-hide"
        >
          {games.map((eachGame, index) => (
            <div
              key={index}
              data-bg={eachGame.banner_img}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-cover bg-center w-60 h-84 rounded-xl shrink-0"
              style={{ backgroundImage: `url(${eachGame.banner_img})` }}
            ></div>
          ))}
        </div> */}

        <div className="flex gap-8">
          <div className="bg-cover bg-center w-[32%] h-84 rounded-xl shrink-0 bg-[url(/src/assets/bgImage2.jpg)]"></div>
          <div className="bg-cover bg-center w-[32%] h-84 rounded-xl shrink-0 bg-[url(/src/assets/bgImage2.jpg)]"></div>
          <div className="bg-cover bg-center w-[32%] h-84 rounded-xl shrink-0 bg-[url(/src/assets/bgImage2.jpg)]"></div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
