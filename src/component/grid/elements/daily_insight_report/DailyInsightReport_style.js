import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 200;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  flex-direction: column;
  border-radius: 1em;
  box-shadow: 1px 1px 5px #333;
`;

export const Title = styled.h2`
  position: absolute;
  top: 0;
  color: #104f55;
  width: 97%;
  height: 19%;
  left: 0;
  font-size: 130%;
  padding-left: 3%;
  margin: 0%;
  align-items: left;
  align-content: center;
`;

export const ContentArea = styled.div`
  position: absolute;
  top: 18%;
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubContent = styled.div`
  height: 100%;
  width: 98%;
  background: linear-gradient(to right, #2f878f, #2d3c7d);
  border-radius: 1em;
  justify-content: right;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const Content = styled.div`
  width: 89%;
  align-content: left;
  color: white;
  font-size: 80%;
  font-weight: 400;
  margin: 2% 0 3% 10%;

  &::before {
    content: "";
    display: block;
    position: absolute;
    left: 9%;
    width: 12%;
    height: 12%;
    background-image: url("/icon/Daily_Arrow.svg");
    background-size: contain;
    background-repeat: no-repeat;
    transform: translateX(-50%);
  }
`;
