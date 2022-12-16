import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import styled from "styled-components";

import breakPoints from "../../shared/breakPoints";
import colors from "../../shared/colors";
import { OverLay } from "../../GolbalStyles.styled";

import { HiBars3 } from "react-icons/hi2";

import Quiz from "./components/Quizs";
import QuizService from "./services";
import { HttpStatusCode } from "../../shared/statusCode";
import { Pagination, Select, Input, Space } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import { select } from "../../shared/select";
import { AudioOutlined } from "@ant-design/icons";
import { ToggleProps } from "../../shared/interface";

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const Dashboard = () => {
  const { auth, setAuth }: any = useContext(AuthContext);
  const [quizList, setQuizList]: any = useState([]);

  const [params, setParams] = useState({
    _page: 1,
    _limit: 6,
    difficulty: undefined,
    title: undefined,
  });
  const navigate = useNavigate();
  // console.log("111", auth);

  // console.log(setAuth);

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const openMenu = () => {
    setIsOpenMenu(true);
  };
  const closeMenu = () => {
    setIsOpenMenu(false);
  };

  const totalPoint = auth.points.reduce(
    (accumulator: any, currentValue: any) => accumulator + currentValue,
    0
  );

  // console.log(totalPoint);

  // Logout
  const handleLogout = async () => {
    setAuth({});
    localStorage.clear();
    navigate("/login");
  };

  const getQuizSelect = async () => {
    try {
      const response = await QuizService.getAllQuiz(params);

      const { data, status } = response;
      if (status === HttpStatusCode.ok) {
        setQuizList(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //
  // handleChangePage
  const handleChangePage = (page: any) => {
    setParams({ ...params, _page: page });
  };

  //
  const handleChangeSelect = async (select: any) => {
    if (select === "all") {
      setParams({
        _page: 1,
        _limit: 6,
        difficulty: undefined,
        title: undefined,
      });
    } else {
      setParams({ ...params, difficulty: select });
    }
  };

  // Search
  const onSearch = (value: any) => {
    if (value === "") {
      setParams({
        _page: 1,
        _limit: 6,
        difficulty: undefined,
        title: undefined,
      });
    } else {
      setParams({ ...params, title: value });
    }
  };

  useEffect(() => {
    getQuizSelect();
  }, [params]);

  return (
    <>
      <NavBar>
        <NavBarIconWrap onClick={openMenu}>
          <HiBars3 style={{ fontSize: "1.25rem" }} />
        </NavBarIconWrap>
        <NavBarTitle>DashBoard</NavBarTitle>
      </NavBar>

      <DashBoardContainer>
        <SideMenu show={isOpenMenu}>
          <TopSideMenu>
            <AvatarWrap>
              <img src={auth.avatar} alt="" />
            </AvatarWrap>
            <InforText>User : {auth.email}</InforText>
            <InforText>Point : {totalPoint}</InforText>
          </TopSideMenu>

          <Button onClick={handleLogout}>Logout</Button>
        </SideMenu>
        <OverLay show={isOpenMenu} onClick={closeMenu} />

        <Content>
          <HeaderContent>
            <SearchForm>
              {/* <Space direction="vertical"> */}
              <Search placeholder="input search text" onSearch={onSearch} />
              {/* </Space> */}
            </SearchForm>

            <Select
              defaultValue="all"
              style={{ width: 120, height: 30 }}
              onChange={handleChangeSelect}
              options={select}
            />
          </HeaderContent>

          <MainContent>
            <ListQuizWrap>
              <Quiz quiz={quizList} user={auth} />
            </ListQuizWrap>
            <PaginationWrap>
              <Pagination
                defaultCurrent={1}
                total={quizList.length}
                pageSize={params._limit}
                onChange={handleChangePage}
              />
            </PaginationWrap>
          </MainContent>
        </Content>
      </DashBoardContainer>
    </>
  );
};

export default Dashboard;

const DashBoardContainer = styled.div`
  background-color: ${colors["gray-dark"]};
  display: flex;

  @media screen and (min-width: 1025px) {
    padding-left: 0;
  }

  @media screen and (max-width: ${breakPoints.lg}) {
    margin-top: 65px;
    min-height: calc(100vh - 65px);
  }
`;

const SideMenu = styled.div<ToggleProps>`
  width: 300px;
  background-color: ${colors.gray};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  padding: 30px 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

  @media screen and (max-width: ${breakPoints.lg}) {
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    transform: ${(props: any) =>
      props.show ? "translateX(0)" : "translateX(-100%)"};
    transition: all 0.3s;
  }
`;

const TopSideMenu = styled.div`
  > *:not(:first-child) {
    margin-top: 15px;
  }
`;
const AvatarWrap = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border-radius: 100%;
  overflow: hidden;
  cursor: pointer;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const InforText = styled.div`
  font-weight: bold;
`;

const Button = styled.div`
  width: 90%;
  padding: 14px 20px;
  background: white;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
`;

const Content = styled.div`
  flex-grow: 1;
  background-color: ${colors["gray-dark"]};
  padding: 15px 30px;

  @media screen and (max-width: ${breakPoints.lg}) {
    padding: 15px 0;
  }
`;
const HeaderContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
`;

const MainContent = styled.div`
  margin-top: 15px;
`;
const ListQuizWrap = styled.div`
  padding: 30px;
  background-color: ${colors.gray};
  border-radius: 4px;
`;
const PaginationWrap = styled.div`
  margin-top: 20px;
  display: grid;
  place-items: center;
`;

const NavBar = styled.div`
  background-color: ${colors.navbar};
  height: 65px;
  position: fixed;
  z-index: 100;
  top: 0;
  width: 100vw;
  display: none;
  align-items: center;
  text-align: center;

  @media screen and (max-width: ${breakPoints.lg}) {
    display: flex;
  }
`;
const NavBarIconWrap = styled.div`
  background-color: ${colors.gray};
  width: 32px;
  height: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  > svg {
    font-size: 2.4rem;
  }
`;
const NavBarTitle = styled.span`
  text-align: center;
  width: 100%;
  font-weight: 500;
  color: white;
  font-size: 1rem;
  user-select: none;
`;

const SearchForm = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  height: 40px;
  border-radius: 5px;
  border: 1px solid black;
  overflow: hidden;
  input {
    flex-grow: 1;
    padding: 10px 20px;
    background-color: ${colors.input};
    height: 100%;
    border: none;
    outline: none;
  }
`;

const ButtonSearch = styled.button`
  width: 60px;
  height: 40px;
  display: grid;
  place-items: center;
  background-color: white;
  cursor: pointer;
  border: none;
  outline: none;
`;
const IconSearch = styled(AiOutlineSearch)`
  width: 20px;
  height: 20px;
`;
