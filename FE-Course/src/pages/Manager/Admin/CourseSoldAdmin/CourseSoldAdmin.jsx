import { useCallback, useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Modal from "~/components/Modal";
import * as courseService from "~/services/courseService"
import { AuthContext } from "~/shared/AuthProvider";
import TableCourseSold from "~/pages/Manager/Constant/TableCourseSold"

function CourseSoldAdmin() {
    const {currentUser} = useContext(AuthContext)
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
        courseService
         .getAllCourseSold({
            page: currentPage,
            perPage: 5,
            nameCourse: nameCourse,
          })
         .then((res) => {
            setData(res.data.data);
            setTotalPage(res.data.totalPages);
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
            placeholder="Tìm kiếm tên khóa học ..."
            className="w-full pl-4 outline-none p-2"
            onChange={onChange}
            value={nameCourse || ""}
            name="nameCourse"
          />
        </div>
      </div>

      <TableCourseSold data={data} />

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

export default CourseSoldAdmin;
