import Navbar from "../landingPage/Navbar";
import EachGame from "./EachGame";
import Footer from "../landingPage/Footer";

const UserGames = () => {
  return (
    <section className="bg-black  text-white">
      <Navbar />
      <div className="mt-[5rem] mx-20 font-kdam">
        <input
          type="email"
          id="email"
          name="email"
          //   value={userData.email}
          //   onChange={handleChange}
          placeholder="Search Store"
          className="p-3 w-3/12 my-8 bg-[#242428] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <p className="text-3xl py-8 ">My Wishlist</p>
        <div className="flex flex-col gap-8">
          <EachGame />
          <EachGame />
          <EachGame />
          <EachGame />
        </div>
        <Footer />
      </div>
    </section>
  );
};

export default UserGames;
