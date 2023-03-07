<script setup lang="ts">
import { heroes } from '@/assets/data/heroes.js'
import { heroesInfo } from '@/assets/data/heroesInfo.js'
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
    width = 1200 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom

  // append the svg object to the body of the page
  const svg = d3
    .select('#matrix')
    .append('svg')
    // .attr('viewBox', `0 0 1250 1250`)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  //   d3.csv('/src/assets/data/heroesCSV.csv', function (data) {
  //     console.log(data.length)

  //     for (var i = 0; i < data.length; i++) {
  //       console.log(data[i].name)
  //       // console.log(data[i].Age);
  //     }
  //   })

  d3.csv('/src/assets/data/OverwatchMatchups.csv').then(function (data) {
    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    const myGroups = Array.from(new Set(data.map((d) => d.attacker)))
    const myVars = Array.from(new Set(data.map((d) => d.defender)))

    // Build Y scales and axis:
    const y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.05)
    svg
      .append('g')
      .style('font-size', 15)
      .call(d3.axisLeft(y).tickSize(0))
      .select('.domain')
      .remove()
    // Build X scales and axis:
    const x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.05)
    svg
      .append('g')
      .style('font-size', 15)
      .attr('transform', `translate(${-x.bandwidth() / 2}, ${-y.bandwidth()})`)
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
        console.log(heroesInfo.find((hero) => hero.name === d).img)

        return getImgSrc(heroesInfo.find((hero) => hero.name === d).img)
      })
      .attr('class', 'x-imgs')
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())

    // Build color scale
    const myColor = d3.scaleSequential().interpolator(d3.interpolateRdYlGn).domain([-2, 2])

    // create a tooltip
    const tooltip = d3
      .select('#matrix')
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
      //   console.log(event)

      tooltip
        .html(
          'The exact value of<br>this cell is: ' +
            d.attacker +
            '<br>Defender: ' +
            d.defender +
            '<br>Strength: ' +
            d.strength
        )
        .style('left', 2 + 'px')
        .style('top', 3 + 'px')
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
      .attr('x', function (d) {
        return x(d.defender)
      })
      .attr('y', function (d) {
        return y(d.attacker)
      })
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .style('fill', function (d) {
        return myColor(d.strength)
      })
      .style('stroke-width', 4)
      .style('stroke', 'none')
      .style('opacity', 0.8)
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave)
  })

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

  //   window.onscroll = function () {
  //     myFunction()
  //   }

  //   function myFunction() {
  //     if (window.pageYOffset <= 10) {
  //       d3.select('.xAxis')
  //         .nodes()[0]
  //         .setAttribute('transform', 'translate(0, ' + 0 + ')')
  //     }
  //     if (window.pageYOffset > 10) {
  //       console.log(window.pageYOffset)

  //       d3.select('.xAxis')
  //         .nodes()[0]
  //         .setAttribute('transform', 'translate(0, ' + window.pageYOffset + ')')
  //     }
  //   }
}
onMounted(() => {
  drawChart()
})
</script>

<template>
  <main>
    <div id="table-cnt">
      <div id="matrix"></div>
      <div id="y-axis"></div>
    </div>
  </main>
</template>

<style lang="scss">
// .xAxis {
//   .tick {
//     position: sticky;
//     top: 20px;
//     .x-imgs {
//       position: sticky;
//       top: 20px;
//     }
//   }
//   position: sticky;
//   top: 20px;
// }
</style>
