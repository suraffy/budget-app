import BarChart from "../../img/wired-outline-153-bar-chart.webp";
import TryItConfirmationModal from "./TryItConfirmationModal";

const Navbar = ({
  username,
  showModal,
  onShowModal,
  onCloseModal,
  onTryIt,
}) => {
  if (username && username.length > 9) {
    username = username.slice(0, 10);
  }

  return (
    <header className="shadow">
      <nav className="container h-14 flex justify-between leading-3 font-semibold">
        <div className="flex items-end cursor-pointer">
          <img src={BarChart} alt="BarChart Logo" className="h-full" />
          <span className="flex flex-col items-center justify-center text-sm mb-2 leading-none text-purple-900 ">
            <span>Budget</span>
            <span>App</span>
          </span>
        </div>

        <div className="flex">
          <ul className="hidden sm:flex">
            <li className="flex">
              <a
                href="#dashboard"
                className="flex items-center text-gray-800 px-3 transition-colors hover:text-indigo-600 hover:bg-gray-100"
              >
                Dashboard
              </a>
            </li>
            <li className="flex">
              <a
                href="#insights"
                className="flex items-center text-gray-800 px-3 transition-colors hover:text-indigo-600 hover:bg-gray-100"
              >
                Insights
              </a>
            </li>
            <li className="flex">
              <a
                href="#trends"
                className="flex items-center text-gray-800 px-3 transition-colors hover:text-indigo-600 hover:bg-gray-100"
              >
                Trends
              </a>
            </li>
          </ul>

          <div className="flex items-center">
            <button
              onClick={onShowModal}
              className="bg-indigo-600 text-white py-2 px-3 transition-colors  hover:bg-indigo-700 rounded  ring-offset-1 focus:ring-1 focus:ring-indigo-700"
            >
              {username && username[0].toUpperCase() + username.slice(1)}
            </button>

            <TryItConfirmationModal
              showModal={showModal}
              onCloseModal={onCloseModal}
              onTryIt={onTryIt}
            />
          </div>

          <div className="sm:hidden flex items-center ml-4">
            <button className="flex justify-center items-center h-8 w-8 transition-colors hover:bg-indigo-100  hover:text-indigo-600 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
