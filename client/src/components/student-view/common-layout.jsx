import { Outlet, useLocation } from "react-router-dom";
import StudentViewCommonHeader from "./header";
import ChatbotFab from '@/components/chatbot/Fab';

function StudentViewCommonLayout() {
  const location = useLocation();
  return (
    <div>
      {!location.pathname.includes("course-progress") ? (
        <StudentViewCommonHeader />
      ) : null}

      <Outlet />
          <ChatbotFab />
    </div>
  );
}

export default StudentViewCommonLayout;
