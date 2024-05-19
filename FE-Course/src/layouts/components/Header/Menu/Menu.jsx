import { useContext, useState } from "react";
import { FaBook, FaHome, FaNewspaper, FaRegNewspaper, FaUserCircle } from "react-icons/fa";

import ListItem from "./ListItem";
import routes from "~/config/routes";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "~/shared/AuthProvider";
import { MdDashboardCustomize } from "react-icons/md";

function Menu() {
  const navigate = useNavigate();
  const { logOut, currentUser, role } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const MENU_ITEM = [
    {
      title: "Thông tín cá nhân",
      link: () => {
        navigate(routes.profile);
      },
      icon: <FaUserCircle size={18} className="mr-0 sm:mr-4" />,
    },
    {
      title: "Đăng xuất",
      link: () => {
        logOut();
      },
      icon: <CiLogout size={18} className="mr-0 sm:mr-4" />,
    },
  ];

  const MENU_STUDENT = [
    {
      title: "Khóa học của tôi",
      link: () => {
        navigate(routes.myCourse);
      },
      icon: <FaBook size={18} className="mr-0 sm:mr-4" />,
    },
    {
      title: "Thông tin tuyển việc",
      link: () => {
        navigate(routes.myRecruitment);
      },
      icon: <FaRegNewspaper size={18} className="mr-0 sm:mr-4" />,
    },
    ...MENU_ITEM,
  ];

  const MENU_TEACHER = [
    {
      title: "Dashboard",
      link: () => {
        navigate(routes.homeManager);
      },
      icon: <MdDashboardCustomize size={18} className="mr-0 sm:mr-4" />,
    },
    ...MENU_ITEM,
  ];

  const MENU = role === 1 ? MENU_TEACHER : MENU_STUDENT;

  return (
    <>
      <div className="relative hidden sm:block">
        <button onClick={() => setIsOpen(!isOpen)}>
          {currentUser.imageUrl ? (
            <img
              src={currentUser.imageUrl}
              alt="avatar"
              className="w-[50px] h-[50px] rounded-full object-cover object-top"
            />
          ) : (
            <FaUserCircle size={32} />
          )}
        </button>
        {isOpen && (
          <div className="absolute min-w-[200px] right-0 border rounded-md bg-white z-10">
            {MENU.map((data) => (
              <ListItem key={data.title} data={data} />
            ))}
          </div>
        )}
      </div>

      <div className="sm:hidden w-full fixed bottom-0 bg-white z-10 flex flex-row">
        <Link
          to={routes.listRecruitment}
          className="w-1/5 flex justify-center py-4 text-sm cursor-pointer hover:bg-slate-200"
        >
          <FaNewspaper size={18} />
        </Link>
        {MENU.map((data) => (
          <ListItem key={data.title} data={data} />
        ))}
      </div>
    </>
  );
}

export default Menu;
