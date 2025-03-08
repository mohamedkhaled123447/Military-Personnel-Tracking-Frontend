import React from "react";

function Question({
  question,
  currentQuestionIndex,
  setUserAnswers,
  userAnswers,
}) {
  return (
    <div>
      <h5 className="mb-3">{question.text}</h5>
      <div className="d-flex flex-column align-items-center">
        {question.type === "multiple" ? (
          <div>
            {Object.keys(question.options).map(
              (key) =>
                question.options[key] !== "" && (
                  <div
                    key={key}
                    className={`border rounded-pill p-2 mb-2 text-center cursor-pointer ${
                      userAnswers[currentQuestionIndex] === key
                        ? "bg-primary text-white"
                        : ""
                    }`}
                    onClick={() => {
                      const updatedAnswers = [...userAnswers];
                      updatedAnswers[currentQuestionIndex] = key;
                      setUserAnswers(updatedAnswers);
                    }}
                    style={{
                      width: "500px",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                    }}
                  >
                    {question.options[key]}
                  </div>
                )
            )}
          </div>
        ) : (
          <div>
            {["T", "F"].map((value) => (
              <div
                key={value}
                className={`border rounded-pill p-2 mb-2 text-center cursor-pointer ${
                  userAnswers[currentQuestionIndex] === value
                    ? "bg-primary text-white"
                    : ""
                }`}
                onClick={() => {
                  const updatedAnswers = [...userAnswers];
                  updatedAnswers[currentQuestionIndex] = value;
                  setUserAnswers(updatedAnswers);
                }}
                style={{
                  width: "500px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
              >
                {value === "T" ? "صحيح" : "خطأ"}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Question;
