<template>
  <div 
    :class="{large}"
    :style="{backgroundColor: color}"
    class="btn">
    <slot></slot>
  </div>

  <!-- emit, 상위요소가 2개 이상이면 evnet가 어디 걸릴지 모르니까
  emit 속성을 통해 부모에서 정의해둔 event 걸어줌 -->
  <h1 @click="$emit('sseok')">
    ABC
  </h1>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'gray'
    },
    large: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'sseok'
  ]
  
}
</script>

<style scoped lang="scss">
.btn{
    display: inline-block;
    margin: 4px;
    padding: 6px 12px;
    border-radius: 4px;
    background-color: gray;
    color: white;
    cursor: pointer;
    &.large{
    font-size: 20px;
    padding: 10px 20px;
}
}
</style>