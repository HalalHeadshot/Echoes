import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

export default function PackedBubble({ data, width = 800, height = 600 }) {
  const svgRef = useRef(null);

  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: "",
  });

  const topPadding = 30; // space for title

  // Observe dark mode changes dynamically
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // clear previous draws

    // ===== ADD TITLE WITH DARK MODE =====
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .attr("font-size", "20px")
      .attr("font-weight", 600)
      .attr("fill", isDark ? "#cecece" : "#0f172a") // light/dark color
      .text("Memory Distribution");
    // ===================

    // Build hierarchy and pack
    const root = d3
      .hierarchy({ children: data })
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value);

    const pack = d3.pack().size([width, height - topPadding]).padding(6); // subtract topPadding
    pack(root);

    const nodes = root.descendants().filter((d) => d.depth === 1);

    const color = d3.scaleOrdinal([
      '#FEAC5E', '#C779D0', '#6ac6e5ff', '#9e90e9', '#e985ffff', '#ffe482ff', '#ff8585', '#f7994dff', '#64a0faff'
    ]);

    // defs for subtle radial gradient
    const defs = svg.append("defs");
    const gradient = defs
      .append("radialGradient")
      .attr("id", "bubbleGlow")
      .attr("cx", "30%")
      .attr("cy", "30%");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "rgba(255,255,255,0.35)");
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "rgba(255,255,255,0)");

    // group for nodes, shifted down by topPadding
    const nodeG = svg.append("g").attr("transform", `translate(0, ${topPadding})`);

    const node = nodeG
      .selectAll("g.node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    // main circle
    node
      .append("circle")
      .attr("r", (d) => d.r)
      .attr("fill", (d, i) => color(i))
      .attr("fill-opacity", 0.95)
      .attr("stroke", "rgba(255,255,255,0.35)")
      .attr("stroke-width", 1)
      .style(
  "filter",
  isDark
    ? "drop-shadow(0 2px 12px rgba(45, 45, 45, 1))" // subtle light shadow for dark mode
    : "drop-shadow(0 2px 12px rgba(168, 168, 168, 1))"      // default for light mode
)
      .on("mousemove", (event, d) => {
        setTooltip({
          visible: true,
          x: event.clientX + 10,
          y: event.clientY + 10,
          content: `${d.data.name}: ${d.data.value}`,
        });
      })
      .on("mouseleave", () => {
        setTooltip((t) => ({ ...t, visible: false }));
      });

    // optional subtle highlight circle using gradient
    node
      .append("circle")
      .attr("r", (d) => d.r * 0.9)
      .attr("fill", "url(#bubbleGlow)")
      .attr("fill-opacity", 0.12)
      .lower();

    // label text
    node
      .append("text")
      .text((d) => d.data.name)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("pointer-events", "none")
      .style("font-size", function (d) {
        const size = Math.max(10, Math.min(18, d.r / 3.5));
        return `${size}px`;
      })
      .style("fill", "#0f172a")
      .each(function (d) {
        const el = d3.select(this);
        const text = d.data.name;
        const radius = d.r;
        const maxChars = Math.floor(radius / 6);
        if (text.length > maxChars) {
          el.text(text.slice(0, Math.max(0, maxChars - 1)) + "…");
        }
      });

  }, [data, width, height, isDark]);

  return (
    <div style={{ position: "relative", width, maxWidth: "100%" }}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block", margin: "0 auto" }}
      />
      {tooltip.visible && (
        <div
          style={{
            position: "fixed",
            left: tooltip.x,
            top: tooltip.y,
            pointerEvents: "none",
            background: "rgba(0,0,0,0.75)",
            color: "#fff",
            padding: "6px 8px",
            borderRadius: 6,
            fontSize: 12,
            zIndex: 9999,
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
}
