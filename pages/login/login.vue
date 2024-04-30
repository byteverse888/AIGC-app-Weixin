<template>
  <view class="login-container">
    <view class="login-wrap">
      <view class="login">
        <view class="loginform">
          <view class="content">
            <text class="login-title">用户登录</text>
            <form class="uni-forms" @submit="formSubmit" @reset="formReset">
              <view class="uni-form-item uni-column">
                <text>手机号或用户名</text>
                <input
                  type="text"
                  v-model="phone"
                  class="uni-input-border"
                  placeholder="输入用户名或手机号"
                />
              </view>
              <view class="uni-form-item uni-column">
                <view class="password-text">
                  <text>密码</text>
                <input
                  type="password"
                  v-model="password"
                  class="uni-input-border"
                  placeholder="密码"
                />
				</view>
              </view>
            </form>
            <view>
              <button class="login-btn" @click="submitForm">登录</button>
            </view>
            <view class="call clearFix" @click="gotoRegister">
              <text>还没有账号? {{ "      " }}</text>
              <text class="register">立即注册</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { uniForms } from "@dcloudio/uni-ui";
export default {
  components: {
    uniForms,
  },
  data() {
    return {
      phone: "",
      password: "",
      from: ""
    };
  },
  mounted() {},
  onLoad(options) {
    this.from = options.from;
  },
  methods: {
    gotoRegister() {
      uni.navigateTo({
        url: "/pages/register/register",
      });
    },
    submitForm() {
      let params = {
        username: this.phone,
        password: this.password,
      };

      this.request("/login", {
        method: "POST",
        data: params,
      }).then((res) => {
        if (res && res.objectId) {
          uni.setStorageSync("objectId", res.objectId);
          if(this.from == 'aiCreate') {
            uni.switchTab({
              url: "/pages/aiCreate/aiCreate",
            });
          } else if(this.from == 'planet'){
            uni.switchTab({
              url: "/pages/planet/planet",
            });
          } else if(this.from == 'register'){
			  uni.switchTab({
				url: "/pages/planet/planet",
			  });
		  }
          
        } else if (
          res &&
          res.code == 101 &&
          res.error == "Invalid username/password."
        ) {
          uni.showModal({
            title: "提示",
            content: "无效的用户名或密码!",
            cancelText: "取消",
            confirmText: "确认",
          });
        }
      });
    },
    handleResetPassword() {
      uni.navigateTo({
        url: "/pages/resetPassword/index",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  .login-wrap {
    padding-top: 70px;
    .login {
      .loginform {
        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          .login-title {
            font-size: 30px;
            color: #2216ae;
            font-weight: 550;
            margin-bottom: 50px;
          }
          .uni-forms {
            .uni-form-item {
              text {
                font-size: 12px;
                color: #141414;
                font-weight: 550;
              }
              input {
                border: 1px solid #2216ae;
                height: 48px;
                width: 76vw;
                border-radius: 10px;
                margin-top: 5px;
                margin-bottom: 20px;
                color: #2216ae;
                padding: 0 10px;
              }
              .password-text {
                display: flex;
                justify-content: space-between;
                .forget-password {
                  color: #2216ae;
                }
              }
            }
          }
          .clearFix {
            margin-top: 30px;
            font-size: 16px;
          }

          .login-btn {
            width: 76vw;
            background-color: #20c4b6;
            height: 50px;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 15px;
            font-size: 16px;
            font-weight: 550;
          }
        }
      }
    }
  }
}
</style>

