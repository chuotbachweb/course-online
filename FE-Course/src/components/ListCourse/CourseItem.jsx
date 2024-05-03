import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";

import Modal from "../Modal";
import * as myCourseService from "~/services/myCourseService";
import routes from "~/config/routes";
import { AuthContext } from "~/shared/AuthProvider";

function CourseItem({ data, onClickBuy }) {
  const navigate = useNavigate();
  const { token, role } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [received, setReceived] = useState(false);

  const fetch = useCallback(() => {
    if (token) {
      myCourseService
        .getMyCourse({})
        .then((course) => {
          const checked = course.data.filter(
            (item) => item.courseId._id === data._id
          );
          if (checked.length > 0) {
            setReceived(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [data._id, token]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const onClose = () => {
    setShowModal(false);
  };

  const onSubmit = () => {
    setShowModal(false);
    onClickBuy(data);
  };

  return (
    <div className="w-full max-w-sm bg-gradient-to-br from-green-200 to-green-100 border border-gray-100 rounded-lg shadow-xl hover:shadow-2xl">
      <div className="h-[250px] overflow-hidden">
        <Link to={`/course/${data._id}`}>
          <img
            className="p-8 rounded-t-lg w-full max-w-sm h-[250px]"
            src={data.imageUrl}
            alt="product image"
          />
        </Link>
      </div>
      <div className="px-5 pb-5 w-full h-[200px]">
        <Link to={`/course/${data._id}`}>
          <p className="text-xl font-semibold h-[110px] overflow-hidden tracking-tight text-black">
            {data.nameCourse}
          </p>
          {data.teacherId && (
            <p className="text-xl font-medium tracking-tight text-gray-500">
              {data.teacherId.fullName}
            </p>
          )}
        </Link>
        <div className="flex items-center  justify-between relative">
          <span className="text-3xl font-bold text-black">
            {data.price > 0
              ? new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(data.price)
              : "Miễn phí"}
          </span>
          {role === 2 && (
            <button
              onClick={() => {
                received ? navigate(routes.myCourse) : setShowModal(true);
              }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {received ? "Đã mua" : data.price > 0 ? "Mua" : "Nhận miển phí"}
            </button>
          )}
        </div>
      </div>
      <Modal
        title="Mua khóa học"
        description={"Bạn chắc chắn mua khoa học này?"}
        showModal={showModal}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </div>
  );
}

CourseItem.propTypes = {
  data: PropTypes.object,
  onClickBuy: PropTypes.func,
};

export default CourseItem;
