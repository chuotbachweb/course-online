import { useContext } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "~/shared/AuthProvider";

function TableCourse({ data, onOpen, openDetail }) {
  const { role } = useContext(AuthContext);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-nowrap">
          <tr>
            <th scope="col" className="px-6 py-3">
              Tên khóa học
            </th>
            <th>Mô tả</th>
            <th scope="col" className="px-6 py-3">
              Số bài học
            </th>
            {role === 0 && (
              <th scope="col" className="px-6 py-3">
                Giảng viên phụ trách
              </th>
            )}
            <th scope="col" className="px-6 py-3">
              Giá tiền
            </th>
            <th scope="col" className="px-6 py-3">
              Ngày tạo
            </th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr
                className="bg-white border-b hover:bg-gray-100 "
                key={item._id}
              >
                <th className="px-6 py-4  font-medium text-gray-900">
                  {item.nameCourse}
                </th>
                <td className="px-2 py-4 text-right">
                  <FaEye
                    className="cursor-pointer"
                    onClick={() => openDetail(item.description)}
                  />
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/manager/lesson/${item._id}`}
                    className="text-blue-500 underline"
                  >
                    {item.lesson.length}
                  </Link>
                </td>
                {role === 0 && (
                  <td className="px-6 py-4">
                    {item.teacherId.fullName}
                  </td>
                )}
                <td className="px-6 py-4 text-nowrap text-primary">
                  {item?.price?.toLocaleString("vi-VN") || 0} VNĐ
                </td>
                <td className="px-6 py-4">
                  {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    to={`/manager/edit-course/${item._id}`}
                    className="font-medium p-2 text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Sửa
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => onOpen(item._id)}
                    className="font-medium p-2 text-red-600 dark:text-red-500 hover:underline"
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

export default TableCourse;
