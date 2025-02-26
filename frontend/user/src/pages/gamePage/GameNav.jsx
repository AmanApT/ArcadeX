import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";

const GameNav = () => {
  const navigate = useNavigate();
  const { user, seller } = useSelector((store) => store);
  return (
    <div className="flex justify-between p-8 bg-[#141413]">
      <div className="flex items-center gap-8">
        <h1
          className="text-[#F7EBD1] text-2xl hover:cursor-pointer"
          onClick={() => navigate("/")}
        >
          ARACDE X
        </h1>
        <div aria-label="Global" className=" flex gap-6">
          {!seller ? (
            <>
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
            </>
          ) : (
            <a
              className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75 cursor-pointer flex gap-1"
              onClick={() => navigate("/seller")}
            >
              Dashboard
              <span>
                <FiExternalLink />
              </span>
            </a>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {user && (
          <span
            className="hover:cursor-pointer hover:opacity-80"
            onClick={() => navigate("/cart")}
          >
            Cart
          </span>
        )}
        {user?.cartlist?.length > 0 && (
          <span className="bg-[#F7EBD1] text-black text-sm px-2 rounded-xl">
            {user?.cartlist?.length}
          </span>
        )}
      </div>
    </div>
  );
};

export default GameNav;
