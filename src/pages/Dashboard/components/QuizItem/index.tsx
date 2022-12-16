import React from "react";
import styled from "styled-components";
import { BiTimeFive } from "react-icons/bi";
import { CiMedal } from "react-icons/ci";
import { Link } from "react-router-dom";
import convertToMinutesAndSecond from "../../../../shared/convertTime";
import Rating from "../../../../components/common/Rating";

const Quiz = ({ data }: any) => {
  return (
    <>
      {data.map((data: any) => (
        <QuizContainer key={data.id}>
          <Title>{data.title}</Title>
          <QuizTimeAndPoint>
            <Text>
              <BiTimeFive />
              {convertToMinutesAndSecond(data.time)}
            </Text>
            <Text>
              <CiMedal />
              200/{data.maxPoint} điểm
            </Text>
          </QuizTimeAndPoint>
          <Text>{data.difficulty}</Text>
          <Rating />

          <Link
            to={`exam/${data.id}`}
            style={{
              display: "block",
              textDecoration: "none",
              padding: " 1rem 0rem",
              backgroundColor: "ccc",
            }}
          >
            Get Exam
          </Link>
        </QuizContainer>
      ))}
    </>
  );
};

export default Quiz;

const QuizContainer = styled.div`
  padding: 1rem;
  border: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #000000;
`;

const QuizTimeAndPoint = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

const Text = styled.div`
  display : flex
  align-items: center;
  justify-content:center;
  text-transform: uppercase;
  margin-bottom: 10px ;
`;
