import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as S from "./BrokenLine_style";

const LineChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 },
      width = 500 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    // Clear previous SVG elements
    d3.select(svgRef.current).selectAll("*").remove();

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

    // Add defs for gradients
    const defs = svg.append("defs");

    // Traffic gradient
    const trafficGradient = defs
      .append("linearGradient")
      .attr("id", "traffic-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    trafficGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#104F55");

    trafficGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "white");

    // Attack gradient
    const attackGradient = defs
      .append("linearGradient")
      .attr("id", "attack-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    attackGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#FF5733");

    attackGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "white");

    // X-axis
    const x = d3
      .scalePoint()
      .domain(data.map((d) => d.month))
      .range([0, width]);

    // Y-axis
    const yMax = Math.max(
      d3.max(data, (d) => d.traffic),
      d3.max(data, (d) => d.attack)
    );
    const y = d3.scaleLinear().domain([0, yMax]).range([height, 0]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    // Traffic area
    const trafficArea = d3
      .area()
      .x((d) => x(d.month))
      .y0(height)
      .y1((d) => y(d.traffic));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "url(#traffic-gradient)")
      .attr("d", trafficArea);

    // Attack area
    const attackArea = d3
      .area()
      .x((d) => x(d.month))
      .y0(height)
      .y1((d) => y(d.attack));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "url(#attack-gradient)")
      .attr("d", attackArea);

    // Traffic line
    const trafficLine = d3
      .line()
      .x((d) => x(d.month))
      .y((d) => y(d.traffic));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#104F55")
      .attr("stroke-width", 2)
      .attr("d", trafficLine);

    // Attack line
    const attackLine = d3
      .line()
      .x((d) => x(d.month))
      .y((d) => y(d.attack));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#FF5733")
      .attr("stroke-width", 2)
      .attr("d", attackLine);

    // Circles for traffic
    svg
      .selectAll("circle.traffic")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "traffic")
      .attr("cx", (d) => x(d.month))
      .attr("cy", (d) => y(d.traffic))
      .attr("r", 4)
      .attr("fill", "white")
      .attr("stroke", "#104F55")
      .attr("stroke-width", 2);

    // Circles for attack
    svg
      .selectAll("circle.attack")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "attack")
      .attr("cx", (d) => x(d.month))
      .attr("cy", (d) => y(d.attack))
      .attr("r", 4)
      .attr("fill", "white")
      .attr("stroke", "#FF5733")
      .attr("stroke-width", 2);
  }, [data]);

  return (
    <S.ChartWrapper>
      <S.SVGWrapper ref={svgRef} />
      <S.Legend>
        <S.LegentBox>
          <S.LegentBox style={{ backgroundColor: "#104F55" }} />
          <S.LegendTitle>Traffic</S.LegendTitle>
        </S.LegentBox>
        <S.LegentBox>
          <S.LegentBox style={{ backgroundColor: "#FF5733" }} />
          <S.LegendTitle>Attack</S.LegendTitle>
        </S.LegentBox>
      </S.Legend>
    </S.ChartWrapper>
  );
};

export default LineChart;
