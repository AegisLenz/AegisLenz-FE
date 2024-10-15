import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 500;
  position: fixed;
  width: 100vw;
  height: 8vh;
  background-color: white;
  margin: 0;
  top: 0;
  padding-left: 1vw;
  div {
    display: inline-block;
  }
  a {
    text-decoration: none;
  }
`;

export const Title = styled.h1`
  display: inline-block;
  color: #104f55;
  /* &::after {
    content: "";
    position: relative;
    left: 0;
    background-color: #104f55;
    width: 100vh;
    height: 10px;
  } */
`;
