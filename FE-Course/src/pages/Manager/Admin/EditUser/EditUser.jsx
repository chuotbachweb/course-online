import { useContext, useEffect, useState } from "react";

import Loading from "~/components/Loading";
import { AuthContext } from "~/shared/AuthProvider";
import * as authService from "~/services/authService";
import { useParams } from "react-router-dom";

function EditUser() {
  const { loading, editUser } = useContext(AuthContext);
  const params = useParams();

  const [data, setData] = useState({
    password: "",
    rePassword: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    imageUrl: "",
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
    editUser({ data, id: params.id });
  };

  useEffect(() => {
    authService
      .getUserById({ id: params.id })
      .then((user) => {
        setData({
          password: "",
          rePassword: "",
          fullName: user.fullName,
          email: user.email,
          gender: user.gender,
          phone: user.phone,
          address: user.address,
        });
        setImage(user.imageUrl);
      })
      .catch((error) => console.log(error));
  }, [params]);

  if (loading) {
    return <Loading />;
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`w-3/4 mx-auto mt-10 ${image && "flex justify-center"}`}
    >
      <div>
        {image && (
          <img
            src={image}
            alt=""
            className="rounded-full w-[200px] h-[200px] object-cover object-top mr-4"
          />
        )}
      </div>

      <div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={data.password}
              onChange={onChange}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Mật khẩu
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="rePassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={data.rePassword}
              onChange={onChange}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Nhập lại mật khẩu
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="fullName"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={data.fullName}
            onChange={onChange}
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
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
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={data.email}
            onChange={onChange}
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
           Địa chỉ email
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="phone"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={data.phone}
            onChange={onChange}
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
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={data.address}
            onChange={onChange}
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
            {image ? "Đổi ảnh đại diện" : "Tải ảnh đại diện"}
          </label>
        </div>

        <input
          className="opacity-0"
          id="file_input"
          name="imageUrl"
          type="file"
          accept="image/*"
          onChange={onChangeImage}
        />
        <div className="flex justify-center w-full">
        <button
          type="submit"
          className=" bg-primary hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-white text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          Sửa
        </button>
        </div>
      </div>
    </form>
  );
}

export default EditUser;
