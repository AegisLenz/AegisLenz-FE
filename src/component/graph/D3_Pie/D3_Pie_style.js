import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
export const SVGWrapper = styled.div`
  width: 60%;
  height: 80%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "${(props) => props.totalAccount}";
    position: absolute;
    display: block;
    font-size: 120%;
  }
`;
export const Legend_container = styled.div`
  width: 40%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Legend = styled.h1`
  margin: 10% 10% 0 0;
  font-size: 80%;
  font-weight: 500;
  align-self: flex-end;

  &::before {
    content: "";
    position: absolute;
    display: block;
    width: 10%;
    height: 3%;
    background-color: ${(props) => props.b_color};
    transform: translate(-110%, 50%);
    transition: height ease 0.3s;
  }
  &:hover {
    cursor: pointer;
    padding: 8px 12px;
    font-size: 100%;
  }
  &:hover::before {
    height: 10%;
    transform: translate(-110%, 0%);
  }
`;
