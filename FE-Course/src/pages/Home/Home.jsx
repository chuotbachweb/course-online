import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ListCourse from "~/components/ListCourse";
import routes from "~/config/routes";
import LogoWeb from "~/assets/img/LogoWeb.png";
import VideoTrend from "~/components/VideoTrend";
import { getCourseFree, getCoursePrice } from "~/services/courseService";

const dataVideo = [
  {
    title: "Lập Trình JavaScript Cơ Bản",
    url: "https://firebasestorage.googleapis.com/v0/b/course-eb7fe.appspot.com/o/1.png?alt=media&token=9e73e111-b7fe-4da4-8e91-2c8d13babc82",
    href: "https://www.youtube.com/watch?v=0SJE9dYdpps&list=PL_-VfJajZj0VgpFpEVFzS5Z-lkXtBe-x5",
  },
  {
    title: "HTML CSS từ Zero đến Hero",
    url: "https://firebasestorage.googleapis.com/v0/b/course-eb7fe.appspot.com/o/2.png?alt=media&token=8fd87eef-e74a-4119-be81-d85e6e7aa68e",
    href: "https://www.youtube.com/watch?v=R6plN3FvzFY&list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz",
  },
  {
    title: "Xây Dựng Website với ReactJS",
    url: "https://firebasestorage.googleapis.com/v0/b/course-eb7fe.appspot.com/o/13.png?alt=media&token=519b51ed-41cb-4751-95f8-f543772772eb",
    href: "https://www.youtube.com/watch?v=x0fSBAgBrOQ&list=PL_-VfJajZj0UXjlKfBwFX73usByw3Ph9Q",
  },
];

function Home() {
  const title = document.title;
  const [dataCoursePrice, setDataCoursePrice] = useState([]);
  const [dataCourseFree, setDataCourseFree] = useState([]);

  useEffect(() => {
    getCourseFree({ page: 1, perPage: 5 })
      .then((course) => {
        setDataCourseFree(course.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    getCoursePrice({ page: 1, perPage: 5 })
      .then((course) => {
        setDataCoursePrice(course.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="lg:flex items-center justify-center py-20 bg-gradient-to-br from-green-700 to-primary select-none">
        <div className="lg:w-1/2 px-6 md:px-28 text-white font-semibold">
          &nbsp; &nbsp; &nbsp; Chào mừng đến với {title}!
          <br />
          &nbsp; &nbsp; &nbsp; Tại {title}, chúng tôi tận tâm xây dựng một cộng
          đồng học tập đa dạng và phong phú, nơi mọi người có thể truy cập vào
          kiến thức và kỹ năng cần thiết để phát triển bản thân và thúc đẩy sự
          nghiệp.
          <br />
          &nbsp; &nbsp; &nbsp; Chúng tôi hiểu rằng hành trình học tập không chỉ
          là về việc tích lũy kiến thức, mà còn là về việc khám phá bản thân và
          mở rộng tầm nhìn. Vì vậy, chúng tôi cam kết cung cấp cho bạn những
          khóa học chất lượng cao, được thiết kế đặc biệt để đáp ứng nhu cầu và
          mong muốn của mọi người.
          <br />
          &nbsp; &nbsp; &nbsp; Dù bạn muốn nâng cao kỹ năng hiện tại, chuyển đổi
          sang một lĩnh vực mới, hay đơn giản là muốn tham gia vào một cộng đồng
          học tập sôi động, chúng tôi có mọi thứ bạn cần để thành công.
          <br />
          &nbsp; &nbsp; &nbsp; Hãy khám phá các khóa học tuyệt vời của chúng tôi
          và bắt đầu hành trình mới của bạn ngay hôm nay. Chúng tôi tin rằng mỗi
          bước tiến trong hành trình học tập của bạn đều đáng giá và sẽ dẫn bạn
          đến thành công.
          <br />
          &nbsp; &nbsp; &nbsp; Cảm ơn bạn đã đồng hành cùng chúng tôi trên hành
          trình này!
        </div>

        <div className="lg:w-1/2 flex justify-center">
          <img
            src={LogoWeb}
            style={{ filter: "drop-shadow(15px 15px 5px rgba(0,0,0,.6)" }}
          />
        </div>
      </div>

      <div className="w-full flex justify-end pr-10  hover:underline">
        <Link to={routes.listCourse} className="py-4 px-10 mt-10">
          Hiển thị tất cả
        </Link>
      </div>

      <p className="my-10 text-center font-bold text-2xl">Khóa học trả phí</p>
      <ListCourse data={dataCoursePrice} />

      <p className="my-10 text-center font-bold text-2xl">Khóa học miễn phí</p>
      <ListCourse data={dataCourseFree} />

      <p className="my-10 text-center font-bold text-2xl">Video nổi bật</p>
      <VideoTrend data={dataVideo} />
    </div>
  );
}

export default Home;
