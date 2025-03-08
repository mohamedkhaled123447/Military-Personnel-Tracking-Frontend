import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AlertSnackbarProvider } from "./context/AlertSnackbarContext";
import { ConfirmSnackbarProvider } from "./context/ConfirmSnackbarContext";
import { RecordsProvider } from "./context/RecordsContext";
import { UserProvider } from "./context/UserContext";
import { SettingsProvider } from "./context/SettingsContext";
import { routeList } from "./utils/Routes";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import MostUsed from "./utils/MostUsed";
function App() {
  const location = useLocation();
  const authPages = ["/login", "/register", "/activate", "/take-test","/reset-password"];
  const isAuthPage = authPages.includes(location.pathname);
  return (
    <AlertSnackbarProvider>
      <ConfirmSnackbarProvider>
        <UserProvider>
          <RecordsProvider>
            <SettingsProvider>
              {!isAuthPage && <Navbar />}
              <Routes>
                {routeList.map(({ path, element }, index) => (
                  <Route key={index} path={path} element={element} />
                ))}
              </Routes>
              {!isAuthPage && <Footer />}
            </SettingsProvider>
          </RecordsProvider>
        </UserProvider>
      </ConfirmSnackbarProvider>
    </AlertSnackbarProvider>
  );
}

export default App;
