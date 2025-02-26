import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FreeGames = () => {
  const games = useSelector((store) => store.game.games);
  const freeGames = games?.filter((game) => game?.price == 0);
  const navigate = useNavigate();

  return (
    <section className="h-screen bg-black text-white relative transition-all duration-500 font-kdam">
      {/* <div
        className="absolute inset-0 brightness-25 -z-1 bg-black"
        // style={{
        //   backgroundImage: `url(${bgImage})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        // }}
      ></div> */}

      <div className="!p-20 flex flex-col gap-10">
        <div className=" bg-[#1C1C1C] !p-16 flex flex-col gap-8 rounded-lg">
          <div className="flex gap-4 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 44 44"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M42.0867 23.4488H27.2624V18.555H42.088L42.0867 23.4488ZM39.218 40.8572C39.218 41.4187 38.4217 42.0425 37.2798 42.0425H27.261V25.4078H39.2166V40.8586L39.218 40.8572ZM18.6523 42.0425H25.3477V15.6216H18.6523V42.0425ZM4.78198 40.8572V25.4078H16.739V42.0439H6.72021C5.57828 42.0439 4.78198 41.4187 4.78198 40.8572ZM1.91334 18.5564H16.739V23.4503H1.91334V18.5564ZM4.36447 12.4406C4.36447 10.1464 6.18795 8.28227 8.42894 8.28227C12.2335 8.28227 15.4699 13.6287 16.1362 16.5989H8.42894C7.35143 16.5974 6.31846 16.1588 5.55654 15.3793C4.79462 14.5998 4.36593 13.543 4.36447 12.4406ZM35.5711 8.28227C37.812 8.28227 39.6355 10.1464 39.6355 12.4406C39.6355 14.7333 37.812 16.5989 35.5711 16.5989H27.8651C28.5301 13.6287 31.7665 8.28227 35.5711 8.28227ZM43.0433 16.5989H39.9411C40.9732 15.4717 41.548 13.9852 41.5489 12.4406C41.5474 10.8189 40.9172 9.26404 39.7965 8.11719C38.6758 6.97035 37.1562 6.32521 35.5711 6.32334C31.5757 6.32334 28.3449 10.302 26.8048 13.8111C26.6548 13.7148 26.4814 13.6634 26.3043 13.6626H17.6957C17.5186 13.6634 17.3452 13.7148 17.1952 13.8111C15.6551 10.302 12.4257 6.32334 8.43033 6.32334C6.84499 6.32483 5.32501 6.96981 4.20401 8.11669C3.08301 9.26358 2.45259 10.8187 2.45113 12.4406C2.45113 14.0473 3.06495 15.507 4.05894 16.5989H0.956672C0.702947 16.5989 0.459614 16.702 0.280203 16.8856C0.100792 17.0691 0 17.3181 0 17.5777L0 24.4276C0 24.9679 0.428567 25.4064 0.956672 25.4064H2.87002V40.8572C2.87002 42.6195 4.56078 44 6.72021 44H37.2798C39.4392 44 41.13 42.6195 41.13 40.8572V25.4078H43.0433C43.5714 25.4078 44 24.9693 44 24.429V17.5791C44 17.3195 43.8992 17.0706 43.7198 16.887C43.5404 16.7035 43.2971 16.5989 43.0433 16.5989ZM22.0007 5.83396C22.5274 5.83396 22.956 5.39549 22.956 4.85519V0.941561C22.9466 0.688601 22.8417 0.449207 22.6635 0.273643C22.4852 0.0980786 22.2474 0 22 0C21.7526 0 21.5148 0.0980786 21.3365 0.273643C21.1583 0.449207 21.0534 0.688601 21.044 0.941561V4.85519C21.044 5.39549 21.4726 5.83396 22.0007 5.83396Z"
                fill="white"
              />
            </svg>
            <h2 className="text-2xl">Free To Play</h2>
          </div>

          <div className="flex justify-evenly">
            {freeGames?.map((eachFreeGame) => {
              return (
                <div
                  key={eachFreeGame._id}
                  className="w-[40%]"
                  onClick={() => navigate(`/game/${eachFreeGame?._id}`)}
                >
                  <div
                    className={`bg-cover bg-center h-84 rounded-xl shrink-0`}
                    style={{
                      backgroundImage: `url(${eachFreeGame?.banner_img})`,
                    }}
                  ></div>
                  <h3 className="text-2xl mt-4">{eachFreeGame?.title}</h3>
                </div>
              );
            })}
            {/* <div className="w-[40%]">
              <div className="bg-cover bg-center h-84 rounded-xl shrink-0 bg-[url(/src/assets/bgImage2.jpg)]"></div>
              <h3 className="text-2xl mt-4">Beyond Blue</h3>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeGames;
