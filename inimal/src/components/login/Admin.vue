<template>
  <div>
      <h1>{{ user._id }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  props: {
    user: { type: Object }
  },
  data() {
    return {

    }
  },
  mounted() {
    // Bus.$on('logged', (value) => {
    //   console.log(value);
    // });
  },
  methods: {

  }
}
</script>

<style>

</style>