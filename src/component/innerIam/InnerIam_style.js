import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;

  overflow-x: hidden;
  overflow-y: auto;
`;
export const InnerTop = styled.div`
  position: relative;
  width: 90%;
  height: 18%;
  border-bottom: solid 1px #aaa;
`;
export const InnerTitleArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  position: relative;

  width: 70%;
  height: 80%;
  margin-top: 3%;
`;
export const InnerTitle = styled.h1`
  margin: 0 0 4% 3%;
  padding: 0;

  &::after {
    content: "${(props) => props.UserId}";
    position: absolute;
    font-size: 50%;
    left: 12%;
    bottom: 30%;
    opacity: 0.5;
  }
`;
export const InnerTopInfo = styled.div`
  position: absolute;

  display: flex;
  flex-direction: row;
  width: 100%;
  bottom: 0;
  left: 7%;
  padding: 1%;
`;
export const InfoLink = styled(Link)`
  margin-right: 2%;
  text-decoration: none;
  color: black;
  opacity: 0.5;
  border-top: solid 1px #333;
  transition: all ease 0.3s;
  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;
export const InnerTitleIcon = styled.img``;

export const InnerCategorWrapper = styled.div`
  width: 90%;
  height: 7%;
  border-bottom: solid 1px #aaa;
`;
