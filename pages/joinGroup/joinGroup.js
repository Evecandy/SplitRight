
Page({
  data: {
    invitationToken: null, 
    groupDetails: { 
      title: 'Weekend Trip',
      admin: 'Jane Doe',
      members: '3 others',
      validUntil: 'Apr 15, 2025',
      purpose: 'Beach vacation expenses and fun activities planned for the long weekend trip to the coast.',
      approval: '50% + 1 members'
    },
    termsAgreed: false
  },

  onLoad(query) {
    const token = query.token; 
    console.log('Join Group page loaded with token:', token);
    if (!token) {
        console.error("Error: Invitation token/ID is missing!");
        my.showToast({ content: 'Error: Invalid invitation link', type: 'fail' });

        return;
    }
    this.setData({ invitationToken: token });

    
    
  },

  onTermsChange(e) {
 
    this.setData({
      termsAgreed: e.detail.value.length > 0 
    });
  },

  toggleTerms() {
      
       this.setData({
            termsAgreed: !this.data.termsAgreed
        });
  },


  onJoinTap() {
    if (!this.data.termsAgreed) {
      my.showToast({ content: 'Please agree to the terms', type: 'none' });
      return;
    }

    console.log('Join Group tapped. Token:', this.data.invitationToken);
    
   
   my.showLoading({ content: 'Joining...' });
   setTimeout(() => {
       my.hideLoading();
       my.showToast({ content: 'Successfully joined!', type: 'success' });
      
       const groupId = 'WKD-2025-XXXXXX';
     
       my.redirectTo({ url: `/pages/firstContribution/firstContribution?groupId=${groupId}` });
     
   }, 1000);
  },

  onCancelTap() {
    console.log('Cancel tapped');
    
    my.redirectTo({ url: '/pages/home/home' }); 
  }
});

