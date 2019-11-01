<template>
  <div class="page_hero" v-if="model">

      <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
        <img src="../assets/images/logo.png" alt="" height="30">
        <div class="px-2 flex-1">
           <div class="text-white">王者荣耀</div>
           <div class="ml-2">攻略站</div>
        </div>
        <router-link to="/" tag="div">更多英雄 &gt;</router-link>
     </div>

      <div class="top" :style="{'background-image': `url(${model.banner})`}">
        <div class="info text-white p-3 d-flex flex-column h-100 jc-end">
          <div class="fs-sm">{{model.title}}</div>
          <h2 class="my-2">{{model.title}}</h2>
          <div class="fs-sm">{{model.categories.map(v => v.name).join("/")}}</div>
          <div class="d-flex jc-between pt-2">
            <div class="scores d-flex ai-center" v-if="model.scores">
              <span>难度</span>
              <span class="badge bg-primary">{{model.scores.difficult}}</span>
              <span>技能</span>
              <span class="badge bg-blue-1">{{model.scores.skills}}</span>
              <span>攻击</span>
              <span class="badge bg-danger">{{model.scores.attack}}</span>
              <span>生存</span>
              <span class="badge bg-dark">{{model.scores.survive}}</span>
            </div>
            <router-link tag="span" class="text-grey fx-sm" to="/">
              皮肤： 2 &gt;
            </router-link>
          </div>
        </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:"page_hero",
  data() {
    return {
        model: null
    }
  },
  props: {
      id: {
        required: true
      }
  },
  created() {
      this.fetch();
  },
  methods: {
      async fetch() {
        const res = await this.$http.get(`heroes/${this.id}`);
        this.model = res.data;
        console.log(`${res.data.banner}`)
      }
  },
  components: {

  }
}
</script>

<style lang="scss">
.page_hero {
  .top {
    // width: 100%;
    height: 50vw;
    background: no-repeat top center;
    background-size: cover;
  }
  .info {
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
      .badge {
        margin: 0 .25rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: .9rem;
        text-align: center;
        border-radius: 50%;
        font-size: .6rem;
        border: 1px solid rgba(0, 0, 0, .2);
      }
    }
  }
}
</style>
