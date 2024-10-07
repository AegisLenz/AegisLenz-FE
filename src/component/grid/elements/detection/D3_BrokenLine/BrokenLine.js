import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as S from "./BrokenLine_style";

const LineChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 },
      width = 500 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr(
        "viewBox",
        `0 0 ${width + margin.left + margin.right} ${
          height + margin.top + margin.bottom
        }`
      )
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scalePoint()
      .domain(data.map((d) => d.month))
      .range([0, width]);

    const y = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    const line = d3
      .line()
      .x((d) => x(d.month))
      .y((d) => y(d.traffic));

    const line2 = d3
      .line()
      .x((d) => x(d.month))
      .y((d) => y(d.attack));

    const defs = svg.append("defs");

    const gradient = defs
      .append("linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#104F55"); // 위쪽 진한 파란색

    gradient.append("stop").attr("offset", "100%").attr("stop-color", "white"); // 아래쪽 투명

    svg
      .append("path")
      .datum(data)
      .attr("fill", "url(#gradient)") // 그라데이션 적용
      .attr(
        "d",
        d3
          .area()
          .x((d) => x(d.month))
          .y0(height)
          .y1((d) => y(d.traffic))
      );
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#104F55")
      .attr("stroke-width", 2)
      .attr("d", line);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "url(#gradient)")
      .attr(
        "d",
        d3
          .area()
          .x((d) => x(d.month))
          .y0(height)
          .y1((d) => y(d.attack))
      );

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#689D8C")
      .attr("stroke-width", 2)
      .attr("d", line2);

    svg
      .selectAll("circle.traffic")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "traffic")
      .attr("cx", (d) => x(d.month))
      .attr("cy", (d) => y(d.traffic))
      .attr("r", 5)
      .attr("fill", "white") // 내부를 비우는 설정
      .attr("stroke", "#104F55") // 외곽선 색상 설정
      .attr("stroke-width", 2); // 외곽선 두께 설정

    svg
      .selectAll("circle.attack")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "attack")
      .attr("cx", (d) => x(d.month))
      .attr("cy", (d) => y(d.attack))
      .attr("r", 5)
      .attr("fill", "white") // 내부를 비우는 설정
      .attr("stroke", "#689D8C") // 외곽선 색상 설정
      .attr("stroke-width", 2); // 외곽선 두께 설정
  }, [data]);

  return (
    <S.ChartWrapper>
      <S.SVGWrapper ref={svgRef} />
      <S.Legend>
        <S.LegentBox>
          <S.LegentBox style={{ backgroundColor: "#104F55" }} />
          <S.LegendTitle>traffic example</S.LegendTitle>
        </S.LegentBox>
        <S.LegentBox>
          <S.LegentBox style={{ backgroundColor: "#689D8C" }} />
          <S.LegendTitle>attack example</S.LegendTitle>
        </S.LegentBox>
      </S.Legend>
    </S.ChartWrapper>
  );
};

export default LineChart;
