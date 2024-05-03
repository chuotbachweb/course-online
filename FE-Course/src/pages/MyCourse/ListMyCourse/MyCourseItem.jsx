import { Link } from "react-router-dom";

function MyCourseItem({ data }) {
  return (
    <Link
      to={`/course/${data.courseId._id}`}
      className="my-4 mx-10 md:flex border border-gray-200 rounded overflow-hidden"
    >
      <img
        src={data.courseId.imageUrl}
        alt=""
        className="h-auto w-full md:w-[280px]"
      />
      <div className="flex-grow flex justify-between p-4">
        <div className="flex flex-col justify-between">
          <p>{data.courseId.nameCourse}</p>
          <p>{data.teacherId.fullName}</p>
        </div>
        <div className="flex items-center">
          Tiến trình :{" "}
          {(data.progress.length / data.courseId.lesson.length) * 100 || 0} %
        </div>
      </div>
    </Link>
  );
}

export default MyCourseItem;
