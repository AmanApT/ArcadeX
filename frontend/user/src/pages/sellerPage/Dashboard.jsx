/* eslint-disable react/prop-types */

const Dashboard = () => (
  <section>
    <h2 className="text-3xl font-bold text-purple-400">Dashboard Overview</h2>
    <div className="grid grid-cols-3 gap-6 mt-6">
      {["Total Games", "Total Sales", "Pending Reviews"].map((title, i) => (
        <div
          key={i}
          className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 text-center"
        >
          <h3 className="text-lg text-gray-300">{title}</h3>
          <p className="text-2xl font-bold text-purple-500">
            {Math.floor(Math.random() * 500)}
          </p>
        </div>
      ))}
    </div>
  </section>
);

export default Dashboard;
