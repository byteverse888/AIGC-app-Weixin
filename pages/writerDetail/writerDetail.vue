<template>
  <view class="writer-detail-container">
    <view class="writer-detail-content">
      <view class="writer-info-container">
        <view class="writer-detail-title">作者主页</view>
        <view class="writer-detail-name">{{ writerInfo.nickname }}</view>
        <view class="writer-detail-avater">
          <image src="/static/images/avater.png" />
        </view>
        <view class="writer-attention-btn">
          <button @click="handleAttention">关注</button>
        </view>
        <view class="writer-info">
          <view class="writer-article">
            <view class="writer-article-num">{{ artNum }}</view>
            <view class="writer-article-word">文章</view>
          </view>
          <view class="writer-article">
            <view class="writer-article-num">{{ attentionNum }}</view>
            <view class="writer-article-word">关注</view>
          </view>
          <view class="writer-article">
            <view class="writer-article-num">73</view>
            <view class="writer-article-word">评论</view>
          </view>
        </view>
      </view>
      <view class="recent-articles-container">
        <view class="recent-articles-title">最近文章</view>
        <view class="recent-articles-content">
          <view
            class="recent-article-item"
            v-for="(artItem, index) in artList"
            :key="index"
          >
            <view class="recent-article-info">
                <image mode="heightFix" :src="artItem.imagesUrl[0]" />
            </view>
            <view class="recent-article-content">
              {{ artItem.caption }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      writerInfo: {},
      attentionList: [],
      attentionNum: 0,
      artList: [],
      artNum: 0,
    };
  },
  mounted() {
    this.getWriterInfo();
    this.getAttentionList();
    this.getArtList();
  },
  methods: {
    getWriterInfo() {
      const objectId = "No7jNH1wtY";
      this.request(`/users/${objectId}`, {
        method: "GET",
      }).then((res) => {
        this.writerInfo = res;
      });
    },
    getAttentionList() {
      let params = {
        where: {
          $relatedTo: {
            object: {
              __type: "Pointer",
              className: "_User",
              objectId: "No7jNH1wtY",
            },
            key: "Following",
          },
        },
        keys: "No7jNH1wtY",
      };
      this.request("/users", {
        method: "GET",
        data: params,
      }).then((res) => {
        this.attentionList = res.results;
        this.attentionNum = res.results.length;
      });
    },
    getArtList() {
      const userObjectId = uni.getStorageSync("objectId");
      this.request("/classes/AIPost", {
        method: "GET",
        data: {
          where: { designer: { $exists: true }, designer: userObjectId },
        },
      }).then((res) => {
        if (res.results.length > 0) {
          this.artList = res.results;
          this.artNum = res.results.length;
        }
      });
    },
    handleAttention() {
    },
  },
};
</script>

<style lang="scss" scoped>
.writer-detail-container {
  min-height: calc(100vh - 190px);
  background: white;
  color: rgb(20, 20, 22);
  padding: 0 15px;

  .writer-detail-content {
    display: flex;
    flex-direction: column;
    margin: 0 auto;

    .writer-info-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      .writer-detail-title {
        font-size: 18px;
        margin-top: 10px;
        margin-bottom: 20px;
      }

      .writer-detail-name {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 15px;
      }
      .writer-detail-avater {
        margin-bottom: 20px;
        image {
          width: 120px;
          height: 120px;
        }
      }

      .writer-attention-btn {
        margin-bottom: 30px;
        button {
          width: 120px;
          height: 33px;
          border: 1px solid #01b27d;
          border-radius: 10px;
          background: white;
          color: #01b27d;
          font-size: 12px;
        }
      }
      .writer-info {
        width: 50%;
        display: flex;
        justify-content: space-between;
        .writer-article {
          display: flex;
          flex-direction: column;
          align-items: center;
          .writer-article-num {
            font-size: 24px;
            font-weight: bold;
          }
          .writer-article-word {
            font-size: 16px;
          }
        }
      }
    }
    .recent-articles-container {
      .recent-articles-title {
        font-size: 16px;
        font-weight: 550;
        margin-bottom: 10px;
      }
      .recent-articles-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      .recent-article-item {
        width: 48%;
        margin-bottom: 10px;
        .recent-article-info {
            image {
              border-radius: 10px;
			  height: 165px;
            }
        }
        .recent-article-content {
          font-size: 14px;
          margin-top: 3px;
        }
      }
    }
  }
}
</style>

