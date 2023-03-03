<script setup lang="ts">
import { heroes } from '@/assets/data/heroes.js'
import { onMounted } from 'vue'

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
              <img :src="hero.img" :alt="hero.name + '-headshot'" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hero in heroes" :key="hero.name + '-row'">
            <th :style="{ 'background-color': hero.color }">{{ hero.name }}</th>
            <td v-for="enemy in hero.matchup" :key="hero + '-' + enemy">{{ enemy.strength }}</td>
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
  .column-headers {
    max-width: 50px;
    white-space: nowrap;
    overflow: hidden;
    // text-overflow: ellipsis;
  }
}
</style>
