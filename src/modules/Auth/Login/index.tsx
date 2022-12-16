import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import breakPoints from "../../../shared/breakPoints";
import background from "../../../assets/images/bgLogin.jpg";

import { AiOutlineUser, AiOutlineLock, AiOutlineCamera } from "react-icons/ai";
import LoginService from "./services";
import { HttpStatusCode } from "../../../shared/statusCode";

const Login = () => {
  const { setAuth }: any = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await LoginService.loginApi({ email, password });
      const { status, data } = response;
      // console.log(data);

      if (status === HttpStatusCode.ok) {
        const accessToken = data?.accessToken;
        const roles = data?.user.roles;
        const { avatar, points } = data?.user;
        localStorage.setItem("token", accessToken);
        setAuth({ email, avatar, points, password, roles, accessToken });
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginContainer>
      <LoginWrapper>
        <Form onSubmit={handleSubmit}>
          <CameraIcon>
            <AiOutlineCamera style={{ fontSize: "10rem" }} />
          </CameraIcon>

          <FormItem>
            <InputContainer>
              <IconWrap>
                <AiOutlineUser />
              </IconWrap>
              <Input
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputContainer>
          </FormItem>

          <FormItem>
            <InputContainer>
              <IconWrap>
                <AiOutlineLock />
              </IconWrap>
              <Input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputContainer>
          </FormItem>

          <FormItem>
            <CheckBoxWrap>
              <input type="checkbox" aria-label="checkbox" />
              <span>Remember me</span>
            </CheckBoxWrap>
          </FormItem>

          <FormItem>
            <ButtonForm>Login</ButtonForm>
          </FormItem>
        </Form>
      </LoginWrapper>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-size: cover;
  background-image: url(${background});
`;

const LoginWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  @media screen and (max-width: ${breakPoints.md}) {
    padding: 0 1rem;
  }
`;

export const Form = styled.form`
  position: relative;
  margin: 0 auto;
  width: 450px;
  height: 300px%;
  background-color: #999595;
  border-radius: 3px;
  border: 2px solid yellow;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
  padding-top: 80px;
  padding-bottom: 80px;
`;
export const FormItem = styled.div`
  width: 70%;
`;
export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
`;
export const Input = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  padding: 0 10px;
`;

export const IconWrap = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const CheckBoxWrap = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  user-select: none;
`;

export const ButtonForm = styled.button`
  border: none;
  outline: none;
  text-transform: uppercase;
  border-radius: 5px;
  width: 100%;
  padding: 12px 20px;
  font-weight: bold;
  cursor: pointer;
`;

const CameraIcon = styled.div`
  width: 100px;
  height: 100px;
  background-color: #999595;
  padding: 10px;
  border-radius: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  border: 2px solid yellow;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;
