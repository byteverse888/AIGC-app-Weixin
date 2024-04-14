<template>
  <view class="planet-container">
    <scroll-view @scrolltolower="handleToLower" scroll-y class="home_tab">
      <view class="search-container">
        <view class="home-icon-show">
          <image mode="widthFix" src="../../static/icon/home_icon.png"></image>
        </view>
        <view class="home-search">
          
          <uni-search-bar
            class="search-bar"
            @confirm="search"
            radius="100"
            :focus="true"
            cancelButton="none"
            bgColor="#F2F5FA"
          >
            <uni-icons
              slot="searchIcon"
              color="#999999"
              size="18"
              type="search"
            />
          </uni-search-bar>
        </view>
      </view>
      <view class="carsousel-container">
        <swiper
          class="swiper"
          circular
          :indicator-dots="indicatorDots"
          indicator-active-color="#01B27D"
          indicator-color="#ECECEC"
          :autoplay="autoplay"
          :interval="interval"
          :duration="duration"
        >
          <swiper-item v-for="(advertItem, index) in adverts" :key="index">
            <image :src="advertItem.picUrl" mode="aspectFill"></image>
          </swiper-item>
        </swiper>
      </view>
      <view class="naivgation-list">
        <view class="navigation-item">
          <view>
            <image src="/static/icon/invite_friend.png" />
          </view>
          <view>
            <text>邀请好友</text>
          </view>
        </view>
        <view class="navigation-item">
          <view>
            <image src="/static/icon/ranking.png" />
          </view>
          <view>
            <text>排行榜</text>
          </view>
        </view>
        <view class="navigation-item">
          <view>
            <image src="/static/icon/ai_info.png" />
          </view>
          <view>
            <text>AI资讯</text>
          </view>
        </view>
        <view class="navigation-item">
          <view>
            <image src="/static/icon/selected_collection.png" />
          </view>
          <view>
            <text>精选合集</text>
          </view>
        </view>
        <view class="navigation-item">
          <view>
            <image src="/static/icon/point_mall.png" />
          </view>
          <view>
            <text>积分商城</text>
          </view>
        </view>
        <view class="navigation-item">
          <view>
            <image src="/static/icon/ai_competition.png" />
          </view>
          <view>
            <text>AI大赛</text>
          </view>
        </view>
        <view class="navigation-item">
          <view>
            <image src="/static/icon/ai_scholl.png" />
          </view>
          <view>
            <text>AI学院</text>
          </view>
        </view>
        <view class="navigation-item">
          <view>
            <image src="/static/icon/invite.png" />
          </view>
          <view>
            <text>邀请好友</text>
          </view>
        </view>
      </view>
      <view class="works-container">
        <view class="works-title">
          <text class="recommend-work-title">推荐作品</text>
          <text class="show-more" @click="handleProductTypeClick('all')"
            >查看全部</text
          >
        </view>
		
        <view class="works-list">
          <view class="images-sort-title">
            <view
              class="images_sort_title_item"
              @click="handleProductTypeClick('all')"
            >
              <text>全部</text>
            </view>
			<view
			  class="images_sort_title_item"
			  v-for="(topicItem, index) in topicList"
			  :key="index"
			  @click="handleProductTypeClick(topicItem)"
			>
			  <text>{{ topicItem }}</text>
			</view>
          </view>
          <view class="recommend_list">
            <view vlass="no_item" v-if="worksList.length === 0">没有作品</view>
            <view
              class="recommend_item"
              v-for="(workItem, index) in worksList"
              :key="index"
            >
              <image
                :src="workItem.imagesUrl ? workItem.imagesUrl[0] : undefined"
                mode="heightFix"
                alt="img"
                @click="handleRedirectToDetail(workItem)"
              />
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { uniBadge, uniIcons } from "@dcloudio/uni-ui";
import { uniSearchBar } from "@dcloudio/uni-ui";
import { mapState } from "vuex";
export default {
  data() {
    return {
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 500,
      worksList: [],
      topic: "all",
      params: {
        limit: 10,
        skip: 0,
      },
      hasMore: true,
    };
  },
  components: {
    uniBadge,
    uniSearchBar,
    uniIcons,
  },
  computed: {
    ...mapState({
      adverts: (state) => {
        return state.aiCreate.systemConfigData.adverts;
      },
    }),
	...mapState({
	  topicList: (state) => {
	    return state.aiCreate.systemConfigData.topic;
	  },
	}),
  },
  methods: {
    searchBoxHandler() {
      this.$emit("click");
    },
    handleProductTypeClick(topic) {
      if (!uni.getStorageSync("objectId")) {
        uni.navigateTo({
          url: "/pages/login/login?from=planet",
        });
      } else {
        this.topic = topic;
        this.hasMore = true;
        this.params.skip = 0;
        this.worksList = [];
        this.selectProduct(topic);
      }
    },
    handleToLower() {
      if (this.hasMore) {
        this.params.skip += this.params.limit;
        this.selectProduct(this.topic);
      } else {
        uni.showToast({
          title: "没有数据了",
          icon: "none",
        });
      }
    },
    selectProduct(topic) {
      let param = {
        ...this.params,
      };
      if (topic != "all") {
        param = {
          ...this.params,
          where: { shopping: { $exists: true }, topic: topic },
        };
      }

      this.request("/classes/AIPost", {
        method: "GET",
        data: param,
      }).then((res) => {
        if (res && res.results && res.results.length === 0) {
          this.hasMore = false;
          return;
        }
        this.worksList = [
          ...this.worksList,
          ...res.results.filter((item) => item.imagesUrl),
        ];
      });
    },
    getBannerList() {
      this.request("/users", {}).then((result) => {
        this.bannerList = result.data;
      });
    },
    handleRedirectToDetail(workItem) {
      uni.navigateTo({
        url: `/pages/artDetail/index?objectId=${workItem.objectId}&&from=planet`,
      });
    },
  },
  mounted() {
    this.request("/users", {
      method: "get",
      header: {
        "X-Parse-Application-Id": "BTGAPPId",
        "X-Parse-REST-API-Key": "BTGAPIKEY",
        "content-type": "application/json",
      },
      success: (res) => {
        console.log("res:", res);
      },
      fail: (res) => {
        console.log("请求数据失败");
      },
      complete: (res) => {
        console.log("已经发送网络数据请求!");
      },
    });

    this.$store.dispatch("getSystemConfig");
    this.handleProductTypeClick("all");
  },
};
</script>

<style lang="scss" scoped>
.planet-container {
	padding: 0 15px;
	display: flex;
}
.home_tab {
  height: 100vh;
  .search-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;

    .home-icon-show {
      width: 10%;
      margin: 0 auto;
	  
	  image {
		  width: 36px;
	  }
    }
    .home-search {
      width: 90%;
	  background: #f2f5fa;
	  height: 40px;
	  border-radius: 20px;
	  display: flex;
	  align-items: center;
	  flex: 1;
	  margin-left: 10px;
	  padding: 0 10px;
    }
  }

  .carsousel-container {
    overflow: hidden;
    swiper {
      width: 100%;
      height: 420rpx;
      border-radius: 16px;
      overflow: hidden;
      transform: translateY(0);

      image {
        width: 100%;
        height: 100%;
        border-radius: 16px;
      }
    }
  }
  .naivgation-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 20px;
    .navigation-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 25%;
      margin-bottom: 10px;
	  font-size: 14px;
      image {
        width: 30px;
        height: 30px;
        margin-bottom: 3px;
      }
    }
  }

  .works-container {
    margin-top: 20px;
    .works-title {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
    }
    .recommend-work-title {
      font-size: 14px;
      font-weight: bold;
    }
    .show-more {
      font-size: 12px;
      color: white;
      background-color: #01b27d;
      border-radius: 10px;
      padding: 3px 10px;
      margin-left: 30px;
    }
    .works-list {
      .images-sort-title {
        display: flex;
        justify-content: flex-start;
		margin: 15px 0 5px 0;
		overflow-x: scroll;
		position: relative;
		width: 100%;
		white-space: nowrap;
		overflow-x: scroll;
		padding-bottom: 10px;
        .images_sort_title_item {
			font-size: 14px;
          margin-right: 15px;
		  width: 50px;
        }
		
		.images_sort_title_item:last-child {
			margin-right: 50px;
		}
		
		text {
			font-size: 14px;
			color: #949aa9;
		}
      }
	  
      .recommend_list {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        .recommend_item {
          width: 49%;
          height: 160px;
          margin-bottom: 15px;

          image {
            height: 100%;
			width: 100%;
            border-radius: 10px;
          }
        }
      }
    }
  }
}
</style>

