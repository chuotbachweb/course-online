import { useCallback, useContext, useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ClientEmpty from "~/components/ClientEmpty";
import Modal from "~/components/Modal";
import { changeAssignment } from "~/services/assignmentService";

function HandleAssignment() {
  const location = useLocation();
  const { data } = location?.state;
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [body, setBody] = useState({});

  const [dataAssignment, setDataAssignment] = useState([]);
  const [dataSubmitted, setDataSubmitted] = useState({
    assignmentsId: "",
    scores: "",
  });
  
  useEffect(() => {
    setDataAssignment(data);
  }, [data]);

  const onChange = (e) => {
    const newData = { ...dataSubmitted };
    newData[e.target.name] = e.target.value;
    setDataSubmitted(newData);
  };

  const onOpen = (item) => {
    setShowModal(true);
    setBody(item);
    setDataSubmitted({ ...dataSubmitted, assignmentsId: item._id ,scores: item.scores });
  };

  const onClose = () => {
    setShowModal(false);
    setDataSubmitted({
      assignmentsId: "",
      scores: "",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    changeAssignment({ id: data._id, data: dataSubmitted })
      .then((res) => {
        alert("Đã chấm");
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mx-4">
      <p className="text-center font-bold text-2xl py-6">Bài tập đã nộp</p>

      {dataAssignment.assignments ? (
        dataAssignment.assignments.map((item) => (
          <div
            key={item._id}
            className="border px-4 py-4 my-4 rounded-lg flex justify-between items-center"
          >
            <div className="flex">
              <p>{item.userId.fullName} -</p>
              <Link
                to={item.fileAssignment}
                className="underline text-blue-500"
                target="_blank"
              >
                Bài tập
              </Link>
            </div>
            <button
              onClick={() => onOpen(item)}
              className="bg-success text-white py-1 px-4 rounded-lg"
            >
              Chấm điểm
            </button>
          </div>
        ))
      ) : (
        <ClientEmpty title={"Chưa có bài nào"} />
      )}

      <div className="flex flex-col md:flex-row">
        <button
          onClick={() => navigate(-1)}
          className="w-full mt-4 md:mt-0 bg-red-500 text-center text-white py-4 rounded"
        >
          Trở về
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-300/40 flex justify-center items-center">
          <form onSubmit={onSubmit} className="bg-white w-1/4 px-2">
            <div className="flex justify-between items-center py-4">
              <p className="font-bold">Chấm điểm</p>
              <IoCloseSharp size={30} className="p-2" />
            </div>
            <div className="border-t border-b">
              <div className="flex justify-between items-center py-4">
                <p>Người nộp :</p>
                <p>{body.userId.fullName}</p>
              </div>
              <div className="flex justify-between items-center py-4">
                <p>Điểm :</p>
                <input
                  type="number"
                  name="scores"
                  value={dataSubmitted.scores}
                  onChange={onChange}
                  className="border p-2"
                  placeholder="Nhập điểm"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="text-cancel p-4"
              >
                Hủy
              </button>
              <button type="submit" className="text-success p-4">
                Lưu
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default HandleAssignment;
