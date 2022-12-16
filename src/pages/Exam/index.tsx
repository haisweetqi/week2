import { useEffect, useMemo, useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CountDownTime from "../../components/common/CountDownTime/CountDownTime";
import breakPoints from "../../shared/breakPoints";
import colors from "../../shared/colors";

import { HttpStatusCode } from "../../shared/statusCode";
import Content from "./components/ContentExam";
import SidebarExam from "./components/Sidebar";
import ExamService from "./services";

const Exam = () => {
  const { id }: any = useParams();
  const [allQuestion, setAllQuestion]: any = useState([]);
  const [isFinish, setIsFinish] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const navigate = useNavigate();

  const getDataExam = async () => {
    const response = await ExamService.getExamId(id);
    const { status, data } = response;
    if (status === HttpStatusCode.ok) {
      setAllQuestion(data);
    }
  };

  const handleNextQuestion = () => {
    console.log(indexQuestion);

    setIndexQuestion((pre) => pre + 1);
  };
  const handlePreQuestion = () => {
    console.log(indexQuestion);
    setIndexQuestion((pre) => pre - 1);
  };

  const timeNowInMs = useMemo(() => {
    return new Date().getTime();
  }, []);

  const targetTimeInMs = timeNowInMs + allQuestion.time * 1000;

  const handleExpiredTime = () => {
    setIsFinish(true);
  };

  const handleClickChangeQuestion = (index: any) => {
    console.log(index);

    setIndexQuestion(index);
  };
  const handleSubmit = () => {
    navigate("/finish");
  };

  useEffect(() => {
    getDataExam();
  }, []);

  return (
    <>
      <Navbar>
        <NavbarToggle>
          <HiBars3 style={{ fontSize: "2rem" }} />
        </NavbarToggle>
        <NavbarTitle>Dashboard</NavbarTitle>
      </Navbar>

      <ExamContainer>
        <MainExam>
          <HeaderExam>
            <Title>{allQuestion.title}</Title>

            <CountDownTime
              totalTime={allQuestion.time * 1000}
              targetDate={targetTimeInMs}
              onExpiredTime={handleExpiredTime}
            />
          </HeaderExam>

          <ContentExam>
            <div>
              <Content
                data={allQuestion}
                indexQuestion={indexQuestion}
                handleNextQuestion={handleNextQuestion}
                handlePreQuestion={handlePreQuestion}
              />
            </div>

            <ButtonGotoWrap onClick={() => setIsOpenMenu(true)}>
              <ButtonRound>Chuyển tới</ButtonRound>
            </ButtonGotoWrap>
          </ContentExam>
        </MainExam>

        <SidebarExam
          allQuestion={allQuestion}
          isOpen={isOpenMenu}
          setIsOpenMenu={setIsOpenMenu}
          indexQuestion={indexQuestion}
          handleClickChangeQuestion={handleClickChangeQuestion}
          handleSubmit={handleSubmit}
        />
      </ExamContainer>
    </>
  );
};

export default Exam;

const ExamContainer = styled.div`
  display: flex;
  padding: 0;
  min-height: 100vh;
`;
const MainExam = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
const HeaderExam = styled.div`
  padding: 20px 15px;
  background-color: #d9d9d9;

  > *:not(:first-child) {
    margin-top: 10px;
  }
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 1.8rem;
`;

const NavbarTitle = styled.div`
  margin-left: 30%;
  font-size: 1rem;
`;

const ContentExam = styled.div`
  background-color: #c4c4c4;
  flex-grow: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
`;
const QuestionParam = styled.div`
  font-weight: bold;
  font-size: 1.8rem;
`;
const AnswerForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  padding-left: 20px;
`;
const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: ${colors.gray};
  border: 1px solid black;
  border-radius: 4px;

  &::after {
    content: "";
    position: absolute;
    display: none;

    left: 6px;
    top: 3px;

    width: 3px;
    height: 8px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;
const AnswerLabel = styled.label`
  cursor: pointer;
  display: inline-block;

  position: relative;
  padding-left: 4rem;
  margin-bottom: 1.2rem;
  user-select: none;
  font-size: 1.8rem;

  > input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ ${Checkmark} {
      background-color: #2196f3;
    }
    &:checked ~ ${Checkmark}:after {
      display: block;
    }
  }
`;

const ButtonsWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
`;
const Button = styled.button`
  border: none;
  outline: none;
  background-color: #eee7a9;
  font-weight: bold;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  margin-top: auto;
`;
const ButtonGotoWrap = styled.div`
  display: none;
  justify-content: center;
  margin-top: 30px;

  @media screen and (max-width: ${breakPoints.md}) {
    display: flex;
  }
`;

const ButtonRound = styled.button`
  background-color: #9f9d9f;
  padding: 14px 40px;
  border-radius: 40px;
  cursor: pointer;
  border: none;
  outline: none;
  font-weight: bold;
`;
const ButtonBackDashBoard = styled(Link)`
  background-color: #9f9d9f;
  padding: 14px 40px;
  border-radius: 40px;
  cursor: pointer;
  border: none;
  outline: none;
  font-weight: bold;
  color: black;

  text-decoration: none;
`;

const Navbar = styled.div`
  display: flex;
  align-items: center;
  background-color: #000;
  color: #fff;
  display: none;
  @media screen and (max-width: ${breakPoints.md}) {
    display: block;
    display: flex;
    padding: 0.5rem;
  }
`;

const NavbarToggle = styled.div`
  cursor: pointer;
`;
