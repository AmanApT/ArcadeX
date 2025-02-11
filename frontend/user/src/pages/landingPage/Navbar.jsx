import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import { removeUser } from "../../utils/userSlice";
import { removeSeller } from "../../utils/sellerSlice";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const user = useSelector((store) => store.user);
  const location = useLocation();
  const isBlackBg = ["/wishlist", "/cart", "/myPurchases"].includes(
    location.pathname
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 ">
        {/* <a className="block text-teal-600 dark:text-teal-300" href="#">
          <span className="sr-only">Home</span>
          <svg
            className="h-8"
            viewBox="0 0 28 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41Z"
              fill="currentColor"
            />
          </svg>
        </a> */}
        <h1 className="text-[#F7EBD1] text-2xl">ARACDE X</h1>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className=" flex gap-6">
            <a
              className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
              href="#"
            >
              Wishlist
            </a>
            <a
              className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
              href="#"
            >
              My Purchases
            </a>
            <a
              className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
              href="#"
            >
              Membership Plans
            </a>
          </nav>

          <div className="flex items-center gap-4">
            {!user ? (
              <div className="sm:flex sm:gap-4">
                <a
                  className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 dark:hover:bg-teal-500"
                  onClick={() => navigate("/auth/login")}
                >
                  Sign In
                </a>

                <a
                  className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                  href="#"
                >
                  Sign Up
                </a>
              </div>
            ) : (
              <div className="sm:gap-4 text-white flex items-center">
                <div>
                  <CiShoppingCart size={24} />
                </div>
                <FaRegUserCircle size={24} />
                <a
                  className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 dark:hover:bg-teal-500"
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
