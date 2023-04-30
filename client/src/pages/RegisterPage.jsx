import { Link } from "react-router-dom";
export default function RegisterPage() {
  return (
    <div className=" flex flex-col mt-20 max-w-md mx-auto">
      <h1 className="mx-auto text-5xl">Hello</h1>
      <form className="mx-auto mt-8" action="">
        <div className="justify-center flex">
          <Link
            to={"/login"}
            className="border-2 border-gray-950 p-3 uppercase w-50"
          >
            <span className="text-gray-700">Log in</span>
          </Link>
          <Link
            to={"/register"}
            className="border-2 border-gray-950 p-3 uppercase w-50"
          >
            <span className="font-bold">Sign up</span>
          </Link>
        </div>
        <div className="mt-2">
        <input type="text" placeholder="Name" className="name-input"/>
        <input type="email" placeholder="Email"/>
        <input type="password" placeholder="Password"/>
        <button className="uppercase w-full mt-5 p-4 bg-gray-900 font-bold text-white">Sign up</button>
        <span></span>
        </div>

      </form>
    </div>
  );
}
