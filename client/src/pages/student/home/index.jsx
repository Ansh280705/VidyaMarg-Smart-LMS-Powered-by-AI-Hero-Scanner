import { courseCategories } from "@/config";
import banner from "../../../../public/banner-img.jpg";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "@/services";
import { AuthContext } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";

function StudentHomePage() {
  const { studentViewCoursesList, setStudentViewCoursesList } =
    useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleNavigateToCoursesPage(getCurrentId) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      category: [getCurrentId],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/courses");
  }

  async function fetchAllStudentViewCourses() {
    const response = await fetchStudentViewCourseListService();
    if (response?.success) setStudentViewCoursesList(response?.data);
  }

  async function handleCourseNavigate(getCurrentCourseId) {
    const response = await checkCoursePurchaseInfoService(
      getCurrentCourseId,
      auth?.user?._id
    );

    if (response?.success) {
      if (response?.data) {
        navigate(`/course-progress/${getCurrentCourseId}`);
      } else {
        navigate(`/course/details/${getCurrentCourseId}`);
      }
    }
  }

  useEffect(() => {
    fetchAllStudentViewCourses();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="bg-[#F8FAFF] py-20 px-6 lg:px-24 flex flex-col-reverse lg:flex-row items-center gap-16">
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
            Learn Skills for Your Future
            <br />
            Grow with <span className="text-[#0B4DFF]">VidyaMarg</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-md">
            Free courses, practical learning and a platform to level up your
            career. Start your journey today.
          </p>

          <div className="flex gap-4">
            <a
              href="/courses"
              className="px-6 py-3 bg-[#0B4DFF] text-white font-semibold rounded-lg shadow hover:shadow-lg transition"
            >
              Explore Courses
            </a>
            <a
              href="/student-courses"
              className="px-6 py-3 border border-gray-300 text-gray-800 rounded-lg hover:border-[#0B4DFF] hover:text-[#0B4DFF] transition"
            >
              My Courses
            </a>
          </div>
        </div>

        <div className="lg:w-1/2 flex justify-center">
          <img
            src={banner}
            alt="Learning Banner"
            className="w-full max-w-xl rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* COURSE CATEGORIES */}
      <section className="py-16 px-6 lg:px-24 bg-[#F9FAFB]">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          Course Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {courseCategories.map((categoryItem) => (
            <Button
              className="justify-start hover:bg-[#0B4DFF] hover:text-white transition"
              variant="outline"
              key={categoryItem.id}
              onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
            >
              {categoryItem.label}
            </Button>
          ))}
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="py-16 px-6 lg:px-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          Featured Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
            studentViewCoursesList.map((courseItem) => (
              <div
                key={courseItem?._id}
                onClick={() => handleCourseNavigate(courseItem?._id)}
                className="border rounded-lg overflow-hidden shadow hover:shadow-lg hover:-translate-y-1 transition cursor-pointer"
              >
                <img
                  src={courseItem?.image}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold mb-2 text-gray-900">
                    {courseItem?.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {courseItem?.instructorName}
                  </p>
                  <p className="font-bold text-[16px] text-[#0B4DFF]">
                    ₹{courseItem?.pricing}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-gray-600">No Courses Found</h1>
          )}
        </div>
      </section>
    </div>
  );
}

export default StudentHomePage;
