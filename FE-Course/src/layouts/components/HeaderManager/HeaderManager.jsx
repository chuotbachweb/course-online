import { useContext } from "react";
import { CiLogout } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import routes from "~/config/routes";
import { AuthContext } from "~/shared/AuthProvider";

function HeaderManager() {
  const navigate = useNavigate();
  const { role, logOut } = useContext(AuthContext);

  const newSubmit = () => {
    navigate(role === 0 ? routes.newTeacher : routes.newCourse);
  };

  return (
    <div className="py-3 px-4 border-b flex justify-end items-center">
      <div className="flex items-center">
        <button
          className="bg-primary text-white px-4 py-2 mr-2 rounded-lg"
          onClick={newSubmit}
        >
          {role === 0 ? "Thêm giảng viên" : "Thêm khóa học"}
        </button>
        <CiLogout size={30} className="cursor-pointer" onClick={logOut} />
      </div>
    </div>
  );
}

export default HeaderManager;
