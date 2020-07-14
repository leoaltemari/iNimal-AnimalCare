<template>
  <h1>Search</h1>
</template>

<script>
import Bus from './bus'
export default {
  data: () => {
    return {

    };
  },
  beforeCreate() {
    Bus.$on('search', (value) => {
      console.log(value);
    });
  },
}
</script>

<style>

</style>