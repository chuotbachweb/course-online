import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import routes from "~/config/routes";
import { AuthContext } from "~/shared/AuthProvider";
import * as myCourseService from "~/services/myCourseService";
import { FaCheckCircle } from "react-icons/fa";

function LessonItem({ data, arrayData, index, openModal, received }) {
  const { role, token } = useContext(AuthContext);
  const navigate = useNavigate();
  let linkNavigate = null;
  const [myCourse, setMyCourse] = useState([]);
  const [successProgress, setSuccessProgress] = useState(false);

  useEffect(() => {
    if (token && role === 2) {
      myCourseService
        .getMyCourse({})
        .then((res) => {
          setMyCourse(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  useEffect(() => {
    if (token && role === 2) {
      myCourse.forEach((item) => {
        const tracking = item.progress.filter(
          (progress) => progress === data._id
        );
        if (tracking.length > 0) {
          setSuccessProgress(true);
        }
      });
    }
  }, [myCourse,token]);

  if (role === 1) {
    linkNavigate = () =>
      navigate(routes.detailLesson.replace(":id", data._id), {
        state: { arrayData },
      });
  } else if (role === 2 && received) {
    linkNavigate = () =>
      navigate(routes.detailLesson.replace(":id", data._id), {
        state: { arrayData },
      });
  } else if (!token) {
    linkNavigate = () => navigate(routes.login);
  }

  return (
    <button
      onClick={linkNavigate}
      className="flex w-full text-left border my-4 rounded-md overflow-hidden"
    >
      <div className="w-full flex items-center justify-between p-4">
        <div>{`${index + 1}. ${data.nameLesson}`}</div>
        {openModal ? (
          <div className="flex items-center">
            <button
              className="text-blue-500 px-4"
              onClick={() =>
                navigate(routes.handleLesson, {
                  state: { status: "Edit", courseId: data._id },
                })
              }
            >
              Sửa
            </button>
            <button
              className="text-red-500 px-4"
              onClick={() => openModal(data._id)}
            >
              Xóa
            </button>
          </div>
        ) : (
          <p>{successProgress && <FaCheckCircle className="text-primary" />}</p>
        )}
      </div>
    </button>
  );
}

export default LessonItem;
