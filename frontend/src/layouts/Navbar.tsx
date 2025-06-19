import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-black text-white shadow-xl">
      <Link className="font-bold text-xl m-3" to="/">
        ReactGram
      </Link>
      <form className="flex items-center">
        <div className="flex items-center bg-gray-400 rounded-md p-1">
          <BsSearch />
          <input
            className="bg-gray-400 outline-none placeholder-white ml-2"
            type="text"
            placeholder="Pesquisar"
          />
        </div>
      </form>

      <ul className="flex gap-3 items-center m-3">
        <li>
          <Link to="/login"> Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
