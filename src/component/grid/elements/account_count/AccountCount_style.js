import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 200;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InnerWrapper = styled.div`
  position: relative;
  z-index: 201;
  margin: 0.5%;
  width: 23%;
  background-color: ${(props) => props.color};
  height: 98%;
  border-radius: 2em;
  box-shadow: 1px 1px 2px 1px #999999;
`;

export const Index = styled.h2`
  position: absolute;
  white-space: pre-wrap;
  word-wrap: break-word;
  top: 5%;
  margin-left: 10%;
  margin-right: 10%;
  color: white;
  font-size: ${(props) => props.fontSize * 10}%;
`;

export const Number = styled.h1`
  position: absolute;
  bottom: 5%;
  right: 10%;
  color: white;
  font-size: ${(props) => props.fontSize * 15}%;
`;
