import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import * as S from "./D3_Pie_style";

const DonutChart = ({ data, setSubTitleValueProps, total }) => {
  const svgRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoveredIndex, setHoveredIndex] = useState(null); // hover 상태를 관리하는 상태 추가
  const [Account, setAccount] = useState(total);

  useEffect(() => {
    setAccount(total);
  }, [total]);

  useEffect(() => {
    const container = svgRef.current.parentElement;
    const width = container.offsetWidth;
    const height = width; // height를 width와 동일하게 설정
    setDimensions({ width, height });
  }, []);

  useEffect(() => {
    setSubTitleValueProps(Account);
  }, [setSubTitleValueProps, Account]);

  useEffect(() => {
    if (dimensions.width === 0) return;
    const radius = Math.min(dimensions.width, dimensions.height) / 2.5;

    // 기존 svg 제거
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .append("g")
      .attr(
        "transform",
        `translate(${dimensions.width / 2},${dimensions.height / 2})`
      );

    // 파이 생성기
    const pie = d3.pie().value((d) => d.value);

    // 도넛형 그래프를 위한 arc 생성기
    const arc = d3
      .arc()
      .innerRadius(radius * 0.6) // 도넛형 그래프를 위해 내부 반지름 설정
      .outerRadius(radius);

    // 파이 조각 생성
    svg
      .selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => d.data.color) // 데이터에서 색상 정보 가져옴
      .style("opacity", (d, i) => (i === hoveredIndex ? 1 : 0.7)) // hover된 부분은 밝게
      .style("transition", "opacity 0.5s ease"); // 트랜지션 효과 추가
  }, [data, dimensions, hoveredIndex]); // hoveredIndex가 변경될 때도 그래프 업데이트

  return (
    <S.Wrapper>
      <S.SVGWrapper totalAccount={String(Account)}>
        <svg ref={svgRef}></svg>
      </S.SVGWrapper>
      <S.Legend_container>
        {data.map((d, i) => (
          <S.Legend
            key={i}
            b_color={d.color}
            onMouseEnter={() => {
              setHoveredIndex(i);
              setAccount(d.value);
            }} // hover 시 해당 인덱스 설정
            onMouseLeave={() => {
              setHoveredIndex(null);
              setAccount(total);
            }} // hover 해제 시 null로 설정
          >
            {d.label}
          </S.Legend>
        ))}
      </S.Legend_container>
    </S.Wrapper>
  );
};

export default DonutChart;
