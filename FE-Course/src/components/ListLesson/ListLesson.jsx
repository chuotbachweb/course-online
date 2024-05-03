
import Modal from "../Modal";
import LessonItem from "./LessonItem";
import ClientEmpty from "../ClientEmpty";

function ListLesson({ data = [], onDelete, onOpen, showModal, onClose,received}) {
  if (data.length == 0) {
    return <ClientEmpty title="Chưa có bài giảng nào!"/>;
  }


  return (
    <>
      {data.map((item, index) => (
        <LessonItem
          key={item._id}
          data={item}
          arrayData={data}
          index={index}
          openModal={onOpen}
          received={received}
        />
      ))}

      <Modal
        title="Xóa bài học"
        description={"bạn có chắc xóa bài học này?"}
        showModal={showModal}
        onClose={onClose}
        onSubmit={onDelete}
      />
    </>
  );
}

export default ListLesson;
