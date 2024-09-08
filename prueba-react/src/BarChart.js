// BarChart.js
import React, { useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  useEffect(() => {
    if (!data) return;

    

    d3.select('#chart-container').html('');

    // Tamaño del gráfico
    const width = 500;
    const height = 300;

    // Margenes
    const margin = { top: 50, right: 20, bottom: 175, left: 50 };

  


    
    // Crear el lienzo SVG
    const svg = d3.select('#chart-container')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Escalas
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.centro))
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.suma)])
      .range([height, 0]);

    // Barras
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.centro))
      .attr('y', d => yScale(d.suma))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d.suma))
      .attr('fill', '#fcb42d');


      svg.selectAll("text")
  .data(data)
  .enter().append("text")
  .text(function (d) { return d.suma; }) // Valor de la cantidad
  .attr("x", function (d, i) { return i * (width / data.length) + (width / data.length - 2) / 2; }) // Posición x centrada en la barra
  .attr("y", function (d) { return yScale(d.suma) - 5; }) // Posición y encima de la barra
  .attr("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("fill", "black");





    // Ejes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(d3.axisBottom(xScale))
  .selectAll('text')
  .attr('transform', 'rotate(-45)') 
  .style('text-anchor', 'end');

    svg.append('g')
      .call(yAxis);

    // Títulos


    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left -5)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Cantidad reclamaciones');



  }, [data]);

  return <div id="chart-container" />;
};

export default BarChart;
