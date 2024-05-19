import { useCallback, useContext, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Modal from "~/components/Modal";

import * as courseService from "~/services/courseService";
import TableCourse from "../../Constant/TableCourse";
import { AuthContext } from "~/shared/AuthProvider";

function CourseTeacher() {
  const {currentUser} = useContext(AuthContext)
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [nameCourse, setNameCourse] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [getIdModal, setGetIdModal] = useState("");
  const [body, setBody] = useState("");

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const onChange = (e) => {
    setNameCourse(e.target.value);
  };

  const fetch = useCallback(() => {
    courseService
      .getCourseTeacher({
        page: currentPage,
        perPage: 5,
        nameCourse: nameCourse,
        teacherId: currentUser._id
      })
      .then((course) => {
        setData(course.data);
        setTotalPage(course.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage, nameCourse]);

  const onClose = () => {
    setShowModal(false);
    setBody("")
  };

  const onOpen = (id) => {
    setShowModal(true);
    setGetIdModal(id);
  };

  const openDetail = (description) => {
    setShowModal(true);
    setBody(<div dangerouslySetInnerHTML={{ __html: description }} />)  
  };

  const onDelete = () => {
    courseService
      .deleteCourse({ id: getIdModal })
      .then((res) => {
        if (res.status === 200) {
          fetch();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setShowModal(false);
  };

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

      <TableCourse data={data} onOpen={onOpen} openDetail={openDetail}/>

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
      <Modal
        title={body?"Mô tả khóa học":"Xóa khóa học"}
        description={"Bạn chắc chắn xóa khóa học?"}
        showModal={showModal}
        onClose={onClose}
        onSubmit={onDelete}
        body={body}
      />
    </div>
  );
}

export default CourseTeacher;
