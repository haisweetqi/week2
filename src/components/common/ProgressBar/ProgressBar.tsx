import React from "react";

import styled from "styled-components";
import colors from "../../../shared/colors";
import { Width } from "../../../shared/interface";

const ProgressBarContainer = styled.div`
  width: 100%;
  height 1.8rem;
  background-color: ${colors["gray-dark"]};
  border-radius: 4px;
  position: relative;
`;
const Filter = styled.div<Width>`
  position: absolute;
  border-radius: inherit;
  height: 100%;
  width: ${(props) => (props.width ? `${props.width}%` : "100%")};
  background-color: #41c54e;
  transition: all 0.1s;
`;

const ProgressBar = ({ percent }: any) => {
  return (
    <ProgressBarContainer>
      <Filter width={percent}></Filter>
    </ProgressBarContainer>
  );
};

export default ProgressBar;
