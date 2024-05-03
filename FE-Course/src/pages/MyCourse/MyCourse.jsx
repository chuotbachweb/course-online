import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ReactPaginate from "react-paginate";

import * as myCourseService from "~/services/myCourseService";
import ListMyCourse from "./ListMyCourse";

function MyCourse() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  useEffect(() => {
    myCourseService
      .getMyCourse({
        page: currentPage,
        perPage: 10,
      })
      .then((course) => {
        setData(course.data);
        setTotalPage(course.totalPages);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <ListMyCourse data={data}/>

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
    </div>
  );
}

export default MyCourse;
