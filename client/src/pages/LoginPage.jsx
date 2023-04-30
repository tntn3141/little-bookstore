import { Link } from "react-router-dom";
export default function LoginPage() {
  return (
    <div className=" flex flex-col mt-20 max-w-md mx-auto">
      <h1 className="mx-auto text-5xl">Hello</h1>
      <form className="mx-auto mt-8" action="">
        <div className="justify-center flex">
          <Link
            to={"/login"}
            className="border-2 border-gray-950 p-3 uppercase"
          >
            <span className="font-bold">Log in</span>
          </Link>
          <Link
            to={"/register"}
            className="border-2 border-gray-950 p-3 uppercase"
          >
            <span className="font-grey-700">Sign up</span>
          </Link>
        </div>
        <div className="mt-2">
        <input type="email" placeholder="Email"/>
        <input type="password" placeholder="Password"/>
        <button className="uppercase w-full mt-5 p-4 bg-gray-900 font-bold text-white">Log in</button>
        </div>

      </form>
    </div>
  );
}
