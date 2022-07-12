<template>
  <MainHeader />
  <RouterView />
</template>

<script>
import MainHeader from '~/components/MainHeader'

export default {
  components: {
    MainHeader
  }
}
</script>

<style lang="scss">
@import "~/scss/main";
</style>