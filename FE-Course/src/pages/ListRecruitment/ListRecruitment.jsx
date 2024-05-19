import { useContext, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import routes from "~/config/routes";

import {
  applyRecruitment,
  getAllRecruitment,
} from "~/services/recruitmentService";
import { AuthContext } from "~/shared/AuthProvider";

function ListRecruitment() {
  const { role, token, currentUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [body, setBody] = useState({});
  const [dataApply, setDataApply] = useState({
    fileCV: "",
    recruitmentId: "",
  });

  const onChange = (e) => {
    const newData = { ...dataApply };
    newData[e.target.name] = e.target.files[0];
    setDataApply(newData);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const onOpen = (item) => {
    setShowModal(true);
    setBody(item);
    setDataApply({ ...dataApply, recruitmentId: item._id });
  };

  const onApply = () => {
    if (dataApply.fileCV) {
      const formData = new FormData();
      formData.append("fileCV", dataApply.fileCV);
      formData.append("recruitmentId", dataApply.recruitmentId);

      applyRecruitment({ data: formData })
        .then((apply) => {
          if (apply.status === 200) {
            alert("Ứng tuyển thành công");
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("Vui lòng thêm CV để nhà tuyển dụng xem xét");
    }
  };

  useEffect(() => {
    getAllRecruitment({ page: currentPage, perPage: 4 })
      .then((recruitment) => {
        setData(recruitment.data);
        setTotalPage(recruitment.totalPages);
      })
      .catch((error) => console.log(error));
  }, [currentPage]);

  return (
    <>
      <p className="text-center my-4 font-bold text-2xl">Việc làm</p>
      <div className={`${showModal && "md:flex"} mx-10 `}>
        <div className={`${showModal && "md:w-2/3"}`}>
          {data.map((item) => (
            <button
              key={item._id}
              className={`border w-full my-2 text-left rounded-xl p-4 ${
                dataApply.recruitmentId === item._id && "bg-gray-100"
              }`}
              onClick={() => onOpen(item)}
            >
              {item.nameRecruitment}
            </button>
          ))}

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
        {showModal && (
          <div className="md:w-1/3 px-4 md:ml-4 md:border-l border-t md:border-t-0">
            <div>
              {<div dangerouslySetInnerHTML={{ __html: body.description }} />}
            </div>
            {token && role === 2 ? (
              body.studentApply.filter((apply) => apply.status === 1).length <
              body.quantity ? (
                body?.studentApply.filter(
                  (apply) => apply.userId._id !== currentUser._id
                ).length === 0 ? (
                  <div className="border-t mt-10">
                    <input
                      type="file"
                      name="fileCV"
                      id="fileCV"
                      className="opacity-0"
                      accept=".pdf"
                      onChange={onChange}
                    />
                    <label
                      htmlFor="fileCV"
                      className="border w-full px-4 py-3 rounded-xl flex justify-start cursor-pointer "
                    >
                      {dataApply.fileCV ? "Thay đổi CV" : "Tải lên CV"}
                    </label>

                    <button
                      onClick={onApply}
                      className="bg-primary px-10 py-2 w-full text-white mt-4 rounded-2xl"
                    >
                      Ứng tuyển
                    </button>
                  </div>
                ) : (
                  <p className="text-cancel font-bold text-center">
                    Đã nộp hồ sơ
                  </p>
                )
              ) : (
                <p className="text-cancel font-bold text-center">
                  Đã đủ người ứng tuyển
                </p>
              )
            ) : (
              <Link
                to={routes.login}
                className="bg-primary px-10 py-2 flex justify-center text-white rounded-xl mt-4"
              >
                Đăng nhập để ứng tuyển
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ListRecruitment;
