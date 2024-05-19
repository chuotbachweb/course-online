const userRouter = require("./userRouter");
const paymentRouter = require("./paymentRouter");
const courseRouter = require("./courseRouter");
const lessonRouter = require("./lessonRouter");
const myCourseRouter = require("./myCourseRouter");
const rateCourseRouter = require("./rateCourseRouter");
const recruitmentRouter = require("./recruitmentRouter");

function route(app) {
  app.use("/api/user", userRouter);
  app.use("/api/payment", paymentRouter);
  app.use("/api/course", courseRouter);
  app.use("/api/lessons", lessonRouter);
  app.use("/api/my-course", myCourseRouter);
  app.use("/api/rate-course", rateCourseRouter);
  app.use("/api/recruitment", recruitmentRouter);

  app.use("/", function (req, res, next) {
    res.send("NOT FOUND");
  });
}

module.exports = route;
