<template>
  <div class="card p-3 bg-white mt-3">
    <div class="card_header d-flex ai-center pb-3">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xxl flex-1 px-2">{{title}}</div>
      <i class="iconfont icon-menu1 text-grey"></i>
    </div>
    <div class="card_body pt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:"Card",
  data() {
    return {

    }
  },
  props: {
    title: {
      type: String,
      required: true // 表示必传
    },
    icon: {
      type: String,
      required: true
    }
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
.card {
  .card_header {
    border-bottom: 1px solid $border-color;
  }
  border-bottom: 1px solid $border-color;
}
</style>
