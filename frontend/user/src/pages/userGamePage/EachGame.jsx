import React from "react";

const EachGame = () => {
  return (
    <div className="bg-[#202024] rounded-md p-6">
      <div className="flex gap-4">
        <div className="w-1/6">
          <img
            className=""
            src="https://cdn1.epicgames.com/offer/428115def4ca4deea9d69c99c5a5a99e/EN_Bungie_Lightfall_BC_S4_1200x1600_1200x1600-e84a4b5803c9792287ea8b6178e6262a?resize=1&w=360&h=480&quality=medium"
            alt=""
          />
        </div>
        <div className="w-5/6">
          <div className="flex justify-between items-center">
            <div className="p-2 px-4 text-sm rounded-md bg-[#414145] cursor-pointer">
              Base Game
            </div>
            <p>$800.00</p>
          </div>
          <p className="my-3 text-2xl">Citizen Sleeper 3: Starward Vector</p>

          <div className="border-[#414145] p-4 border rounded-lg flex gap-4 items-center">
            <img
              className="w-[4rem]"
              src="data:image/png;base64,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"
              alt=""
            />
            <div className="text-sm ">
              <p>12+</p>
              <p className="opacity-50">Mild Swearing</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-end items-center justify-end gap-4">
        <span className="hover:text-red-400 text-gray-500 text-bold">
          Remove
        </span>
        <button className="p-3 px-6 rounded-md bg-blue-400 hover:bg-amber-400 cursor-pointer">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default EachGame;
