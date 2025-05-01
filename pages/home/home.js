

Page({
  data: {
    groups: [
      {
        id: 1,
        name: "Weekend Trip",
        amount: "12,500",
        members: 5,
        expiry: "Apr 15, 2025"
      },
      {
        id: 2,
        name: "Office Lunch Pool",
        amount: "3,200",
        members: 8,
        expiry: "Dec 31, 2025"
      }
    ]
  },
  onLoad(){
    my.showLoading();
    //making API call
    my.request({
      url: 'https://mocki.io/v1/b9745da7-416d-48f9-9d50-7fc50e6b50ec',
      method: 'GET',
      data: {
        //payload for a POST request
      },
      dataType: 'json',
      success: function(res) {
        // my.alert({content: 'success'});
        my.hideLoading()
        console.log("api response",JSON.stringify(res.data, null,2))

        //Updating groups data
        this.setData({
          groups: res.data
        })
        console.log("updated groups data",this.data.groups)
        // my.alert({
        //   title: 'success',
        //   content: res.data,
        //   buttonText: 'ok',
        //   success: () => {
            
        //   },
        //   fail: () => {
            
        //   },
        //   complete: () => {
            
        //   }
        // });
      },
      fail: function(res) {
        my.alert({content: 'fail'});
      },
      // complete: function(res) {
      //   my.hideLoading();
      //   my.alert({content: 'complete'});
      // }
    });
    
    const task = my.request({url: 'https://httpbin.org/post'})
    task.abort()
  },
  onViewTap(){
    my.navigateTo({
      url: '/pages/groupDetail/groupDetails'
    })
  },
  onCreateTap(){
    my.navigateTo({
      url: '/pages/createGroup/createGroup',
   
    });
  }
}

);
