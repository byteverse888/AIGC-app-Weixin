<template>
  <view class="register-container">
    <view class="register-wrap">
      <view class="home-icon-show">
        <image mode="widthFix" src="../../static/icon/home_icon1.png"></image>
      </view>
      <view class="register">
        <view class="registerform">
          <view class="content">
            <view class="register-content">
              <text class="register-title">注册</text>
              <form @submit="formSubmit" @reset="formReset">
                <view class="uni-form-item uni-column">
                  <input
                    type="text"
                    v-model="name"
                    class="uni-input-border"
                    placeholder="姓名"
                  />
                </view>
                <view class="uni-form-item uni-column">
                  <input
                    type="text"
                    v-model="phone"
                    class="uni-input-border"
                    placeholder="手机号码"
                  />
                </view>
                <view class="uni-form-item uni-column">
                  <input
                    type="password"
                    v-model="password"
                    class="uni-input-border"
                    placeholder="密码"
                  />
                </view>
              </form>
              <view>
                <button class="register-btn" @click="submitForm">确认</button>
              </view>
            </view>
            <view class="call clearFix">
              <view>已经有账号啦?</view>
              <view class="login" @click="gotoLogin">登录</view>
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
      name: "",
      phone: "",
      password: "",
    };
  },
  mounted() {},
  methods: {
    gotoLogin() {
      uni.navigateTo({
        url: "/pages/login/index",
      });
    },
    submitForm() {
      let params = {
        username: this.phone,
        password: this.password,
      };

      this.request("/users", {
        method: "POST",
        data: params,
      }).then((res) => {
        if (res && res.objectId) {
          uni.navigateTo({
            url: "/pages/login/login?from=register",
          });
        } else if (
          res &&
          res.code == 202 &&
          res.error == "Account already exists for this username."
        ) {
          uni.showModal({
            title: "提示",
            content: "用户已存在, 请重新注册!",
            cancelText: "取消",
            confirmText: "确认",
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.register-container {
  height: 100vh;
  background-color: #eafff8;
  .register-wrap {
    padding-top: 100px;

    .home-icon-show {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      image {
        width: 40px;
      }
    }
    .register {
      .registerform {
        .content {
          display: flex;
          flex-direction: column;
          align-items: center;

          .register-content {
            background-color: white;
            padding: 15px;
            border-radius: 24px;
          }
          .register-title {
            font-size: 24px;
            color: #1c1c1c;
            font-weight: 550;
            margin-bottom: 25px;
          }

          .uni-form-item {
            display: flex;
            justify-content: center;
          }
          input {
            height: 48px;
            width: 65vw;
            border-radius: 8px;
            margin-top: 5px;
            margin-bottom: 20px;
            color: #2216ae;
            padding: 0 10px;
            background-color: #e6ebf6;
            font-size: 12px;
          }

          uni-forms {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 15px;
            uni-forms-item {
            }
          }
          .clearFix {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 30px;
            font-size: 14px;
            color: #474747;
            .login {
              font-size: 12px;
              color: #01b27d;
              margin-top: 5px;
            }
          }

          .register-btn {
            width: 70vw;
            background-color: #01b27d;
            height: 50px;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 15px;
            font-weight: 550;
            color: white;
          }
        }
      }
    }
  }
}
</style>

