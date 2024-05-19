import PropTypes from "prop-types";
import SideBar from "../components/SideBar";
import HeaderManager from "../components/HeaderManager";
import { useContext } from "react";
import { AuthContext } from "~/shared/AuthProvider";

function ManagerLayout({ children }) {
  const { role } = useContext(AuthContext);

  if (role === 2) {
    return null;
  }

  return (
    <>
      <HeaderManager />
      <div className="flex flex-col md:flex-row">
        <SideBar />
        <div className="w-full md:w-5/6">{children}</div>
      </div>
    </>
  );
}

ManagerLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ManagerLayout;
