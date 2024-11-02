import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 200;
  position: relative;
  left: 5vw;
  top: 8vh;
  width: 95vw;
  height: 92vh;
  margin: 0;

  display: flex;
  align-items: center;
`;
export const InnerWrapper = styled.div`
  width: 95vw;
  height: 92vh;
`;
export const CountWrapper = styled.div`
  margin: 1%;
  width: 50%;
  height: 10%;
`;
export const IndexWrapper = styled.div`
  width: 100%;
  height: 86%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const Indexdiv = styled.div`
  height: 48%;
  width: 98%;
  padding: 0.3% 1%;
`;
export const DetailWrapper = styled.div``;
export const IsometricToggle = styled.div`
  position: absolute;
  z-index: 300;
  width: ${({ isDetailData }) => (isDetailData ? "2vw" : "0")};
  height: 2vw;

  right: ${({ openDetail }) => (openDetail ? "50vw" : "1vw")};
  top: ${({ openDetail }) => (openDetail ? "1vh" : "46vh")};
  border-radius: 0.5em;
  transition: all ease 0.6s;

  background-image: url("/icon/double_arrow.svg");
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;
  transform: rotate(${({ openDetail }) => (openDetail ? "180deg" : "0")});

  cursor: pointer;

  &:hover {
    background-color: #a9a9a9;
    box-shadow: 1px 1px 1px 0 #777777;
  }
`;
export const SideWrapper = styled.div`
  position: relative;
  width: ${({ openDetail }) => (openDetail ? "50vw" : 0)};
  min-height: 92vh;
  transition: all ease 0.6s;
  box-shadow: 2px 0px 10px #bbb;
`;
