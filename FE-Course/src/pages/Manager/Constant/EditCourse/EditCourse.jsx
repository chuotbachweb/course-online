import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

import * as courseService from "~/services/courseService";

function EditCourse() {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    nameCourse: "",
    imageUrl: "",
    price: 0,
  });
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

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
    formData.append("description", description);
    formData.append("imageUrl", data.imageUrl);
    formData.append("price", data.price);

    await courseService
      .editCourse({ data: formData, id: params.id })
      .then((result) => {
        if (result.status === 200) {
          alert("edit success");
          navigate(-1);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    courseService
      .getCourseById({ id: params.id })
      .then((course) => {
        setData({
          nameCourse: course.data.nameCourse,
          imageUrl: course.data.imageUrl,
          price: course.data.price,
        });
        console.log(course.data.description);
        setDescription(course.data.description);

        if (course.data.imageUrl) {
          setImage(course.data.imageUrl);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      ["size", "link"],
    ],
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

      <ReactQuill
        theme="snow"
        value={description}
        onChange={(e) => setDescription(e)}
        modules={modules}
      />

      <div className="relative z-0 w-full mt-5 mb-5 group">
        <input
          type="number"
          name="price"
          id="price"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          onChange={onChange}
          value={data.price}
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
          type="file"
          accept="image/*"
          onChange={onChangeFile}
        />
      </div>

      <div className="flex justify-center w-full">
        <button
          type="submit"
          className=" bg-primary hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-white text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          Sửa
        </button>
      </div>
    </form>
  );
}

export default EditCourse;
