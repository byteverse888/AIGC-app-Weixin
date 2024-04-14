<template>
  <view class="my-userinfo-container">
    <view class="top-box">

    </view>
    <view class="panel-list">
        <view class="panel">
            <view class="panel-top">
                <view class="panel-top-left">
                   <view class="setting-auth-avater">
                        <image src="/static/images/avater.png" />
                   </view> 
                   <view class="setting-auth-info">
                    <text class="setting-auth-name">123</text>
                    <text class="setting-auth-phone">7711121662</text>
                   </view>
                </view>
                <view class="panel-top-right">
					<uni-icons type="right" size="18"></uni-icons>
                    <!-- <view class="right-arrow">></view> -->
                </view>
            </view>
            <view class="panel-body">
                <view class="panel-list-item">
					<view class="panel-item-title">
						<uni-icons type="compose" size="18"></uni-icons>
						<text>我的信息</text>
					</view>
					<uni-icons type="right" size="18"></uni-icons>
                </view>
                <view class="panel-list-item">
					<view class="panel-item-title">
						<uni-icons type="gear" size="18"></uni-icons>
						<text>账号设置</text>
					</view>
					<uni-icons type="right" size="18"></uni-icons>
                </view>
                <view class="panel-list-item">
					<view class="panel-item-title">
						<uni-icons type="info" size="18"></uni-icons>
						<text>关于我们</text>
					</view>
					<uni-icons type="right" size="18"></uni-icons>
                </view>
                <view class="panel-list-item" @click="logout">
					<view class="panel-item-title">
						<image class="logout-icon" src="../../static/images/logout.png" />
						<!-- <uni-icons class="logout-icon" type="download" size="18"></uni-icons> -->
						<text>退出登录</text>
					</view>
					<uni-icons type="right" size="18"></uni-icons>
                </view>
            </view>
        </view>
    </view>

  </view>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted () {},
  methods: {
  }
}
</script>

<style lang='scss' scoped>
.my-userinfo-container {
    height: 100%;

    .top-box {
        height: 250rpx;
        background-color: #01b27d;
    }

    .panel-list {
        padding: 0 10px;
        position: relative;
        top: -45px;
        height: calc(100vh - 250rpx);

        .panel {
            background-color: white;
            border-radius: 5px;
            height: calc(100vh - 160rpx);
            padding: 15px 20px;

            .panel-top {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .panel-top-left {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .setting-auth-avater {
                        margin-right: 10px;
                        image {
                            width: 50px;
                            height: 50px;
                        }
                    }

                    .setting-auth-info {
                        display: flex;
                        flex-direction: column;

                        .setting-auth-name {
                            font-weight: 550;
                        }

                        .setting-auth-phone {
                            font-size: 12px;
                        }
                    }
                }
            }

            .panel-body {
                margin-top: 25px;
                .panel-list-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 15px;
                    line-height: 45px;
					
					.panel-item-title {
						display: flex;
						align-items: center;
						.logout-icon {
							width: 18px;
							height: 18px;
						}
						
						text {
							margin-left: 5px;
						}
					}	
                }
            }


        }
    }
}
</style>

