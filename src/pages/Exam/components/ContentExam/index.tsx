import React, { useState } from "react";
import styled from "styled-components";
import breakPoints from "../../../../shared/breakPoints";

const Content = ({
  data,
  indexQuestion,
  handleNextQuestion,
  handlePreQuestion,
}: any) => {
  console.log(data);

  const currentQuestion: any = data.questions;

  const anwserQuestion = currentQuestion
    ? [
        currentQuestion[indexQuestion].correctAnswer,
        ...currentQuestion[indexQuestion].incorrectAnswers,
      ]
    : [];

  const isChecked = (answer: any) => {};

  const handleCheckedAnswer = (answer: any) => {
    console.log(answer);
  };

  const positionAnswer = (index: any) =>
    index === 0 ? "A" : index === 1 ? "B" : index === 2 ? "C" : "D";

  return (
    <>
      {currentQuestion && currentQuestion.length > 0 ? (
        <ContentContainer>
          <Title>
            Câu {indexQuestion + 1}. {currentQuestion[indexQuestion].question}
          </Title>

          <AnswerList>
            {anwserQuestion.map((answer: any, index: any) => (
              <AnswerLabel key={index}>
                <input
                  type="radio"
                  name={answer}
                  aria-label="answer"
                  // checked={isChecked(answer)}
                  onChange={() => handleCheckedAnswer(answer)}
                />

                <span>
                  {positionAnswer(index)}. {answer}
                </span>
              </AnswerLabel>
            ))}
          </AnswerList>

          <ButtonContainer>
            <Button onClick={handlePreQuestion}>Previous</Button>
            <Button onClick={handleNextQuestion}>Next</Button>
          </ButtonContainer>
        </ContentContainer>
      ) : (
        "Loading"
      )}
    </>
  );
};

export default Content;

const ContentContainer = styled.div`
  padding: 1rem 3rem;
  @media screen and (max-width: ${breakPoints.md}) {
    background: #d9d9d9;
  }
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`;

const AnswerList = styled.form``;

const AnswerLabel = styled.label`
  cursor: pointer;
  display: block;
  margin: 1rem 0;
  input {
  }

  span {
    font-size: 1.25rem;
    font-weight: 600;
    margin-left: 1rem;
  }
`;

const AnswerText = styled.span`
  font-size: 1.25rem;
  margin-left: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background: #eee7a9;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin-top: 18rem;
  cursor: pointer;
`;
