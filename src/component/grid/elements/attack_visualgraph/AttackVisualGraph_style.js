import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 200;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 1em;
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
  position: absolute;
  z-index: 202;

  top: 25%;

  width: 100%;
  height: 85%;
`;
export const GropWrapper = styled.div`
  z-index: 201;

  top: 15%;
  height: 85%;
  width: 100%;

  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: row;
`;

const hexToRgba = (hex, opacity) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const Grop = styled.div`
  height: 80%;
  width: 28%;

  margin: 1.5%;

  bottom: 3%;

  border-radius: 1em;
  border: 2px solid ${(props) => props.color};
  background-color: ${(props) => {
    const hex = props.color || "#ffffff"; // 기본값 설정
    const rgba = hexToRgba(hex, 0.2); // opacity 0.8로 설정
    return rgba;
  }};

  display: flex;
  justify-content: center;

  box-shadow: 1px 1px 5px #bbb;

  p {
    background-color: ${(props) => props.color};
    color: white;

    height: 1em;
    width: 5em;

    text-align: center;
    padding: 1em;

    font-weight: 700;
    font-size: 1em;

    border-radius: 2em;

    transform: translate(0, -2em);
  }
`;
