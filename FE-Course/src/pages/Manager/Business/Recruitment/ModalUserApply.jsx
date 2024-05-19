import {
  IoCheckmarkCircleSharp,
  IoClose,
  IoCloseCircleSharp,
} from "react-icons/io5";

function ModalUserApply({ show, data, onClose, handleApply }) {
  return (
    <>
      {show && (
        <div className="bg-gray-400/50 fixed inset-0 flex justify-center items-center">
          <div className="bg-white px-4 mx-4 w-full md:w-5/12 rounded-lg">
            <div className="flex items-center justify-between py-2">
              <h3>CV đã nhận</h3>
              <IoClose size={40} className="p-2" />
            </div>
            <div className="border-b border-t py-2">
              {data.quantity !==
                data.studentApply.filter((res) => res.status === 1).length &&
              data.studentApply.length > 0 ? (
                data.studentApply.map((item) => (
                  <div
                    className="border p-2 my-2 rounded-lg flex justify-between items-center"
                    key={item._id}
                  >
                    <div className="flex">
                      <p>{item.userId.fullName} - </p>
                      <a
                        className="underline"
                        href={item.fileCV}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Xem CV
                      </a>
                    </div>
                    {item.status === 0 ? (
                      <div className="flex">
                        <IoCheckmarkCircleSharp
                          onClick={() =>
                            handleApply({
                              userId: item.userId,
                              recruitmentId: data._id,
                              status: 1,
                            })
                          }
                          size={40}
                          className="p-2 cursor-pointer text-success"
                        />
                        <IoCloseCircleSharp
                          onClick={() =>
                            handleApply({
                              userId: item.userId,
                              recruitmentId: data._id,
                              status: 2,
                            })
                          }
                          size={40}
                          className="p-2 cursor-pointer text-cancel"
                        />
                      </div>
                    ) : (
                      <p className="px-2">
                        {item.status === 1 ? "Nhận CV" : "Từ chối CV"}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center">
                  Chưa nhận được CV nào hoặc đã đủ số lượng!
                </p>
              )}
            </div>
            <div className="py-2 flex justify-end">
              <button
                onClick={onClose}
                className="text-white bg-cancel rounded px-6 py-1"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalUserApply;
