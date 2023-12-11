import MissingDataSVG from "../img/noun-missing-data-3377935.svg";

const Trends = () => {
  return (
    <section id="trends" className=" container mb-56">
      <h2 className="text-4xl font-semibold text-center">
        Annual Cashflow Trends
      </h2>

      <div className="my-10 text-center">
        <img
          src={MissingDataSVG}
          alt="Missing Data"
          className="h-20 block mx-auto mt-16"
        />
        <p className="text-lg">No sufficient data available!!</p>
      </div>
    </section>
  );
};

export default Trends;
