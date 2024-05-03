import MyCourseItem from "./MyCourseItem";

function ListMyCourse({ data = [] }) {
  return (
    <div>
      {data.map((item) => (
        <MyCourseItem key={item._id} data={item} />
      ))}
    </div>
  );
}

export default ListMyCourse;
