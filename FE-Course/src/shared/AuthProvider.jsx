import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate,useLocation} from "react-router-dom";

import * as authService from "~/services/authService";
import routes from "~/config/routes";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState("");
  const [role, setRole] = useState(2);
  const [loading, setLoading] = useState(false);
  
  const login = (data) => {
    setLoading(true);
    authService
      .login(data)
      .then((res) => {
        if (res.data) {
          localStorage.setItem("token", res.data.token);
          setCurrentUser(res.data);
          setToken(res.data.token);
          setRole(res.data.role);
          navigate(routes.home);
          setLoading(false);
        }
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };

  const register = (data) => {
    if (data.password !== data.rePassword) {
      alert("Passwords do not match");
    } else {
      authService
        .Register(data)
        .then((res) => {
          if (res.data.data) {
            alert("Registered");
            navigate(routes.login);
          }
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    }
  };

  const newTeacher = async ({ data }) => {
    if (data.password !== data.rePassword) {
      alert("Passwords do not match");
    } else {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("fullName", data.fullName);
      formData.append("password", data.password);
      formData.append("email", data.email);
      formData.append("gender", data.gender);
      formData.append("imageUrl", data.imageUrl);
      formData.append("phone", data.phone);
      formData.append("address", data.address);

      await authService
        .newTeacher({ data: formData })
        .then((res) => {
          if (res.response?.data?.error) {
            alert(res.response.data.error);
          } else {
            alert("Success");
            navigate(routes.teacherAdmin);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const editUser = async ({ data, id }) => {
    if (data.password !== data.rePassword) {
      alert("Passwords do not match");
    } else {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("password", data.password);
      formData.append("email", data.email);
      formData.append("gender", data.gender);
      formData.append("imageUrl", data.imageUrl);
      formData.append("phone", data.phone);
      formData.append("address", data.address);

      await authService
        .editUser({ data: formData, id })
        .then((res) => {
          if (res.data) {
            alert("Updated");
            navigate(-1);
          }
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setCurrentUser(false);
    setToken("");
    setRole("");
    navigate(routes.home);
  };

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      authService
        .getCurrentUser()
        .then((user) => {
          setCurrentUser(user.data);
          setRole(user.data.role);
          setLoading(false);
        })
        .catch((err) => {
          if (err) {
            localStorage.removeItem("token");
            setCurrentUser(false);
            setToken("");
            setRole("");
            navigate(routes.home);
          }
        });
    }
  }, [navigate]);

  useEffect(() => {
    if ((role === 0 || role === 3) && location.pathname === routes.home) {
     navigate(routes.homeManager);
    }
  },[location,navigate,role])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        token,
        loading,
        logOut,
        login,
        register,
        editUser,
        newTeacher,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
