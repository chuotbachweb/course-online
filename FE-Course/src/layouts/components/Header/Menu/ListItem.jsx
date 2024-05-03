import PropTypes from "prop-types";

function ListItem({ data }) {
  return (
    <button
      onClick={data.link}
      className="sm:w-full w-1/4 flex sm:justify-start justify-center py-4 sm:px-2 sm:py-2 text-sm cursor-pointer hover:bg-slate-200"
    >
      {data.icon}
      <p className="hidden sm:block">{data.title}</p>
    </button>
  );
}

ListItem.propTypes = {
  data: PropTypes.object,
};

export default ListItem;
