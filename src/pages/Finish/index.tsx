import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import breakPoints from "../../shared/breakPoints";

const FinishExample = () => {
  const navigate = useNavigate();
  const handleContinue = () => {
    navigate("/dashboard");
  };
  return (
    <FinishExampleContainer>
      <FinishExampleWrapper>
        <Title>Kiểm tra an toàn bảo mật thông tin lần 2</Title>

        <Answer>
          <AnswerQuestion>
            <Text>Số câu trả lời đúng: 12 </Text>
            <Text>Số câu trả lời sai: 3</Text>
            <Text>Số câu chưa trả lời đúng: 1</Text>
            <Text>Tổng số câu hỏi: 16</Text>
          </AnswerQuestion>
          <Text>Điểm số: 120 / 160</Text>
        </Answer>

        <Finish>
          <Button onClick={handleContinue}>Dashboard</Button>
        </Finish>
      </FinishExampleWrapper>
    </FinishExampleContainer>
  );
};

export default FinishExample;

const FinishExampleContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  @media screen and (max-width: ${breakPoints.md}) {
    padding: 0 2rem;
  }
`;

const FinishExampleWrapper = styled.div`
  max-width: 700px;
  background: #d9d9d9;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  padding: 1rem 2rem;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 28px;

  color: #000000;
`;

const Answer = styled.div`
  display: flex;
  align-items: center;
  gap: 6rem;
  margin: 2rem 0;
  flex-wrap: wrap;
`;
const AnswerQuestion = styled.div``;

const Text = styled.div`
  font-size: 24px;
  line-height: 29px;
  display: flex;
  align-items: center;

  color: #000000;
`;

const Button = styled.button`
  background: #9f9d9f;
  border-radius: 41px;
  padding: 1rem 2rem;
  border: none;
  cursor: pointer;
`;

const Finish = styled.div`
  text-align: center;
`;
