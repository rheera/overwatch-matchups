<script setup lang="ts">
import { heroes } from '@/assets/data/heroes.js'
import { onMounted, computed, ref } from 'vue'
import ToolTip from '@/components/ToolTip.vue'

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

onMounted(() => {})
</script>

<template>
  <main>
    <div>
      <table class="table table-fixed table-compact w-full">
        <thead>
          <tr>
            <th></th>
            <th
              v-for="hero in heroes"
              :key="hero.name + '-column'"
              :style="{ 'background-color': hero.color }"
              class="column-headers"
            >
              <img :src="getImgSrc(hero.img)" :alt="hero.name + '-headshot'" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(hero, heroIndex) in heroes" :key="hero.name + '-row'">
            <th :style="{ 'background-color': hero.color }">{{ hero.name }}</th>
            <td
              v-for="(enemy, enemyIndex) in hero.matchup"
              :key="hero + '-' + enemy"
              class="text-center str-tile"
              @mouseover="hoverSquare(heroIndex, enemyIndex)"
              @mouseleave="hoverSquare(-1, -1)"
              :data-value="{ attacker: hero.name, defender: enemy.enemy }"
            >
              {{ enemy.strength }}
              <div class="tooltip" :class="enemyIndex > hero.matchup.length / 2 ? 'left' : 'right'">
                <div class="text-content">
                  <h3>Fade in Effect</h3>
                  <ul>
                    <li>This demo has fade in/out effect.</li>
                    <li>
                      It is using CSS opacity, visibility, and transition property to toggle the
                      tooltip.
                    </li>
                    <li>
                      Other demos are using display property<em>(none or block)</em> for the toggle.
                    </li>
                  </ul>
                </div>
                <i></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<style lang="scss">
.table {
  max-height: 90vh;
  max-width: 90vw;
  min-width: 800px;
  // overflow-y: auto;
  display: block;
  margin: 0 auto;
  thead {
    position: sticky;
    top: 0;
    z-index: 2;
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
        // opacity: 1;
        // max-width: 100%;
        // max-height: 100%;
      }
    }
  }
  .str-tile {
    // display: inline-block;
    position: relative;
    // border-bottom: 1px dotted #666;
    // text-align: left;
    .tooltip {
      min-width: 200px;
      max-width: 400px;
      top: 50%;
      transform: translate(0, -50%);
      padding: 0;
      color: #eeeeee;
      background-color: #444444;
      font-weight: normal;
      font-size: 13px;
      border-radius: 8px;
      position: absolute;
      z-index: 3;
      box-sizing: border-box;
      box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.8s;
    }
    .right {
      left: 100%;
      margin-left: 20px;
    }
    .left {
      right: 100%;
      margin-right: 20px;
    }

    &:hover .tooltip {
      visibility: visible;
      opacity: 1;
    }

    .tooltip img {
      width: 400px;
      border-radius: 8px 8px 0 0;
    }
    .text-content {
      padding: 10px 20px;
    }

    .tooltip i {
      position: absolute;
      top: 50%;
      margin-top: -12px;
      width: 12px;
      height: 24px;
      overflow: hidden;
    }
    .right i {
      right: 100%;
      &::after {
        transform: translate(50%, -50%) rotate(-45deg);
      }
    }
    .left i {
      left: 100%;
      &::after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }
    .tooltip i::after {
      content: '';
      position: absolute;
      width: 12px;
      height: 12px;
      left: 0;
      top: 50%;
      background-color: #444444;
      box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
