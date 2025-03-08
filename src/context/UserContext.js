import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const UserContext = createContext();
// const ip = "localhost:8000";
const ip = "https://mohamed12354552khaled.pythonanywhere.com";
export const useUser = () => useContext(UserContext);
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    !localStorage.getItem("access")
      ? null
      : jwtDecode(localStorage.getItem("access")).user
  );
  const navigate = useNavigate();
  const [warning, setWarning] = useState("");
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [resetPasswordData, setResetPasswordData] = useState({
    username: "",
    oldPassword: "",
    newPassword: "",
  });
  const handleResetPasswordDataChange = (e) => {
    const { name, value } = e.target;
    setResetPasswordData((prevResetPasswordData) => ({
      ...prevResetPasswordData,
      [name]: value,
    }));
  };
  const handleLoginDataChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleLogin = async () => {
    const response = await fetch(`${ip}/accounts/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    if (!response.ok) {
      // Handle HTTP errors
      setWarning(
        "اسم المستخدم او كلمة المرور غير صحيحة او الحساب يحتاج الي تفعيل"
      );
      setTimeout(() => setWarning(""), 3000);
    } else {
      // Handle successful response
      const data = await response.json();
      const decoded = jwtDecode(data.access);
      setUser(decoded.user);
      // console.log(decoded.user)
      setLoginData({
        username: "",
        password: "",
      });
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      navigate("/");
    }
  };
  const handleResetPassword = async () => {
    const response = await fetch(`${ip}/accounts/reset-password/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resetPasswordData),
    });
    if (response.ok) {
      navigate("/");
    } else {
      setWarning(
        "اسم المستخدم او كلمة المرور غير صحيحة"
      );
      setTimeout(() => setWarning(""), 3000);
    }
  };
  return (
    <UserContext.Provider
      value={{
        warning,
        handleLogin,
        handleLoginDataChange,
        handleLogout,
        handleResetPasswordDataChange,
        handleResetPassword,
        user,
        ip,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
