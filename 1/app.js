App({
  onLaunch() {
    // 初始化日记数组
    if (!wx.getStorageSync('diaryList')) {
      wx.setStorageSync('diaryList', [])
    }
    // 全局隐私判断：未同意才唤起官方隐私弹窗
    const isAgree = wx.getStorageSync('privacyAgree')
    if (!isAgree) {
      wx.requirePrivacyAuthorize({
        success: () => {
          // 用户同意，存标记，进入首页
          wx.setStorageSync('privacyAgree', true)
          wx.reLaunch({ url: "/pages/index/index" })
        },
        fail: () => {
          // 用户拒绝，退出小程序
          wx.exitMiniProgram()
        }
      })
    }
    // 已同意：什么都不做，自动进入首页
  },
  globalData: {
    resolvePrivacy: null
  }
})

