import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import routes from "~/config/routes";
import { AuthContext } from "~/shared/AuthProvider";

function Profile() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col md:flex-row justify-center items-center px-10">
        <div className="flex flex-col items-center justify-center md:mr-10">
          {currentUser.imageUrl ? (
            <img
              src={currentUser.imageUrl}
              alt="avatar"
              className="w-[200px] h-[200px] object-cover object-top rounded-full"
            />
          ) : (
            <FaUserCircle size={100} />
          )}

          <Link
            to={routes.editProfile}
            className="flex items-center mt-2 bg-primary px-4 py-2 font-medium rounded-lg text-white"
          >
            Thay đổi thông tin
          </Link>
        </div>

        <div className="md:w-2/3 w-full mt-4">
          <div className="border border-blue-200 rounded-[5px] overflow-hidden mb-2">
            <div className="bg-blue-200 px-4 py-2">Họ và tên</div>
            <div className="px-4 py-2">{currentUser.fullName}</div>
          </div>

          <div className="border border-blue-200 rounded-[5px] overflow-hidden mb-2">
            <div className="bg-blue-200 px-4 py-2">Email</div>
            <div className="px-4 py-2">{currentUser.email}</div>
          </div>

          <div className="border border-blue-200 rounded-[5px] overflow-hidden mb-2">
            <div className="bg-blue-200 px-4 py-2">Giới tính</div>
            <div className="px-4 py-2">
              {currentUser.gender === 0 ? "Nam" : "Nữ"}
            </div>
          </div>
          
          <div className="border border-blue-200 rounded-[5px] overflow-hidden mb-2">
            <div className="bg-blue-200 px-4 py-2">Số điện thoại</div>
            <div className="px-4 py-2">{currentUser.phone}</div>
          </div>
          
          <div className="border border-blue-200 rounded-[5px] overflow-hidden mb-2">
            <div className="bg-blue-200 px-4 py-2">Địa chỉ</div>
            <div className="px-4 py-2">{currentUser.address}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
