import Records from "../pages/records/Records";
import Profile from "../pages/profile/Profile";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFoundPage from "../pages/auth/NotFoundPage";
import ProfilePDF from "../pages/profile/ProfilePDF";
import Activation from "../pages/auth/Activation";
import Home from "../pages/home/Home";
import AddRecord from "../pages/records/AddRecord";
import Vacation from "../pages/vacation/Vacation";
import Dachboard from "../components/Dachboard";
import AddQuestion from "../pages/test/AddQuestion";
import BuildTest from "../pages/test/BuildTest";
import TakeTest from "../pages/test/TakeTest";
import Settings from "../pages/settings/Settings";
import Exam from "../pages/test/Exam";
import Soldiers from "../pages/home/Soldiers";
import Sergeants from "../pages/home/Sergeants";
import Officers from "../pages/home/Officers";
import Etc from "../pages/home/Etc";
import TestResults from "../pages/test/TestRusult";
import Topics from "../pages/test/Topics";
import Files from "../pages/file/Files";
import FileBrowser from "../pages/file/FileBrowser";
import Backup from "../pages/home/Backup";
import ResetPassword from "../pages/auth/ResetPassword";
export const routeList = [
  { path: "/", element: <Home /> },
  { path: "records/", element: <Records /> },
  { path: "records/user/:id", element: <Profile /> },
  { path: "records/user/pdf/:id", element: <ProfilePDF /> },
  { path: "login/", element: <Login /> },
  { path: "register/", element: <Register /> },
  { path: "activate/", element: <Activation /> },
  { path: "reset-password/", element: <ResetPassword /> },
  { path: "add-question/", element: <AddQuestion /> },
  { path: "build-test/", element: <BuildTest /> },
  { path: "take-test/", element: <TakeTest /> },
  { path: "add-record/", element: <AddRecord /> },
  { path: "test-result/", element: <TestResults /> },
  { path: "topics/", element: <Topics /> },
  { path: "vacation/", element: <Vacation /> },
  { path: "dachboard/", element: <Dachboard /> },
  { path: "exam/", element: <Exam /> },
  { path: "soldiers/", element: <Soldiers /> },
  { path: "sergeants/", element: <Sergeants /> },
  { path: "etc/", element: <Etc /> },
  { path: "officers/", element: <Officers /> },
  { path: "settings/", element: <Settings /> },
  { path: "files/", element: <Files /> },
  { path: "file-browser/", element: <FileBrowser /> },
  { path: "backup/", element: <Backup /> },
  { path: "*", element: <NotFoundPage /> },
];
