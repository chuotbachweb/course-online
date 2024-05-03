import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ListLesson from "~/components/ListLesson";
import VideoPlayer from "~/components/VideoPlayer";

import * as lessonService from "~/services/lessonService";
import * as myCourseService from "~/services/myCourseService";

function DetailLesson() {
  const { id } = useParams();
  const location = useLocation();
  const { arrayData } = location?.state;
  const [data, setData] = useState({});
  const [reachedSeventyPercent, setReachedSeventyPercent] = useState(false);

  const handleProgress = (state) => {
    if (!reachedSeventyPercent) {
      const percentPlayed = (state.playedSeconds / state.loadedSeconds) * 100;
      if (percentPlayed >= 70) {
        setReachedSeventyPercent(true);
      }
    }
  };

  const putTracking = () => {
    myCourseService
      .trackingProgress({ lessonId: id, courseId: data.courseId })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (reachedSeventyPercent) {
      putTracking();
    }
  }, [reachedSeventyPercent]);

  useEffect(() => {
    lessonService
      .getLessonById({ id })
      .then((lesson) => {
        setData(lesson.data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div className="px-4">
      <div className="text-center font-bold">{data.nameLesson}</div>
      <div className="w-full flex justify-center mt-4">
        <VideoPlayer data={data.videoUrl} handleProgress={handleProgress} />
      </div>

      <ListLesson data={arrayData} />
    </div>
  );
}

export default DetailLesson;
