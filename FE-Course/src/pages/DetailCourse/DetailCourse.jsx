import { useCallback, useContext, useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdRateReview } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import ListLesson from "~/components/ListLesson";
import Modal from "~/components/Modal";
import StarRating from "~/components/StarRating";
import TextInput from "~/components/TextInput";
import routes from "~/config/routes";

import { AuthContext } from "~/shared/AuthProvider";
import * as courseService from "~/services/courseService";
import * as rateCourseService from "~/services/rateCourseService";
import * as myCourseService from "~/services/myCourseService";
import * as paymentService from "~/services/paymentService";
import { FaUserCircle } from "react-icons/fa";

function DetailCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, role, currentUser } = useContext(AuthContext);
  const [data, setData] = useState({});
  const [getRate, setGetRate] = useState([]);
  const [received, setReceived] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalRate, setShowModalRate] = useState(false);
  const [haveRate, setHaveRate] = useState(true);
  const [dataRate, setDataRate] = useState({
    comment: "",
    rate: 1,
  });

  useEffect(() => {
    if (token) {
      myCourseService
        .getMyCourse({})
        .then((course) => {
          const checkPurchased = course.data.filter(
            (item) => item.courseId._id === id
          );
          if (checkPurchased.length > 0) {
            setReceived(true);
          } else {
            setReceived(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  const fetch = (courseId) => {
    myCourseService
      .buyCourse({ courseId })
      .then((course) => {
        if (course) {
          alert("Mua thành công");
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
      } else {
        fetchPayment(dataCourse);
      }
    } else {
      navigate(routes.login);
    }
  };

  const onClose = () => {
    setShowModalRate(false);
    setShowModal(false);
    setDataRate({ comment: "", rate: 0 });
  };

  const onSubmit = () => {
    setShowModal(false);
    onClickBuy(data);
  };

  const onChange = (event) => {
    const newData = { ...dataRate };
    newData[event.target.name] = event.target.value;
    setDataRate(newData);
  };

  const onShowRate = () => {
    setShowModalRate(true);
  };

  const handleStarClick = (star) => {
    setDataRate({ ...dataRate, rate: star });
  };

  const fetchData = useCallback(() => {
    rateCourseService.getRate({ courseId: id }).then((rateCourse) => {
      setGetRate(rateCourse.data);
      const checkHaveRate = rateCourse.data.filter(
        (filter) => filter.studentId._id === currentUser._id
      );
      setShowModalRate(false);
      if (checkHaveRate.length > 0) {
        setHaveRate(false);
      }
    });
  }, [id, currentUser]);

  const onSentRate = (e) => {
    e.preventDefault();
    rateCourseService
      .sentRate({ courseId: id, data: dataRate })
      .then((rateCourse) => {
        if (rateCourse.status === 200) {
          fetchData();
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    courseService
      .getCourseById({ id })
      .then((course) => {
        setData(course.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className="p-10">
      <div className="flex flex-col-reverse sm:flex-row items-center">
        <div className="w-1/2 flex flex-col justify-center items-center mt-4 sm:mb-0">
          <p className="text-2xl font-bold">{data.nameCourse}</p>
          {role === 1 ||
            (!received && (
              <>
                <p className="my-4 text-xl">
                  {data.price > 0
                    ? `${data.price.toLocaleString("vi-vn")} VNĐ`
                    : "Miễn phí"}
                </p>
                <button
                  className="w-[160px] h-[48px] rounded-md bg-black text-white font-medium "
                  onClick={() => {
                    received ? navigate(routes.myCourse) : setShowModal(true);
                  }}
                >
                  {data.price > 0 ? "Mua ngay" : "Nhận miễn phí"}
                </button>
              </>
            ))}
        </div>
        <div className="w-full sm:w-1/2 flex justify-center border-l border-neutral-200 items-center">
          <img src={data.imageUrl} alt="" />
        </div>
      </div>

      <div className="mt-10">
        <div className="flex justify-between items-center">
          {data.teacherId && (
            <Link to={`/teacher/${data.teacherId?._id}`}>
              <div className="inline-flex">
                <img
                  src={data.teacherId?.imageUrl}
                  alt=""
                  className="w-[100px] h-[100px] rounded-full shadow-xl object-cover"
                />
                <div className="mx-4 mt-4">
                  <p className="font-bold ">{data.teacherId.fullName}</p>
                  <p className="text-gray-500">{data.teacherId.address}</p>
                </div>
              </div>
            </Link>
          )}

          {(token && role === 2) &&haveRate && (
            <MdRateReview
              onClick={onShowRate}
              className="cursor-pointer"
              size={30}
            />
          )}
        </div>

        <p className="my-4 text-center text-2xl font-bold">Mô tả khóa học</p>
        <p>{data.description}</p>
      </div>

      <p className="my-4 text-center text-2xl font-bold">Bài giảng</p>
      <ListLesson data={data.lesson} received={received} />

      <p className="my-4 font-bold">Đánh giá của người mua</p>
      {getRate.length > 0 ? (
        getRate.map((item) => (
          <div
            key={item._id}
            className="flex justify-between mt-4 p-2 border rounded-2xl"
          >
            <div className="flex items-center">
              {item?.studentId?.imageUrl ? (
                <img
                  src={item.studentId.imageUrl}
                  alt="avatar"
                  className="w-[50px] h-[50px] rounded-full object-cover object-top"
                />
              ) : (
                <FaUserCircle size={32} />
              )}
              <div className="px-2">
                <p>{item?.studentId?.fullName}</p>
                <p>{item?.comment}</p>
              </div>
            </div>

            <div>
              <StarRating totalStars={5} dataRate={item.rate} />
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">Chưa có lượt đánh giá nào</p>
      )}

      <Modal
        title="Mua khóa học"
        description={"Bạn chắc chắn mua khoa học này?"}
        showModal={showModal}
        onClose={onClose}
        onSubmit={onSubmit}
      />

      {showModalRate && (
        <form
          onSubmit={onSentRate}
          className="bg-black/40 flex justify-center items-center fixed inset-0 z-50"
        >
          <div className="bg-white rounded-lg w-[400px] px-4 py-4">
            <div className="flex justify-between">
              <p className="mb-4">Đánh giá khóa học</p>
              <IoIosCloseCircleOutline
                className="cursor-pointer"
                size={20}
                onClick={onClose}
              />
            </div>
            <StarRating
              totalStars={5}
              handleStarClick={handleStarClick}
              dataRate={dataRate.rate}
            />
            <TextInput
              title="Bình luận"
              value={dataRate.comment}
              name="comment"
              onChange={onChange}
              type="text"
            />

            <div className="w-full flex mt-4">
              <button className="text-red-600 w-1/2 mr-2" onClick={onClose}>
                Hủy
              </button>
              <button className="text-primary w-1/2" type="submit">
                Gửi đánh giá
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default DetailCourse;
