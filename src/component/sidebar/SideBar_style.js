import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 500;
  position: fixed;
  display: flex;
  width: 5vw;
  height: 92vh;
  background-color: #104f55;
  margin: 0;
  top: 8vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  transition: all ease 0.3s;

  &:hover {
    width: 15vw;
  }
`;
export const Icon = styled.img`
  margin: 15%;
  width: 40%;
  transition: all ease 0.3s;
  ${Wrapper}:hover & {
    opacity: 0.6;
  }
`;

export const IconP = styled.p`
  position: absolute;
  color: white;
  left: 5vw;
  font-weight: 600;
  font-size: 1em;
  width: 0;
  opacity: 0;
  transition: all 0.3s ease;

  ${Wrapper}:hover & {
    width: auto;
    opacity: 0.6;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  position: relative;
  top: -30%;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-self: flex-start;
  a {
    display: flex;
    margin: 0;
    padding: 0;
    width: 5vw;
    justify-content: center;
    align-items: center;
    align-self: flex-start;
    &:hover ${Icon} {
      opacity: 1;
      transform: scale(1.1);
    }

    &:hover ${IconP} {
      width: auto;
      opacity: 1;
      transform: scale(1.1);
    }
  }
`;
