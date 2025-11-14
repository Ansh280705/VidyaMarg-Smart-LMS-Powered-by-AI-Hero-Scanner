import { GraduationCap, TvMinimalPlay } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import { LangContext } from "@/context/lang-context";

function StudentViewCommonHeader() {
  const navigate = useNavigate();
  const { resetCredentials } = useContext(AuthContext);
  const { t, lang, setLang } = useContext(LangContext);

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  return (
    <header className="flex items-center justify-between p-4 border-b relative">
      <div className="flex items-center space-x-4">
        <Link to="/home" className="flex items-center hover:text-black">
          <GraduationCap className="h-8 w-8 mr-4 " />
          <span className="font-extrabold md:text-xl text-[14px]">
            VidyaMarg
          </span>
        </Link>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            onClick={() => {
              location.pathname.includes("/courses")
                ? null
                : navigate("/courses");
            }}
            className="text-[14px] md:text-[16px] font-medium"
          >
            Explore Courses
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex gap-4 items-center">
          <div
            onClick={() => navigate("/student-courses")}
            className="flex cursor-pointer items-center gap-3"
          >
            <span className="font-extrabold md:text-xl text-[14px]">
              My Courses
            </span>
            <TvMinimalPlay className="w-8 h-8 cursor-pointer" />
          </div>
          <a href='/downloads' className='hidden md:flex items-center space-x-2 px-3 py-2 rounded-md border'><span className='font-extrabold md:text-xl text-[14px]'>{t('downloads')}</span></a>
          <a href='/scan' className='hidden md:flex items-center space-x-2 px-3 py-2 rounded-md border'><span className='font-extrabold md:text-xl text-[14px]'>{t('scan')}</span></a>
          <select value={lang} onChange={e=>setLang(e.target.value)} className='border rounded-md px-2 py-1 hidden md:block'><option value='en'>EN</option><option value='hi'>हिं</option></select>
          <Button onClick={handleLogout}>Sign Out</Button>
        </div>
      </div>
    </header>
  );
}

export default StudentViewCommonHeader;
