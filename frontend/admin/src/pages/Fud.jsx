import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "../utils/fudSlice";

const Fud = () => {
  const dispatch = useDispatch();
  const { isDialogOpen, featureName } = useSelector((state) => state.fud);

  const closeDialogHandler = () => {
    dispatch(closeDialog());
  };

  return (
    <>
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-[27rem]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl text-yellow-400 font-semibold">
                {featureName} - Feature Under Development
              </h3>
              <button
                onClick={closeDialogHandler}
                className="text-white text-xl"
              >
                &times;
              </button>
            </div>
            <p className="text-gray-400">
              We're working hard on this feature. Stay tuned for updates!
            </p>
            <div className="mt-4 text-right">
              <button
                onClick={closeDialogHandler}
                className="bg-yellow-500 text-black p-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Fud;
