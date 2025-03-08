import React, { useState, useEffect } from "react";
import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";
import Select from "@mui/material/Select";
import Navbar from "../../components/Navbar";
import { useUser } from "../../context/UserContext";
import { useAlertSnackbar } from "../../context/AlertSnackbarContext";
import { useConfirmSnackbar } from "../../context/ConfirmSnackbarContext";
const keyMap = {
  officer: "ضابط",
  sergeant: "ضابط صف",
};
const Topics = () => {
  const { showAlertSnackbar } = useAlertSnackbar();
  const { showConfirmSnackbar } = useConfirmSnackbar();
  const { ip } = useUser();
  const [topics, setTopics] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [target, setTarget] = useState({
    officer: 0,
    sergeant: 0,
  });
  const [formData, setFormData] = useState({
    name: "",
    target: "ضابط",
  });
  const [editingTopic, setEditingTopic] = useState(null);
  const fetchData = async () => {
    const response = await fetch(`${ip}/test/topics/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    const data = await response.json();
    setTopics(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name) {
      showAlertSnackbar("ادخل اسم المادة", "error");
      return;
    }

    const url = editingTopic
      ? `${ip}/test/topics/${editingTopic.id}/`
      : `${ip}/test/topics/`;
    const method = editingTopic ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (editingTopic) {
          setTopics((prev) =>
            prev.map((topic) => (topic.id === editingTopic.id ? data : topic))
          );
          showAlertSnackbar("تم التعديل بنجاح", "success");
        } else {
          setTopics((prev) => [...prev, data]);
          showAlertSnackbar("تم الاضافة بنجاح", "success");
        }
        resetForm();
      });
  };

  const handleDelete = (id) => {
    fetch(`${ip}/test/topics/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    }).then(() => {
      setTopics((prev) => prev.filter((topic) => topic.id !== id));
      showAlertSnackbar("تم الحذف بنجاح", "success");
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      target: "ضابط",
    });
    setEditingTopic(null);
    setModalOpen(false);
  };

  const handleEdit = (topic) => {
    setEditingTopic(topic);
    setFormData(topic);
    setModalOpen(true);
  };
  const filteredData = () => {
    let dataCopy = [...topics];
    Object.keys(target).forEach((key) => {
      if (!target[key]) {
        dataCopy = dataCopy.filter((record) => record.target !== keyMap[key]);
      }
    });
    return dataCopy;
  };
  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">المواد</h2>
      <div className="text-end">
        <MDBBtn
          onClick={() => setModalOpen(true)}
          className="rounded-pill mb-3"
        >
          إضافة مادة
        </MDBBtn>
      </div>
      <div className="d-flex flex-row-reverse justify-content-center mt-4">
        <MDBBadge
          style={{ cursor: "pointer" }}
          onClick={() =>
            setTarget((pre) => ({
              ...pre,
              officer: !pre.officer,
            }))
          }
          pill
          light
          color={target.officer ? "success" : "danger"}
          className="mx-1"
        >
          ضابط
        </MDBBadge>
        <MDBBadge
          style={{ cursor: "pointer" }}
          onClick={() =>
            setTarget((pre) => ({
              ...pre,
              sergeant: !pre.sergeant,
            }))
          }
          pill
          light
          color={target.sergeant ? "success" : "danger"}
          className="mx-1"
        >
          ضابط صف
        </MDBBadge>
      </div>
      <MDBTable dir="rtl" className="caption-top">
        <MDBTableHead>
          <tr>
            <th>م</th>
            <th>المادة</th>
            <th>الممتحن</th>
            <th>الإجراءات</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {filteredData().map((topic, index) => (
            <tr key={topic.id}>
              <td>{index + 1}</td>
              <td>{topic.name}</td>
              <td>{topic.target}</td>
              <td>
                <MDBBtn
                  color="warning"
                  size="sm"
                  className="rounded-pill ms-2"
                  onClick={() => handleEdit(topic)}
                >
                  تعديل
                </MDBBtn>
                <MDBBtn
                  color="danger"
                  size="sm"
                  onClick={() =>
                    showConfirmSnackbar(
                      "تأكيد الحذف",
                      () => {
                        handleDelete(topic.id);
                      },
                      () => {
                        console.log("Cancelled!");
                      },
                      "bottom",
                      "center"
                    )
                  }
                  className="rounded-pill"
                >
                  حذف
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      <MDBModal open={modalOpen} tabIndex="-1">
        <MDBModalDialog centered size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                {editingTopic ? "تعديل مادة" : "إضافة مادة"}
              </MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={resetForm} />
            </MDBModalHeader>
            <MDBModalBody>
              <TextField
                fullWidth
                size="small"
                dir="rtl"
                label="اسم المادة"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mb-3"
              />

              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">الممتحن</InputLabel>
                <Select
                  className="fs-lg mb-3"
                  dir="rtl"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.target}
                  label="الممتحن"
                  name="target"
                  onChange={handleInputChange}
                >
                  <MenuItem value="ضابط">ضابط</MenuItem>
                  <MenuItem value="ضابط صف">ضابط صف</MenuItem>
                </Select>
              </FormControl>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={resetForm}
                className="rounded-pill"
              >
                إلغاء
              </MDBBtn>
              <MDBBtn
                color="primary"
                onClick={handleSubmit}
                className="rounded-pill"
              >
                حفظ
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default Topics;
