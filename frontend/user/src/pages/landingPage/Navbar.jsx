import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { removeUser } from "../../utils/userSlice";
import { removeSeller } from "../../utils/sellerSlice";
import { FiExternalLink } from "react-icons/fi";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const user = useSelector((store) => store.user);
  const seller = useSelector((store) => store.seller);
  const { games } = useSelector((store) => store.game);
  const location = useLocation();
  const isBlackBg = ["/wishlist", "/cart", "/myPurchases"].includes(
    location.pathname
  );
  // const [isSeller, setIsSeller] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredGames = games?.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/signout", {
        method: "GET",
        credentials: "include", // For cookies
      });

      if (!response.ok) {
        throw new Error("Signout failed");
      }

      dispatch(removeUser());
      dispatch(removeSeller());
      localStorage.removeItem("type");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  // useEffect(() => {
  //   if (seller !== null) {
  //     setIsSeller(true);
  //   } else if (user !== null) {
  //     setIsSeller(false);
  //   }
  // }, [seller, user]);

  return (
    <header
      className={`fixed top-0 z-10 w-full transition-all duration-300 font-kdam py-2 ${
        isBlackBg
          ? "bg-black"
          : scrolled
          ? "bg-[#181713]/80 shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8">
        <h1 className="text-[#ffffff] cursor-pointer text-2xl" onClick={() => navigate("/")}>
          ARACDE X
        </h1>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          {seller ? (
            <nav aria-label="Global" className=" flex gap-6">
              <a
                className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75 cursor-pointer flex gap-1"
                onClick={() => navigate("/seller")}
              >
                Dashboard
                <span>
                  <FiExternalLink />
                </span>
              </a>
            </nav>
          ) : (
            <nav aria-label="Global" className=" flex gap-6">
              <a
                className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75 cursor-pointer"
                onClick={() => navigate("/wishlist")}
              >
                Wishlist
              </a>
              <a
                className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75 cursor-pointer"
                onClick={() => navigate("/myPurchases")}
              >
                My Purchases
              </a>
              <a
              className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75 cursor-pointer"
              // href="#"
              onClick={() => alert("Feature Coming Soon!!")}
            >
              Chat Room
            </a>
            </nav>
          )}

          <div className="flex items-center gap-4">
            {/* Search Field */}
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search in store"
                className="w-80 px-4 py-2 rounded-lg border border-red-600 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-red-600 dark:bg-[#242428] dark:border-gray-600 dark:text-white"
              />
              {/* Recommendations */}
              {searchTerm && filteredGames.length > 0 && (
                <div className="absolute top-12 left-0 w-full bg-black rounded-lg shadow-lg">
                  <ul className="max-h-60 overflow-y-auto">
                    {filteredGames.map((game) => (
                      <li
                        key={game._id}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-teal-600 cursor-pointer transition-all"
                        onClick={() => navigate(`/game/${game._id}`)}
                      >
                        <img
                          src={game.banner_img}
                          alt={game.title}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <span className="text-white">{game.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {!user && !seller ? (
              <div className="sm:flex sm:gap-4">
                <a
                  className="block cursor-pointer rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-800 "
                  onClick={() => navigate("/auth/login")}
                >
                  Sign In
                </a>

                <a
                  className="hover:cursor-pointer hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-red-600/75 sm:block dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                  onClick={() => navigate("/auth/signup")}
                >
                  Sign Up
                </a>
              </div>
            ) : (
              <div className="sm:gap-4 text-white flex items-center">
                {user && !seller && (
                  <div className="flex items-center gap-2">
                    <span
                      className="hover:cursor-pointer hover:opacity-80"
                      onClick={() => navigate("/cart")}
                    >
                      Cart
                    </span>

                    {user?.cartlist?.length > 0 && (
                      <span className="bg-[#F7EBD1] text-black text-sm px-2 rounded-xl">
                        {user?.cartlist?.length}
                      </span>
                    )}
                  </div>
                )}
                <FaRegUserCircle size={24} />
                <a
                  className="block rounded-md cursor-pointer bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 dark:hover:bg-red-500"
                  onClick={handleLogout}
                >
                  Sign Out
                </a>
              </div>
            )}

            <button className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
