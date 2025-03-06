import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateSellerName } from "../../utils/sellerSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const seller = useSelector((store) => store.seller);

  const [newName, setNewName] = useState(seller?.name || "");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!newName.trim()) return;
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.patch(
        "http://localhost:5000/api/seller/updateSeller",
        {
          sellerId: seller._id,
          name: newName,
        },
        { withCredentials: true }
      );

      dispatch(updateSellerName(data.updatedName));
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-red-400 mb-4">Profile</h2>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-gray-300">Name:</p>
          {editing ? (
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="bg-gray-800 border border-gray-600 p-2 rounded-md text-gray-200 focus:outline-none"
            />
          ) : (
            <p className="text-gray-200 font-semibold">{seller?.name}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-gray-300">Email:</p>
          <p className="text-gray-200 font-semibold">{seller?.email}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-gray-300">Verified:</p>
          <p className="text-green-400">{seller?.isVerified ? "✅" : "❌"}</p>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {editing ? (
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition"
          >
            Edit Name
          </button>
        )}
      </div>
    </section>
  );
};

export default Profile;
