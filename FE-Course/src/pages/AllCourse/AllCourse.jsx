import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useLocation } from "react-router-dom";

import ListCourse from "~/components/ListCourse";
import * as courseService from "~/services/courseService";
import ClientEmpty from "~/components/ClientEmpty";
function Courses() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const queryParams = new URLSearchParams(location.search);
  const nameCourse = queryParams.get("nameCourse");

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  useEffect(() => {
    courseService
      .getAllCourse({
        page: currentPage,
        perPage: 10,
        nameCourse: nameCourse,
      })
      .then((course) => {
        setData(course.data.data);
        setTotalPage(course.data.totalPages);
      })
      .catch((error) => console.log(error));
  }, [currentPage, nameCourse]);

  return (
    <>
      {data?.length > 0 ? <ListCourse data={data} /> : <ClientEmpty />}

      <ReactPaginate
        pageCount={totalPage}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"underline"}
        previousLabel={currentPage === 1 ? null : <IoIosArrowBack />}
        nextLabel={currentPage >= totalPage ? null : <IoIosArrowForward />}
        className="flex justify-center mt-4"
        pageLinkClassName={"p-3"}
        pageClassName={"my-auto border border-gray-400 rounded mx-2"}
        nextLinkClassName={"p-3"}
        previousLinkClassName={"p-3"}
        previousClassName={"my-auto"}
        nextClassName={"my-auto"}
        breakLinkClassName={"p-3"}
        breakClassName={"my-auto"}
      />
    </>
  );
}

export default Courses;