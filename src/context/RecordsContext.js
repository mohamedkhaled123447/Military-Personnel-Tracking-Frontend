import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlertSnackbar } from "./AlertSnackbarContext";
import { useConfirmSnackbar } from "./ConfirmSnackbarContext";
import { useUser } from "./UserContext";
// Create a Context for Alert Snackbar
const RecordsContext = createContext();
import { InfoInputValidator } from "../utils/Validators";
import { userInfo } from "../utils/MostUsed";
export function RecordsProvider({ children }) {
  const navigate = useNavigate();
  const { showAlertSnackbar } = useAlertSnackbar();
  const { showConfirmSnackbar } = useConfirmSnackbar();
  const { handleLogout, ip } = useUser();
  const [image, setImage] = useState(null);
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("جندي");
  const [filters, setFilters] = useState({
    militeryNumber: "",
    name: "",
    job_classification: "",
    classification: "",
    vacation: "",
    getInDate: "",
    getOutDate: "",
    dgree: "",
    rank: "",
    fasela: "",
    saria: "",
    vacation: "",
    is_officer: 0,
    is_soldier: 0,
    seniority: "",
    batch: "",
  });
  const resetFilters = () => {
    setFilters({
      militeryNumber: "",
      name: "",
      job_classification: "",
      classification: "",
      vacation: "",
      getInDate: "",
      getOutDate: "",
      dgree: "",
      rank: "",
      fasela: "",
      saria: "",
      vacation: "",
      is_officer: 0,
      is_soldier: 0,
      seniority: "",
      batch: "",
    });
  };
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  const [newRecord, setNewRecord] = useState({ ...userInfo });
  const clearNewRecordData = () => {
    setNewRecord({ ...userInfo });
  };
  const handleNewRecordChange = (e) => {
    const { name, value } = e.target;
    setNewRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
  };
  const handleAddRecordToDatabase = async () => {
    setLoading(true);
    const Errors = InfoInputValidator(newRecord);
    if (Errors.length > 0) {
      showAlertSnackbar(Errors[0], "error");
      setLoading(false);
      return;
    }
    const formData = new FormData();
    Object.keys(newRecord).forEach((key) => {
      formData.append(key, newRecord[key]);
    });
    if (selectedValue === "ضابط") {
      formData.set("is_officer", true);
    } else if (selectedValue === "جندي") {
      formData.set("is_soldier", true);
    }
    if (image) formData.append("image", image);
    const response = await fetch(`${ip}/userData/userinfo/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: formData,
    });
    if (!response.ok) {
      // Handle HTTP errors
      setLoading(false);
      const errors = await response.json();
      if (errors["militeryNumber"])
        showAlertSnackbar("الرقم العسكري موجود", "error");
      else if (errors["name"]) showAlertSnackbar("الاسم موجود", "error");
      else showAlertSnackbar("حدث خطا ما", "error");
    } else {
      // Handle successful response
      setLoading(false);
      showAlertSnackbar("تم الاضافة بنجاح", "success");
      const newRecordData = await response.json();
      setData((prevData) => [...prevData, newRecordData]);
      clearNewRecordData();
      navigate("/");
    }
  };

  const handleAddRecord = async () => {
    await handleAddRecordToDatabase();
  };
  const handleDeleteRecord = (id) => {
    showConfirmSnackbar(
      "تأكيد الحذف",
      () => {
        handleDeleteRecordFromDatabase(id);
      },
      () => {
        console.log("Cancelled!");
      },
      "bottom",
      "center"
    );
  };
  const handleDeleteRecordFromDatabase = async (id) => {
    const response = await fetch(`${ip}/userData/userinfo/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    if (!response.ok) {
      // Handle HTTP errors
      const errorText = await response.text();
      console.error("Error:", errorText);
    } else {
      // Handle successful response
      setData((prevData) => prevData.filter((item) => item.id !== id));
      showAlertSnackbar("تم الحذف بنجاح", "success");
    }
  };

  const fetchData = async (page, target) => {
    const updatedFilters = {
      ...filters,
      is_officer: target === "ضابط" ? 1 : 0,
      is_soldier: target === "جندي" ? 1 : 0,
    };
    let params = "?";
    Object.keys(updatedFilters).forEach(
      (filter) => (params += `${filter}=${updatedFilters[filter]}&`)
    );
    const response = await fetch(
      `${ip}/userData/userinfo/${params}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );
    if (!response.ok) {
      handleLogout();
      console.log("error");
    } else {
      const data = await response.json();
      setData(data.results);
      setDataLength(data.count);
    }
  };
  return (
    <RecordsContext.Provider
      value={{
        data,
        dataLength,
        newRecord,
        handleNewRecordChange,
        handleAddRecord,
        handleDeleteRecord,
        setImage,
        image,
        fetchData,
        setData,
        loading,
        selectedValue,
        setSelectedValue,
        filters,
        setFilters,
        resetFilters,
        handleFilterChange,
      }}
    >
      {children}
    </RecordsContext.Provider>
  );
}

// Custom hook to use the AlertSnackbar context
export function useRecords() {
  return useContext(RecordsContext);
}
