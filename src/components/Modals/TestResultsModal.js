import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { useUser } from "../../context/UserContext";
const answersMap = {
  A: "أ",
  B: "ب",
  C: "ج",
  D: "د",
  F: "خطأ",
  T: "صح",
  N: "لم يتم الاجابة",
};
export default function TestResultsModal({ open, setOpen, result }) {
  if (!result) return <></>;
  const { ip } = useUser();
  const [test, setTest] = useState();
  const fetchData = async () => {
    const response = await fetch(
      `${ip}/test/tests/${result.test_id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );

    const data = await response.json();
    setTest(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (!test) return <></>;
  return (
    <MDBModal open={open} tabIndex={-1}>
      <MDBModalDialog centered size="fullscreen">
        <MDBModalContent>
          <MDBModalBody>
            <h1 className="text-center">
              {result.is_officer ? result.rank : result.dgree}:{" "}
              {result.user_name}
            </h1>
            <h2 className="text-center">اسم الاختبار: {result.test_name}</h2>
            <h2 className="text-center">
              {" "}
              النتيجة: %{result.score.toFixed(2)}
            </h2>
            <div className="mb-4 w-100" dir="rtl">
              {test.questions.map((question, index) => (
                <div
                  key={index}
                  className={`card mb-3 ${
                    result.answers[index] === question.correct_answer
                      ? "border-success"
                      : "border-danger"
                  }`}
                  style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="card-body">
                    <h5 className="card-title text-right">
                      <strong>السؤال {index + 1}:</strong> {question.text}
                    </h5>
                    <p className="card-text text-right">
                      <strong>إجابتك:</strong>{" "}
                      {result.answers[index] === "N"
                        ? "لم يتم الاجابة"
                        : question.options[result.answers[index]]}
                      {result.answers[index] !== question.correct_answer && (
                        <>
                          <br />
                          <strong>الإجابة الصحيحة:</strong>{" "}
                          {question.options[question.correct_answer]}
                        </>
                      )}
                    </p>
                    <span
                      className={`badge ${
                        result.answers[index] === question.correct_answer
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                      style={{ float: "left", textAlign: "right" }}
                    >
                      {result.answers[index] === question.correct_answer
                        ? "صحيح"
                        : "خطأ"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </MDBModalBody>

          <MDBModalFooter>
            <MDBBtn type="button" onClick={() => setOpen(!open)}>
              اغلاق
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
