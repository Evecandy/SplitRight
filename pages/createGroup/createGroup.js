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

  onCreateGroupTap: function() {  // Fixed syntax here
    console.log('Create Group tapped. Data:', this.data);
    
    // Form validation
    if (!this.data.groupName) {
      my.showToast({ content: 'Group Name is required', type: 'fail' });
      return;
    }
    
    if (!this.data.validUntil) {
      my.showToast({ content: 'Valid Until date is required', type: 'fail' });
      return;
    }
    
    // Show loading indicator
    my.showLoading({
      content: 'Creating group...',
    });
    
    // Prepare group data
    const groupData = {
      name: this.data.groupName,
      description: this.data.description || '',
      validUntil: this.data.validUntil,
      splitMethod: this.data.splitMethod,
      id: Date.now().toString(), // Generate a simple unique ID
      members: [],
      createdAt: new Date().toISOString(),
      expenses: []
    };
    
    // Store group data in Alipay storage
    my.getStorage({
      key: 'userGroups',
      success: (res) => {
        const existingGroups = res.data || [];
        existingGroups.push(groupData);
        
        my.setStorage({
          key: 'userGroups',
          data: existingGroups,
          success: () => {
            my.hideLoading();
            
            // Navigate to AddMembers page with group data
            my.navigateTo({
              url: `/pages/AddMembers/AddMembers?groupId=${groupData.id}&name=${encodeURIComponent(this.data.groupName)}&desc=${encodeURIComponent(this.data.description)}&date=${this.data.validUntil}&split=${this.data.splitMethod}`,
            });
          },
          fail: (err) => {
            my.hideLoading();
            console.error('Failed to save group data:', err);
            my.showToast({ content: 'Failed to create group', type: 'fail' });
          }
        });
      },
      fail: (err) => {
        my.hideLoading();
        console.error('Failed to retrieve existing groups:', err);
        
        // If retrieving fails, try to create new array
        const newGroups = [groupData];
        my.setStorage({
          key: 'userGroups',
          data: newGroups,
          success: () => {
            my.navigateTo({
              url: `/pages/AddMembers/AddMembers?groupId=${groupData.id}&name=${encodeURIComponent(this.data.groupName)}&desc=${encodeURIComponent(this.data.description)}&date=${this.data.validUntil}&split=${this.data.splitMethod}`,
            });
          },
          fail: (storageErr) => {
            console.error('Failed to save new group:', storageErr);
            my.showToast({ content: 'Failed to create group', type: 'fail' });
          }
        });
      }
    });
  }
});