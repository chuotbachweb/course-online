import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import routes from "~/config/routes";
import * as courseService from "~/services/courseService";

function TableUser({ data, onOpen }) {
  const location = useLocation();
  const [totalCourse, setTotalCourse] = useState(0);

  useEffect(() => {
    if (location.pathname === routes.teacherAdmin) {
      const promises = data.map((item) =>
        courseService.getCourseTeacher({ teacherId: item._id })
      );

      Promise.all(promises)
        .then((courses) => {
          setTotalCourse(courses);
        })
        .catch((error) => console.log(error));
    }
  }, [data, location.pathname]);

  return (
    <div className="relative overflow-auto shadow-md sm:rounded-lg text-nowrap">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">Tài khoản</th>
            <th className="px-6 py-3">Họ và tên</th>
            <th className="px-6 py-3">Email</th>

            <th className="px-6 py-3">Số điện thoại</th>

            <th className="px-6 py-3">Địa chỉ</th>
            <th className="px-6 py-3">Giời tính</th>
            <th className="px-6 py-3">Ngày tạo</th>
            {location.pathname === routes.teacherAdmin && (
              <th className="px-6 py-3">Số khóa</th>
            )}
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                className="bg-white border-b hover:bg-gray-100 "
                key={item._id}
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {item.username}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {item.fullName}
                </td>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.phone}</td>
                <td className="px-6 py-4">{item.address}</td>
                <td className="px-6 py-4">
                  {item.gender === 0 ? "Nam" : "Nữ"}
                </td>
                <td className="px-6 py-4">
                  {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                </td>
                {location.pathname === routes.teacherAdmin && (
                  <td className="px-6 py-4">{totalCourse[index]?.data.length}</td>
                )}
                <td className="px-6 py-4 text-right">
                  <Link
                    to={`/manager/admin/user/edit/${item._id}`}
                    className="font-medium p-4 text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Sửa
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => onOpen(item._id)}
                    className="font-medium p-4 text-red-600 dark:text-red-500 hover:underline"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4">
                There is no data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableUser;
