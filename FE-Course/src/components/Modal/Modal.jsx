import PropTypes from "prop-types";
import { IoIosCloseCircle } from "react-icons/io";

function Modal({ showModal, onClose, onSubmit, title, description , body }) {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-8/12">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold mr-10">{title}</h3>
                  <IoIosCloseCircle
                    onClick={onClose}
                    className="cursor-pointer"
                    size={32}
                  />
                </div>
                <div className="relative p-6 flex-auto">
                 {body ? body : <p className="my-4 mx-10 text-blueGray-500 text-lg leading-relaxed">
                    {description}
                  </p>}
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onClose}
                  >
                    Hủy
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onSubmit}
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

Modal.propTypes = {
  showModal: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Modal;
