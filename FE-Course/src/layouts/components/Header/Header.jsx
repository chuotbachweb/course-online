import { Link } from "react-router-dom";
import routes from "~/config/routes";
import { FaHome, FaUserPlus } from "react-icons/fa";

import Menu from "./Menu";
import { useContext, useState } from "react";
import { AuthContext } from "~/shared/AuthProvider";
import SearchInput from "./SearchInput";
import { IoLogIn } from "react-icons/io5";

function Header() {
  const { token } = useContext(AuthContext);

  return (
    <div className="py-4 w-full flex justify-around items-center">
      <Link to={routes.home} className="p-2 hidden sm:block">
        <FaHome size={30} />
      </Link>

      <SearchInput />

      {token ? (
        <Menu />
      ) : (
        <>
          <div className="hidden sm:block">
            <Link
              to={routes.login}
              className="bg-primary text-white font-medium px-4 py-2 rounded-lg mr-2"
            >
              Đăng nhập
            </Link>
            <Link
              to={routes.register}
              className="border font-medium px-4 py-2 rounded-lg "
            >
              Đăng ký
            </Link>
          </div>

          <div className="fixed flex justify-between bottom-0 z-10 w-full  sm:hidden bg-white">
            <Link
              className="w-1/3 flex justify-center py-4 hover:bg-slate-200"
              to={routes.home}
            >
              <FaHome size={18} />
            </Link>
            <Link
              className="w-1/3 flex justify-center py-4 hover:bg-slate-200"
              to={routes.login}
            >
              <IoLogIn size={20} />
            </Link>
            <Link
              className="w-1/3 flex justify-center py-4 hover:bg-slate-200"
              to={routes.register}
            >
              <FaUserPlus size={20} />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
