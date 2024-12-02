import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const VisualGraph = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // 기존 SVG 초기화

    // SVG 컨테이너 크기 설정
    svg
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", "0 0 1000 600") // 적절한 뷰박스 설정
      .attr("preserveAspectRatio", "xMidYMid meet"); // 반응형 유지

    const width = 1000; // 실제 내부 그래프의 논리적 크기
    const height = 600;
    const margin = { top: 150, right: 50, bottom: 150, left: 50 };

    // 데이터 처리: 노드 및 링크
    const nodes = data.flatMap((section) => section.nodes);
    const links = data.flatMap((section) => section.links);

    // 섹션별 위치 계산
    const sections = data.map((section, index) => ({
      name: section.section,
      nodes: section.nodes,
      x:
        (index / (data.length - 1)) * (width - margin.left - margin.right) +
        margin.left,
    }));

    sections.forEach((section) => {
      const yScale = d3
        .scalePoint()
        .domain(section.nodes.map((node) => node.id))
        .range([margin.top, height - margin.bottom]);

      section.nodes.forEach((node) => {
        node.x = section.x;
        node.y = yScale(node.id);
      });
    });

    // 링크 데이터 매핑
    const linkData = links
      .map((link) => {
        const sourceNode = nodes.find((node) => node.id === link.source);
        const targetNode = nodes.find((node) => node.id === link.target);
        return sourceNode && targetNode
          ? {
              source: sourceNode,
              target: targetNode,
              value: link.value,
            }
          : null;
      })
      .filter(Boolean);

    // 링크 그리기
    svg
      .append("g")
      .selectAll("path")
      .data(linkData)
      .join("path")
      .attr("d", (d) =>
        d3.line()([
          [d.source.x, d.source.y],
          [d.target.x, d.target.y],
        ])
      )
      .attr("fill", "none")
      .attr("stroke", "#aaa")
      .attr("stroke-width", 2);

    // 노드 그리기
    svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 30)
      .attr("fill", (d) => d.color || "#69b3a2")
      .attr("stroke", "#333")
      .attr("stroke-width", 1);

    // 섹션 이름 표시
    svg
      .append("g")
      .selectAll("text")
      .data(sections)
      .join("text")
      .attr("x", (d) => d.x)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .text((d) => d.name)
      .style("font-size", "16px")
      .style("font-weight", "bold");
  }, [data]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default VisualGraph;
