

Page({
  data: {
    // 
    groups:""
  },
  onLoad(){
    my.showLoading();
    //making API call
    my.request({
      url: 'https://mocki.io/v1/ea0e4b05-5d78-4baa-adf6-41f62e38862e',
      method: 'GET',
      data: {
        //payload for a POST request
      },
      dataType: 'json',
      success: (res) => {  // Arrow function preserves 'this'
      // my.alert({content: 'success'});
      my.hideLoading();
      console.log("api response", JSON.stringify(res.data, null, 2));
      // const groupsData=JSON.stringify(res.data)
      // Updating groups data works now
      this.setData({
        groups: res.data.groups
      });
      console.log("updated groups data", this.data.groups);
    },
    fail: (err) => {
      my.hideLoading();
      console.error("API request failed:", err);
    },
      // complete: function(res) {
      //   my.hideLoading();
      //   my.alert({content: 'complete'});
      // }
    });
    
    //  
  },
  onViewTap(eve){
    console.log("eve",eve.target.dataset.id)
    
    my.navigateTo({
      url: '/pages/groupDetails/groupDetails'
    })
  },
  onCreateTap(){
    my.navigateTo({
      url: '/pages/createGroup/createGroup',
   
    });
  }
}

);
