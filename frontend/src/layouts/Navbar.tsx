import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { IoMdHome, IoMdPerson } from "react-icons/io";

import { logout, reset } from "../slices/authSlice";
import { MdPhotoCamera } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedRedux";

const Navbar = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const dispath = useAppDispatch();

  const handleLogout = () => {
    dispath(logout());
    dispath(reset());

    navigate("/login");
  };
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
        {auth ? (
          <>
            <li className="text-[25px]">
              <Link to="/">
                <IoMdHome />
              </Link>
            </li>
            <li className="text-[25px]">
              <Link to={`/users/${user?._id}`}>
                <MdPhotoCamera />
              </Link>
            </li>
            <li className="text-[25px]">
              <Link to="/profile">
                <IoMdPerson />
              </Link>
            </li>
            <li>
              <Link onClick={handleLogout} to="/login">
                {" "}
                Sair
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login"> Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
