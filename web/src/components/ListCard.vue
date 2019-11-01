<template>
  <m-card :icon="icon" :title="title">
    <div class="card_body">
      <div class="nav jc-between">
        <div class="nav-item" :class="{active: active === i}" v-for="(category, i) in categories" :key="i" @touchend="$refs.list.swiper.slideTo(i)">
          <div class="nav_link">{{category.name}}</div>
        </div>
      </div>
    </div>
    <div class="pt-3">
      <!-- @slide-change 幻灯片滑动 -->
      <swiper ref="list" :options="{autoHeight: true}" @slide-change="() => active = $refs.list.swiper.realIndex">
        <swiper-slide v-for="(category, i) in categories" :key="i"> 
          <!-- vue 2.6 新增传值方法 -->
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script type="text/ecmascript-6">
export default {
  name:"ListCard",
  data() {
    return {
      active: 0
    }
  },
  props: {
    icon: {type: String, required: true},
    title: {type: String, required: true},
    categories: {type: Array, required: true}
  }
}
</script>

<style type="text/css" scoped>
</style>
