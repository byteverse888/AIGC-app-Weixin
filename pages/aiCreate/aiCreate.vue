<template>
  <view class="ai-create-container">
    <view class="ai-create-tab">
      <view class="ai-create-left-title">
        <view class="tab_nav">
          <view class="navTitle" v-for="(item, index) in navList" :key="index">
            <view
              :class="{ active: current === index }"
              @click="checked(index)"
            >
              {{ item.title }}
            </view>
          </view>
        </view>
        <view class="nav_item" v-if="current == 0">
          <ai-text></ai-text>
        </view>
        <view class="nav_item" v-if="current == 1">
          <ai-picture></ai-picture>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import aiText from "./../aiText/aiText";
import aiPicture from "./../aiPicture/aiPicture";
import { mapState } from "vuex";
import { reqAICreate, reqGetFinishedAIPicture } from "@/api";
export default {
  components: {
    uniSegmentedControl,
    aiText,
    aiPicture,
  },
  data() {
    return {
      aiCreateDescription: "",
      aiCreateImageSize: "1:1",
      aiCreateRatio: "2048*2048",
      aiSelectedTopic: "科幻",
      aiSelectedStyle: "超高清",
      aiCreateModel: "壁纸",
      aiNegativeDescription: "",
      aiSelectedMode: "common",
      isTopicSelected: false,
      selectedTopicColor: "",
      screenList: ["1024*1024", "2048*2048", "4096*4096", "2048*2048精"],
      items: [{ title: "文生图" }, { title: "图生图" }],
      current: 0,
      navList: [
        {
          index: 0,
          title: "文生图",
        },
        {
          index: 1,
          title: "图生图",
        },
      ],
      sizeList: [
        {
          size: "1:1",
          name: "头像图",
          imgUrl: "@/assets/images/1x1.png",
        },
        {
          size: "1:2",
          name: "手机屏幕",
          imgUrl: "@/assets/images/1x2.png",
        },
        {
          size: "3:4",
          name: "社交媒体",
          imgUrl: "@/assets/images/3x4.png",
        },
        {
          size: "4:3",
          name: "文章配图",
          imgUrl: "@/assets/images/4x3.png",
        },
        {
          size: "16:9",
          name: "电脑壁纸",
          imgUrl: "@/assets/images/16x9.png",
        },
        {
          size: "9:16",
          name: "宣传海报",
          imgUrl: "@/assets/images/9x16.png",
        },
      ],
    };
  },
  mounted() {
    this.$store.dispatch("getSystemConfig");
  },
  computed: {
    ...mapState({
      modelStyleList: (state) => {
        return state.aiCreate.systemConfigData.modeltopic;
      },
    }),
    ...mapState({
      topicList: (state) => {
        return state.aiCreate.systemConfigData.topic;
      },
    }),
    ...mapState({
      styleList: (state) => {
        return state.aiCreate.systemConfigData.style;
      },
    }),
  },
  methods: {
    checked(index) {
      this.current = index;
    },
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
    handleImageSize(size) {
      this.aiCreateImageSize = size.size;
    },
    handleRatioChange(ratio) {
      this.aiCreateRatio = ratio;
    },
    handleThemeChange(themeItem) {
      this.aiSelectedTopic = themeItem;
    },
    handleStyleChange(topicItem) {
      this.aiSelectedStyle = topicItem;
    },
    handleModeChange(mode) {
      this.aiSelectedMode = mode;
    },
    handleModelChange(model) {
      this.aiCreateModel = model.title;
    },
    handleClearTextArea() {
      this.aiCreateDescription = "";
    },
    handleClearNegativeTextArea() {
      this.aiNegativeDescription = "";
    },
    handleReqAICreate(param) {
      setTimeout(() => {
        let result = reqAICreate(param);
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.ai-create-container {
  min-height: calc(100vh - 190px);
  color: white;
  background: #141415;
}

.ai-create-tab {
  .ai-create-left-title {
    font-size: 12px;
    padding: 8px;
    background-color: black;
    color: white;

    .tab_nav {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .tab_nav .navTitle {
      height: 70rpx;
      line-height: 70rpx;
      width: 25%;
      text-align: center;
      font-size: 28rpx;
      font-family: Alibaba PuHuiTi;
      color: white;
    }
    .active {
      position: relative;
      color: white;
    }

    .active::after {
      content: "";
      position: absolute;
      width: 100rpx;
      height: 4rpx;
      background-color: #7d62ca;
      left: 0px;
      right: 0px;
      bottom: 0px;
      margin: auto;
    }
  }
}

.ai-create-left {
  .ai-create-theme-container {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    font-size: 12px;
    margin-bottom: 15px;

    text {
      margin: 10px 0;
    }

    .ai-create-theme-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .ai-create-theme-item {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 26px;
      width: 30%;
      margin-bottom: 5px;
      margin-right: 5px;
      background: rgb(35, 38, 47);
      color: white;
      cursor: pointer;
      font-size: 12px;
      border-radius: 15px;
      padding: 1px 5px;
      cursor: pointer;
    }
    .active-theme-style {
      border: 1px solid white;
      background: radial-gradient(
        83.15% 83.15% at 50% 50%,
        #374176 0%,
        rgba(55, 65, 118, 0) 100%
      );
    }
  }
  .ai-create-topic-container {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    font-size: 12px;
    margin-bottom: 15px;

    text {
      margin: 10px 0;
    }

    .ai-create-topic-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .ai-create-topic-item {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 26px;
      width: 30%;
      margin-bottom: 5px;
      margin-right: 5px;
      background: rgb(35, 38, 47);
      color: white;
      cursor: pointer;
      font-size: 12px;
      border-radius: 15px;
      padding: 1px 5px;
      cursor: pointer;
    }
    .active-topic-style {
      border: 1px solid white;
      background: radial-gradient(
        83.15% 83.15% at 50% 50%,
        #374176 0%,
        rgba(55, 65, 118, 0) 100%
      );
    }
  }

  .ai-create-negative-container {
    font-size: 12px;
    position: relative;
    margin-bottom: 15px;
    .input-textarea {
      border: 1px solid #c2c7d3;
      border-radius: 10px;
      height: 90px;
    }
    .input-area-clearBtn {
      display: flex;
      position: absolute;
      right: 15px;
      bottom: 10px;
      color: #b1b5c4;
      z-index: 10;
      font-size: 12px;
      .clear-btn {
        margin-left: 10px;
        border-left: 1px solid #ddd;
        padding-left: 10px;
      }
    }
  }

  .ai-create-number-container {
    margin-bottom: 20px;
    font-size: 12px;
    color: rgb(119, 126, 144);
    .ai-create-number {
      margin-bottom: 10px;
    }
    .ai-create-mode-container {
      .ai-create-mode-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        height: 50px;
        width: 100%;
        border-radius: 15px;
        margin-bottom: 10px;
        background-color: rgb(35, 38, 47);
      }
      .active-mode-style {
        border: 1px solid white;
        background: radial-gradient(
          83.15% 83.15% at 50% 50%,
          #374176 0%,
          rgba(55, 65, 118, 0) 100%
        );
      }
    }
  }

  .input-textarea {
    margin-top: 6px;
    .input-style {
      resize: none;
      height: 120px;
      min-height: 120px;
      border-radius: 5px;
      padding: 12px;
      color: #b1b5c4;
    }
  }

  .input-area-clearBtn {
    display: flex;
    position: absolute;
    right: 15px;
    bottom: 22px;
    color: #b1b5c4;
    z-index: 10;
    font-size: 12px;
    .clear-btn {
      margin-left: 10px;
      border-left: 1px solid #ddd;
      padding-left: 10px;
    }
  }

  .ai-create-size {
    margin-top: 15px;
    color: rgb(177, 181, 196);
    font-size: 12px;

    .size-style {
      width: 100%;
      display: flex;
      justify-content: space-around;
      margin-top: 7px;
      .each-size {
        background: rgb(35, 38, 47);
        width: 16%;
        height: 95px;
        border-radius: 0.75rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 12px;

        img {
          width: 30px;
          height: 30px;
        }

        .size-font {
          margin-top: 5px;
        }

        &:target {
          border: 1px solid white;
        }
      }

      .active-size-style {
        border: 2px solid white;
        background: radial-gradient(
          83.15% 83.15% at 50% 50%,
          #374176 0%,
          rgba(55, 65, 118, 0) 100%
        );
      }
    }

    .radio-group {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .radio-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32%;
        height: 26px;
        border-radius: 1rem;
        background: rgb(35, 38, 47);
        margin-bottom: 5px;
      }

      .active-screen-style {
        border: 2px solid white;
        background: radial-gradient(
          83.15% 83.15% at 50% 50%,
          #374176 0%,
          rgba(55, 65, 118, 0) 100%
        );
      }
    }
  }

  .ai-create-subject {
    margin-top: 20px;
    font-size: 12px;
    .subject-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      margin-top: 5px;
      .subject-item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32.9%;
        height: 60px;
        margin-bottom: 15px;
        border-radius: 0.5rem;
        margin-bottom: 10pxs;
        padding: 0 5px;
        .subject-title {
          position: absolute;
        }

        image {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
      }

      .active-model-style {
        border: 2px solid white;
      }
      .common {
        background: url("/static/images/common.webp");
      }
      .food {
        background: url("/static/images/food.webp");
      }
      .car {
        background: url("/static/images/car.webp");
      }
      .wallpaper {
        background: url("/static/images/wallpaper.webp");
      }
      .product {
        background: url("/static/images/product.webp");
      }
      .indoor-design {
        background: url("/static/images/indoor-design.webp");
      }

      .chinese-clothing {
        background: url("/static/images/chinese-clothing.webp");
      }
      .vector {
        background: url("/static/images/vector.webp");
      }
      .crypto {
        background: url("/static/images/crypto.webp");
      }
      .image {
        background: url("/static/images/image.webp");
      }
    }
  }
}
.ai-create-left-bottom {
  position: sticky;
  padding-bottom: 2rem;
  bottom: 0;
  z-index: 10;
  background-color: rgb(20, 20, 22);
  opacity: 1;
  .btn-container {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-image: linear-gradient(to right, blue, purple);
    border-radius: 90px;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: white;
    height: 48px;
    border-width: 2px;
  }
}
</style>

