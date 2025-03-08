import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TestForm from "../../components/test/TestForm";
import Questions from "../../components/test/Questions";
import { MDBBtn } from "mdb-react-ui-kit";
import { useAlertSnackbar } from "../../context/AlertSnackbarContext";
import { useUser } from "../../context/UserContext";
import DataConfirmation from "../../components/test/DataConfirmation";
function TakeTest() {
  const navigate = useNavigate();
  const { ip } = useUser();
  const { showAlertSnackbar } = useAlertSnackbar();
  const [section, setSection] = useState(1);
  const [test, setTest] = useState();
  const [userData, setUserData] = useState();
  const [selectedTest, setSelectedTest] = useState();
  const [userAnswers, setUserAnswers] = useState(new Array(250).fill("N"));

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (section === 3) {
        showAlertSnackbar("لا يمكنك التنقل أثناء الاختبار", "error");
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [section]);

  useEffect(() => {
    const handlePopState = (event) => {
      if (section === 3) {
        event.preventDefault();
        showAlertSnackbar("لا يمكنك التنقل أثناء الاختبار", "error");
        window.history.pushState(null, null, window.location.href); // Push the current state back
      }
    };

    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [section]);

  const finishTest = async () => {
    const correctAnswersCount = selectedTest.questions.filter(
      (question, index) => question.correct_answer === userAnswers[index]
    ).length;
    const scorePercentage =
      (correctAnswersCount / selectedTest.questions.length) * 100;
    const result = {
      test: selectedTest.id,
      score: scorePercentage.toFixed(2),
      user: userData.id,
      answers: userAnswers.join(""),
    };

    const response = await fetch(`${ip}/test/results/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    });

    if (response.ok) {
      showAlertSnackbar("تم ارسال الاختبار", "success");
      navigate("/");
    } else {
      const errors = await response.json();
      console.log(errors)
      showAlertSnackbar(
        "حدث خطأ أثناء إرسال الاختبار. حاول مرة أخرى.",
        "error"
      );
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          {section === 1 ? (
            <TestForm test={test} setTest={setTest} setUserData={setUserData} />
          ) : section === 2 ? (
            <DataConfirmation
              test={test}
              userData={userData}
              selectedTest={selectedTest}
              setSelectedTest={setSelectedTest}
              setSection={setSection}
            />
          ) : (
            <Questions
              selectedTest={selectedTest}
              userAnswers={userAnswers}
              setUserAnswers={setUserAnswers}
              finishTest={finishTest}
              userData={userData}
            />
          )}
        </div>
        <div className="col-3"></div>
      </div>
      <div className="text-center mt-2">
        {section < 3 && (
          <MDBBtn
            className="mb-3 me-4"
            onClick={() => {
              if (section === 1) {
                navigate("/");
              } else if (section === 2) {
                setSection(1);
              }
            }}
            outline
            color="success"
          >
            السابق
          </MDBBtn>
        )}
        <MDBBtn
          className="mb-3"
          onClick={() => {
            if (!userData || !test) {
              showAlertSnackbar("ادخل البيانات", "error");
            } else if (section === 3) {
              finishTest();
            } else {
              setSection((prev) => prev + 1);
            }
          }}
          outline
          color="success"
        >
          {section === 3
            ? "انهاء الاختبار"
            : section === 1
            ? "التالي"
            : "بدا الاختبار"}
        </MDBBtn>
      </div>
    </>
  );
}

export default TakeTest;
