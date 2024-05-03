import { useEffect, useMemo, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";

import * as paymentService from "~/services/paymentService";
import * as myCourseService from "~/services/myCourseService";
import { Link } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import routes from "~/config/routes";

function PaymentResult() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const urlSearchParams = new URLSearchParams(
    window.location.href.split("?")[1]
  );
  const params = useMemo(() => {
    return {};
  }, []);

  urlSearchParams.forEach((value, key) => {
    params[key] = value;
  });

  useEffect(() => {
    paymentService
      .callbackVnPay({ param: params })
      .then((response) => {
        if (response.data.code == "00") {
          setSuccess(true);
          setMessage("Thanh toán thành công");
          myCourseService
            .buyCourse({ courseId: params.vnp_OrderInfo })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => console.log(err));
        } else if (response.data.code == 24) {
          setError(true);
          setMessage("Thanh toán không thành công");
        }
      })
      .catch((err) => {
        if (err.response.status == 400) {
          setError(true);
          setMessage("Thanh toán không thành công");
        }
      });
  }, [params, success]);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <FaCheckCircle
        size={100}
        className={`transition ${
          !success ? "scale-0 absolute" : "scale-100"
        } text-green-600`}
      />
      <MdError
        size={100}
        className={`transition ${
          !error ? "scale-0 absolute" : "scale-100"
        } text-red-600`}
      />
      <p className="text-4xl font-bold mt-10">{message}</p>

      <Link className="mt-10"  to={routes.home}>
        <CiHome size={50} className="hover:text-primary"/>
      </Link>
    </div>
  );
}

export default PaymentResult;
