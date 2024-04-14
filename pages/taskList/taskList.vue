<template>
  <view>
    <view class="taskList-header">
        <view class="taskList-title">任务列表</view>
        <view class="taskList-return" @click="returnToAICreate">返回</view>
      </view>
    <scroll-view @scrolltolower="handleToLower" scroll-y class="task_tab">
      <view class="taskList-content">
        <view
          class="task-item"
          v-for="(taskItem, index) in taskList"
          :key="index"
        >
          <text>{{ taskItem.title || taskItem.caption }}</text>
          <image
            mode="aspectFill"
            :src="
              !taskItem.imagesUrl
                ? isCreated && createdArt
                  ? createdArt
                  : '/static/images/loading.png'
                : taskItem.imagesUrl[0]
            "
            @click="handleRedirectToDetail(taskItem)"
          />
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      taskList: [],
      aiCreateObjectId: "",
      params: {
        limit: 10,
        skip: 0,
      },
      hasMore: true,
      isCreated: false,
      createdArt: "",
    };
  },
  mounted() {},
  onLoad(options) {
    this.aiCreateObjectId = options.aiCreateObjectId;
    const userObjectId = uni.getStorageSync("objectId");
    this.getTaskList();
    const intervalId = setInterval(() => {
      this.request("/classes/AIPost", {
        method: "GET",
        pageFrom: "taskListPage",
        data: {
          where: {
            status: 2,
            ownerUser: userObjectId,
            objectId: this.aiCreateObjectId,
            is_rewarded: false,
          },
        },
      }).then((res) => {
        if (res.results.length > 0) {
          this.isCreated = true;
          this.createdArt = res.results[0].imagesUrl[0];
          clearInterval(intervalId);
        }
      });
    }, 3000);
  },
  methods: {
    getTaskList() {
      const userObjectId = uni.getStorageSync("objectId");
      let param = {
        ...this.params,
        order: "desc",
        where: { designer: { $exists: true }, designer: userObjectId },
      };
      this.request("/classes/AIPost", {
        method: "GET",
        data: param,
      }).then((res) => {
        if (res && res.results && res.results.length === 0) {
          this.hasMore = false;
          return;
        }
        
        this.taskList = [...this.taskList, ...res.results].sort(function (
          a,
          b
        ) {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });

        console.log("taskList:", this.taskList);

      });
    },
    handleToLower() {
      if (this.hasMore) {
        this.params.skip += this.params.limit;
        this.getTaskList();
      } else {
        uni.showToast({
          title: "没有数据了",
          icon: "none",
        });
      }
    },
    returnToAICreate() {
      uni.switchTab({
        url: "/pages/aiCreate/aiCreate",
      });
    },
    handleRedirectToDetail(taskItem) {
      uni.navigateTo({
        url: `/pages/artDetail/index?objectId=${taskItem.objectId}&&from=taskList`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.task_tab {
  height: calc(100vh - 110rpx);
}

.taskList-header {
  position: relative;
}

.taskList-title {
  text-align: center;
  font-size: 20px;
  font-weight: 550;
}
.taskList-return {
  position: absolute;
  right: 13px;
  top: 5px;
}
.taskList-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 15px;
  .task-item {
    width: 48%;
    margin-bottom: 10px;
  }

  image {
    width: 100%;
    border-radius: 15px;
  }
}
</style>
