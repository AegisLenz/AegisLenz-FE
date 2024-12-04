import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const VisualGraph = ({ data }) => {
  const svgRef = useRef();
  const [dimensions, setDimensions] = useState({
    width: window.screen.width,
    height: window.screen.height,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.screen.width,
        height: window.screen.height,
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // 기존 SVG 초기화

    // 동적 크기 및 마진 설정
    const { width, height } = dimensions;
    const margin = {
      top: height * 0.1, // 여백 줄이기 위해 값을 줄임
      right: 0,
      bottom: height * 0.1,
      left: 0,
    };

    svg
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const innerWidth = width;
    const innerHeight = height - margin.top - margin.bottom;

    // 데이터 처리: 노드 및 링크
    const nodes = data.flatMap((section) => section.nodes);
    const links = data.flatMap((section) => section.links);

    // 섹션별 위치 계산 (중앙을 기준으로 벌려지는 방식)
    const centerX = innerWidth / 2 + margin.left; // 그래프의 중앙 X 좌표
    const spreadDistance = innerWidth / 2.5; // 중앙으로부터의 벌어지는 거리 설정
    const hexToRgba = (hex, opacity) => {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    const sections = data.map((section, index) => {
      const offset = (index - (data.length - 1) / 2) * spreadDistance;
      return {
        name: section.section,
        nodes: section.nodes,
        x: centerX + offset,
        color: section.nodes[0].color,
        bcolor: hexToRgba(section.nodes[0].color, 0.2), // 섹션의 색상 사용
      };
    });

    sections.forEach((section) => {
      const yScale = d3
        .scalePoint()
        .domain(section.nodes.map((node) => node.id))
        .range([margin.top + 100, innerHeight]);

      section.nodes.forEach((node) => {
        node.x = section.x;
        node.y = yScale(node.id);
        node.r = 0.03 * width; // 노드 반지름 설정
      });
    });

    // 섹션 배경 및 제목 추가
    const sectionGroup = svg
      .append("g")
      .selectAll("g")
      .data(sections)
      .join("g");

    sectionGroup.each(function (section) {
      const group = d3.select(this);

      // 배경 사각형 추가
      group
        .append("rect")
        .attr("x", section.x - spreadDistance / 2) // 배경 사각형의 x 위치
        .attr("y", margin.top - 30) // 배경 사각형의 y 위치
        .attr("width", spreadDistance) // 배경 사각형의 너비
        .attr("height", innerHeight + 60) // 배경 사각형의 높이
        .attr("fill", section.bcolor) // 섹션 색상의 밝은 버전
        .attr("stroke", section.color) // 경계 색상
        .attr("stroke-width", 2)
        .attr("rx", 20) // 모서리 둥글기 설정
        .attr("ry", 20)
        .style("opacity", 1); // 배경 투명도 설정

      // 섹션 제목 배경 (둥근 배경 추가)
      group
        .append("rect")
        .attr("x", section.x - 100) // 제목 배경의 x 위치
        .attr("y", margin.top - 90) // 제목 배경의 y 위치
        .attr("width", 200) // 제목 배경의 너비
        .attr("height", 80) // 제목 배경의 높이
        .attr("fill", section.color) // 제목 배경 색상
        .attr("rx", 20) // 모서리 둥글기 설정
        .attr("ry", 20);

      // 섹션 제목 추가
      group
        .append("text")
        .attr("x", section.x) // 제목의 x 위치, 중앙 정렬
        .attr("y", margin.top - 35) // 제목의 y 위치, 배경 사각형 위에 배치
        .attr("text-anchor", "middle")
        .attr("font-size", "3em")
        .attr("font-weight", "bold")
        .attr("fill", "white")
        .text(section.name);
    });

    // 링크 데이터 매핑
    const linkData = links
      .map((link) => {
        const sourceNode = nodes.find((node) => node.id === link.source);
        const targetNode = nodes.find((node) => node.id === link.target);
        if (!sourceNode || !targetNode) return null;

        const dx = targetNode.x - sourceNode.x;
        const dy = targetNode.y - sourceNode.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const offsetX = ((dx / distance) * sourceNode.r) / (width * 0.0007);
        const offsetY = ((dy / distance) * sourceNode.r) / (width * 0.0007);

        return {
          source: {
            x: sourceNode.x + offsetX,
            y: sourceNode.y + offsetY,
          },
          target: {
            x: targetNode.x - offsetX,
            y: targetNode.y - offsetY,
          },
          value: link.value,
        };
      })
      .filter(Boolean);

    // 화살표 마커 추가
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", 0)
      .attr("markerWidth", 7)
      .attr("markerHeight", 7)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#aaa");

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
      .attr("stroke-width", 3)
      .attr("marker-end", "url(#arrowhead)");

    // 노드 및 라벨
    const nodeGroup = svg
      .append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("transform", (d) => `translate(${d.x}, ${d.y})`);

    // 원 그리기
    nodeGroup
      .append("circle")
      .attr("r", (d) => d.r)
      .attr("fill", (d) => d.color || "#69b3a2")
      .attr("stroke", "#333")
      .attr("stroke-width", 1);

    // 노드에 배경 이미지 추가
    nodeGroup
      .append("image")
      .attr("x", (d) => -d.r * 0.7)
      .attr("y", (d) => -d.r * 0.7)
      .attr("width", (d) => d.r * 1.4)
      .attr("height", (d) => d.r * 1.4)
      .attr("href", "/icon/whiteUser.svg");

    // 노드 아래에 라벨 추가
    nodeGroup
      .append("text")
      .attr("y", (d) => d.r + 30)
      .attr("text-anchor", "middle")
      .attr("font-size", "2em")
      .attr("fill", "#000")
      .text((d) => d.label);
  }, [data, dimensions]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default VisualGraph;
