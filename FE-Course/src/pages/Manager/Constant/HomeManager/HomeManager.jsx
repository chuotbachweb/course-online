import { useContext, useEffect, useState } from "react";

import Bars from "~/components/Chart/Bars";
import * as courseService from "~/services/courseService";
import { AuthContext } from "~/shared/AuthProvider";

function HomeManager() {
  const { role, currentUser } = useContext(AuthContext);
  const [labelsMonths, setLabelsMonths] = useState([]);
  const [titleHover, setTitleHover] = useState();
  const [dataBar, setDataBar] = useState([]);
  const [labelsTopCourse, setLabelsTopCourse] = useState([]);
  const [dataBarCourse, setDataBarCourse] = useState([]);

  useEffect(() => {
    const getIncomeParams = {};

    if (role === 1 && currentUser._id) {
      getIncomeParams.teacherId = currentUser._id;
    }

    courseService
      .getMonthIncome(getIncomeParams)
      .then((data) => {
        const filteredDataByMonth = [];
        const filteredDataBarByMonth = [];

        for (let i = 1; i <= 12; i++) {
          const filteredMonthData = data.data.find(
            (item) => item.month === `Tháng ${i}`
          );
          if (filteredMonthData) {
            filteredDataByMonth.push(filteredMonthData.month);
            filteredDataBarByMonth.push(filteredMonthData.income);
          }
        }

        setLabelsMonths(filteredDataByMonth);
        setDataBar(filteredDataBarByMonth);
      })
      .catch((err) => {
        console.log(err);
      });

    courseService
      .getTopIncome(getIncomeParams)
      .then((data) => {
        const topDataLabels = [];
        const topData = [];
        const topDataTitleHover = [];
        for (let i = 0; i < data.data.length; i++) {
          topDataLabels.push(`Top ${i + 1}`);
          topData.push(data.data[i].income);
          topDataTitleHover.push(data.data[i].nameCourse);
        }
        setLabelsTopCourse([...topDataLabels]);
        setDataBarCourse(topData);
        setTitleHover(topDataTitleHover);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col items-center w-full my-10">
      <Bars title={"Doanh thu"} labels={labelsMonths} dataBar={dataBar} />

      <Bars
        title={"Top 10 khóa học"}
        labels={labelsTopCourse}
        dataBar={dataBarCourse}
        titleHover={titleHover}
      />
    </div>
  );
}

export default HomeManager;
