
Page({
  data: {
    groupId: null, 
    groupInfo: {
      title: 'Weekend Trip', 
      subtitle: 'New Group',
      balance: 0
    },
    contributionAmount: ''
  },

  onLoad(query) {
    const groupId = query.groupId; 
    console.log('First Contribution page loaded for Group ID:', groupId);
    if (!groupId) {
        console.error("Error: Group ID is missing!");
        my.showToast({ content: 'Error: Group ID missing', type: 'fail' });
      
        return;
    }
    this.setData({ groupId: groupId });

   
    if (groupId === 'WKD-2025-XXXXXX') { 
        this.setData({
            groupInfo: {
                title: 'Weekend Trip',
                subtitle: 'New Group',
                balance: 0
            }
        });
    }
  },

  onAmountInput(e) {
    
    this.setData({
      contributionAmount: e.detail.value
    });
  },

  onAddContributionTap() {
    const amount = parseFloat(this.data.contributionAmount);
    if (isNaN(amount) || amount <= 0) {
      my.showToast({ content: 'Please enter a valid amount', type: 'fail' });
      return;
    }

    console.log('Add Contribution tapped. Amount:', amount, 'Group ID:', this.data.groupId);
    my.redirectTo({
      url: '/pages/groupDetails/groupDetails',
    });
   
  
   my.showLoading({ content: 'Adding...' });
   my.call('buyGoods', {
    tillNumber: '12345',
    amount: amount,
    currency: 'KES', // currencyCode to be used - only KES supported for now
    reason: 'Jon Groceries', // optional field
    success: function(res) {            
      my.alert({
       content: JSON.stringify(res),
      });
    },
    fail: function(res) {  
      my.alert({
        content: JSON.stringify(res),
      });
   },
});
   setTimeout(() => {
       my.hideLoading();
       my.showToast({ content: 'Contribution added!', type: 'success' });
       my.redirectTo({ url: `/pages/groupDetail/groupDetail?id=${this.data.groupId}` });
   }, 1000);


  },

  onSkipTap() {
    console.log('Skip for Now tapped. Group ID:', this.data.groupId);
  
    my.redirectTo({ 
      url: `/pages/groupDetails/groupDetails?id=${this.data.groupId}`
    });
  }
});

