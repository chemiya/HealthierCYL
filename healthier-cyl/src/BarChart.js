// BarChart.js
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    // Limpiar el gráfico existente
    d3.select(chartRef.current).selectAll('*').remove();

    // Configurar dimensiones del gráfico
    const width = 400;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 20, left: 40 };

    // Crear escala para los ejes
    const xScale = d3
      .scaleBand()
      .domain(data.map((d, i) => i))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d)])
      .range([height - margin.bottom, margin.top]);

    // Crear contenedor del gráfico
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Agregar barras al gráfico
    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => xScale(i))
      .attr('y', d => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - margin.bottom - yScale(d))
      .attr('fill', 'steelblue');
  }, [data]);

  return <div ref={chartRef}></div>;
};

export default BarChart;
