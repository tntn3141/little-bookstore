import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <header className="bg-white">
      <nav className="p-5 bg-white shadow md:flex md:items-center md:justify-between">
        {/* Logo & menu icon */}
        <div className="flex justify-between items-center">
          <Link to={'/'}>
            <span className="text-2xl font-[Poppins] cursor-pointer flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
              </svg>
              <span className="mx-1">
                lorem
              </span>
            </span>
          </Link>

          {/* Menu icon in mobile */}
          <span className="text-3xl cursor-pointer mx-2 md:hidden block flex">
            <svg
              className="w-6 h-6 mx-1.5"
              onClick={() => console.log("clicked search")}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

            <svg
              name="menu"
              onClick={() => console.log("clicked menu")}
              className="w-6 h-6 mx-1.5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </span>
        </div>

        <ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
          <li className="mx-4 my-6 md:my-0">
            <Link to={'/new-books'} className="text-xl hover:text-cyan-500 duration-500">
              New Books
            </Link>
          </li>
          <li className="mx-4 my-6 md:my-0">
            <Link to={'/best-sellers'} className="text-xl hover:text-cyan-500 duration-500">
              Best Sellers
            </Link>
          </li>
          <li className="mx-4 my-6 md:my-0">
            <Link to={"/offers"} className="text-xl hover:text-cyan-500 duration-500">
              Offers
            </Link>
          </li>
          <li className="mx-4 my-6 md:my-0">
            <Link to={'/about'} className="text-xl hover:text-cyan-500 duration-500">
              About Us
            </Link>
          </li>
        </ul>

        <div>
          <span className="md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500 text-3xl cursor-pointer mx-2 block flex ">
            <svg
              className="w-6 h-6 mx-1.5"
              onClick={() => console.log("clicked search")}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <Link to={'/login'}>
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </Link>

          </span>
        </div>
      </nav>
    </header>
  );
}
