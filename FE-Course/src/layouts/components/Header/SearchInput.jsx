
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import routes from "~/config/routes";

function SearchInput() {
    const navigate = useNavigate();
    const [nameCourse, setNameCourse] = useState("");
  
    const onSearch = (e) => {
      e.preventDefault()
      navigate(`${routes.listCourse}?nameCourse=${nameCourse}`);
    };

  return (
    <form onSubmit={onSearch} className="w-full mx-4 sm:mx-0 sm:w-1/2 flex items-center border border-gray-300 rounded-xl overflow-hidden">
      <input
        placeholder="Nhập tên khóa học..."
        value={nameCourse}
        name={nameCourse}
        onChange={(e) => setNameCourse(e.target.value)}
        className="w-full pl-4 py-2 outline-none"
      />
      <button type="submit">
        <CiSearch
          className="cursor-pointer w-10 h-10 p-2 text-gray-400"
        />
      </button>
    </form>
  );
}

export default SearchInput;
