<template>
  <view class="ai-plaza-sort">
    <view class="ai-plaza-header">
      <view
		class="ai-plaza-theme-item"
		:class="{'active-topic-style': topic == topicItem}"
        v-for="(topicItem, index) in topicList"
        :key="index"
        @click="handleClickTopic(topicItem)"
      >
        <text>{{ topicItem }}</text>
      </view>
    </view>
    <view>
		<scroll-view @scrolltolower="handleToLower" scroll-y class="ai_plaza_tab">
		  <view class="ai-plaza-content">
		    <view
		      class="ai-plaza-item"
		      v-for="(item, index) in artsList"
		      :key="index"
		    >
		      <view class="ai-plaza-picture">
		        <image
		          :src="item.imagesUrl[0]"
		          @click="handleRedirectToDetail(item)"
		        />
		      </view>
		      <view class="ai-plaza-title">
		        <text>{{ item.caption }}</text>
		      </view>
		      <view class="ai-plaza-item-detail">
		        <view class="ai-plaza-item-avater">
		          <image src="/static/images/avater.png" />
		        </view>
		        <view class="ai-plaza-item-name">{{
		          item.userpointer && item.userpointer.nickname
		        }}</view>
		        <view class="ai-plaza-item-right">
		          <view class="ai-plaza-item-heart">
		            <image
		              :src="
		                !item.is_rewarded
		                  ? '/static/images/heart.svg'
		                  : '/static/images/heart_selected.png'
		              "
		            />
		          </view>
		          <view class="ai-plaza-item-collect-num">{{
		            item.commentnum
		          }}</view>
		        </view>
		      </view>
		      <view class="ai-plaza-time">{{ item.updatedTime }}</view>
		    </view>
		  </view>
		</scroll-view>
	</view>
  </view>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      artsList: [],
      topic: "科幻",
      params: {
        limit: 10,
        skip: 0,
        include: "userpointer",
      },
      hasMore: true,
    };
  },
  computed: {
    ...mapState({
      topicList: (state) => {
        return state.aiCreate.systemConfigData.topic;
      },
    }),
  },
  mounted() {
    this.selectArt(this.topic);
  },
  methods: {
    handleClickTopic(topicItem) {
      this.artsList = [];
      this.selectArt(topicItem);
    },
    selectArt(topicItem) {
      this.topic = topicItem;
      let param = {
        ...this.params,
        where: { topic: topicItem },
      };

      this.request("/classes/AIPost", {
        method: "GET",
        data: param,
      }).then((res) => {
        if (res && res.results && res.results.length === 0) {
          this.hasMore = false;
          return;
        }
        this.artsList = [...this.artsList, ...res.results];
        this.artsList.map((item) => {
          item.updatedTime = this.$moment(
            item.updatedAt,
            "YYYY-MM-DD"
          ).fromNow();
          return item;
        });
      });
    },
    handleToLower() {
      if (this.hasMore) {
        this.params.skip += this.params.limit;
        this.selectArt(this.topic);
      } else {
        uni.showToast({
          title: "没有数据了",
          icon: "none",
        });
      }
    },
    handleRedirectToDetail(item) {
      uni.navigateTo({
        url: `/pages/artDetail/index?objectId=${item.objectId}&&from=aiPlaza`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.ai-plaza-sort {
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  overflow-x: hidden;
  .ai-plaza-header {
    display: flex;
    justify-content: flex-start;
    margin: 5px 0;
	padding-bottom: 10px;
    overflow-x: scroll;
    position: relative;
    width: 100%;
    white-space: nowrap;
    overflow-x: scroll;

    .ai-plaza-theme-item {
      width: 50px;
      margin-right: 15px;
    }
	
	.active-topic-style {
		background: #e5dcfe;
		padding: 0px 10px;
		border-radius: 10px;
	}
    .ai-plaza-theme-item:last-child {
      margin-right: 50px;
    }

    text {
      font-size: 14px;
      color: #949aa9;
    }
  }
  .ai_plaza_tab {
    height: calc(100vh - 96px);
  }
  .ai-plaza-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 10px;
    .ai-plaza-sort {
      .ai-plaza-header {
        .ai-plaza-theme-item {
          width: 50px;
        }
      }
    }
    .ai-plaza-item {
      width: 48%;
      position: relative;
      margin-bottom: 20px;
      .ai-plaza-picture image {
        width: 100%;
        height: 200px;
        border-radius: 12px;
      }
      .ai-plaza-title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 5px;
        font-size: 14px;
        font-weight: 550;
        margin-top: 5px;
        height: 18px;
      }

      .ai-plaza-item-detail {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 3px;

        .ai-plaza-item-avater image {
          width: 30px;
          height: 30px;
        }
        .ai-plaza-item-right {
          display: flex;
          align-items: center;
        }

        .ai-plaza-item-name {
          font-size: 14px;
          font-weight: 600;
        }
        .ai-plaza-item-heart {
          margin-right: 5px;
          image {
            width: 15px;
            height: 12px;
          }
        }
        .ai-plaza-item-collect-num {
          font-size: 11px;
        }
      }
      .ai-plaza-time {
        display: flex;
        justify-content: flex-end;
        position: absolute;
        right: 2px;
        bottom: -6px;
        font-size: 9px;
      }
    }
  }
}
</style>

