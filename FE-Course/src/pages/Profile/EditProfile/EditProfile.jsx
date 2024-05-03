import { useContext, useEffect, useState } from "react";
import Loading from "~/components/Loading";
import { AuthContext } from "~/shared/AuthProvider";

function EditProfile() {
  const { currentUser, loading, editUser } = useContext(AuthContext);

  const [data, setData] = useState({
    password: "",
    rePassword: "",
    fullName: "",
    email: "",
    gender: "",
    imageUrl: "",
    address: "",
    phone: "",
  });
  const [image, setImage] = useState("");

  useEffect(() => {
    setData({
      password: "",
      rePassword: "",
      fullName: currentUser.fullName || "",
      email: currentUser.email || "",
      gender: currentUser.gender || 0,
      address: currentUser.address || 0,
      phone: currentUser.phone || 0,
    });

    if (currentUser.imageUrl) {
      setImage(currentUser.imageUrl);
    }
  }, [currentUser]);

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
    editUser({ data, id: currentUser._id });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`w-3/4 mx-auto mt-10 ${
        image && "flex justify-center md:flex-row flex-col"
      }`}
    >
      <div className="w-full flex justify-center ">
        {image && (
          <img
            src={image}
            alt=""
            className="rounded-full w-[200px] h-[200px] object-cover object-top mr-10"
          />
        )}
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
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
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
              name="email"
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
              Email
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="phone"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={data.phone}
              onChange={onChange}
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Số điện thoại
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="address"
              id="floating_address"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={data.address}
              onChange={onChange}
            />
            <label
              htmlFor="floating_address"
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
              {image ? "Thay đổi ảnh đại diện" : "Thêm ảnh đại diện"}
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

          <button
            type="submit"
            className=" bg-primary text-white hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Thay đổi
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditProfile;
