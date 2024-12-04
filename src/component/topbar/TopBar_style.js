import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 500;
  position: fixed;
  width: 100vw;
  height: 8vh;
  background-color: white;
  margin: 0;
  top: 0;

  display: flex;
  flex-direction: row;
  align-items: center;

  padding-left: 1vw;
  overflow: hidden;
`;

export const Title = styled.div`
  color: #104f55;

  height: 100%;
  width: 80%;

  font-size: 2rem;
  font-weight: 800;

  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

export const Icon = styled.svg`
  width: 2rem;
  height: 2rem;

  margin-right: 1%;

  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-image: url("/icon/user_Icon.svg");
`;
export const Login = styled.div`
  color: #104f55;

  height: 100%;
  margin-right: 1%;

  font-size: 1rem;
  font-weight: 800;

  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
