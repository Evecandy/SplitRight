
Page({
  data: {
    groupName: '',
    description: '',
    validUntil: '', 
    splitMethod: 'equal', // Default value
   
   
  },

  handleInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({
      [field]: e.detail.value
    });
  },

  onDateChange(e) {
    this.setData({
      validUntil: e.detail.value
    });
  },

  onRadioChange(e) {
     this.setData({
       splitMethod: e.detail.value
     });
  },



  onCreateGroupTap() {
    console.log('Create Group tapped. Data:', this.data);
    
    if (!this.data.groupName) {
        my.showToast({ content: 'Group Name is required', type: 'fail' });
        return;
    }
     if (!this.data.validUntil) {
        my.showToast({ content: 'Valid Until date is required', type: 'fail' });
        return;
    }
    
    my.navigateTo({
      url: `/pages/addMembers/addMembers?name=${encodeURIComponent(this.data.groupName)}&desc=${encodeURIComponent(this.data.description)}&date=${this.data.validUntil}&split=${this.data.splitMethod}`,
      
    });
    
  }
});
