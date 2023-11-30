const Navbar = () => {
  return (
    <header className="shadow">
      <nav className="container h-14 flex justify-between leading-3 font-semibold">
        <a href="" className="text-purple-900 flex items-center">
          Logo
        </a>

        <div className="flex">
          <ul className="hidden sm:flex">
            <li className="flex">
              <a
                href=""
                className="flex items-center text-gray-800 px-3 transition-colors hover:text-indigo-600 hover:bg-gray-100"
              >
                Dashboard
              </a>
            </li>
            <li className="flex">
              <a
                href=""
                className="flex items-center text-gray-800 px-3 transition-colors hover:text-indigo-600 hover:bg-gray-100"
              >
                Insights
              </a>
            </li>
            <li className="flex">
              <a
                href=""
                className="flex items-center text-gray-800 px-3 transition-colors hover:text-indigo-600 hover:bg-gray-100"
              >
                Trends
              </a>
            </li>
          </ul>

          <div className="flex items-center">
            <a
              href=""
              className="bg-indigo-600 text-white py-2 px-3 transition-colors  hover:bg-indigo-700 rounded  ring-offset-1 focus:ring-1 focus:ring-indigo-700"
            >
              Try it
            </a>
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
