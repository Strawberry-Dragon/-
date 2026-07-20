const app = getApp()
Page({
  data: {
    diaryTotal: 0,
    firstTime: "",
    lastTime: "",
    isAgreePrivacy: false
  }, 
  onLoad() {
    this.getDiaryAccountInfo()
    // 读取用户是否已同意隐私协议状态
    this.setData({
      isAgreePrivacy: !!wx.getStorageSync("privacyAgree")
    })
  },
  // 读取本地日记，统计账户信息
  getDiaryAccountInfo() {
    let list = wx.getStorageSync("diaryList") || []
    if (list.length === 0) {
      this.setData({
        diaryTotal: 0,
        firstTime: "",
        lastTime: ""
      })
      return
    }
    // 最早、最新日记排序
    let sortList = list.sort((a, b) => a.id - b.id)
    let first = sortList[0]
    let latest = sortList[sortList.length - 1]

    this.setData({
      diaryTotal: list.length,
      firstTime: first.time,
      lastTime: latest.time
    })
  },
  // 返回首页
  backHome() {
    wx.switchTab({
      url: "/pages/index/index"
    })
  },
  // 打开微信后台配置的完整隐私协议
  openPrivacy(){
    wx.openPrivacyContract({
      fail:()=>{
        wx.showToast({title:"协议打开失败",icon:"none"})
      }
    })
  },
  goPrivacy(){
    wx.navigateTo({
      url:"/pages/Privacy/Privacy"
    })
  },
    // 手动打开更新公告弹窗
    openNoticeManual() {
      wx.showModal({
        title: '📢 版本更新公告',
        content: `【本次更新内容】
  1、支持单篇日记输入上万字长文本
  2、最多可上传9张配图记录日常
  3、移除隐私撤回功能，隐私同意后永久生效
  4、本日记数据只会存储在本地，一旦更换手机或者删除小程序本日记一切数据都会被删除，后续会更新手动备份导入版
  5、新增版本更新公告提醒`,
        confirmText: "关闭",
        showCancel: false
      })}
})