/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const GameCarousel = ({ gameDetails, selectedPreview, onCarouselChange }) => {
  const images = gameDetails?.preview_img ?? [];

  const totalSlides = images.length + (gameDetails?.trailer_url ? 1 : 0);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    if (selectedPreview === -1 && gameDetails?.trailer_url) {
      setCurrentIndex(0);
    } else if (selectedPreview >= 0) {
      setCurrentIndex(
        gameDetails?.trailer_url ? selectedPreview + 1 : selectedPreview
      );
    }
  }, [selectedPreview, gameDetails?.trailer_url]);

  if (images.length === 0 && !gameDetails?.trailer_url) {
    return (
      <p className="text-center text-white">
        No preview images or trailer available.
      </p>
    );
  }

  const getEmbedURL = (youtubeURL) => {
    try {
      if (!youtubeURL) return null; // Handle missing URL

      if (youtubeURL.includes("embed/")) {
        return youtubeURL; // Already in embed format
      } else if (youtubeURL.includes("watch?v=")) {
        const videoId = youtubeURL.split("v=")[1].split("&")[0];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0`;
      } else if (youtubeURL.includes("youtu.be/")) {
        // Handle short URLs
        const videoId = youtubeURL.split("youtu.be/")[1];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0`;
      } else if (youtubeURL.includes("/v/")) {
        // Handle /v/ URLs
        const videoId = youtubeURL.split("/v/")[1];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0`;
      } else {
        // Try to get videoId from the last part of the URL.
        const videoId = youtubeURL.split("/").pop();
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0`;
      }
    } catch (error) {
      console.error("Error converting YouTube URL:", error);
      return null; // Return null if there's an error
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % totalSlides;
      onCarouselChange(
        newIndex === 0 && gameDetails?.trailer_url ? -1 : newIndex - 1
      ); // Update selectedPreview
      return newIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + totalSlides) % totalSlides;
      onCarouselChange(
        newIndex === 0 && gameDetails?.trailer_url ? -1 : newIndex - 1
      ); // Update selectedPreview
      return newIndex;
    });
  };
  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg aspect-video">
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {getEmbedURL(gameDetails.trailer_url) && (
          <div className="w-full h-full flex-shrink-0">
            <iframe
              className="w-full h-full rounded-lg"
              src={getEmbedURL(gameDetails.trailer_url)}
              title="Game Trailer"
              allow="autoplay; fullscreen"
              allowFullScreen
              frameBorder="0"
            ></iframe>
          </div>
        )}

        {images.map((eachImg, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <img
              src={eachImg}
              className="w-full h-full object-cover rounded-lg"
              alt={`Preview ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30 bg-white/30 hover:bg-white/50 p-2 rounded-full"
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30 bg-white/30 hover:bg-white/50 p-2 rounded-full"
      >
        ▶
      </button>
    </div>
  );
};

export default GameCarousel;
