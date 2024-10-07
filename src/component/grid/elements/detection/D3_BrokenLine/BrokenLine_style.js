import styled from "styled-components";

export const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const SVGWrapper = styled.svg`
  width: 100%;
  height: 150%;
`;

export const Legend = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const LegentBox = styled.div`
  margin: 0 10px;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    display: inline-block;
    width: 20px;
    height: 10px;
    background-color: ${(props) => props.color};
  }
`;

export const LegendTitle = styled.span`
  font-size: 13px;
`;
