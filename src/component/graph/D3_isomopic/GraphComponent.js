import React, { useEffect, useRef } from "react";
import * as S from "./Garph_style";
import * as d3 from "d3";

const GridWithDraggableNode = ({ openIsometric }) => {
  const svgRef = useRef(null);

  function MouseTransformCenter(x, y, gridSize){
    const _x = x-(gridSize/2);
    const _y = y-(gridSize/2);
    return { x: _x, y: _y };
  }
  function Rotate(x, y, angleInDegrees) {
    const angleInRadians = angleInDegrees * (Math.PI / 180);
    const xRotated = x * Math.cos(angleInRadians) - y * Math.sin(angleInRadians);
    const yRotated = x * Math.sin(angleInRadians) + y * Math.cos(angleInRadians);
    return { x: xRotated, y: yRotated };
  }
  // 이소메트릭 좌표를 평면 좌표로 변환하는 함수
  function skewPoint(x, y, skewXInDegrees, skewYInDegrees) {
    // 각도를 라디안으로 변환
    const skewXInRadians = skewXInDegrees * (Math.PI / 180);
    const skewYInRadians = skewYInDegrees * (Math.PI / 180);

    // 스큐 변환 공식 적용
    const xSkewed = x + y * Math.tan(skewXInRadians);
    const ySkewed = y + x * Math.tan(skewYInRadians);

    return { x: xSkewed, y: ySkewed };
}
  useEffect(() => {

    const WidthSell = 600;
    const HeightSell = 300;

    const svg = d3
      .select(svgRef.current)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${WidthSell} ${HeightSell}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const gridSize = 30;

    // 팬과 줌이 적용될 g 그룹 생성
    const g = svg.append("g");

    // 그리드 생성
    const gridLines = g.append("g").attr("class", "grid");

    for (let i = 0; i <= WidthSell; i += gridSize) {
      for (let j = 0; j <= HeightSell; j += gridSize) {
        gridLines
          .append("rect")
          .attr("x", i)
          .attr("y", j)
          .attr("width", gridSize)
          .attr("height", gridSize)
          .attr("fill", "none")
          .attr("stroke", "#aaaaaa")
          .attr("stroke-width", 1);
      }
    }

    // 첫 번째 사각형 노드 생성
    const rectNode1 = g
      .append("rect")
      .attr("x", gridSize * 4)
      .attr("y", gridSize * 3)
      .attr("width", gridSize)
      .attr("height", gridSize)
      .attr("fill", "blue");

    // 두 번째 사각형 노드 생성
    const rectNode2 = g
      .append("rect")
      .attr("x", gridSize * 8)
      .attr("y", gridSize * 5)
      .attr("width", gridSize)
      .attr("height", gridSize)
      .attr("fill", "green");

    // 꺾이는 직각 간선 생성
    const lineGroup = g.append("g");

    // 수평선 (x축)
    const horizontalLine = lineGroup
      .append("line")
      .attr("x1", gridSize * 4 + gridSize / 2) // 첫 번째 노드 중심
      .attr("y1", gridSize * 3 + gridSize / 2)
      .attr("x2", gridSize * 8 + gridSize / 2) // 두 번째 노드의 x 좌표까지만
      .attr("y2", gridSize * 3 + gridSize / 2) // y 좌표는 고정 (수평선)
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    // 수직선 (y축)
    const verticalLine = lineGroup
      .append("line")
      .attr("x1", gridSize * 8 + gridSize / 2) // 수평선 끝점
      .attr("y1", gridSize * 3 + gridSize / 2) // 수평선과 동일한 y 좌표에서 시작
      .attr("x2", gridSize * 8 + gridSize / 2) // x 좌표는 고정
      .attr("y2", gridSize * 5 + gridSize / 2) // 두 번째 노드 중심
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    // 파란색 사각형 안에 따라다니는 이미지 생성
    const imageInRect = g
      .append("image")
      .attr("xlink:href", "https://path/to/your/image.svg") // 외부 이미지 경로
      .attr("x", gridSize * 4 + 5) // 이미지의 x 좌표 (사각형 내부)
      .attr("y", gridSize * 3 + 5) // 이미지의 y 좌표 (사각형 내부)
      .attr("width", gridSize - 10) // 사각형 내부에 맞게 크기 조정
      .attr("height", gridSize - 10); // 사각형 내부에 맞게 크기 조정

    // 줌 및 팬 설정
    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 5])
      .on("zoom", function (event) {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    // 드래그 동작 설정
    const dragHandler = d3
      .drag()
      .subject(function () {
        const me = d3.select(this);
        return { x: me.attr("x"), y: me.attr("y") };
      })
      .on("start", function (event) {
        d3.select(this).raise().attr("stroke", "black");

        // 이미지를 항상 사각형 위로 올림
        if (this === rectNode1.node()) {
          imageInRect.raise();
        }
      })
      .on("drag", function (event) {
        const [x, y] = d3.pointer(event, svg.node());
        const {x: C_x, y: C_y} = MouseTransformCenter(x,y, gridSize);
        const { x: roX, y: roY } = Rotate(C_x, C_y, 30);
        const {x:isoX, y:isoY}=skewPoint(roX, roY, -30, 0);
        // 마우스의 좌표를 평면 좌표로 계산
        const snappedX = Math.round(isoX / gridSize) * gridSize;
        const snappedY = Math.round(isoY / gridSize) * gridSize;

        // 사각형 위치 업데이트
        d3.select(this).attr("x", snappedX).attr("y", snappedY);

        // 사각형을 드래그할 때 이미지도 함께 이동
        if (this === rectNode1.node()) {
          imageInRect.attr("x", snappedX + 5).attr("y", snappedY + 5);

          // 수평선 업데이트
          horizontalLine
            .attr("x1", snappedX + gridSize / 2)
            .attr("y1", snappedY + gridSize / 2)
            .attr("y2", snappedY + gridSize / 2); // 수평선 y 좌표는 같게 유지

          // 수직선 업데이트 (x 좌표는 고정)
          verticalLine
            .attr("x1", gridSize * 8 + gridSize / 2)
            .attr("x2", gridSize * 8 + gridSize / 2)
            .attr("y1", snappedY + gridSize / 2);
        } else if (this === rectNode2.node()) {
          horizontalLine.attr("x2", snappedX + gridSize / 2);

          verticalLine
            .attr("x1", snappedX + gridSize / 2)
            .attr("x2", snappedX + gridSize / 2)
            .attr("y2", snappedY + gridSize / 2);
        }
      })
      .on("end", function () {
        d3.select(this).attr("stroke", null);
      });

    // 두 개의 사각형 노드에 드래그 동작 적용
    dragHandler(rectNode1);
    dragHandler(rectNode2);
  }, []);

  return (
    <S.Wrapper openIsometric={openIsometric}>
      <svg ref={svgRef} />
    </S.Wrapper>
  );
};

export default GridWithDraggableNode;
