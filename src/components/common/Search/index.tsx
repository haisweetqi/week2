import React from "react";

import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";
import colors from "../../../shared/colors";

const Search = () => {
  return (
    <SearchForm>
      <InputSearch placeholder="Search ..." />
      <ButtonSearch>
        <IconSearch />
      </ButtonSearch>
    </SearchForm>
  );
};

export default Search;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  flex-grow: 1;
  height: 40px;
  border-radius: 5px;
  border: 1px solid black;
  overflow: hidden;
`;
export const InputSearch = styled.input`
  flex-grow: 1;
  padding: 10px 20px;
  background-color: ${colors.input};
  height: 100%;
  border: none;
  outline: none;
`;
export const ButtonSearch = styled.button`
  width: 60px;
  height: 40px;
  display: grid;
  place-items: center;
  background-color: white;
  cursor: pointer;
  border: none;
  outline: none;
`;
export const IconSearch = styled(AiOutlineSearch)`
  width: 20px;
  height: 20px;
`;
