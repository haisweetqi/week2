import React, { useState, useEffect } from "react";
import styled from "styled-components";
import breakPoints from "../../../../shared/breakPoints";
import { HttpStatusCode } from "../../../../shared/statusCode";
import QuizService from "../../services";
import QuizItem from "../QuizItem";

const Quiz = ({ user, quiz }: any) => {
  return (
    <>
      <ListQuizContainer>
        <QuizItem data={quiz} />
      </ListQuizContainer>
    </>
  );
};

export default Quiz;

const ListQuizContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;

  @media screen and (max-width: ${breakPoints.md}) {
    grid-template-columns: 1fr;
  }
`;
