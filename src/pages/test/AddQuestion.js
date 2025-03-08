import React, { useState, useEffect } from "react";
import {
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
import { useUser } from "../../context/UserContext";
import { useAlertSnackbar } from "../../context/AlertSnackbarContext";
import { useConfirmSnackbar } from "../../context/ConfirmSnackbarContext";
const QuestionManagement = () => {
  const { showAlertSnackbar } = useAlertSnackbar();
  const { showConfirmSnackbar } = useConfirmSnackbar();
  const { ip, handleLogout } = useUser();
  const [questions, setQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [formData, setFormData] = useState({
    text: "",
    options: { A: "", B: "", C: "", D: "" },
    correct_answer: "A",
    type: "multiple",
    topic: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch questions from backend
  const fetchQuestions = async () => {
    const response = await fetch(
      `${ip}/test/questions/?page=${currentPage}&topic=${topic}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );
    if (!response.ok) handleLogout();
    const data = await response.json();
    setQuestions(data.results);
    setTotalPages(Math.ceil(data.count / 15));
  };
  const fetchTopics = async () => {
    const response = await fetch(`${ip}/test/topics/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    const data = await response.json();
    setTopics(data);
  };

  useEffect(() => {
    fetchQuestions();
  }, [currentPage, topic]);
  useEffect(() => {
    fetchTopics();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "type" && value === "multiple") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        correct_answer: "A",
      }));
    } else if (name === "type" && value === "true_false") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        correct_answer: "T",
      }));
    } else if (name.startsWith("option_")) {
      const optionKey = name.split("_")[1];
      setFormData((prev) => ({
        ...prev,
        options: { ...prev.options, [optionKey]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    if (!formData.text) {
      showAlertSnackbar("ادخل نص السؤال", "error");
      return;
    } else if (
      formData.type === "multiple" &&
      (!formData.options.A ||
        !formData.options.B ||
        !formData.options.C ||
        !formData.options.D)
    ) {
      showAlertSnackbar("ادخل  الاختيارات", "error");
      return;
    }
    const url = editingQuestion
      ? `${ip}/test/questions/${editingQuestion.id}/`
      : `${ip}/test/questions/`;
    const method = editingQuestion ? "PUT" : "POST";

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
        if (editingQuestion) {
          setQuestions((prev) =>
            prev.map((q) => (q.id === editingQuestion.id ? data : q))
          );
          showAlertSnackbar("تم التعديل بنجاح", "success");
        } else {
          setQuestions((prev) => [...prev, data]);
          showAlertSnackbar("تم الاضافة بنجاح", "success");
        }
        resetForm();
      });
  };

  const handleDelete = (id) => {
    fetch(`${ip}/test/questions/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    }).then(() => {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
      showAlertSnackbar("تم الحذف بنجاح", "success");
    });
  };

  const resetForm = () => {
    setFormData({
      text: "",
      options: { A: "", B: "", C: "", D: "" },
      correct_answer: "",
      type: "multiple",
    });
    setEditingQuestion(null);
    setModalOpen(false);
  };

  const handleEdit = (question) => {
    setEditingQuestion(question);
    setFormData(question);
    setModalOpen(true);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">الأسئلة</h2>
      <div className="text-end">
        <MDBBtn
          onClick={() => setModalOpen(true)}
          className="rounded-pill mb-3"
        >
          إضافة سؤال
        </MDBBtn>
      </div>
      <MDBTable dir="rtl" className="caption-top">
        <caption>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">المادة</InputLabel>
            <Select
              className="fs-lg mb-3"
              dir="rtl"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={topic}
              label="المادة"
              onChange={(e) => {
                setCurrentPage(1);
                setTopic(e.target.value);
              }}
            >
              {topics.map((topic) => (
                <MenuItem key={topic.id} value={topic.id}>
                  {topic.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </caption>
        <MDBTableHead>
          <tr>
            <th>م</th>
            <th className="w-50">النص</th>
            <th>النوع</th>
            <th>المادة</th>
            <th>الإجراءات</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {questions.map((q, index) => (
            <tr key={q.id}>
              <td>{(currentPage - 1) * 15 + (index + 1)}</td>
              <td>{q.text}</td>
              <td>{q.type === "multiple" ? "اختيار من متعدد" : "صواب/خطأ"}</td>
              <td>{q.topic_name}</td>
              <td>
                <MDBBtn
                  color="warning"
                  size="sm"
                  className="rounded-pill ms-2"
                  onClick={() => handleEdit(q)}
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
                        handleDelete(q.id);
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

      <div className="text-center mb-6">
        <span
          className="me-2 text-primary fs-2"
          style={{ cursor: "pointer" }}
          onClick={() => setCurrentPage((pre) => Math.max(pre - 1, 1))}
        >
          &laquo;
        </span>
        <span className="fs-4">{currentPage}</span>
        <span
          className="ms-2 text-primary fs-2"
          style={{ cursor: "pointer" }}
          onClick={() => setCurrentPage((pre) => Math.min(pre + 1, totalPages))}
        >
          &raquo;
        </span>
      </div>
      <MDBModal open={modalOpen} tabIndex="-1">
        <MDBModalDialog centered size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                {editingQuestion ? "تعديل السؤال" : "إضافة سؤال"}
              </MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={resetForm} />
            </MDBModalHeader>
            <MDBModalBody>
              <TextField
                fullWidth
                size="small"
                dir="rtl"
                label="نص السؤال"
                name="text"
                value={formData.text}
                onChange={handleInputChange}
                className="mb-3"
              />

              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">النوع</InputLabel>
                <Select
                  className="fs-lg mb-3"
                  dir="rtl"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.type}
                  label="النوع"
                  name="type"
                  onChange={handleInputChange}
                >
                  <MenuItem value="multiple">اختيار من متعدد</MenuItem>
                  <MenuItem value="true_false">صواب/خطأ</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">المادة</InputLabel>
                <Select
                  className="fs-lg mb-3"
                  dir="rtl"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.topic}
                  label="المادة"
                  name="topic"
                  onChange={handleInputChange}
                >
                  {topics.map((topic) => (
                    <MenuItem key={topic.id} value={topic.id}>
                      {topic.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {formData.type === "multiple" && (
                <>
                  {["A", "B", "C", "D"].map((key) => (
                    <TextField
                      size="small"
                      fullWidth
                      dir="rtl"
                      key={key}
                      label={`الخيار ${key}`}
                      name={`option_${key}`}
                      value={formData.options[key]}
                      onChange={handleInputChange}
                      className="mb-3"
                    />
                  ))}
                </>
              )}
              {formData.type === "multiple" && (
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    الإجابة الصحيحة
                  </InputLabel>
                  <Select
                    className="fs-lg mb-3"
                    dir="rtl"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="الإجابة الصحيحة"
                    name="correct_answer"
                    value={formData.correct_answer}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="C">C</MenuItem>
                    <MenuItem value="D">D</MenuItem>
                  </Select>
                </FormControl>
              )}

              {formData.type === "true_false" && (
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    الإجابة الصحيحة
                  </InputLabel>
                  <Select
                    className="fs-lg mb-3"
                    dir="rtl"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="الإجابة الصحيحة"
                    name="correct_answer"
                    value={formData.correct_answer}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="T">صواب</MenuItem>
                    <MenuItem value="F">خطأ</MenuItem>
                  </Select>
                </FormControl>
              )}
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

export default QuestionManagement;
