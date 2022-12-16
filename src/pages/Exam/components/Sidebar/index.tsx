import React from "react";

import styled, { css } from "styled-components";
import { NavbarDash } from "../../../../GolbalStyles.styled";
import breakPoints from "../../../../shared/breakPoints";
import colors from "../../../../shared/colors";
import { isActive } from "../../../../shared/interface";

const SidebarExam = ({
  allQuestion,
  isOpenMenu,
  indexQuestion,
  handleClickChangeQuestion,
  handleSubmit,
  setIsOpenMenu,
}: any) => {
  const questions = allQuestion.questions || [];

  return (
    <>
      <SideMenuButtonContainer>
        <ListBtnQuestion>
          {questions.map((data: any, index: any) => (
            <ButtonQuestion
              isActive={index === indexQuestion}
              key={index}
              onClick={() => handleClickChangeQuestion(index)}
            >
              {index + 1}
            </ButtonQuestion>
          ))}
        </ListBtnQuestion>

        <ButtonRound onClick={handleSubmit}>Submit</ButtonRound>
      </SideMenuButtonContainer>
      <NavbarDash show={isOpenMenu} onClick={() => setIsOpenMenu(false)} />
    </>
  );
};

export default SidebarExam;

export const SideMenuButtonContainer = styled.div`
  background-color: #d9d9d9;
  padding: 30px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media screen and (min-width: 769px) {
    max-width: 300px;
  }

  @media screen and (max-width: ${breakPoints.md}) {
    max-width: 400px;
    position: fixed;
    z-index: 100;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 80%;
    width: 80%;
    display: ${(props: any) => (props.show ? "flex" : "none")};
  }
`;
export const ListBtnQuestion = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;

  @media screen and (max-width: 320px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
export const ButtonQuestion = styled.button<isActive>`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  border: ${(props: any) =>
    props.isActive ? " 2px solid white" : "1px solid rgba(0, 0, 0, 0.5)"};

  ${(props) => {
    if (props.isActive) {
      return css`
        background-color: ${colors.green};
      `;
    }

    return css`
      background-color: white;
    `;
  }}

  user-select: none;
`;

export const ButtonRound = styled.button`
  background-color: #9f9d9f;
  padding: 14px 40px;
  border-radius: 40px;
  cursor: pointer;
  border: none;
  outline: none;
  font-weight: bold;
`;
