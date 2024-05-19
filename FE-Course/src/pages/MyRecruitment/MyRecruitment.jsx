import { useContext, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import ClientEmpty from "~/components/ClientEmpty";
import routes from "~/config/routes";

import { getMyRecruitment } from "~/services/recruitmentService";
import { AuthContext } from "~/shared/AuthProvider";

function MyRecruitment() {
  const { role, token, currentUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  useEffect(() => {
    getMyRecruitment({
      page: currentPage,
      perPage: 10,
    })
      .then((recruitment) => {
        setData(recruitment.data);
        setTotalPage(recruitment.totalPages);
      })
      .catch((error) => console.log(error));
  }, [currentPage, currentUser]);

  return (
    <>
      <p className="text-center my-4 font-bold text-2xl">Việc làm</p>
      <div className="mx-10">
        <div>
          {data.length > 0 ? (
            data.map((item) => {
              const filterMyRecruitment = item.studentApply.filter(
                (filter) => filter.userId._id === currentUser._id
              )[0].status;

              return (
                <div
                  key={item._id}
                  className={`border w-full my-2 text-left rounded-xl p-4 flex justify-between`}
                >
                  <p>{item.nameRecruitment}</p>
                  <div>
                    {filterMyRecruitment === 0 ? (
                      "Đã ứng tuyển"
                    ) : filterMyRecruitment === 1 ? (
                      <p className="text-success">Đã trúng tuyển !</p>
                    ) : (
                      <p className="text-cancel">Đã trượt</p>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <ClientEmpty title={"Chưa ứng tuyển"} />
          )}
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
      </div>
    </>
  );
}

export default MyRecruitment;
