<template>
  <div class="main">
    <h3>Main</h3>
    <h4>{{ counterStore.counter }} --- {{ counterStore.doubleCounter }}</h4>
    <button @click="changeCounter">改变counter</button>
  </div>
</template>

<script setup lang="ts">
import useCounterStore from '@/store/counter'

const counterStore = useCounterStore()

function changeCounter() {
  counterStore.changeCounter(999)
}
</script>

<style scoped lang="less">
.main {
}
</style>
