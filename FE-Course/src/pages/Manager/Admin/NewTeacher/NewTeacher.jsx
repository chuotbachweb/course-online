import { useContext, useState } from "react";
import { AuthContext } from "~/shared/AuthProvider";

function NewTeacher() {
  const { newTeacher } = useContext(AuthContext);
  const [data, setData] = useState({
    username: "",
    password: "",
    rePassword: "",
    fullName: "",
    email: "",
    gender: 0,
    role: 1,
    address: "",
    phone: ""
  });
  const [image, setImage] = useState("");

  const onChange = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const img = URL.createObjectURL(file);
      setImage(img);

      const newData = { ...data };
      newData.imageUrl = file;
      setData(newData);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    newTeacher({ data });
  };

  return (
    <form onSubmit={onSubmit} className="w-3/4 mx-auto mt-10">
      <div className="relative z-0 w-full mb-5 group">
        <input
          id="Username"
          type="text"
          name="username"
          value={data.username}
          onChange={onChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="Username"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Tài khoản
        </label>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            id="password"
            type="password"
            name="password"
            value={data.password}
            onChange={onChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Mật khẩu
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            value={data.rePassword}
            onChange={onChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Nhập lại mật khẩu
          </label>
        </div>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="fullName"
          id="fullName"
          value={data.fullName}
          onChange={onChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="fullName"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Họ và tên
        </label>
      </div>

      <div className="mb-3">
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio"
            name="gender"
            checked={data.gender == 0}
            value={0}
            onChange={onChange}
          />
          <span className="ml-2">Nam</span>
        </label>
        <label className="inline-flex items-center ml-4">
          <input
            type="radio"
            className="form-radio"
            name="gender"
            value={1}
            checked={data.gender == 1}
            onChange={onChange}
          />
          <span className="ml-2">Nữ</span>
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          name="email"
          id="email"
          value={data.email}
          onChange={onChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Địa chỉ email
        </label>
      </div>

      
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="number"
          name="phone"
          id="phone"
          value={data.phone}
          onChange={onChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="phone"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Số điện thoại
        </label>
      </div>

      
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="address"
          id="address"
          value={data.address}
          onChange={onChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="address"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Địa chỉ
        </label>
      </div>

      <div className="flex flex-col mb-4">
        <label
          className="mb-2 text-sm font-medium text-gray-900 border rounded-lg p-4"
          htmlFor="file_input"
        >
          Tải ảnh đại diện
        </label>
        {image && (
          <img
            src={image}
            alt=""
            className="rounded-lg w-[100px] h-[100px] object-cover"
          />
        )}
      </div>

        <input
          className="opacity-0"
          id="file_input"
          name="imageUrl"
          required
          type="file"
          accept="image/*"
          onChange={onChangeImage}
        />
  
     <div className="flex justify-center">
        <button
          type="submit"
          className=" bg-primary hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-white text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          Thêm
        </button>
     </div>
    </form>
  );
}

export default NewTeacher;
