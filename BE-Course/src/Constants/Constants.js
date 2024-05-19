const RateCourseModel = require("../models/rateCourse.model");
const MyCourseModel = require("../models/myCourse.model");

module.exports = {
  async deleteManyComment(objId) {
    try {
      const deleteComment = await RateCourseModel.deleteMany(objId);

      return deleteComment;
    } catch (error) {
      return error;
    }
  },

  async getCourseOwnerStudent(objId) {
    try {
      const getCourse = await MyCourseModel.find(objId);

      return getCourse;
    } catch (error) {
      return error;
    }
  },
};
