import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const BarChart = ({ data }) => {
  const svgRef = useRef();
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: "",
  });

  // Observe dark mode changes dynamically
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 500;
    const height = 300;
    const margin = { top: 40, right: 30, bottom: 50, left: 40 };

    svg.attr("width", width).attr("height", height);
    svg.selectAll("*").remove();

    // Gradient for current month
    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "currentMonthGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#FEAC5E");
    gradient.append("stop").attr("offset", "50%").attr("stop-color", "#C779D0");
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#6AC6E5");

    // Scales
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Chart title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "18px")
      .attr("font-weight", 600)
      .attr("fill", isDark ? "#ffffffff" : "#292929")
      .text("Memories per Month");

    // Draw Bars
    const now = new Date();
    const currentMonthIndex = now.getMonth();

    svg
  .append("g")
  .selectAll("rect")
  .data(data)
  .join("rect")
  .attr("x", (d) => x(d.name))
  .attr("y", (d) => y(d.value))
  .attr("height", (d) => y(0) - y(d.value))
  .attr("width", x.bandwidth())
  .attr("fill", (d, i) =>
    i === currentMonthIndex ? "url(#currentMonthGradient)" : "currentColor"
  )
  .attr("class", (d, i) =>
    i === currentMonthIndex ? "" : "text-gray-200 dark:text-[#292929]"
  )
  .style("rx", 6)
  .style("ry", 6)
  .on("mousemove", (event, d, i) => {
    // Show tooltip
    setTooltip({
      visible: true,
      x: event.clientX + 10,
      y: event.clientY + 10,
      content: `${d.name}: ${d.value}`,
    });

    // Change color on hover if inactive
const index = data.indexOf(d);
if (index !== currentMonthIndex) {
  const hoverColor = isDark ? "#444444ff" : "#d3d8dbff"; // dark mode vs light mode
  d3.select(event.currentTarget).attr("fill", hoverColor);
}
  })
  .on("mouseleave", (event, d) => {
    setTooltip((prev) => ({ ...prev, visible: false }));

    // Reset fill when mouse leaves
    const index = data.indexOf(d);
    if (index !== currentMonthIndex) {
      d3.select(event.currentTarget).attr(
        "fill",
        "currentColor" // restores Tailwind-based color
      );
    }
  });

    // X Axis
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("class", "text-xs text-gray-600 dark:text-white fill-current");

    // Y Axis
    svg
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5))
      .selectAll("text")
      .attr("class", "text-xs text-gray-600 dark:text-white fill-current");

    // Axis lines and ticks dark/light mode
    svg.selectAll(".x-axis path, .x-axis line")
      .attr("class", "stroke-gray-400 dark:stroke-gray-600 stroke-current");

    svg.selectAll(".y-axis path, .y-axis line")
      .attr("class", "stroke-gray-400 dark:stroke-gray-600 stroke-current");
  }, [data, isDark]);

  return (
    <div className="relative flex justify-center items-center p-6">
      <svg ref={svgRef}></svg>

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
            whiteSpace: "nowrap",
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default BarChart;