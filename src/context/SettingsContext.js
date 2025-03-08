import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";
const SettingsContext = createContext();
import { useAlertSnackbar } from "../context/AlertSnackbarContext";

export const SettingsProvider = ({ children }) => {
  const { showAlertSnackbar } = useAlertSnackbar();
  const { ip, handleLogout } = useUser();
  const [settings, setSettings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);
  const [currentSetting, setCurrentSetting] = useState({
    id: null,
    key: "",
    value: "",
    description: "",
    image: null,
  });
  const API_URL = `${ip}/settings/settings/`;
  const fetchData = async () => {
    const response = await fetch(API_URL);
    if (response.ok) {
      const data = await response.json();
      setSettings(data);
    } else {
      handleLogout();
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleChange = (e) => {
    setCurrentSetting({
      ...currentSetting,
      [e.target.name]: e.target.value,
    });
  };
  const handleSave = async () => {
    console.log(currentSetting);
    const formData = new FormData();
    if (currentSetting.image) {
      formData.append("image", currentSetting.image);
    } else {
      formData.append("value", currentSetting.value);
    }
    const url = currentSetting.id ? `${API_URL}${currentSetting.id}/` : API_URL;
    const method = currentSetting.id ? "PATCH" : "POST";
    const response = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      setSettings((pre) =>
        pre.map((setting) =>
          setting.id === currentSetting.id ? data : setting
        )
      );
      toggleModal();
      showAlertSnackbar("تم التعديل بنجاح", "success");
    } else {
      const errors = await response.json();
      console.log(errors);
    }
  };
  return (
    <SettingsContext.Provider
      value={{
        settings,
        currentSetting,
        handleChange,
        handleSave,
        setCurrentSetting,
        modalOpen,
        toggleModal,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  return useContext(SettingsContext);
};
