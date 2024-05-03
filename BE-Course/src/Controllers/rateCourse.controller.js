
const RateCourseModel = require("../models/rateCourse.model");

module.exports = {
  sentRate(req, res, next) {
    req.body.studentId = req.user.id;
    req.body.courseId = req.params.id;
    RateCourseModel.create(req.body)
      .then((data) => {
        res.status(200).json({
          data: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async getRate(req, res, next) {
    try {
      const rate = await RateCourseModel.find({
        courseId: req.params.id,
      }).populate("studentId");
      res.status(200).json({
        data: rate,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

};
