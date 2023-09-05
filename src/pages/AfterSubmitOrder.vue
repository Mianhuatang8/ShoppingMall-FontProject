<template>
  <div>
    <div class="pay-main">
      <div class="pay-container">
        <div class="checkout-tit">
          <h4 class="tit-txt">
            <span class="success-icon"></span>
            <span class="success-info">订单提交成功，请您及时付款，以便尽快为您发货~~</span>
          </h4>
          <div class="paymark">
            <span class="fl">请您在提交订单
              <em class="orange time">4小时</em>
              之内完成支付，超时订单会自动取消。订单号：
              <em>{{ orderId }}</em></span>
            <span class="fr">
              <em class="lead">应付金额：</em><em class="orange money">￥{{ payMoney }}</em>
            </span>
          </div>
        </div>
        <div class="checkout-info">
          <h4>重要说明：</h4>
          <ol>
            <li>
              尚品汇商城支付平台目前支持<span class="zfb">微信</span>支付方式。
            </li>
            <li>其它支付渠道正在调试中，敬请期待。</li>
            <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
          </ol>
          <h4>
            支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）
          </h4>
          <ul>
            <li>支付帐号：11111111</li>
            <li>密码：111111</li>
            <li>支付密码：111111</li>
          </ul>
        </div>
        <div class="checkout-steps">
          <div class="step-tit">
            <h5>支付平台</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="../images/AfterSubmitOrderImage/pay2.jpg" /></li>
              <li><img src="../images/AfterSubmitOrderImage/pay3.jpg" /></li>
            </ul>
          </div>
          <div class="hr"></div>

          <div class="payshipInfo">
            <div class="step-tit">
              <h5>支付网银</h5>
            </div>
            <div class="step-cont">
              <ul class="payType">
                <li><img src="../images/AfterSubmitOrderImage/pay10.jpg" /></li>
                <li><img src="../images/AfterSubmitOrderImage/pay11.jpg" /></li>
                <li><img src="../images/AfterSubmitOrderImage/pay12.jpg" /></li>
                <li><img src="../images/AfterSubmitOrderImage/pay13.jpg" /></li>
                <li><img src="../images/AfterSubmitOrderImage/pay14.jpg" /></li>
                <li><img src="../images/AfterSubmitOrderImage/pay15.jpg" /></li>
                <li><img src="../images/AfterSubmitOrderImage/pay16.jpg" /></li>
                <li><img src="../images/AfterSubmitOrderImage/pay17.jpg" /></li>
                <li><img src="../images/AfterSubmitOrderImage/pay18.jpg" /></li>
                <li><img src="../images/AfterSubmitOrderImage/pay19.jpg" /></li>
                <li><img src="../images/AfterSubmitOrderImage/pay20.jpg" /></li>
                <li><img src="../images/AfterSubmitOrderImage/pay21.jpg" /></li>
                <li><img src="../images/AfterSubmitOrderImage/pay22.jpg" /></li>
              </ul>
            </div>
          </div>
          <div class="hr"></div>

          <div class="submit">
            <!--立即支付按钮:  -->
            <a class="btn" @click="openPay">立即支付</a>
          </div>
          <div class="otherpay">
            <div class="step-tit">
              <h5 style="font-weight: bold;">其他支付方式</h5>
            </div>
            <div class="step-cont">
              <span><a target="_blank">微信支付</a>
                &nbsp;&nbsp;</span>
              <span>中国银联</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'
import { getOrderPayInfo, getPayState } from '../api/order.js'
import QRCode from "qrcode";
export default {
  created() {
    //从vux中获取支付金额和订单id
    this.orderId = this.$store.state.OrderAbout.orderId
    this.payMoney = this.$store.state.OrderAbout.shouldPayMoney
    this.getPayInfo()
  },
  data() {
    return {
      payMoney: 0,
      orderId: 0,
      //二维码url
      codeUrl: '',
      //支付状态码查询 成功为200 失败为205
      payCode: 0,
      timer: null,
    }
  },

  methods: {
    //获取订单支付信息
    async getPayInfo() {
      let res = await getOrderPayInfo(this.orderId)
      console.log('当前获取的订单支付信息', res.data)
      this.codeUrl = res.data.data.codeUrl
      // 示例
      // "data": {
      //    "codeUrl": "weixin://wxpay/bizpayurl?pr=P0aPBJK",
      //    "orderId": 71,
      //    "totalFee": 23996,
      //    "resultCode": "SUCCESS"
      // },
    },

    closeMessageBox() {
      this.$messageBox.close();
    },
    //立即支付
    async openPay() {
      //生成一个二维码URL
      let url = await QRCode.toDataURL(this.codeUrl);
      //消息弹出框
      ElMessageBox.confirm(
        `<div><img src="${url}" /></div>`, // 用你图片的路径替换这里
        '请你微信扫码支付',
        {
          confirmButtonText: '支付成功',
          cancelButtonText: '支付遇到问题',
          center: true,
          dangerouslyUseHTMLString: true, // 这是关键，允许使用HTML
          showCancelButton: true, // 显示取消按钮
        }
      ).then((resData) => {//点击支付成功
        console.log('elmessage', resData);
        //支付成功跳转到支付成功页面并且清除定时器
        if (this.payCode == 200) {
          //清除定时器
          clearInterval(this.timer)
          ElMessage({
            type: 'success',
            message: '支付成功',
          })
          //跳转到支付成功页面
          this.$router.push({ path: '/paySuccess' })
        } else {
          clearInterval(this.timer)
          ElMessage({
            type: 'error',
            message: '未能完成支付，请再次支付',
          })

        }
      })
        .catch(() => {//点击支付遇见问题/关闭对话框
          // 清除定时器
          clearInterval(this.timer)
          ElMessage({
            type: 'error',
            message: '支付遇到问题请联系棉花糖',
          })
        })
      //获取订单支付状态
      //查询支付结果,开启定时器每隔一段时间询问支付结果
      this.timer = setInterval(async () => {
        let res = await getPayState(this.orderId)
        console.log('订单支付状态查询', res.data);
        if (res.data.code == 200) {
          // this.shouldCloseMessageBox=true
          this.payCode = res.data.code
          //清除定时器
          clearInterval(this.timer)
          //关闭对话框
          // messageBox.close();
          this.closeMessageBox(); // 关闭消息框
          //跳转到支付成功页面
          this.$router.push({ path: '/paySuccess' })
        } else {
          this.shouldCloseMessageBox = false
          this.payCode = res.data.code
        }
      }, 1000)

      //查询支付结果,开启定时器每隔一段时间询问支付结果
      //  this.timer  = setInterval(async () => {
      //     //发请求获取支付结果
      //     let result = await this.$http.reqPayResult(this.payInfo.orderId);
      //     //返回数据当中：code=200代表支付成功  code=205未支付
      //     if (result.code == 200) {
      //       //支付成功了
      //       //存储一下支付成功的code数值，通过他判断支付是否成功
      //       this.code = result.code;
      //       //清除定时器
      //       clearInterval(this.timer);
      //       //关闭messagebox
      //       this.$msgbox.close(); 
      //       //在路由跳转
      //       this.$router.push('/paySuccess');
      //     } else {
      //       //未支付
      //       this.code = result.code;
      //     }
      //   }, 1000);
      // },

    },
  }

}
</script>

<style scoped lang="scss">
.pay-main {
  margin-bottom: 20px;
  font-size: 14px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(../images/AfterSubmitOrderImage/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px "微软雅黑";
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>