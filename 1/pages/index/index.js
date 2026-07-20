Page({
  data:{
    diaryList:[],
    showNotice: false,
    // 你每次更新公告，只需要修改这个数字即可，例：1→2→3……
    noticeVersion: 1
  },
  onLoad(){

  },
  onShow(){
    if(wx.getStorageSync("privacyAgree")){
      this.refreshDiary()
      this.checkNeedPopNotice()
    }
  },
  
  // 判断是否需要自动弹出更新公告
  checkNeedPopNotice(){
    const localReadVer = wx.getStorageSync("readNoticeVersion") || 0
    const currVer = this.data.noticeVersion
    // 本地已读版本 < 当前公告版本 → 弹出公告
    if(localReadVer < currVer){
      setTimeout(()=>{
        this.setData({ showNotice: true })
      },300)
    }
  },
  // 关闭公告，标记当前版本已读
  closeNotice(){
    this.setData({ showNotice: false })
    wx.setStorageSync("readNoticeVersion", this.data.noticeVersion)
  },
  refreshDiary(){
    let list = wx.getStorageSync("diaryList") || []
    this.setData({
      diaryList: list.reverse()
    })
  },
  goAddDiary(){
    wx.navigateTo({url:"/pages/addDiary/addDiary"})
  },
  goDetail(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({url:`/pages/detail/detail?id=${id}`})
  }
})

