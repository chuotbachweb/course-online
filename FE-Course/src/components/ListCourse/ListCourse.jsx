import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "~/shared/AuthProvider";
import { useNavigate } from "react-router-dom";

import CourseItem from "./CourseItem";
import * as myCourseService from "~/services/myCourseService";
import * as paymentService from "~/services/paymentService";
import routes from "~/config/routes";

function ListCourse({ data }) {
  const { token } = useContext(AuthContext);
  const navigator = useNavigate();

  const fetch = (courseId) => {
    myCourseService
      .buyCourse({ courseId })
      .then((course) => {
        if (course) {
          alert("Buy success");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchPayment = (dataCourse) => {
    const dataPayment = {
      amount: dataCourse.price,
      language: "vn",
      myCourseId: dataCourse._id,
      bankCode: "",
    };
    paymentService
      .createUrlVnPay({ data: dataPayment })
      .then((response) => {
        if (response.status == 200) {
          window.location.href = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickBuy = (dataCourse) => {
    if (token) {
      if (!dataCourse.price || dataCourse.price === 0) {
        fetch(dataCourse._id);
      } 
      else {
        fetchPayment(dataCourse);
      }
    } else {
      navigator(routes.login);
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-8">
        {data.map((item) => (
          <CourseItem key={item._id} data={item} onClickBuy={onClickBuy} />
        ))}
      </div>
    </>
  );
}

ListCourse.propTypes = {
  data: PropTypes.array,
  onClickBuy: PropTypes.func,
};

export default ListCourse;