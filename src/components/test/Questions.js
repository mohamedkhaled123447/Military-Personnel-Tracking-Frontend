import React, { useState } from "react";
import Timer from "./Timer";
import Question from "./Question";
import { MDBBtn } from "mdb-react-ui-kit";

function Questions({
  selectedTest,
  userAnswers,
  setUserAnswers,
  finishTest,
  userData,
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [testComplete, setTestComplete] = useState(false);

  // Next question
  const nextQuestion = () => {
    if (currentQuestionIndex < selectedTest.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Previous question
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (!selectedTest)
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-grow" role="status"></div>
      </div>
    );
  return (
    <div className="text-center mt-4">
      <h3>
        {userData.is_officer ? userData.rank : userData.dgree}:{userData.name}
      </h3>
      <Timer
        minutes={selectedTest.time}
        setTestComplete={setTestComplete}
        finishTest={finishTest}
      />
      <h3>{selectedTest.name}</h3>
      <h4>
        السؤال {currentQuestionIndex + 1} من {selectedTest.questions.length}
      </h4>
      <div className="mt-3">
        <Question
          question={selectedTest.questions[currentQuestionIndex]}
          currentQuestionIndex={currentQuestionIndex}
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
        />
        <div className="my-4">
          <MDBBtn
            color="secondary"
            disabled={testComplete || currentQuestionIndex === 0}
            onClick={prevQuestion}
            className="rounded-pill"
          >
            السابق
          </MDBBtn>
          <MDBBtn
            color="secondary"
            disabled={
              testComplete ||
              currentQuestionIndex === selectedTest.questions.length - 1
            }
            onClick={nextQuestion}
            className="rounded-pill mx-3"
          >
            التالي
          </MDBBtn>
        </div>
      </div>
    </div>
  );
}

export default Questions;
