
Page({
  data: {
    groupId: null,
    summaryInfo: { 
      groupName: 'Weekend Trip',
      finalBalance: '4,500',
      totalSpent: '10,500',
      members: 5
    },
    // Assuming this is read-only based on group setting
    redistributionMethod: 'proportional', // 'proportional' or 'equal'
    yourShare: '1,200' // Example data, calculate/fetch real share
  },

  onLoad(query) {
    const groupId = query.groupId; 
    console.log(`Funds Redistribution loaded for Group ID: ${groupId}, Action: ${action}`);

    if (!groupId) {
        console.error("Error: Group ID is missing!");
        my.showToast({ content: 'Error: Group ID missing', type: 'fail' });
        // my.navigateBack();
        return;
    }
    this.setData({ groupId: groupId });

    // TODO: Fetch redistribution details from API using groupId
    
  },

  onConfirmTap() {
    const groupId = this.data.groupId;
    console.log(`Confirm Redistribution tapped for Group ID: ${groupId}`);

    my.showLoading({ content: 'Confirming...' });
    // TODO: Make API call to confirm/finalize the redistribution process
 
    setTimeout(() => {
        my.hideLoading();
        my.showToast({ content: 'Redistribution Confirmed! Group is now closed', type: 'success', duration: 2000 });
        // Navigate to dashboard or group list after confirmation
        setTimeout(() => {
            my.reLaunch({ url: '/pages/home/home' }); // Go back to main group list
        }, 2000);
    }, 1000);

  },

  onViewSummaryTap() {
    const groupId = this.data.groupId;
    console.log(`View Full Summary tapped for Group ID: ${groupId}`);
    // Navigate to a detailed report/summary screen for the closed group
    // my.navigateTo({ url: `/pages/closedGroupSummary/closedGroupSummary?groupId=${groupId}` });
    my.showToast({ content: 'Navigate to Full Summary (Not Implemented)', type: 'none' });
  }
});
