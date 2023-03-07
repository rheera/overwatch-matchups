<script setup lang="ts">
import { heroes } from '@/assets/data/heroes.js'
import { onMounted, computed, ref } from 'vue'

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
    <div class="overflow-x-auto">
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
              class="text-center"
              @mouseover="hoverSquare(heroIndex, enemyIndex)"
              @mouseleave="hoverSquare(-1, -1)"
              :data-value="{ attacker: hero.name, defender: enemy.enemy }"
            >
              {{ enemy.strength }}
              <p
                :class="[
                  {
                    'info-active':
                      hoveredSquare.attacker === heroIndex && hoveredSquare.defender === enemyIndex
                  },
                  'info'
                ]"
              >
                {{ hero.name }} --> {{ enemy.enemy }}
              </p>
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
