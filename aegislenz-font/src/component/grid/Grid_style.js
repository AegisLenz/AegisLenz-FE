import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 100;
  position: relative;
  display: flex;
  left: 5vw;
  top: 10vh;
  width: 95vw;
  height: auto;
  min-height: 90vh;
  background-color: #e4e4e4;
  margin: 0;
  justify-content: center;
  align-items: center;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-auto-flow: dense; /* 겹침 방지를 위한 속성 */
  grid-gap: 10px;
  width: 100%;
  height: 100%;
`;

export const Figure = styled.figure`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ active }) => (active ? "#ffcc00" : "#f2f2f2")};
  border: 2px solid #ccc;
  padding: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
  grid-row: span 1;
  grid-column: span 1; /* 기본 크기는 하나의 그리드 칸을 차지 */
  &:hover {
    background-color: #ffcc00;
    grid-row: span 2; /* hover 시 크기 변경 */
    grid-column: span 2; /* hover 시 가로 크기도 변경 */
    padding: 40px;
  }
`;

export const FrameImage = styled.div`
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Figcaption = styled.figcaption`
  margin-top: 10px;
  font-size: 1rem;
  text-align: center;
  color: #333;
`;
