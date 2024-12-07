import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 200;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 1em;
  box-shadow: 1px 1px 5px #aaa;
`;
export const TopPart = styled.div`
  position: relative;
  width: 100%;
  height: 15%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Title = styled.h2`
  color: #104f55;
  width: 100%;
  height: 100%;

  font-size: 130%;

  margin-left: 3%;
  padding: 0;

  align-items: left;
  align-content: center;
`;
export const GraphWrapper = styled.div`
  z-index: 202;

  top: 25%;

  width: 100%;
  height: 85%;
`;
