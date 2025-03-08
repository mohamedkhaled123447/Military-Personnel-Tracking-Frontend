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
  MDBInput,
  MDBCheckbox,
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
const TestManagement = () => {
  const { showAlertSnackbar } = useAlertSnackbar();
  const { showConfirmSnackbar } = useConfirmSnackbar();
  const { ip } = useUser();
  const [tests, setTests] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [randomTestSize, setRandomTestSize] = useState(0);
  const [topic, setTopic] = useState("");
  const [target, setTarget] = useState({
    officer: 0,
    sergeant: 0,
  });
  const [testData, setTestData] = useState({
    name: "",
    description: "",
    time: 0,
    target: "ضابط",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  // Fetch tests and questions
  useEffect(() => {
    fetch(`${ip}/test/tests/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setTests(data));

    fetch(`${ip}/test/topics/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setTopics(data));
  }, []);
  useEffect(() => {
    fetch(
      `${ip}/test/questions/?page=${currentPage}&topic=${topic}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.results);
        setTotalPages(Math.ceil(data.count / 15));
        setTotalQuestions(data.count);
      });
  }, [currentPage, topic]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTestData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectQuestion = (e) => {
    const questionId = parseInt(e.target.value);
    if (e.target.checked) {
      if (selectedQuestions.length >= randomTestSize) {
        showAlertSnackbar("تم الوصول الي عدد الاسئلة المطلوب", "error");
        return;
      }
      setSelectedQuestions((prev) => [...prev, questionId]);
    } else {
      setSelectedQuestions((prev) => prev.filter((id) => id !== questionId));
    }
  };

  const handleSubmit = () => {
    if (!testData.name || !testData.description) {
      showAlertSnackbar("ادخل  بيانات الاختبار", "error");
      return;
    } else if (!selectedQuestions.length) {
      showAlertSnackbar("اختار الاسئلة", "error");
      return;
    }
    const url = editingTest
      ? `${ip}/test/tests/${editingTest.id}/`
      : `${ip}/test/tests/`;
    const method = editingTest ? "PUT" : "POST";

    const payload = {
      ...testData,
      questions: selectedQuestions,
    };
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (editingTest) {
          setTests((prev) =>
            prev.map((t) => (t.id === editingTest.id ? data : t))
          );
          showAlertSnackbar("تم التعديل بنجاح", "success");
        } else {
          setTests((prev) => [...prev, data]);
          showAlertSnackbar("تم الاضافة بنجاح", "success");
        }
        resetForm();
      });
  };

  const handleDelete = (id) => {
    fetch(`${ip}/test/tests/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    }).then(() => {
      setTests((prev) => prev.filter((t) => t.id !== id));
      showAlertSnackbar("تم الحذف بنجاح", "success");
    });
  };

  const resetForm = () => {
    setTestData({ name: "", description: "", time: 0, target: "ضابط" });
    setSelectedQuestions([]);
    setEditingTest(null);
    setModalOpen(false);
    setTopic("");
    setRandomTestSize(0);
  };

  const handleEdit = (test) => {
    setRandomTestSize(test.questions.length);
    setEditingTest(test);
    setTestData({
      name: test.name,
      description: test.description,
      time: test.time,
      target: test.target,
    });
    setSelectedQuestions(test.questions.map((q) => q.id));
    setModalOpen(true);
  };
  const filteredData = () => {
    let dataCopy = [...tests];
    Object.keys(target).forEach((key) => {
      if (!target[key]) {
        dataCopy = dataCopy.filter((record) => record.target !== keyMap[key]);
      }
    });
    return dataCopy;
  };
  const randomTest = async () => {
    if (!topic || !randomTestSize) {
      showAlertSnackbar("لم يتم اختيار المادة او عدد الاسئلة", "error");
      return;
    }
    if (randomTestSize > totalQuestions) {
      showAlertSnackbar("عدد الاسئلة اكبر من المتاح", "error");
      return;
    }
    const response = await fetch(`${ip}/test/random-test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify({ topic: topic, n: randomTestSize }),
    });
    if (response.ok) {
      const data = await response.json();
      setSelectedQuestions(data.map((item) => item.id));
      showAlertSnackbar("تم انشاء اختبار عشوائي", "success");
    }
  };
  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">الاختبارات</h2>
      <div className="text-end">
        <MDBBtn
          onClick={() => setModalOpen(true)}
          className="rounded-pill mb-3"
        >
          إضافة اختبار
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
      <MDBTable dir="rtl">
        <MDBTableHead>
          <tr>
            <th>م</th>
            <th>اسم الاختبار</th>
            <th>كود الاختبار</th>
            <th>وقت الاختبار</th>
            <th>عدد الاسئلة</th>
            <th>الممتحن</th>
            <th>الإجراءات</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {filteredData().map((test, index) => (
            <tr key={test.id}>
              <td>{index + 1}</td>
              <td>{test.name}</td>
              <td>{test.code}</td>
              <td>{test.time}</td>
              <td>{test.questions.length}</td>
              <td>{test.target}</td>
              <td>
                <MDBBtn
                  color="warning"
                  size="sm"
                  className="rounded-pill ms-2"
                  onClick={() => handleEdit(test)}
                >
                  تعديل
                </MDBBtn>
                <MDBBtn
                  color="danger"
                  size="sm"
                  className="rounded-pill"
                  onClick={() =>
                    showConfirmSnackbar(
                      "تأكيد الحذف",
                      () => {
                        handleDelete(test.id);
                      },
                      () => {
                        console.log("Cancelled!");
                      },
                      "bottom",
                      "center"
                    )
                  }
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
                {editingTest ? "تعديل الاختبار" : "إضافة اختبار"}
              </MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={resetForm} />
            </MDBModalHeader>
            <MDBModalBody>
              <div className="row" dir="rtl">
                <div className="col-4">
                  <TextField
                    size="small"
                    fullWidth
                    dir="rtl"
                    label="اسم الاختبار"
                    name="name"
                    value={testData.name}
                    onChange={handleInputChange}
                    className="mb-3"
                  />
                </div>
                <div className="col-4">
                  <TextField
                    size="small"
                    fullWidth
                    dir="rtl"
                    label="الوصف"
                    name="description"
                    value={testData.description}
                    onChange={handleInputChange}
                    className="mb-3"
                  />
                </div>
                <div className="col-4">
                  <TextField
                    size="small"
                    fullWidth
                    dir="rtl"
                    label="الوقت"
                    name="time"
                    type="number"
                    value={testData.time}
                    onChange={handleInputChange}
                    className="mb-3"
                  />
                </div>
                <div className="col-4">
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">
                      المادة
                    </InputLabel>
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
                        setTestData((pre) => ({
                          ...pre,
                          name: topics.find(
                            (item) => item.id === e.target.value
                          ).name,
                        }));
                      }}
                    >
                      {topics.map((topic) => (
                        <MenuItem key={topic.id} value={topic.id}>
                          {topic.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-4">
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">
                      الممتحن
                    </InputLabel>
                    <Select
                      className="fs-lg mb-3"
                      dir="rtl"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={testData.target}
                      label="الممتحن"
                      name="target"
                      onChange={handleInputChange}
                    >
                      <MenuItem value="ضابط">ضابط</MenuItem>
                      <MenuItem value="ضابط صف">ضابط صف</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-4">
                  <TextField
                    label="عدد الاسئلة"
                    value={randomTestSize}
                    type="number"
                    size="small"
                    fullWidth
                    onChange={(e) => setRandomTestSize(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-2 d-flex justify-content-center">
                <MDBBtn className="rounded-pill" onClick={randomTest}>
                  اختيار عشوائي
                </MDBBtn>
              </div>
              <h4 className="mb-2 text-center">
                الأسئلة المختارة : {selectedQuestions.length} سؤال
              </h4>
              {questions.map((q) => (
                <MDBCheckbox
                  key={q.id}
                  label={q.text}
                  value={q.id}
                  checked={selectedQuestions.includes(q.id)}
                  onChange={handleSelectQuestion}
                  className="mb-2"
                />
              ))}
              <div className="text-center">
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
                  onClick={() =>
                    setCurrentPage((pre) => Math.min(pre + 1, totalPages))
                  }
                >
                  &raquo;
                </span>
              </div>
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

export default TestManagement;
