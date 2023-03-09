<script setup lang="ts">
import { heroes } from '@/assets/data/heroes.js'
import { onMounted, computed, ref, watch } from 'vue'
import ToolTip from '@/components/ToolTip.vue'

const defender = ref('')

const colorsArr = ['#d0587e', '#d98994', '#f1eac8', '#72aaa1', '#009392']

function getImgSrc(img: string) {
  return new URL(`/src/assets/${img}`, import.meta.url).href
}

// function setDefender(defenderName: string) {
//   defender.value = defenderName
// }
watch(defender, (defender) => {
  // const table = document.getElementById('main-table')
  // const cells = table.getElementsByTagName('td')
  // for (const cell of cells) {
  //   const status = cell.getAttribute('data-defender')
  //   if (status === defender) {
  //     cell.className = 'highlighted-col'
  //   }
  // }
})

onMounted(() => {})
</script>

<template>
  <main>
    <div>
      <table class="table table-fixed table-compact w-full lg:table-auto" id="main-table">
        <thead>
          <tr>
            <th></th>
            <th
              v-for="hero in heroes"
              :key="hero.name + '-column'"
              :style="{ 'background-color': hero.color }"
              class="column-headers"
              :class="{ 'highlighted-col': defender == hero.name }"
            >
              <img :src="getImgSrc(hero.img)" :alt="hero.name + '-headshot'" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hero in heroes" :key="hero.name + '-row'">
            <th :style="{ 'background-color': hero.color }">{{ hero.name }}</th>
            <td
              v-for="(enemy, enemyIndex) in hero.matchup"
              :key="hero + '-' + enemy"
              class="text-center str-tile"
              :class="{ 'highlighted-col': defender == enemy.enemy }"
              :style="{ 'background-color': colorsArr[enemy.strength + 2] }"
              :data-attacker="hero.name"
              :data-defender="enemy.enemy"
              @mouseover="defender = enemy.enemy"
              @mouseleave="defender = ''"
            >
              {{ enemy.strength }}
              <div class="tooltip" :class="enemyIndex > hero.matchup.length / 2 ? 'left' : 'right'">
                <div class="text-content">
                  <p>{{ hero.name }} attacks {{ enemy.enemy }}</p>
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
  min-width: 1000px !important;
  // overflow-y: auto;
  display: block;
  margin: 0 auto;
  thead {
    position: sticky;
    top: 0;
    z-index: 2;
    tr:hover {
      -webkit-filter: brightness(100%);
    }
  }
  tr {
    max-height: 37px !important;
    &:hover {
      -webkit-filter: brightness(125%);
    }
  }

  .column-headers {
    max-width: 50px;
    max-height: 50px;
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
    // box-shadow: inset 0 0 0 2px;
    max-height: 37px !important;
    max-width: 37px !important;
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
  .highlighted-col {
    -webkit-filter: brightness(125%);
    filter: brightness(125%);
    z-index: 1;
  }
  .str-tile {
    // display: inline-block;
    position: relative;
    border-radius: 2px;
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
      z-index: 12;
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
