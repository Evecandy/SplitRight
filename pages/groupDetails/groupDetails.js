
Page({
  data: {
    groupId: null,
    groupDetails:"",
    recentActivity: [
      
    ]
  },
    onLoad(query){
      console.log("query",query)
      const groupDetails=JSON.parse(query.data)
      this.setData({
        groupDetails:groupDetails
      })
    },
  // onLoad(query) {
  //   const groupId = query.id;
  //   console.log('Loading details for Group ID:', groupId);
  //   this.setData({ groupId: groupId });
  //   // TODO: Fetch group details and recent activity from the backend/API
    
  //   if (groupId === 'WKD-2025-03456') { 
  //        this.setData({
  //           groupDetails: {
  //               title: 'Weekend Trip',
  //               amount: '12,500',
  //               members: 5,
  //               expires: 'Apr 15, 2025'
  //           },
  //           recentActivity: [
  //               { id: 1, description: 'Restaurant Bill', meta: 'Paid on Mar 10', amount: '3,500'},
  //               { id: 2, description: 'John added funds', meta: 'Mar 8', amount: '2,000'},
  //               { id: 3, description: 'Taxi fare', meta: 'Paid on Mar 5', amount: '600'},
  //           ]
  //       });
  //   } else {
         
  //        this.setData({ groupDetails: { title: 'Group Not Found' }})
  //   }
  // },
  onExpireTap() {
    my.navigateTo({
      url: `/pages/walletExpiration/walletExpiration`
    })
  },
  onContributeTap() {
    console.log('Contribute tapped for group:',this.data.groupDetails)
    const  detailsRetrieved=JSON.stringify(this.data.groupDetails)
    my.navigateTo({
      url: `/pages/firstContribution/firstContribution?data=${detailsRetrieved}`
    })
    },
  onRequestPaymentTap() {
    const groupId = this.data.groupId;
   
    console.log('Request New Payment tapped for group:');
    
    my.navigateTo({
      url: `/pages/requestPayment/requestPayment`
      
    });
  }
});