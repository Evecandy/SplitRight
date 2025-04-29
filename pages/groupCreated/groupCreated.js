// pages/groupCreated/groupCreated.js
Page({
  data: {
    groupId: null,
    summary: { // Placeholder data
        name: 'Weekend Trip',
        memberCount: 4,
        validUntil: 'Apr 15, 2025',
        balance: 0
    }
  },

  onLoad(query) {
    const groupId = query.groupId;
    console.log('Group Created page loaded for Group ID:', groupId);
    this.setData({ groupId: groupId });

    // TODO: Fetch actual group summary details from your backend/API
    // using the received groupId. For now, using placeholder.
    // You might fetch the name, member count, expiry date, balance etc.
    // Example:
    // my.request({
    //   url: `YOUR_API/groupSummary?id=${groupId}`,
    //   success: (res) => {
    //     if (res.data.success) {
    //       this.setData({ summary: res.data.summary });
    //     }
    //   }
    // })
    // Simulating setting some data based on possible ID format
     if (groupId && groupId.startsWith("WKD")) {
         this.setData({
             summary: {
                name: 'Weekend Trip', // Should fetch real name
                memberCount: 4, // Should fetch real count
                validUntil: 'Apr 15, 2025', // Should fetch real date
                balance: 0 // Should fetch real balance
             }
         })
     }
  },
  onExpireTap() {
    my.redirectTo({
      url: '/pages/walletExpiration/walletExpiration',
      
    });
  },
  onAddFundsTap() {
    console.log('Add Funds Now tapped for group:', this.data.groupId);
    my.navigateTo({
      url: '/pages/firstContribution/firstContribution',
      
    });
    // Navigate to the page/flow for adding funds
    // my.navigateTo({ url: `/pages/addFunds/addFunds?groupId=${this.data.groupId}` });
     my.showToast({ content: 'Navigate to Add Funds (Not Implemented)', type: 'none' });
  },

  onGoToGroupTap() {
    console.log('Go to Group tapped for group:', this.data.groupId);
    // Navigate to the Group Detail screen, replacing the current screen
    my.redirectTo({
      url: `/pages/groupDetail/groupDetails?id=${this.data.groupId}`
    });
  }
});
