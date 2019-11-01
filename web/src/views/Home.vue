<template>
  <div class="page">
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/slide1.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/slide2.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/slide3.jpeg" />
      </swiper-slide>
      <div class="swiper-pagination pagination_home text-right px-3 pd-2" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav_icons bg-white mt-3 pt-3 text-dark-1 text-center">
      <div class="d-flex flex-wrap">
        <div class="nav_item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite_news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite_arrow mr-1"></i> 收起
      </div>
    </div>
    <!-- end of nav icons -->

    <m-list-card icon="menu" title="新闻资讯" :categories="newsCats">
      <!-- vue 2.6 新增 具名插槽传值 父级获取子集 -->
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          class="py-2 fs-lg d-flex"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-grey-1">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.createdAt | data}}</span>
          <!-- dayjs处理时间格式 -->
        </router-link>
      </template>
    </m-list-card>

    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
          <router-link
            tag="div"
            :to="`/heroes/${hero._id}`"
            class="p-2 text-center"
            style="width: 20%"
            v-for="(hero, i) in category.heroList"
            :key="i"
          >
            <img :src="hero.avatar" alt class="w-100" />
            <div>{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
  </div>
</template>

<script type="text/ecmascript-6">
import dayjs from "dayjs";
export default {
  name: "Home",
  data() {
    return {
      // newsCats: [
      //   {
      //     name: "热门",
      //     // newsList: [
      //     //   {
      //     //     categoryName: '公告',
      //     //     title: '9月14日体验服停机更新公告',
      //     //     data: '06/02'
      //     //   },
      //     //   {
      //     //     categoryName: '公告',
      //     //     title: '9月14日体验服停机更新公告',
      //     //     data: '06/02'
      //     //   },
      //     //   {
      //     //     categoryName: '公告',
      //     //     title: '9月14日体验服停机更新公告',
      //     //     data: '06/02'
      //     //   },
      //     //   {
      //     //     categoryName: '公告',
      //     //     title: '9月14日体验服停机更新公告',
      //     //     data: '06/02'
      //     //   },
      //     //   {
      //     //     categoryName: '公告',
      //     //     title: '9月14日体验服停机更新公告',
      //     //     data: '06/02'
      //     //   }
      //     // ]
      //     // 简写
      //     newsList: new Array(5).fill(true).map(v => ({
      //       categoryName: '公告',
      //       title: '9月14日体验服停机更新公告',
      //       data: '06/02'
      //     }))
      //   },
      //   {
      //     name: '新闻',
      //     newsList: new Array(5).fill(true).map(v => ({
      //       categoryName: '新闻',
      //       title: '9月14日体验服停机更新公告',
      //       data: '06/02'
      //     }))
      //   },
      //   {
      //     name: '新闻',
      //     newsList: new Array(5).fill(true).map(v => ({
      //       categoryName: '新闻',
      //       title: '9月14日体验服停机更新公告',
      //       data: '06/02'
      //     }))
      //   },
      //   {
      //     name: '新闻',
      //     newsList: new Array(5).fill(true).map(v => ({
      //       categoryName: '新闻',
      //       title: '9月14日体验服停机更新公告',
      //       data: '06/02'
      //     }))
      //   }
      // ],
      newsCats: [],
      heroCats: [],
      swiperOption: {
        notNextTick: true,
        loop: true,
        //设定初始化时slide的索引
        initialSlide: 0,
        //自动播放
        autoplay: {
          delay: 1500,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        //滑动速度
        speed: 800,
        //滑动方向
        direction: "horizontal",
        //小手掌抓取滑动
        grabCursor: true,
        pagination: {
          el: ".pagination_home",
          clickable: true,
          type: "bullets"
        }
      }
    };
  },
  filters: {
    data(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    async fetchHeroCats() {
      const res = await this.$http.get("heroes/list");
      this.heroCats = res.data;
    }
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";
.pagination_home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background-color: map-get($map: $colors, $key: "white");
    &.swiper-pagination-bullet-active {
      background-color: map-get($map: $colors, $key: "info");
    }
  }
}

.nav_icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav_item {
    width: 25%;
    border-left: 1px solid $border-color;
    &:nth-of-type(4n + 1) {
      // 余4 + 1
      border-left: none;
    }
  }
}
</style>
