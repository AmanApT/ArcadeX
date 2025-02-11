/* eslint-disable react/prop-types */

import { useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";

const UploadGame = ({ games, setGames }) => {
  const [gameDetails, setGameDetails] = useState({
    title: "",
    description: "",
    author: "",
    banner_img: "",
    trailerUrl: "",
    preview_img: [],
    sys_req: {
      os: [],
      gpu: "",
      memory: "",
      storage: "",
    },
    online: false,
    price: "",
    multiplayer: false,
    tier: "Basic",
    genre: "Action",
    iarc: "3",
  });
  const bannerRef = useRef(null);
  const previewRef = useRef(null);
  //
  const seller = useSelector((store) => store.seller);
  console.log(seller);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGameDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleChangeNested = (e) => {
    const { name, value } = e.target;

    setGameDetails((prevDetails) => ({
      ...prevDetails,
      sys_req: {
        ...prevDetails.sys_req,
        [name]: value,
      },
    }));
  };
  // const handleUpload = async () => {
  //   if (!gameDetails.title || !gameDetails.description || !gameDetails.banner_img) {
  //     console.error("Title, description, and banner image are required.");
  //     return;
  //   }

  //   try {
  //     const formData = new FormData();
  //     formData.append("image", gameDetails.banner_img);

  //     // Upload banner image
  //     const bannerResponse = await axios.post(
  //       "http://localhost:5000/api/game/uploadBanner",
  //       formData
  //     );
  //     const bannerUrl = bannerResponse.data.bannerUrl;

  //     // Upload preview images
  //     const previewFormData = new FormData();
  //     gameDetails.preview_img.forEach((previewImg) => {
  //       previewFormData.append("images", previewImg);
  //     });

  //     const previewResponse = await axios.post(
  //       "http://localhost:5000/api/game/uploadPreviews",
  //       previewFormData
  //     );
  //     const previewUrls = previewResponse.data.previewUrls;

  //     // Construct final game object
  //     const finalGameData = {
  //       ...gameDetails,
  //       banner_img: bannerUrl,
  //       preview_img: previewUrls,
  //     };

  //     // Send game details to backend
  //     const gameUploadResponse = await axios.post(
  //       "http://localhost:5000/api/game/uploadGame",
  //       finalGameData
  //     );

  //     console.log("Game uploaded successfully:", gameUploadResponse.data);

  //     // Update state to reflect the new game
  //     setGames((prevGames) => [...prevGames, finalGameData]);

  //     // Reset form fields
  //     setGameDetails({
  //       title: "",
  //       description: "",
  //       author: "",
  //       banner_img: "",
  //       trailerUrl: "",
  //       preview_img: [],
  //       sys_req: { os: [], gpu: "", memory: "", storage: "" },
  //       online: false,
  //       price: "",
  //       multiplayer: false,
  //       tier: "Basic",
  //       genre: "Action",
  //       iarc: "3",
  //     });

  //     if (bannerRef.current) bannerRef.current.value = "";
  //     if (previewRef.current) previewRef.current.value = "";

  //   } catch (error) {
  //     console.error("Error uploading game:", error);
  //   }
  // };
  const handleUpload = async () => {
    if (
      !gameDetails.title ||
      !gameDetails.description ||
      !gameDetails.banner_img
    ) {
      console.error("Title, description, and banner image are required.");
      return;
    }

    try {
      // Upload banner image
      const bannerUrl = await handleBannerUpload();

      // Upload preview images
      const previewUrls = await handlePreviewUpload();

      //game object with url
      const finalGameData = {
        ...gameDetails,
        banner_img: bannerUrl,
        preview_img: previewUrls,
        author: seller._id,
      };

      // Send game details to backend
      const gameUploadResponse = await axios.post(
        "http://localhost:5000/api/game/addGame",
        finalGameData,
        { withCredentials: true }
      );

      console.log("Game uploaded successfully:", gameUploadResponse.data);

      setGames((prevGames) => [...prevGames, finalGameData]);

      setGameDetails({
        title: "",
        description: "",
        author: "",
        banner_img: "",
        trailerUrl: "",
        preview_img: [],
        sys_req: { os: [], gpu: "", memory: "", storage: "" },
        online: false,
        price: "",
        multiplayer: false,
        tier: "Basic",
        genre: "Action",
        iarc: "3",
      });

      if (bannerRef.current) bannerRef.current.value = "";
      if (previewRef.current) previewRef.current.value = "";
    } catch (error) {
      console.error("Error uploading game:", error);
    }
  };

  const handlePreviewRemove = (index) => {
    setGameDetails((prevDetails) => ({
      ...prevDetails,
      preview_img: prevDetails.preview_img.filter((_, i) => i !== index),
    }));

    if (gameDetails.preview_img.length === 1 && previewRef.current) {
      previewRef.current.value = "";
    }
  };

  const handleBannerRemove = () => {
    setGameDetails((prevDetails) => ({
      ...prevDetails,
      banner_img: "",
    }));

    if (bannerRef.current) {
      bannerRef.current.value = "";
    }
  };

  const handleBannerUpload = async () => {
    const uploadBanner_img = async () => {
      try {
        const formData = new FormData();
        formData.append("image", gameDetails.banner_img);

        console.log(gameDetails);

        const response = await axios.post(
          "http://localhost:5000/api/game/uploadBanner",
          formData
        );

        return response.data.data.url;
      } catch (error) {
        console.error("Error uploading banner:", error);
      }
    };

    const bannerUrl = await uploadBanner_img();
    return bannerUrl;
  };

  const handlePreviewUpload = async () => {
    const uploadPreviewImg = async () => {
      try {
        const formData = new FormData();
        gameDetails.preview_img.forEach((previewImage) => {
          formData.append("image", previewImage);
        });

        const response = await axios.post(
          "http://localhost:5000/api/game/uploadPreviews",
          formData
        );

        const urls = response.data.data.map((eachData) => eachData.url);
        return urls;
      } catch (error) {
        console.error("Error uploading preview:", error);
      }
    };

    const previewUrls = await uploadPreviewImg();
    return previewUrls;
  };

  return (
    <section className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-purple-400 mb-6">
        Upload a New Game
      </h2>

      {/* Game Title Section */}
      <div className="mb-4">
        <label className="text-gray-300 font-semibold">Game Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter Game Title"
          value={gameDetails.title}
          onChange={handleChange}
          className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
        />
      </div>

      {/* Description Section */}
      <div className="mb-4">
        <label className="text-gray-300 font-semibold">Game Description</label>
        <textarea
          name="description"
          placeholder="Enter Game Description"
          value={gameDetails.description}
          onChange={handleChange}
          className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
          rows="4"
        />
      </div>

      {/* Banner Image Section */}
      <div className="mb-4">
        <label className="text-gray-300 font-semibold">Banner Image</label>
        <input
          type="file"
          name="banner_img"
          accept="image/*"
          ref={bannerRef}
          onChange={(e) => {
            const file = e.target.files[0];
            // const path = URL.createObjectURL(file);

            setGameDetails((prevDetails) => ({
              ...prevDetails,
              banner_img: file,
            }));
          }}
          className="w-full mt-2"
        />
        {/* Display Banner Image */}
        <div className="mt-4 flex gap-4 flex-wrap">
          {games?.banner_img && (
            <div className="relative w-24 h-32">
              <img
                src={games?.banner_img}
                alt={`Banner Img`}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
              <button
                onClick={() => handleBannerRemove()}
                className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full shadow-lg hover:bg-red-700 transition"
              >
                <FaTimes className="w-4 h-4 hover:cursor-pointer" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Trailer URL Section */}
      <div className="mb-4">
        <label className="text-gray-300 font-semibold">Trailer URL</label>
        <input
          type="text"
          name="trailerUrl"
          placeholder="Enter Trailer URL"
          value={gameDetails.trailerUrl}
          onChange={handleChange}
          className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
        />
      </div>

      {/* Preview Images Upload Section */}
      <div className="mb-4">
        <label className="text-gray-300 font-semibold">Preview Images</label>
        <input
          type="file"
          name="preview_img"
          accept="image/*"
          multiple
          ref={previewRef}
          onChange={(e) => {
            const files = Array.from(e.target.files).slice(
              0,
              5 - gameDetails.preview_img.length
            );

            setGameDetails((prevDetails) => ({
              ...prevDetails,
              preview_img: [...prevDetails.preview_img, ...files].slice(0, 5),
            }));
          }}
          className="w-full mt-2"
        />
        {/* Display Preview Images */}
        <div className="mt-4 flex gap-4 flex-wrap">
          {gameDetails.preview_img.map((img, index) => (
            <div key={index} className="relative w-24 h-32">
              <img
                src={img}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
              <button
                onClick={() => handlePreviewRemove(index)}
                className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full shadow-lg hover:bg-red-700 transition"
              >
                <FaTimes className="w-4 h-4 hover:cursor-pointer" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* System Requirements Section */}
      <div className="border-t border-gray-700 pt-6 mb-4">
        <h3 className="text-xl text-gray-300 font-semibold">
          System Requirements
        </h3>
        <div className="mb-4">
          <label className="text-gray-300 font-semibold">
            Operating Systems
          </label>
          <input
            type="text"
            name="sys_req.os"
            placeholder="Enter OS (comma separated)"
            value={gameDetails.sys_req.os.join(", ")}
            onChange={(e) => {
              const osArray = e.target.value.split(",").map((os) => os.trim());
              setGameDetails((prevDetails) => ({
                ...prevDetails,
                sys_req: { ...prevDetails.sys_req, os: osArray },
              }));
            }}
            className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-300 font-semibold">GPU</label>
          <input
            type="text"
            name="gpu"
            placeholder="Enter GPU"
            value={gameDetails.sys_req.gpu}
            onChange={handleChangeNested}
            className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-300 font-semibold">Memory</label>
          <input
            type="text"
            name="memory"
            placeholder="Enter Memory"
            value={gameDetails.sys_req.memory}
            onChange={handleChangeNested}
            className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-300 font-semibold">Storage</label>
          <input
            type="text"
            name="storage"
            placeholder="Enter Storage"
            value={gameDetails.sys_req.storage}
            onChange={handleChangeNested}
            className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
          />
        </div>
      </div>

      {/* Price Section */}
      <div className="mb-4">
        <label className="text-gray-300 font-semibold">Price</label>
        <input
          type="text"
          name="price"
          placeholder="Enter Game Price"
          value={gameDetails.price}
          onChange={handleChange}
          className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
        />
      </div>

      {/* Multiplayer and Online Section */}
      <div className="mb-4 flex gap-6">
        <div>
          <label className="text-gray-300 font-semibold">Multiplayer</label>
          <input
            type="checkbox"
            name="multiplayer"
            checked={gameDetails.multiplayer}
            onChange={(e) =>
              setGameDetails((prevDetails) => ({
                ...prevDetails,
                multiplayer: e.target.checked,
              }))
            }
            className="ml-2"
          />
        </div>
        <div>
          <label className="text-gray-300 font-semibold">Online</label>
          <input
            type="checkbox"
            name="online"
            checked={gameDetails.online}
            onChange={(e) =>
              setGameDetails((prevDetails) => ({
                ...prevDetails,
                online: e.target.checked,
              }))
            }
            className="ml-2"
          />
        </div>
      </div>

      {/* Tier Section */}
      <div className="mb-4">
        <label className="text-gray-300 font-semibold">Tier</label>
        <select
          name="tier"
          value={gameDetails.tier}
          onChange={handleChange}
          className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
        >
          <option value="Basic">Basic</option>
          <option value="AA">AA</option>
          <option value="AAA">AAA</option>
        </select>
      </div>

      {/* Genre Section */}
      <div className="mb-4">
        <label className="text-gray-300 font-semibold">Genre</label>
        <select
          name="genre"
          value={gameDetails.genre}
          onChange={handleChange}
          className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
        >
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Open-world">Open-world</option>
          <option value="Horror">Horror</option>
          <option value="Simulation">Simulation</option>
          <option value="RPG">RPG</option>
        </select>
      </div>

      {/* IARC Rating Section */}
      <div className="mb-4">
        <label className="text-gray-300 font-semibold">IARC Rating</label>
        <select
          name="iarc"
          value={gameDetails.iarc}
          onChange={handleChange}
          className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
        >
          <option value="3">3</option>
          <option value="7">7</option>
          <option value="12">12</option>
          <option value="18">18</option>
        </select>
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="w-full bg-purple-500 mt-6 p-3 rounded-lg hover:bg-purple-600"
      >
        Upload Game
      </button>
    </section>
  );
};

export default UploadGame;

// const ManageGame = ({ games, setGames }) => {
//   const handleDelete = (index) => {
//     setGames(games.filter((_, i) => i !== index));
//   };

//   return (
//     <section>
//       <h2 className="text-2xl font-bold text-purple-400 mb-4">Manage Games</h2>
//       <div className="overflow-x-auto">
//         <table className="w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700">
//           <thead>
//             <tr className="border-b border-gray-700 text-purple-400">
//               <th className="p-3 text-left">Title</th>
//               <th className="p-3 text-left">Genre</th>
//               <th className="p-3 text-left">Price</th>
//               <th className="p-3 text-left">Status</th>
//               <th className="p-3 text-left">Banner</th>
//               <th className="p-3 text-left">Preview Images (Max 5)</th>
//               <th className="p-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {games.map((game, index) => (
//               <tr
//                 key={index}
//                 className="border-b border-gray-700 hover:bg-gray-700 transition"
//               >
//                 <td className="p-3">{game.title}</td>
//                 <td className="p-3">{game.genre}</td>
//                 <td className="p-3">{game.price}</td>
//                 <td className="p-3">
//                   <span
//                     className={`px-3 py-1 rounded text-sm font-bold ${
//                       game.status === "approved"
//                         ? "bg-green-600 text-black"
//                         : "bg-yellow-500 text-black"
//                     }`}
//                   >
//                     {game.status}
//                   </span>
//                 </td>
//                 <td className="p-3">
//                   <img
//                     src={game.banner_img}
//                     alt="Banner"
//                     className="w-20 h-12 rounded shadow"
//                   />
//                 </td>
//                 <td className="p-3 flex gap-2">
//                   {game.preview_img.slice(0, 5).map((img, i) => (
//                     <img
//                       key={i}
//                       src={img}
//                       alt={`Preview ${i + 1}`}
//                       className="w-12 h-12 rounded shadow"
//                     />
//                   ))}
//                 </td>
//                 <td className="p-3">
//                   <button
//                     onClick={() => handleDelete(index)}
//                     className="bg-red-500 px-4 py-2 rounded-lg text-black font-bold hover:bg-red-600 transition"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// };
