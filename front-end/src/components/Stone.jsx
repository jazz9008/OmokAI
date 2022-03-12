import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";

const StoneWrapper = styled.img`
  position: absolute;
  z-index: 999;
  width: 37px;
  height: 37px;
  left: ${(props) => props.left + "px"};
  top: ${(props) => props.top + "px"};
`;


const Stone = ({color, x, y}) => {
  return (
    <StoneWrapper
      left={x}
      top={y}
      src={color == 1 ? "/images/black.png" : "/images/white.png"}
    />
  );
};

export default Stone;
