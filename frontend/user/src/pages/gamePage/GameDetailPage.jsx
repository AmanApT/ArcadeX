import GameCarousel from "./GameCarousel";
import GameNav from "./GameNav";
import GameReq from "./GameReq";
import GameRight from "./GameRight";

const GameDetailPage = () => {
  return (
    <section className="bg-black  text-white font-kdam">
      <GameNav />
      <div className="flex justify-center p-2 py-8 ">
        <div className="w-7/12">
          <h1 className="text-2xl my-4">Assassins Creed Shadows</h1>
          <div>
            <GameCarousel />
          </div>
          <div className="flex gap-4 my-6">
            <img
              className="w-[8rem] object-cover"
              src="https://cdn2.unrealengine.com/en-egst-storelandscape-2560x1440-2560x1440-22bb1c87b018.jpg?resize=1&w=480&h=270&quality=high"
              alt=""
            />
            <img
              className="w-[8rem] object-cover"
              src="https://cdn2.unrealengine.com/en-egst-storelandscape-2560x1440-2560x1440-22bb1c87b018.jpg?resize=1&w=480&h=270&quality=high"
              alt=""
            />
            <img
              className="w-[8rem] object-cover"
              src="https://cdn2.unrealengine.com/en-egst-storelandscape-2560x1440-2560x1440-22bb1c87b018.jpg?resize=1&w=480&h=270&quality=high"
              alt=""
            />
            <img
              className="w-[8rem] object-cover"
              src="https://cdn2.unrealengine.com/en-egst-storelandscape-2560x1440-2560x1440-22bb1c87b018.jpg?resize=1&w=480&h=270&quality=high"
              alt=""
            />
            <img
              className="w-[8rem] object-cover"
              src="https://cdn2.unrealengine.com/en-egst-storelandscape-2560x1440-2560x1440-22bb1c87b018.jpg?resize=1&w=480&h=270&quality=high"
              alt=""
            />
          </div>
          <span className="text-xl text-[#f7ebd1]">
            Be a stranger or a good guy!!111111 First game with 1000 visits I
            really appreciated, I really do
          </span>
        </div>
        <GameRight />
      </div>

      <GameReq />
    </section>
  );
};

export default GameDetailPage;
