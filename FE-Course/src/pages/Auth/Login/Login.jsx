import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import TextInput from "~/components/TextInput";
import routes from "~/config/routes";
import { AuthContext } from "~/shared/AuthProvider";

function Login() {
  const { login } = useContext(AuthContext);
  const [data, setData] = useState({ username: "", password: "" });

  const onChange = (e) => {
    const newData = { ...data, [e.target.name]: e.target.value };
    setData(newData);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(data);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="relative w-96 flex flex-col rounded-xl bg-white border border-gray-900 text-gray-700 shadow-md"
      >
        <div className="mx-4 -mt-6 mb-4 grid h-28 place-items-center rounded-xl bg-gradient-to-tl from-gray-900 to-slate-800">
          <h3 className="text-3xl font-semibold text-white">Sign In</h3>
        </div>
        <div className="p-6 space-y-4">
          <TextInput
            type="text"
            title="Tài khoản"
            value={data.username}
            name="username"
            onChange={onChange}
          />
          <TextInput
            type="password"
            title="Mật khẩu"
            value={data.password}
            name="password"
            onChange={onChange}
          />
        </div>

        <div className="text-center px-4">
          <button
            className="w-full px-6 py-3 mt-6 font-bold text-white uppercase transition-all bg-gray-900 rounded-lg hover:bg-slate-700"
            type="submit"
          >
           Đăng nhập
          </button>
        </div>

        <p className="my-4 text-center">
          Chưa có tài khoản?{" "}
          <Link to={routes.register} className="font-bold underline">
            Đăng ký ngay
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
