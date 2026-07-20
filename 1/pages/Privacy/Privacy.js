Page({
  data: {
    isAgree: false
  },
  onLoad() {
    // 读取本地存储的隐私同意状态
    this.setData({
      isAgree: !!wx.getStorageSync('privacyAgree')
    })
  },
  // 打开官方隐私协议
  openPrivacy() {
    wx.openPrivacyContract()
  },
  // 撤回同意：撤回后重启小程序，重新走隐私校验流程
  // resetAgree() {
  //   wx.showModal({
  //     title: "确认撤回",
  //     content: "撤回后下次打开小程序需要重新同意隐私协议，确定操作吗？",
  //     success: res => {
  //       if (res.confirm) {
  //         wx.removeStorageSync('privacyAgree')
  //         this.setData({ isAgree: false })
  //         wx.showToast({ title: "已撤回" })
  //         setTimeout(()=>{
  //           wx.reLaunch({ url:"/pages/index/index" })
  //         },1000)
  //       }
  //     }
  //   })
  // },
  // 返回首页（清空页面栈，避免栈堆积卡死）
  goBack() {
    wx.reLaunch({
      url: "/pages/index/index"
    })
  }
})