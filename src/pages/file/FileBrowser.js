import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSearchParams } from "react-router-dom";

import {
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { useUser } from "../../context/UserContext";
const FileBrowser = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoding] = useState(false);
  const category = searchParams.get("category");
  const { ip ,handleLogout} = useUser();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    file: null,
    date: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const fetchData = async () => {
    const response = await fetch(
      `${ip}/settings/files/?category=${category}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setFiles(data);
    } else {
      handleLogout();
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleDelete = (id) => {
    fetch(`${ip}/settings/files/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    }).then(() => {
      setFiles((prev) => prev.filter((file) => file.id !== id));
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleFormSubmit = async () => {
    if (formData.title && formData.category && formData.file && formData.date) {
      setLoding(true);
      const fileData = new FormData();
      fileData.append("title", formData.title);
      fileData.append("category", formData.category);
      fileData.append("date", formData.date);
      fileData.append("file", formData.file);

      const response = await fetch(`${ip}/settings/files/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: fileData,
      });
      if (response.ok) {
        const data = await response.json();
        setFiles((prev) => [...prev, data]);
        setFormData({ title: "", category: "", file: null, date: "" });
        setModalOpen(false);
        setLoding(false);
      } else {
        const errors = await response.json();
        console.log(errors);
        setLoding(false);
      }
    } else {
      alert("ادخل البيانات");
    }
  };

  const renderFilesByCategory = () => {
    return (
      <MDBTable dir="rtl">
        <MDBTableHead>
          <tr>
            <th>م</th>
            <th>اسم الملف</th>
            <th>التاريخ</th>
            <th>الإجراءات</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {files
            .filter((file) => file.category === category)
            .map((file, index) => (
              <tr key={file.id}>
                <td>{index + 1}</td>
                <td>
                  <a
                    href={file.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "blue" }}
                  >
                    {file.title}
                  </a>
                </td>
                <td>{file.date}</td>
                <td>
                  <MDBBtn
                    color="danger"
                    size="sm"
                    onClick={() => handleDelete(file.id)}
                    className="rounded-pill"
                  >
                    حذف
                  </MDBBtn>
                </td>
              </tr>
            ))}
        </MDBTableBody>
      </MDBTable>
    );
  };

  return (
    
      <MDBContainer className="mt-4">
        <MDBRow>
          <h2 className="mb-4 text-center">الملفات</h2>
          <div className="text-end">
            <MDBBtn
              onClick={() => setModalOpen(true)}
              className="rounded-pill mb-3"
            >
              إضافة ملف
            </MDBBtn>
          </div>

          <MDBRow className="mt-5">
            {files.length > 0 ? (
              renderFilesByCategory()
            ) : (
              <p className="text-center">لا يوجد ملفات </p>
            )}
          </MDBRow>
          <MDBModal open={modalOpen}>
            <MDBModalDialog centered size="lg">
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>إضافة ملف </MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={() => setModalOpen(false)}
                  ></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <TextField
                    fullWidth
                    size="small"
                    dir="rtl"
                    label="اسم الملف"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mb-3"
                  />
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">
                      التصنيف
                    </InputLabel>
                    <Select
                      className="fs-lg mb-3"
                      dir="rtl"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formData.category}
                      onChange={handleInputChange}
                      label="التصنيف"
                      name="category"
                    >
                      <MenuItem value="documents">
                        الالتزامات التدريبية
                      </MenuItem>
                      <MenuItem value="files">ابحاث</MenuItem>
                      <MenuItem value="others">اخري</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    size="small"
                    dir="rtl"
                    label="التاريخ"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="mb-3"
                  />
                  <div className="mb-3">
                    <label htmlFor="file" className="form-label">
                      File
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="file"
                      onChange={handleFileChange}
                      required
                    />
                  </div>
                  {loading && (
                    <div class="d-flex justify-content-center">
                      <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn color="secondary" onClick={() => setModalOpen(false)}>
                    اغلاق
                  </MDBBtn>
                  <MDBBtn color="primary" onClick={handleFormSubmit}>
                    إضافة ملف
                  </MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </MDBRow>
      </MDBContainer>
  );
};

export default FileBrowser;
