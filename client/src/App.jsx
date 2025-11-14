import { Route, Routes } from "react-router-dom";

import InstructorDashboardpage from "./pages/instructor";
import StudentViewCommonLayout from "./components/student-view/common-layout";
import StudentHomePage from "./pages/student/home";
import NotFoundPage from "./pages/not-found";
import AddNewCoursePage from "./pages/instructor/add-new-course";
import StudentViewCoursesPage from "./pages/student/courses";
import StudentViewCourseDetailsPage from "./pages/student/course-details";
import PaypalPaymentReturnPage from "./pages/student/payment-return";
import StudentCoursesPage from "./pages/student/student-courses";
import StudentViewCourseProgressPage from "./pages/student/course-progress";
import DownloadsPage from "./pages/student/downloads";
import ScanPage from "./pages/student/scan";

function App() {
  return (
    <Routes>
      {/* MAIN STUDENT LAYOUT */}
      <Route path="/" element={<StudentViewCommonLayout />}>
        <Route index element={<StudentHomePage />} />
        <Route path="home" element={<StudentHomePage />} />
        <Route path="courses" element={<StudentViewCoursesPage />} />
        <Route
          path="course/details/:id"
          element={<StudentViewCourseDetailsPage />}
        />
        <Route path="payment-return" element={<PaypalPaymentReturnPage />} />
        <Route path="student-courses" element={<StudentCoursesPage />} />
        <Route
          path="course-progress/:id"
          element={<StudentViewCourseProgressPage />}
        />

        {/* ✅ ADD THESE */}
        <Route path="downloads" element={<DownloadsPage />} />
        <Route path="scan" element={<ScanPage />} />
      </Route>

      {/* INSTRUCTOR PAGES */}
      <Route path="/instructor" element={<InstructorDashboardpage />} />
      <Route
        path="/instructor/create-new-course"
        element={<AddNewCoursePage />}
      />
      <Route
        path="/instructor/edit-course/:courseId"
        element={<AddNewCoursePage />}
      />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
