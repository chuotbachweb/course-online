const CourseModel = require("../models/course.model");
const LessonModel = require("../models/lesson.model");
const MyCourseModel = require("../models/myCourse.model");
const uploadFirebase = require("../middleware/uploadFirebase");
const moment = require("moment");

function calculateIncome(course) {
  return course.courseId.price || 0;
}

module.exports = {
  async newCourse(req, res, next) {
    if (req.file) {
      const imageUrl = await uploadFirebase({
        file: req.file,
        name: new Date().getTime() + req.file.originalname,
        type: req.file.mimetype,
      });
      req.body.imageUrl = imageUrl;
    }

    req.body.teacherId = req.user.id;

    const course = new CourseModel(req.body);
    course
      .save()
      .then((data) => {
        res.status(200).json({
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },

  async editCourse(req, res, next) {
    if (req.file) {
      const imageUrl = await uploadFirebase({
        file: req.file,
        name: new Date().getTime() + req.file.originalname,
        type: req.file.mimetype,
      });
      req.body.imageUrl = imageUrl;
    }

    CourseModel.findByIdAndUpdate(req.params.id, req.body)
      .then((data) => res.json({ data }))
      .catch((error) => res.json({ error }));
  },

  getCourse(req, res, next) {
    const { page, per_page, nameCourse } = req.query;
    const objWhere = {};

    if (nameCourse) objWhere.nameCourse = new RegExp(nameCourse, "i");

    CourseModel.find(objWhere)
      .sort({ _id: -1 })
      .populate(["teacherId", "lesson"])
      .then((data) => {
        const currentPage = parseInt(page) || 1;
        const itemsPerPage = parseInt(per_page) || data.length;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const totalItems = data.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage) || data.length;

        const items = data.slice(startIndex, endIndex);

        res.json({
          data: items,
          currentPage,
          totalPages,
        });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  },

  getAllCourseSold(req, res, next) {
    const { page, per_page, nameCourse } = req.query;
    const objWhere = {};

    if (nameCourse) objWhere.nameCourse = new RegExp(nameCourse, "i");

    MyCourseModel.find(objWhere)
      .sort({ _id: -1 })
      .populate(["courseId", "studentId", "teacherId"])
      .then((data) => {
        const currentPage = parseInt(page) || 1;
        const itemsPerPage = parseInt(per_page) || data.length;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const totalItems = data.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage) || data.length;

        const items = data.slice(startIndex, endIndex);

        res.json({
          data: items,
          currentPage,
          totalPages,
        });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  },

  getCourseFree(req, res, next) {
    const { page, per_page } = req.query;
    const objWhere = { price: 0 };

    CourseModel.find(objWhere)
      .sort({ _id: -1 })
      .populate("teacherId")
      .then((data) => {
        const currentPage = parseInt(page) || 1;
        const itemsPerPage = parseInt(per_page) || data.length;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const totalItems = data.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage) || data.length;

        const items = data.slice(startIndex, endIndex);

        res.json({
          data: items,
          currentPage,
          totalPages,
        });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  },
  getCoursePrice(req, res, next) {
    const { page, per_page } = req.query;
    const objWhere = {};

    objWhere.price = { $gt: 0 };

    CourseModel.find(objWhere)
      .sort({ _id: -1 })
      .populate("teacherId")
      .then((data) => {
        const currentPage = parseInt(page) || 1;
        const itemsPerPage = parseInt(per_page) || data.length;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const totalItems = data.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage) || data.length;

        const items = data.slice(startIndex, endIndex);

        res.json({
          data: items,
          currentPage,
          totalPages,
        });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  },

  getCourseSold(req, res, next) {
    const { page, per_page, nameCourse } = req.query;
    const objWhere = { teacherId: req.params.id };

    if (nameCourse) objWhere.nameCourse = new RegExp(nameCourse, "i");

    MyCourseModel.find(objWhere)
      .sort({ _id: -1 })
      .populate(["courseId", "studentId", "teacherId"])
      .then((data) => {
        const currentPage = parseInt(page) || 1;
        const itemsPerPage = parseInt(per_page) || data.length;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const totalItems = data.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage) || data.length;

        const items = data.slice(startIndex, endIndex);

        res.json({
          data: items,
          currentPage,
          totalPages,
        });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  },

  getCourseById(req, res, next) {
    CourseModel.findById(req.params.id)
      .populate(["teacherId", "lesson"])
      .then((course) => {
        res.json({ data: course });
      })
      .catch((error) => {
        res.sendStatus(500);
      });
  },

  getCourseTeacher(req, res, next) {
    const { page, per_page, nameCourse, teacherId } = req.query;
    const objWhere = { teacherId: teacherId };

    if (nameCourse) objWhere.nameCourse = new RegExp(nameCourse, "i");

    CourseModel.find(objWhere)
      .sort({ _id: -1 })
      .then((data) => {
        const currentPage = parseInt(page) || 1;
        const itemsPerPage = parseInt(per_page) || data.length;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const totalItems = data.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage) || data.length;

        const items = data.slice(startIndex, endIndex);

        res.json({
          data: items,
          currentPage,
          totalPages,
        });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  },

  async deleteCourse(req, res, next) {
    await LessonModel.deleteMany({ courseId: req.params.id });

    CourseModel.findByIdAndDelete(req.params.id).then((data) =>
      res.json({ data })
    );
  },

  async getMonthIncome(req, res, next) {
    const currentDate = new Date();

    const incomeByMonth = [];

    for (let i = 0; i < 12; i++) {
      const startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      );
      const endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i + 1
      );

      let query = {
        createdAt: { $gte: startDate, $lte: endDate },
      };

      if (req.query.teacherId) {
        query.teacherId = req.query.teacherId;
      }

      const myCourse = await MyCourseModel.find(query).populate([
        "courseId",
        "teacherId",
        "studentId",
      ]);

      let income = 0;
      for (const course of myCourse) {
        income += calculateIncome(course);
      }

      incomeByMonth.push({
        month: startDate.toLocaleString("vi-vn", { month: "long" }),
        income: income,
      });
    }

    res.json(incomeByMonth);
  },

  async getTopIncome(req, res, next) {
    try {
      let query = {};
      if (req.query.teacherId) {
        query.teacherId = req.query.teacherId;
      }
      const myCourses = await MyCourseModel.find(query).populate(["courseId"]);
      const courseCounts = {};

      myCourses.forEach((course) => {
        const courseId = course.courseId._id;

        if (courseCounts[courseId]) {
          courseCounts[courseId] =
            course.courseId.price + courseCounts[courseId];
        } else {
          courseCounts[courseId] = course.courseId.price;
        }
      });

      const courseCountsArray = Object.entries(courseCounts);
      courseCountsArray.sort((a, b) => b[1] - a[1]);
      const coursesInfo = [];

      for (const [courseId, income] of courseCountsArray) {
        const course = await CourseModel.findById(courseId); // Tìm kiếm khóa học để lấy tên
        const nameCourse = course.nameCourse;
        coursesInfo.push({
          _id: courseId,
          nameCourse: nameCourse,
          income: income,
        });
      }

      res.json(coursesInfo);
    } catch (error) {
      next(error);
    }
  },
};
