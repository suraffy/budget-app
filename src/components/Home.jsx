import Navbar from "./common/Navbar";

const Home = () => {
  return (
    <div className="container">
      <Navbar />

      <div className="flex flex-col items-center p-4">
        <div className="font-medium">
          <h4>Total Income: $500</h4>
          <h4>Expenses: $219</h4>
        </div>
        <h2 className="font-semibold text-2xl">Available Budget: $230</h2>
      </div>
    </div>
  );
};

export default Home;
