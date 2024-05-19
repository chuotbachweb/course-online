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
  listRecruitment: "/list-recruitment",
  myRecruitment: "/my-recruitment",

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
  assignment: "/manager/teacher/assignment",
  newCourse: "/manager/teacher/new-course",
  courseTeacher: "/manager/teacher/course",
  courseSold: "/manager/teacher/course-sold",
  handleAssignment: "/manager/teacher/handle-assignment",

  //Business
  newRecruitment: "/manager/new-recruitment",
  recruitment: "/manager/recruitment",
  applyRecruitment: "/manager/apply-recruitment",
  editRecruitment: "/manager/edit/:id"
};

export default routes;
