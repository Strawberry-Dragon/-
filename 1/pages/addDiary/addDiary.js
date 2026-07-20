Page({
  data: {
    title: '',
    content: '',
    imgList: []
  },
  // 输入标题
  inputTitle(e) {
    this.setData({ title: e.detail.value })
  },
  // 输入内容
  inputContent(e) {
    this.setData({ content: e.detail.value })
  },
  chooseImage() {
    // 校验隐私授权
    if (!wx.getStorageSync('privacyAgree')) {
      wx.showToast({
        title: '请先同意隐私协议',
        icon: 'none'
      })
      return
    }
    // 剩余可选择数量
    const remain = 9 - this.data.imgList.length
    wx.chooseMedia({
      count: remain,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log('选图成功', res.tempFiles)
        const newPaths = res.tempFiles.map(item => item.tempFilePath)
        this.setData({
          imgList: [...this.data.imgList, ...newPaths]
        })
      },
      fail: (err) => {
        console.error('选图失败详细信息：', err)
        wx.showToast({
          title: '图片选取失败',
          icon: 'none'
        })
      }
    })
  },
  // 预览大图
  previewImg(e) {
    const src = e.currentTarget.dataset.src
    wx.previewImage({
      urls: this.data.imgList,
      current: src
    })
  },
  // 删除图片
  delImg(e) {
    const index = e.currentTarget.dataset.index
    let arr = [...this.data.imgList]
    arr.splice(index, 1)
    this.setData({
      imgList: arr
    })
  },
  // 保存日记到本地缓存
saveDiary() {
    const { title, content, imgList } = this.data
    if (!title.trim() && !content.trim()) {
      wx.showToast({ title: '至少写点内容哦', icon: 'none' })
      return
    }
    // 构造日记对象
    let diaryList = wx.getStorageSync('diaryList') || []
    const newDiary = {
      id: Date.now(), // 时间戳作为唯一id
      title: title || '无题小记',
      content: content,
      imgList: imgList,
      time: new Date().toLocaleString('zh-CN')
    }
    diaryList.push(newDiary)
    wx.setStorageSync('diaryList', diaryList)

    wx.showToast({ title: '保存成功~' })
    setTimeout(() => {
      wx.navigateBack()
    }, 1200)
  }
  
})