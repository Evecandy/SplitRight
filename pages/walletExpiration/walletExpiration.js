
Page({
  data: {
    groupId: null,
    groupInfo: { 
      name: 'Weekend Trip',
      expiryStatus: 'Wallet Expires Tomorrow',
      statusClass: 'warning', 
      balance: '4,500',
      note: 'Will be redistributed automatically after expiration.'
    }
  },

  onLoad(query) {
    const groupId = query.groupId; // Expecting groupId like ?groupId=XYZ
    console.log('Wallet Expiration page loaded for Group ID:', groupId);
    if (!groupId) {
        console.error("Error: Group ID is missing!");
        my.showToast({ content: 'Error: Group ID missing', type: 'fail' });
        // my.navigateBack();
        return;
    }
    this.setData({ groupId: groupId });

    // TODO: Fetch group details and precise expiration status from API
    // Update expiryStatus and statusClass based on remaining time
    // Example fetch:
    // my.request({
    //   url: `YOUR_API/groupExpiryStatus?id=${groupId}`,
    //   success: (res) => { this.setData({ groupInfo: res.data.info }); }
    // })
  },

  onOptionTap(e) {
    const option = e.currentTarget.dataset.option;
    const groupId = this.data.groupId;
    console.log(`Option tapped: ${option}, Group ID: ${groupId}`);

    switch (option) {
      case 'extend':
        // Navigate to Extend Validity screen
        // my.navigateTo({ url: `/pages/extendValidity/extendValidity?groupId=${groupId}` });
        my.showToast({ content: 'Navigate to Extend (Not Implemented)', type: 'none' });
        break;
      case 'expense':
       
        my.navigateTo({ url: `/pages/requestPayment/requestPayment?groupId=${groupId}&context=finalExpense` });
        break;
      case 'redistribute':
       
        my.navigateTo({ url: `/pages/fundsRedistribution/fundsRedistribution?groupId=${groupId}&action=manual` });
        break;
      default:
        console.warn('Unknown option:', option);
    }
  },

  onBackTap() {
  
    my.navigateBack();
  }
});
