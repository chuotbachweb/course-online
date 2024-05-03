import { FaPlay } from "react-icons/fa";

function VideoTrend({ data }) {
  return (
    <div className="items-center flex flex-wrap justify-center gap-8">
      {data.map((item) => (
        <a
          href={item.href}
          key={item.title}
          className="overflow-hidden my-4 bg-gradient-to-br from-green-200 to-green-100 border border-gray-100 rounded-lg shadow-xl hover:shadow-inner group"
        >
          <div className="relative">
            <img
              src={item.url}
              alt={item.title}
              className=" w-full max-w-sm h-[250px]"
            />

            <div
              className="bg-black/50 absolute inset-0 hidden justify-center items-center group-hover:flex"
            >
              <FaPlay color="#ccc" size={30} />
            </div>
          </div>
          <p className="py-4 px-4">{item.title}</p>
        </a>
      ))}
    </div>
  );
}

export default VideoTrend;
