import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ListLesson from "~/components/ListLesson";
import VideoPlayer from "~/components/VideoPlayer";
import { submitAssignment } from "~/services/assignmentService";

import * as lessonService from "~/services/lessonService";
import * as myCourseService from "~/services/myCourseService";
import { AuthContext } from "~/shared/AuthProvider";

function DetailLesson() {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const { arrayData } = location?.state;
  const [data, setData] = useState({});
  const [reachedSeventyPercent, setReachedSeventyPercent] = useState(false);
  const [dataHomework, setDataHomework] = useState({});
  const [received, setReceived] = useState(false);

  const handleProgress = (state) => {
    if (!reachedSeventyPercent) {
      const percentPlayed = (state.playedSeconds / state.loadedSeconds) * 100;
      if (percentPlayed >= 70) {
        setReachedSeventyPercent(true);
      }
    }
  };

  const fetch = useCallback(() => {
    lessonService
      .getLessonById({ id })
      .then((lesson) => {
        setData(lesson.data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const putTracking = () => {
    myCourseService
      .trackingProgress({ lessonId: id, courseId: data.courseId })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  const onSentAssignment = async () => {
    const formData = new FormData();
    formData.append("fileAssignment", dataHomework);
    await submitAssignment({ id, data: formData })
      .then((res) => {
        console.log(res);
        alert("Gửi bài tập thành công");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    myCourseService
      .getMyCourse({})
      .then((course) => {
        const checkPurchased = course.data.filter(
          (item) => item.courseId._id === data.courseId
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
  }, [data]);

  useEffect(() => {
    if (reachedSeventyPercent) {
      putTracking();
    }
  }, [reachedSeventyPercent]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div className="px-4">
      <div className="text-center font-bold">{data.nameLesson}</div>
      <div className="flex md:flex-row flex-col items-center justify-center mt-4">
        <VideoPlayer data={data.videoUrl} handleProgress={handleProgress} />

        <div className="w-full md:w-3/12 px-10 flex flex-col">
          <h3 className="text-center mb-2">Bài tập</h3>
          {data.fileHomework ? (
            <div className="w-full">
              <Link
                to={data.fileHomework}
                target="_blank"
                className="bg-success text-white w-full flex justify-center py-2 rounded-xl hover:shadow-black/60 hover:shadow-inner"
              >
                Mở bài tập ( pdf )
              </Link>

              <p className="mt-2">Gửi bài tập</p>
              <p className="my-2">Lưu ý chỉ không thể sửa bài khi đã gửi</p>
              {data.assignments.filter(
                (item) => item.userId === currentUser._id
              ).length === 0 ? (
                <>
                  <input
                    type="file"
                    name="fileAssignment"
                    accept=".pdf"
                    onChange={(e) => setDataHomework(e.target.files[0])}
                  />

                  <button
                    onClick={onSentAssignment}
                    className="w-full bg-success text-white rounded-xl py-2 mt-4 hover:shadow-black/60 hover:shadow-inner"
                  >
                    Gửi bài tập
                  </button>
                </>
              ) : (
                <div>
                  <p className="text-cancel">Đã nộp bài</p>
                  <div className="flex border">
                    <div className="w-1/2 text-center">Điểm</div>
                    <div className="w-1/2 text-center border-l">
                      {data.assignments
                        .filter((item) => item.userId === currentUser._id)[0]
                        .scores?.toString() || "Chưa chấm"}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center">Chưa có bài tập</p>
          )}
        </div>
      </div>
      <ListLesson data={arrayData} received={received}/>
    </div>
  );
}

export default DetailLesson;
