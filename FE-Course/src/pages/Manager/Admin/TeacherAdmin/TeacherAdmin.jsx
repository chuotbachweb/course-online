import { useCallback, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Modal from "~/components/Modal";

import * as authService from "~/services/authService";
import TableUser from "../../Constant/TableUser";

function TeacherAdmin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [data, setData] = useState([]);
  const [fullName, setFullName] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [getIdModal, setGetIdModal] = useState("");

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const onChange = (e) => {
    setFullName(e.target.value);
  };
  const onClose = () => {
    setShowModal(false);
  };

  const onOpen = (id) => {
    setShowModal(true);
    setGetIdModal(id);
  };

  const fetch = useCallback(() => {
    authService
      .getTeacher({
        page: currentPage,
        perPage: 10,
        fullName: fullName,
      })
      .then((course) => {
        setData(course.data);
        setTotalPage(course.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage, fullName]);

  const onDelete = () => {
    authService
      .deleteUser({
        id: getIdModal,
      })
      .then(() => {
        fetch();
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div className="w-full px-10">
      <div className="flex justify-end my-4">
        <div className="md:w-1/3 w-full flex items-center border border-gray-200 rounded-xl overflow-hidden">
          <input
            placeholder="Tìm kiếm theo tên ..."
            className="w-full pl-4 outline-none p-2"
            onChange={onChange}
            value={fullName || ""}
            name="fullName"
          />
        </div>
      </div>
      <TableUser data={data} onOpen={onOpen}/>


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
        title="Delete course"
        description={"Are you sure to delete the course?"}
        showModal={showModal}
        onClose={onClose}
        onSubmit={onDelete}
      />
    </div>
  );
}

export default TeacherAdmin;
