import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Fud from "./Fud";
import { openDialog } from "../utils/fudSlice";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store);

  const triggerDialog = () => {
    dispatch(openDialog("Shadow Ban"));
  };

  return (
    <div className="bg-[#121212] min-h-screen text-white font-kdam">
      <div className="p-6">
        <h1 className="text-2xl mb-6">Users</h1>
        <div className="bg-gray-900 p-4 rounded-lg">
          {user?.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center mb-4 border-b border-gray-700 py-2"
            >
              <div>
                <p className="text-lg">{user?.name}</p>
                <span className="text-sm text-gray-400">{user?.email}</span>
              </div>
              <div className="flex gap-4">
                <button
                  className="bg-red-600 px-4 py-2 rounded"
                  onClick={triggerDialog}
                >
                  Shadow Ban
                </button>
                {/* Other action buttons (e.g., edit, delete) can go here */}
                <Fud />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
