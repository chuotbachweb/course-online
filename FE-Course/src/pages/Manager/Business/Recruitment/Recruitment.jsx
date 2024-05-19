import { useCallback, useContext, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

import * as recruitmentService from "~/services/recruitmentService";
import { AuthContext } from "~/shared/AuthProvider";
import ModalUserApply from "./ModalUserApply";
import Modal from "~/components/Modal";

function Recruitment() {
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [nameRecruitment, setNameRecruitment] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [getIdModal, setGetIdModal] = useState("");
  const [body, setBody] = useState("");

  const [showModalApply, setShowModalApply] = useState(false);
  const [dataUserApply, setDataUserApply] = useState([]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const onChange = (e) => {
    setNameRecruitment(e.target.value);
  };

  const fetch = useCallback(() => {
    recruitmentService
      .getAllRecruitment({
        page: currentPage,
        perPage: 10,
        nameRecruitment: nameRecruitment,
      })
      .then((recruitment) => {
        setData(recruitment.data);
        setTotalPage(recruitment.totalPages);
      })
      .catch((error) => console.log(error));
  }, [currentPage, nameRecruitment]);

  const onClose = () => {
    setShowModal(false);
    setShowModalApply(false);
    setBody("");
    setShowModalApply("");
  };

  const onOpen = (id) => {
    setShowModal(true);
    setGetIdModal(id);
  };

  const openDetail = (description) => {
    setShowModal(true);
    setBody(<div dangerouslySetInnerHTML={{ __html: description }} />);
  };

  const openModalApply = (data) => {
    setShowModalApply(true);
    setDataUserApply(data);
  };

  const onSubmit = () => {
    setBody("");
    recruitmentService
      .deleteRecruitment({ id: getIdModal })
      .then((res) => {
        if (res.status === 200) {
          fetch();
          setShowModal(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleApply = ({ userId, recruitmentId, status }) => {
    const dataApply = {
      userId,
      recruitmentId,
      status,
    };
    recruitmentService
      .handleApplyCV(dataApply)
      .then((res) => {
        setDataUserApply(res.data);
        fetch();
      })
      .catch((err) => console.log(err));
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
            value={nameRecruitment || ""}
            name="nameRecruitment"
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
              <th>Mô tả</th>
              <th scope="col" className="px-6 py-3">
                Số lượng tuyển dụng
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
                    {item.nameRecruitment}
                  </th>
                  <td className="px-2 py-4 text-right">
                    <FaEye
                      className="cursor-pointer"
                      onClick={() => openDetail(item.description)}
                    />
                  </td>
                  <td className="px-6 py-4 text-nowrap ">
                    <button
                      onClick={() =>
                        item.studentApply.filter((apply) => apply.status === 1)
                          .length !== item.quantity && openModalApply(item)
                      }
                      className="underline text-blue-600"
                    >
                      {
                        item.studentApply.filter((apply) => apply.status === 1)
                          .length
                      }{" "}
                      / {item.quantity}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  {role === 3 && (
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          navigate(`/manager/edit/${item._id}`, {
                            state: { data: item },
                          })
                        }
                        className="font-medium p-2 text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Sửa
                      </button>
                    </td>
                  )}
                  {role === 3 && (
                    <td>
                      <button
                        onClick={() => onOpen(item._id)}
                        className="font-medium p-2 text-red-600 dark:text-red-500 hover:underline"
                      >
                        Xóa
                      </button>
                    </td>
                  )}
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

      <Modal
        title={body ? "Mô tả tuyển dụng" : "Bạn có chắc xóa bài đăng này"}
        onClose={onClose}
        showModal={showModal}
        onSubmit={onSubmit}
        description={"Bạn có chắc xóa bài đăng này"}
        body={body}
      />

      <ModalUserApply
        show={showModalApply}
        data={dataUserApply}
        onClose={onClose}
        handleApply={handleApply}
      />
    </div>
  );
}

export default Recruitment;
