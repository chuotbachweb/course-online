import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import ListLesson from "~/components/ListLesson";
import Modal from "~/components/Modal";
import routes from "~/config/routes";
import * as LessonService from "~/services/lessonService";
import { AuthContext } from "~/shared/AuthProvider";

function EditLesson() {
  const { id } = useParams();
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [getIdModal, setGetIdModal] = useState("");

  const onClose = () => {
    setShowModal(false);
  };

  const onOpen = (id) => {
    setShowModal(true);
    setGetIdModal(id);
  };

  const onDelete = () => {
    LessonService.deleteLesson({ courseId: getIdModal }).then((item) => {
      fetchData();
      setShowModal(false);
    });
  };

  const fetchData = useCallback(() => {
    LessonService.getLessonByCourse({ courseId: id }).then((lesson) =>
      setData(lesson.data.data)
    );
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [id, fetchData]);

  return (
    <div className="mx-4">
      <p className="text-center font-bold text-2xl py-6">Thông tin khóa học</p>
      <ListLesson
        data={data}
        onDelete={onDelete}
        onEdit={onOpen}
        onOpen={onOpen}
        showModal={showModal}
        onClose={onClose}
      />
      <div className="flex flex-col md:flex-row">
        {role === 0 || role === 1 && (
          <button
            className="w-full md:mr-2 bg-primary text-center text-white py-4 rounded"
            onClick={() =>
              navigate(routes.handleLesson, {
                state: { status: "Add", courseId: id },
              })
            }
          >
            Thêm bài học
          </button>
        )}
        <button
          onClick={() => navigate(-1)}
          className="w-full mt-4 md:mt-0 bg-red-500 text-center text-white py-4 rounded"
        >
          Trở về
        </button>
      </div>
    </div>
  );
}

export default EditLesson;
