// move router

const routes = {
  home: "/",
  profile: "/profile",
  editProfile: "/profile/edit",
  listCourse: "/list-courses",
  paymentResult: "/payment-result",
  myCourse: "/my-course",
  detailCourse: "/course/:id",
  detailLesson: "/lesson/:id",
  detailTeacher: "/teacher/:id",

  login: "/login",
  register: "/register",
  
  editLesson: "/manager/lesson/:id",
  handleLesson: "/manager/handle-lesson",

  // Manager
  homeManager: "/manager/home",
  editCourse: "/manager/edit-course/:id",
  studentAdmin: "/manager/admin/student",
  teacherAdmin: "/manager/admin/teacher",
  courseAdmin: "/manager/admin/course",
  editUser: "/manager/admin/user/edit/:id",
  courseSoldAdmin: "/manager/admin/course-sold",
  newTeacher: "/manager/admin/new-teacher",

  // Teacher
  newCourse: "/manager/teacher/new-course",
  courseTeacher: "/manager/teacher/course",
  courseSold: "/manager/teacher/course-sold"
};

export default routes;
