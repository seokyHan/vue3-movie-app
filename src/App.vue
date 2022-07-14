<template>
  <MainHeader />
  <RouterView />
  <MainFooter />
</template>

<script>
import MainHeader from '~/components/Header'
import MainFooter from '~/components/Footer'

export default {
  components: {
    MainHeader,
    MainFooter
  }
}
</script>
