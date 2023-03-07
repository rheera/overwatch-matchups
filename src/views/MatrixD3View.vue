<script setup lang="ts">
import { heroes } from '@/assets/data/heroes.js'
import { onMounted, computed, ref } from 'vue'
import * as d3 from 'd3'

const hover = ref(true)
const hoveredSquare = ref({ attacker: -1, defender: -1 })

const imgSrc = computed((img) => new URL(`../../lib/Carousel/assets/${img}`, import.meta.url).href)

function getImgSrc(img: string) {
  return new URL(`/src/assets/${img}`, import.meta.url).href
}

function hoverSquare(attacker: number, defender: number) {
  hoveredSquare.value.attacker = attacker
  hoveredSquare.value.defender = defender
}
function drawChart() {
  // set the dimensions and margins of the graph
  const margin = { top: 80, right: 25, bottom: 30, left: 110 },
    width = 2000 - margin.left - margin.right,
    height = 900 - margin.top - margin.bottom

  // append the svg object to the body of the page
  const svg = d3
    .select('#my_dataviz')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  //Read the data
  let data = heroes
  // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  const myGroups = Array.from(new Set(data.map((d) => d.img)))
  const myVars = Array.from(new Set(data.map((d) => d.name)))

  // Build X scales and axis:
  const x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.05)
  svg
    .append('g')
    .style('font-size', 10)
    .attr('transform', `translate(0, ${-margin.top + margin.top / 2})`)
    .attr('class', 'xAxis')
    .call(d3.axisBottom(x).tickSize(0))
    .select('.domain')
    .remove()

  svg.select('.xAxis').selectAll('text').remove()

  var ticks = svg
    .select('.xAxis')
    .selectAll('.tick')
    .data(myGroups)
    .append('svg:image')
    .attr('xlink:href', function (d) {
      return getImgSrc(d)
    })
    .attr('width', 50)
    .attr('height', 50)
  // Build Y scales and axis:
  const y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.05)
  svg.append('g').style('font-size', 15).call(d3.axisLeft(y).tickSize(0)).select('.domain').remove()

  // Build color scale
  const myColor = d3.scaleSequential().interpolator(d3.interpolateInferno).domain([-2, 2])

  // create a tooltip
  const tooltip = d3
    .select('#my_dataviz')
    .append('div')
    .style('opacity', 0)
    .attr('class', 'tooltip')
    .style('background-color', 'white')
    .style('border', 'solid')
    .style('border-width', '2px')
    .style('border-radius', '5px')
    .style('padding', '5px')

  // Three function that change the tooltip when user hover / move / leave a cell
  const mouseover = function (event, d) {
    tooltip.style('opacity', 1)
    d3.select(this).style('stroke', 'black').style('opacity', 1)
  }
  const mousemove = function (event, d) {
    // console.log(d)

    tooltip
      .html('Attacker:  ' + d.name + '<br>Defender: ' + d.name)
      .style('left', 0 + 'px')
      .style('top', 0 + 'px')
  }
  const mouseleave = function (event, d) {
    tooltip.style('opacity', 0)
    d3.select(this).style('stroke', 'none').style('opacity', 0.8)
  }

  // add the squares
  svg
    .selectAll()
    .data(data, function (d) {
      return d.group + ':' + d.variable
    })
    .join('rect')
    .attr('x', function (d, index) {
      //   console.log(index)
      //   return x(d.matchup[3].name)
      //   d.matchup.map((enemy) => x(enemy.name))
    })
    .attr('y', function (d) {
      //   console.log(d.name)

      return y(d.name)
    })
    .attr('rx', 4)
    .attr('ry', 4)
    .attr('width', x.bandwidth())
    .attr('height', y.bandwidth())
    .attr('data-attacker', (d) => d.name)
    .attr('data-defender', (d, index) => d.matchup[index].enemy)
    .attr('data-strength', (d, index) => d.matchup[index].strength)
    .style('fill', function (d, index) {
      return myColor(d.matchup[index].strength)
    })
    .style('stroke-width', 4)
    .style('stroke', 'none')
    .style('opacity', 0.8)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseleave', mouseleave)

  // Add title to graph
  svg
    .append('text')
    .attr('x', 0)
    .attr('y', -50)
    .attr('text-anchor', 'left')
    .style('font-size', '22px')
    .text('A d3.js heatmap')

  // Add subtitle to graph
  svg
    .append('text')
    .attr('x', 0)
    .attr('y', -20)
    .attr('text-anchor', 'left')
    .style('font-size', '14px')
    .style('fill', 'grey')
    .style('max-width', 400)
    .text('A short description of the take-away message of this chart.')
}
onMounted(() => {
  drawChart()
})
</script>

<template>
  <main>
    <div id="my_dataviz"></div>
  </main>
</template>

<style lang="scss">
.table {
  max-height: 90vh;
  overflow-y: auto;
  display: block;
  thead {
    position: sticky;
    top: 0;
  }
  tr {
    max-height: 37px !important;
  }
  .column-headers {
    max-width: 50px;
    white-space: nowrap;
    overflow: hidden;
    // text-overflow: ellipsis;
    padding: 0;
  }
  td {
    // width: 275px;
    // height: 200px;
    // background: url(http://dummyimage.com/400x268) center no-repeat;
    transition: 0.25s;
    box-shadow: inset 0 0 0 2px;
    max-height: 37px !important;
    .info {
      opacity: 0;
      max-height: 0;
      max-width: 0;
      &-active {
        opacity: 1;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  td:hover {
    background-size: 100% 100%;
    transform: scale(2);
    transform-origin: center;
  }
}
</style>
