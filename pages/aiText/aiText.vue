<template>
  <view class="ai-create-content">
    <view class="ai-create-left">
      <view class="ai-create-left-body">
        <view class="ai-create-description">
          <text>* 画面描述</text>
          <view class="input-textarea">
            <textarea
              class="input-style"
              placeholder="画面描述以短句、短语为佳, 建议40个字符以上: 风格选择和高级参数对图像生成有艺术修饰作用, 支持中英文输入"
              v-model="aiCreateDescription"
              placeholder-style="color:white;fontSize:12px;"
              maxlength="1000"
            ></textarea>
          </view>
          <view class="input-area-clearBtn">
            <view class="num-count">{{ aiCreateDescription.length }}/1000</view>
            <view class="clear-btn" @click="handleClearTextArea">清空</view>
          </view>
        </view>
        <view class="ai-create-theme-container">
          <text>主题</text>
          <view class="ai-create-theme-content">
            <view
              class="ai-create-theme-item"
              v-for="(topicItem, index) in topicList"
              :key="index"
              :class="aiSelectedTopic == topicItem ? 'active-theme-style' : ''"
              @click="handleThemeChange(topicItem)"
            >
              <text>{{ topicItem }}</text>
            </view>
          </view>
        </view>
        <view class="ai-create-size">
          <text>* 画面大小</text>
          <view class="size-style">
            <view
              class="each-size"
              v-for="(size, index) in sizeList"
              :key="index"
              :class="aiCreateImageSize == size.size ? 'active-size-style' : ''"
              @click="handleImageSize(size)"
            >
              <view class="size-font">{{ size.size }}</view>
              <view class="size-font">{{ size.name }}</view>
            </view>
          </view>
          <view class="radio-group">
            <view
              class="radio-btn"
              v-for="(ratio, index) in screenList"
              :key="index"
              :class="aiCreateRatio == ratio ? 'active-screen-style' : ''"
              @click="handleRatioChange(ratio)"
            >
              <text>{{ ratio }}</text>
            </view>
          </view>
        </view>
        <view class="ai-create-subject">
          <text>* 模型主题</text>
          <view class="subject-content">
            <view
              class="subject-item"
              v-for="(modelStyleItem, index) in modelStyleList"
              :key="index"
              style="background: modelStyleItem.picUrl"
              :class="
                aiCreateModel == modelStyleItem.title
                  ? 'active-model-style'
                  : ''
              "
              @click="handleModelChange(modelStyleItem)"
            >
              <view class="subject-title">{{ modelStyleItem.title }}</view>
              <image mode="aspectFill" :src="modelStyleItem.picUrl" />
            </view>
          </view>
        </view>
        <view class="ai-create-topic-container">
          <text>* 风格选择</text>
          <view class="ai-create-topic-content">
            <view
              class="ai-create-topic-item"
              v-for="(styleItem, index) in styleList"
              :key="index"
              :class="aiSelectedStyle == styleItem ? 'active-topic-style' : ''"
              @click="handleStyleChange(styleItem)"
            >
              <text>{{ styleItem }}</text>
            </view>
          </view>
        </view>
        <view class="ai-create-negative-container">
          <text>*负面描述</text>
          <view class="input-textarea">
            <textarea
              class="input-style"
              placeholder="请输入不想出现在画面中的内容, 支持中英文"
              v-model="aiNegativeDescription"
              rows="3"
              placeholder-style="color:white;fontSize:12px;"
            ></textarea>
          </view>
          <view class="input-area-clearBtn">
            <view class="num-count"
              >{{ aiNegativeDescription.length }}/1000</view
            >
            <view class="clear-btn" @click="handleClearNegativeTextArea"
              >清空</view
            >
          </view>
        </view>

        <view class="ai-create-number-container">
          <view class="ai-create-number">
            <text>*作图数量</text>
            <view>
              <uni-number-box></uni-number-box>
            </view>
          </view>
          <view class="ai-create-mode-container">
            <view
              class="ai-create-mode-item"
              @click="handleModeChange('common')"
              :class="aiSelectedMode == 'common' ? 'active-mode-style' : ''"
            >
              <text>普通分支</text>
              <text>预计排队: 2分钟内</text>
            </view>
            <view
              class="ai-create-mode-item"
              @click="handleModeChange('tide')"
              :class="aiSelectedMode == 'tide' ? 'active-mode-style' : ''"
            >
              <text>潮汐模式</text>
              <text>优惠低至五折, 会员免费生成</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="ai-create-left-bottom">
      <view class="button-shadow"></view>
      <view class="btn-container">
        <button @click="handleAICreate">立即生成</button>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
import { reqAICreate } from "@/api";
export default {
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
      sizeList: [
        {
          size: "1:1",
          name: "头像图",
          screenList: ["2048*2048", "1536*1536"],
          imgUrl: "@/assets/images/1x1.png",
        },
        {
          size: "1:2",
          name: "手机屏幕",
          screenList: ["1440*2912", "1080*2184"],
          imgUrl: "@/assets/images/1x2.png",
        },
        {
          size: "3:4",
          name: "社交媒体",
          screenList: ["1776*2352", "1332*1764"],
          imgUrl: "@/assets/images/3x4.png",
        },
        {
          size: "4:3",
          name: "文章配图",
          screenList: ["2352*1776", "1764*1332"],
          imgUrl: "@/assets/images/4x3.png",
        },
        {
          size: "16:9",
          name: "电脑壁纸",
          screenList: ["2752*1520", "2064*1140"],
          imgUrl: "@/assets/images/16x9.png",
        },
        {
          size: "9:16",
          name: "宣传海报",
          screenList: ["1520*2752", "1140*2064"],
          imgUrl: "@/assets/images/9x16.png",
        },
      ],
      aiCreateObjectId: "",
      aiCreatedImage: "",
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
    handleAICreate() {
      const userObjectId = uni.getStorageSync("objectId");
      if (!userObjectId) {
        uni.navigateTo({
          url: "/pages/login/login?from=aiCreate",
        });
      } else {
        let param = {
          title: "",
          caption: this.aiCreateDescription,
          metadata: {
            size: this.aiCreateImageSize,
            ratio: this.aiCreateRatio,
            modeltopic: this.aiCreateModel,
            style: this.aiSelectedStyle,
          },
          userpointer: {
            __type: "Pointer",
            className: "_User",
            objectId: userObjectId,
          },
          designer: userObjectId,
          ownerUser: userObjectId,
        };
        this.request("/classes/AIPost", {
          method: "POST",
          data: param,
          pageFrom: "aiCreatePage"
        }).then((res) => {
          this.aiCreateObjectId = res.objectId;
          uni.navigateTo({
            url:
              `/pages/taskList/taskList?aiCreateObjectId=${this.aiCreateObjectId}`,
          });
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ai-create-container {
  min-height: calc(100vh - 190px);
  color: white;
}
.ai-create-content {
  margin: 0 auto;
  padding: 12px;
}

.ai-create-tab {
  .ai-create-left-title {
    font-size: 12px;
    margin: 8px;
    color: white;
  }
}
.ai-create-left {
  .ai-create-description {
    position: relative;
    padding: 0 0 10px 0;
    font-size: 12px;
    text {
      font-size: 12px;
      color: white;
    }

    .input-textarea {
      border: 2px solid #7d62ca;
      border-radius: 10px;
      textarea {
        width: 93%;
      }
    }
  }

  .ai-create-theme-container {
    display: flex;
    flex-direction: column;
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
      width: 29%;
      margin-bottom: 5px;
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
      color: white;
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
      width: 28%;
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
      color: white;
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
      color: white;
      z-index: 2;
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
    color: white;
    .ai-create-number {
      margin-bottom: 10px;
	  display: flex;
	  justify-content: space-between;
	  
	  .uni-numbox {
		  background: #141415 !important;
	  }
    }
    .ai-create-mode-container {
      .ai-create-mode-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        height: 25px;
        width: 90%;
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
      color: white;
    }
  }

  .input-area-clearBtn {
    display: flex;
    position: absolute;
    right: 15px;
    bottom: 22px;
    color: white;
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
    color: white;
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
        width: 28%;
        height: 60px;
        margin-bottom: 15px;
		margin-right: 5px;
        border-radius: 0.5rem;
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

