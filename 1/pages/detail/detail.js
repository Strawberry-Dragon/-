Page({
  data: {
    diary: null
  },
  onLoad(options) {
    const targetId = Number(options.id)
    const list = wx.getStorageSync('diaryList')
    const target = list.find(item => item.id === targetId)
    this.setData({ diary: target })
  },
  previewImg(e) {
    const src = e.currentTarget.dataset.src
    wx.previewImage({
      current: src,
      urls: this.data.diary.imgList
    })
  },
  deleteDiary() {
    wx.showModal({
      title: '确认删除',
      content: '删除后日记无法恢复，确定吗？',
      success: res => {
        if (res.confirm) {
          let list = wx.getStorageSync('diaryList')
          list = list.filter(item => item.id !== this.data.diary.id)
          wx.setStorageSync('diaryList', list)
          wx.showToast({ title: '已删除' })
          setTimeout(() => wx.navigateBack(), 1000)
        }
      }
    })
  }
})