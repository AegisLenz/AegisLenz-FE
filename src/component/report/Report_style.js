import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  z-index: 200;

  top: 8vh;
  left: 5vw;
  width: 95vw;
  height: 92vh;

  display: flex;
  flex-direction: row;
`;
export const LeftWrapper = styled.div`
  position: relative;
  width: 10%;
  height: 100%;

  box-shadow: 0px 0px 3px #333;

  display: flex;
  flex-direction: column;
`;

export const LeftIndex = styled.div`
  width: 95%;
  margin-left: 5%;

  h1 {
    font-size: 1.5em;
  }
  li {
    font-size: 1em;
    list-style: "- ";
    margin-bottom: 5%;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

export const ContentWrapper = styled.div`
  position: relative;
  width: 90%;
  height: 100%;
`;
