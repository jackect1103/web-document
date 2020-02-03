<template>
  <div class="expressService">
    子级生命周期
  </div>
</template>

<script>
export default {
  beforeCreate() {
    const time = (new Date()).getTime()
    console.group('beforeCreate子级', time)
  },
  created() {
    const time = (new Date()).getTime()
    console.log('created子级', time)
  },
  beforeMount() {
    const time = (new Date()).getTime()
    console.group('beforeMount子级', time)
  },
  mounted() {
    const time = (new Date()).getTime()
    console.log('mounted子级', time)
  },
  beforeUpdate() {
    const time = (new Date()).getTime()
    console.group('beforeUpdate子级', time)
  },
  updated() {
    const time = (new Date()).getTime()
    console.log('updated子级', time)
  },
  beforeDestroy() {
    const time = (new Date()).getTime()
    console.group('beforeDestroy子级', time)
  },
  destroyed() {
    const time = (new Date()).getTime()
    console.log('destroyed子级', time)
  }
}
</script>