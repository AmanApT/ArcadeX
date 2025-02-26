/* eslint-disable react/prop-types */
const GameReq = ({ sysReq }) => {
  return (
    <div className="p-8 px-24">
      <h1 className="text-2xl my-4">
        Assassins Creed Shadows System Requirements
      </h1>
      <div className="p-8 px-16 bg-[#242428] flex justify-between rounded-md">
        <div className="w-1/2 flex flex-col gap-4">
          <div>
            <p className="text-[#949494] mb-1">OS</p>
            <p>Windows, MacOS</p>
          </div>
          <div>
            <p className="text-[#949494] mb-1">GPU</p>
            <p>{sysReq?.gpu}</p>
          </div>
          <div>
            <p className="text-[#949494] mb-1">Memory</p>
            <p>{sysReq?.memory}</p>
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          <div>
            <p className="text-[#949494] mb-1">Storage</p>
            <p>{sysReq?.storage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameReq;
