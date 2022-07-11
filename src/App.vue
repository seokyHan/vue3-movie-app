<template>
  <!-- 해당 component에 slot으로 전달 
  root Element가 2개이상이면 class와 style로 상속이 안됨 -->
  <MyBtn>Banana</MyBtn>
  <MyBtn :color="color">
    Apple
  </MyBtn>
  <MyBtn
    large
    color="royalblue">
    Cherry
  </MyBtn>
  <MyBtn>strawberry</MyBtn>

  <!-- component - emit 
  내가 원하는 이름으로 설정 해도 됨-->
  <MyBtn @sseok="log">
    grapes
  </MyBtn>
</template>

<script>
import MyBtn from '~/components/MyBtn'

export default {
  components: {
    MyBtn
  },
  data() {
    return {
      color: '#000'
    }
  },
  methods:{
    log(){
      console.log('click graeps')  
    }
  }
}
</script>