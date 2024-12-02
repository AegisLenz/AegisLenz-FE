import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const VisualGraph = ({ data }) => {
  const svgRef = useRef();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
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
      top: height * 0.2,
      right: width * 0.08,
      bottom: height * 0.2,
      left: width * 0.08,
    };

    svg
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // 데이터 처리: 노드 및 링크
    const nodes = data.flatMap((section) => section.nodes);
    const links = data.flatMap((section) => section.links);

    // 섹션별 위치 계산
    const sections = data.map((section, index) => ({
      name: section.section,
      nodes: section.nodes,
      x: (index / (data.length - 1)) * innerWidth + margin.left,
    }));

    sections.forEach((section) => {
      const yScale = d3
        .scalePoint()
        .domain(section.nodes.map((node) => node.id))
        .range([margin.top, innerHeight]);

      section.nodes.forEach((node) => {
        node.x = section.x;
        node.y = yScale(node.id);
        node.r = 0.03 * width; // 노드 반지름 설정
      });
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
