<template>
  <view class="ai-create-content">
    <view class="ai-create-left">
      <view class="ai-create-left-body">
        <view class="ai-create-description">
          <text>* 上传图片</text>
          <view class="upload-image">
            <uni-file-picker
              v-model="imageValue"
              fileMediatype="image"
              mode="grid"
              limit="1"
              @select="select"
              :image-styles="imageStyles"
            />
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

        <view class="ai-create-number-container">
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
import { uniFilePicker } from "@dcloudio/uni-ui";
import { mapState } from "vuex";
export default {
  components: {
    uniFilePicker,
  },
  data() {
    return {
      imageValue: [],
      aiCreateModel: "壁纸",
      aiSelectedMode: "common",
      isTopicSelected: false,
      selectedTopicColor: "",
      imageStyles: {
        width: "750rpx",
        height: "350rpx",
        border: {
          color: "#7d62ca",
          width: 2,
          style: "solid",
          radius: "16px",
        },
      },
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
  },
  methods: {
    select(e) {
      const tempFilePaths = e.tempFilePaths;
      const imgUrl = tempFilePaths[0];
    },
    handleModeChange(mode) {
      this.aiSelectedMode = mode;
    },
    handleModelChange(model) {
      this.aiCreateModel = model.title;
    },
    handleAICreate() {
      const userObjectId = uni.getStorageSync("objectId");
      if(!userObjectId){
        uni.navigateTo({
          url: "/pages/login/login",
        });
      } else {
        let param = {
        title: "test",
        caption: this.aiCreateDescription,
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
      }).then((res) => {
        console.log("create AI res:", res);
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
  background: black;
}

.ai-create-tab {
  .ai-create-left-title {
    font-size: 12px;
    padding: 8px;
    background-color: #141415;
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
      color: rgb(177, 181, 196);
    }
    .upload-image {
      margin-top: 5px;
    }
    .input-textarea {
      border: 2px solid #7d62ca;
      border-radius: 10px;
      textarea {
        width: 93%;
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

