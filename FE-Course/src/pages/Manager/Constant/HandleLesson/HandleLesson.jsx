import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import VideoPlayer from "~/components/VideoPlayer";
import * as LessonService from "~/services/lessonService";

function HandleLesson() {
  const location = useLocation();
  const navigate = useNavigate();
  const { status, courseId } = location?.state;
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [data, setData] = useState({
    nameLesson: "",
    videoUrl: "",
  });

  const onChange = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const onChangeVideo = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("video/")) {
      const newData = { ...data };
      newData.videoUrl = file;
      setData(newData);

      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("nameLesson", data.nameLesson);
    formData.append("videoUrl", data.videoUrl);
    if (status === "Add") {
      LessonService.addLesson({ courseId, data: formData })
        .then((data) => {
          alert("Thêm thành công");
          navigate(-1);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }else{
      LessonService.editLesson({courseId, data: formData}).then((data) => {
        alert("Sửa thành công");
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    if (status === "Edit") {
      LessonService.getLessonById({ id: courseId })
       .then((lesson) => {
          setData({
            nameLesson: lesson.data.nameLesson,
            videoUrl: lesson.data.videoUrl,
          });
          setVideoUrl(lesson.data.videoUrl)
        })
       .catch((err) => {
          console.log(err);
        });
    }
  }, [status]);

  return (
    <form onSubmit={onSubmit} className="w-3/4 mx-auto mt-10">
      <div className="relative z-0 w-full mb-5 group">
        <input
          id="nameLesson"
          type="text"
          name="nameLesson"
          value={data.nameLesson}
          onChange={onChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="nameLesson"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Tên bài học
        </label>
      </div>

      <div className="flex flex-col mb-4 relative">
        <label
          className="mb-2 text-sm font-medium text-gray-900 border rounded-lg p-4"
          htmlFor="file_video"
        >
          Tải video
        </label>
        <input
          className="opacity-0 absolute top-6"
          id="file_video"
          name="videoUrl"
          type="file"
          accept="video/*"
          required={status === 'Add' ? true :false}
          onChange={onChangeVideo}
        />
      </div>

      {videoUrl && (
        <div className="flex justify-center my-4">
          <VideoPlayer data={videoUrl} />
        </div>
      )}

      <div className="flex justify-center">
        <button
          type="submit"
          className=" bg-primary hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-white text-sm w-full px-5 py-2.5 text-center "
        >
          {!loading
            ? status === "Add"
              ? "Thêm bài học"
              : "Sửa bài học"
            : "Loading..."}
        </button>

        <p
          onClick={() => navigate(-1)}
          className="ml-4 bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-white text-sm w-full px-5 py-2.5 text-center cursor-pointer"
        >
          Hủy
        </p>
      </div>
    </form>
  );
}

export default HandleLesson;
