<template>
  <view class="ai-plaza-container">
    <view class="ai-plaza-tab-container">
      <uni-segmented-control
        :current="current"
        :values="items.map((v) => v.title)"
        @clickItem="onClickItem"
        style-type="text"
        color="red"
        active-color="#7d62ca"
      >
      </uni-segmented-control>
    </view>
    <view class="ai-plaza-content">
      <view v-if="current === 0">
        <ai-all></ai-all>
      </view>
      <view v-if="current === 1">
        <ai-attention></ai-attention>
      </view>
    </view> 
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import aiAttention from './../aiAttention/aiAttention';
import aiAll from './../aiAll/aiAll';

export default {
  components:{
    uniSegmentedControl,
    aiAttention,
    aiAll,
  },
  data () {
    return {
      items: [
        {title: '全部'},
        {title: '关注'}
      ],
      current: 0,
    }
  },
  mounted() {
    this.$store.dispatch("getSystemConfig");
  },
  methods: {
    onClickItem(e) {
      if(this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
  }
}
</script>

<style lang='scss' scoped>
</style>

