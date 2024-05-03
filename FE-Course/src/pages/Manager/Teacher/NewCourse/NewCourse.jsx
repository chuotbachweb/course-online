import { useState } from "react";
import { useNavigate } from "react-router-dom";
import routes from "~/config/routes";

import * as courseService from "~/services/courseService";

function NewCourse() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    nameCourse: "",
    description: "",
    imageUrl: "",
    videoUrl: "",
    price: "",
    file: "",
  });
  const [image, setImage] = useState("");

  const onChange = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const img = URL.createObjectURL(file);
      setImage(img);
      const newData = { ...data };
      newData.imageUrl = file;
      setData(newData);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nameCourse", data.nameCourse);
    formData.append("description", data.description);
    formData.append("imageUrl", data.imageUrl);
    formData.append("price", data.price);

    await courseService
      .newCourse({ data: formData })
      .then((result) => {
        if (result.status === 200) {
          alert("Thêm thành công");
          navigate(routes.courseTeacher);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={onSubmit} className="w-3/4 mx-auto mt-10">
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="nameCourse"
          id="nameCourse"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          onChange={onChange}
          value={data.nameCourse}
        />
        <label
          htmlFor="nameCourse"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Tên khóa học
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <textarea
          name="description"
          id="description"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          onChange={onChange}
          value={data.description}
        />
        <label
          htmlFor="description"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Mô tả
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="number"
          min={0}
          name="price"
          id="price"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          onChange={onChange}
          value={data.v}
        />
        <label
          htmlFor="price"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Giá
        </label>
      </div>

      <div className="flex flex-col mb-4">
        <label
          className="mb-2 text-sm font-medium text-gray-900 border rounded-lg p-4"
          htmlFor="file_image"
        >
         Tải ảnh lên
        </label>
        {image && (
          <img
            src={image}
            alt=""
            className="rounded-lg w-[150px] h-[150px] object-cover"
          />
        )}
        <input
          className="opacity-0 h-0"
          id="file_image"
          name="imageUrl"
          required
          type="file"
          accept="image/*"
          onChange={onChangeFile}
        />
      </div>

      <div className="flex justify-center w-full">
        <button
          type="submit"
          className=" bg-primary hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          Xác nhận
        </button>
      </div>
    </form>
  );
}

export default NewCourse;
