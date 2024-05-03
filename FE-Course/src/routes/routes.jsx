// routeConfig
import config from "~/config";

// Router change Pages
import Home from "~/pages/Home";

import { Login, Register } from "~/pages/Auth";
import Profile from "~/pages/Profile";
import EditProfile from "~/pages/Profile/EditProfile";
import { ManagerLayout } from "~/layouts";
import {
  StudentAdmin,
  TeacherAdmin,
  HomeManager,
  NewTeacher,
  EditUser,
  CourseAdmin,
  EditCourse,
  EditLesson,
  HandleLesson,
  NewCourse,
  CourseTeacher,
  CourseSold,
  CourseSoldAdmin,
} from "~/pages/Manager";
import AllCourse from "~/pages/AllCourse";
import PaymentResult from "~/pages/PaymentResult";
import MyCourse from "~/pages/MyCourse";
import DetailCourse from "~/pages/DetailCourse";
import DetailLesson from "~/pages/DetailLesson";
import DetailTeacher from "~/pages/DetailTeacher";

const publicRoutes = [
  { path: config.routes.home, component: Home },

  { path: config.routes.profile, component: Profile },
  { path: config.routes.editProfile, component: EditProfile },
  { path: config.routes.listCourse, component: AllCourse },
  { path: config.routes.paymentResult, component: PaymentResult },
  { path: config.routes.myCourse, component: MyCourse },
  { path: config.routes.detailCourse, component: DetailCourse },
  { path: config.routes.detailLesson, component: DetailLesson },
  { path: config.routes.detailTeacher, component: DetailTeacher },

  { path: config.routes.login, component: Login, Layout: null },
  { path: config.routes.register, component: Register, Layout: null },

  { path: config.routes.editLesson, component: EditLesson, Layout: null },
  { path: config.routes.handleLesson, component: HandleLesson, Layout: null },

  // Manager
  {
    path: config.routes.homeManager,
    component: HomeManager,
    Layout: ManagerLayout,
  },
  {
    path: config.routes.newTeacher,
    component: NewTeacher,
    Layout: ManagerLayout,
  },
  {
    path: config.routes.studentAdmin,
    component: StudentAdmin,
    Layout: ManagerLayout,
  },
  {
    path: config.routes.courseAdmin,
    component: CourseAdmin,
    Layout: ManagerLayout,
  },
  {
    path: config.routes.teacherAdmin,
    component: TeacherAdmin,
    Layout: ManagerLayout,
  },
  {
    path: config.routes.editUser,
    component: EditUser,
    Layout: ManagerLayout,
  },
  {
    path: config.routes.editCourse,
    component: EditCourse,
    Layout: ManagerLayout,
  },
  {
    path: config.routes.courseSoldAdmin,
    component: CourseSoldAdmin,
    Layout: ManagerLayout,
  },

  // Teacher manager
  {
    path: config.routes.newCourse,
    component: NewCourse,
    Layout: ManagerLayout,
  },
  {
    path: config.routes.courseTeacher,
    component: CourseTeacher,
    Layout: ManagerLayout,
  },
  {
    path: config.routes.courseSold,
    component: CourseSold,
    Layout: ManagerLayout,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
