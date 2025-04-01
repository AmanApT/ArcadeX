import { useEffect, useState } from "react";
import GameCarousel from "./GameCarousel";
import GameNav from "./GameNav";
import GameReq from "./GameReq";
import GameRight from "./GameRight";
import {  useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setGameDetails } from "../../utils/gameSlice";
import { backend_url } from "../../../constants";
// import { IoIosArrowBack } from "react-icons/io";
// import Navbar from "../landingPage/Navbar";

const GameDetailPage = () => {
  const { gameId } = useParams();
  const dispatch = useDispatch();
  const gameDetails = useSelector((state) => state.game.gameDetails[gameId]);
  const [selectedPreview, setSelectedPreview] = useState(-1);
  // const navigate = useNavigate();

  useEffect(() => {
    if (gameDetails) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${backend_url}api/game/getGame/${gameId}`
        );
        dispatch(setGameDetails({ gameId, details: response.data.data }));
      } catch (error) {
        console.error("Error fetching game:", error);
      }
    };

    fetchData();
  }, [gameId, dispatch, gameDetails]);

  const handlePreviewClick = (index) => {
    setSelectedPreview(index);
  };

  const getYouTubeThumbnail = (youtubeURL) => {
    try {
      let videoId = "";
      if (youtubeURL.includes("v=")) {
        videoId = youtubeURL.split("v=")[1].split("&")[0]; // Handle watch?v= URLs
      } else if (youtubeURL.includes("youtu.be/")) {
        videoId = youtubeURL.split("youtu.be/")[1].split("?")[0]; // Handle youtu.be URLs
      } else if (youtubeURL.includes("embed/")) {
        videoId = youtubeURL.split("embed/")[1].split("?")[0]; // Handle embed URLs
      } else {
        videoId = youtubeURL.split("/").pop(); // Handle short URLs like your example
      }

      return `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
    } catch (error) {
      console.error("Error extracting video ID:", error);
      return ""; // Return empty string if there's an error
    }
  };

  const getYouTubeURL = (youtubeURL) => {
    return youtubeURL;
  };

  return (
    <>
      {/* <Navbar /> */}
      <section className="bg-black text-white font-kdam">
        <GameNav />
        <div className="flex justify-center p-2 py-8">
          <div className="w-7/12">
            <h1 className="text-2xl my-4">{gameDetails?.title}</h1>
            <div>
              <GameCarousel
                gameDetails={gameDetails}
                selectedPreview={selectedPreview}
                onCarouselChange={setSelectedPreview}
              />
            </div>
            <div className="flex gap-4 my-6">
              {gameDetails?.trailer_url && (
                <a
                  href={getYouTubeURL(gameDetails.trailer_url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-[8rem] h-[5rem] relative cursor-pointer overflow-hidden ${
                    selectedPreview === -1 ? "border-2 border-yellow-500" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePreviewClick(-1);
                  }}
                >
                  <img
                    src={getYouTubeThumbnail(gameDetails.trailer_url)}
                    alt="Trailer Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-2xl">▶</span>
                  </div>
                </a>
              )}

              {gameDetails?.preview_img?.map((eachImg, index) => (
                <div
                  key={index}
                  className={`w-[8rem] h-[5rem] relative cursor-pointer overflow-hidden ${
                    // Added overflow-hidden
                    selectedPreview === index
                      ? "border-2 border-yellow-500"
                      : ""
                  }`}
                  onClick={() => handlePreviewClick(index)}
                >
                  <img
                    src={eachImg}
                    className="w-full h-full object-cover"
                    alt={`Preview ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <span className="text-xl text-[#f7ebd1]">
              {gameDetails?.description}
            </span>
          </div>
          <GameRight price={gameDetails?.price} gameId={gameId} />
        </div>

        <GameReq sysReq={gameDetails?.sys_req} />
      </section>
    </>
  );
};

export default GameDetailPage;
