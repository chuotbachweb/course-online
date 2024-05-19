import { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "~/components/Modal";
import { deleteMyCourse } from "~/services/myCourseService";
import { AuthContext } from "~/shared/AuthProvider";

function TableCourseSold({ data, fetch }) {
  const { role } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [getIdModal, setGetIdModal] = useState("");

  const onClose = () => {
    setShowModal(false);
  };

  const onOpen = (id) => {
    setShowModal(true);
    setGetIdModal(id);
  };

  const onDelete = () => {
    deleteMyCourse({ id: getIdModal })
      .then((course) => {
        fetch();
        setShowModal(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-nowrap">
          <tr>
            <th scope="col" className="px-6 py-3">
              Tên khóa học
            </th>
            <th scope="col" className="px-6 py-3">
              Nguời mua
            </th>
            {role === 0 && (
              <th scope="col" className="px-6 py-3">
                Giảng viên phụ trách
              </th>
            )}
            <th scope="col" className="px-6 py-3">
              Tiến trình
            </th>
            <th scope="col" className="px-6 py-3">
              Giá tiền
            </th>
            <th scope="col" className="px-6 py-3">
              Ngày mua
            </th>
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
                <th className="px-6 py-4  font-medium text-gray-900 text-nowrap">
                  {item.studentId.fullName}
                </th>
                {role === 0 && (
                  <th className="px-6 py-4  font-medium text-gray-900 text-nowrap">
                    {item.teacherId.fullName}
                  </th>
                )}
                <td className="px-6 py-4">
                  {(item.progress.length / item.courseId.lesson.length) * 100 ||
                    0}{" "}
                  %
                </td>
                <td className="px-6 py-4 text-nowrap">
                  {item.courseId?.price?.toLocaleString("vi-VN") || 0} VNĐ
                </td>
                <td className="px-6 py-4">
                  {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onOpen(item._id)}
                    className="text-cancel"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-4">
                There is no data
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal
        title="Xóa khóa học"
        description={"Bạn chắc chắn xóa khóa học này này?"}
        showModal={showModal}
        onClose={onClose}
        onSubmit={onDelete}
      />
    </div>
  );
}

export default TableCourseSold;
