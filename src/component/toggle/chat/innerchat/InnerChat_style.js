import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  top: ${({ isFull }) => (isFull ? "-83vh" : "0")};
  position: absolute;
  height: ${({ isOpen, isFull }) => (isFull ? "85vh" : isOpen ? "83vh" : "0")};
  transition: all ease 0.6s;
  overflow: hidden;
`;
