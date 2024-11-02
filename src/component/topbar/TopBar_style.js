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
  overflow: hidden;

  a {
    text-decoration: none;
  }
`;

export const Title = styled.div`
  color: #104f55;

  height: 100%;
  width: 10%;

  font-size: 2rem;
  font-weight: 800;

  display: flex;
  align-items: center;
`;
