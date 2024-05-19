import { useCallback, useContext, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "~/shared/AuthProvider";
import { getAllLesson } from "~/services/lessonService";
import routes from "~/config/routes";

function Assignment() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [nameCourse, setNameCourse] = useState(null);
  const [totalPage, setTotalPage] = useState(0);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const onChange = (e) => {
    setNameCourse(e.target.value);
  };

  const fetch = useCallback(() => {
    getAllLesson({
      page: currentPage,
      perPage: 5,
      nameLesson: nameCourse,
      teacherId: currentUser._id,
    })
      .then((course) => {
        setData(course.data.data);
        setTotalPage(course.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage, nameCourse]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div className="w-full px-10">
      <div className="flex justify-end my-4">
        <div className="md:w-1/3 w-full flex items-center border border-gray-200 rounded-xl overflow-hidden">
          <input
            placeholder="Tìm kiếm tên khóa học..."
            className="w-full pl-4 outline-none p-2"
            onChange={onChange}
            value={nameCourse || ""}
            name="nameCourse"
          />
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-nowrap">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tên khóa học
              </th>
              <th scope="col" className="px-6 py-3">
                Bài tập đã nộp
              </th>
              <th scope="col" className="px-6 py-3">
                Ngày tạo
              </th>
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
                    {item.nameLesson}
                  </th>
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        navigate(routes.handleAssignment, {
                          state: { data: item },
                        })
                      }
                      className="text-blue-500 underline"
                    >
                      {item.assignments.length}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(item.createdAt).toLocaleDateString("vi-VN")}
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

      <ReactPaginate
        pageCount={totalPage}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"underline"}
        previousLabel={currentPage === 1 ? null : <IoIosArrowBack />}
        nextLabel={currentPage >= totalPage ? null : <IoIosArrowForward />}
        className="flex justify-end mt-4"
        pageLinkClassName={"p-3"}
        pageClassName={"my-auto"}
        nextLinkClassName={"p-3"}
        previousLinkClassName={"p-3"}
        previousClassName={"my-auto"}
        nextClassName={"my-auto"}
        breakLinkClassName={"p-3"}
        breakClassName={"my-auto"}
      />
    </div>
  );
}

export default Assignment;
