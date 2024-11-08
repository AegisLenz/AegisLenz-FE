import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 200;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  flex-direction: column;
  border-radius: 1em;
`;
export const TopPart = styled.div`
  position: relative;
  width: 94%;
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

  padding: 0;

  align-items: left;
  align-content: center;
`;
export const ContentArea = styled.div`
  padding: 2%;

  top: 12%;
  height: 79%;
  width: 92%;

  margin: 1% 0;

  background-color: #eee;
  border-radius: 1em;

  overflow-y: auto;
  overflow-x: auto;
`;
export const DownloadButton = styled.button`
  height: 100%;
  width: 5%;

  background-image: url("/icon/download.svg");
  background-position: center;
  background-size: 90%;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;

  transition: all ease 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;
