Page({
  data: {
    groupId: '',
    group: {
      id: '',
      name: '',
      memberCount: 0,
      validUntil: '',
      approvalRate: '',
      walletBalance: 0
    },
    loading: true
  },

  onLoad: function(query) {
    // Get the group ID 
    const groupId = query.groupId || '';
    console.log('Group Created page loaded with ID:', groupId);
    
    this.setData({
      groupId: groupId,
      loading: true
    });
    
    // Load the group data from storage
    this.loadGroupData(groupId);
  },
  
  loadGroupData: function(groupId) {
    my.getStorage({
      key: 'userGroups',
      success: (res) => {
        console.log('Retrieved userGroups:', res.data);
        const groups = res.data || [];
        const group = groups.find(g => g.id === groupId);
        
        if (group) {
          console.log('Found group:', group);
          // Format the date for display
          const formattedDate = this.formatDate(group.validUntil);
          
          this.setData({
            group: {
              id: group.id,
              name: group.name,
              memberCount: group.memberCount || (group.members ? group.members.length : 0),
              validUntil: formattedDate,
              approvalRate: group.approvalRate || '50%',
              walletBalance: group.walletBalance || 0
            },
            loading: false
          });
        } else {
          console.error('Group not found:', groupId);
          my.showToast({
            content: 'Group data not found',
            type: 'fail'
          });
          this.setData({ loading: false });
        }
      },
      fail: (err) => {
        console.error('Failed to load group data:', err);
        my.showToast({
          content: 'Failed to load group data',
          type: 'fail'
        });
        this.setData({ loading: false });
      }
    });
  },
  
  // Format date from YYYY-MM-DD to readable format
  formatDate: function(dateString) {
    if (!dateString) return '';
    
    try {
      const dateParts = dateString.split('-');
      if (dateParts.length !== 3) return dateString;
      
      const year = dateParts[0];
      const month = parseInt(dateParts[1]);
      const day = parseInt(dateParts[2]);
      
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[month-1]} ${day}, ${year}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  },
  
  // Navigate to add firstContribution page
  addFunds: function() {
    my.navigateTo({
      url: `/pages/firstContribution/firstContribution?groupId=${encodeURIComponent(this.data.groupId)}`
    });
  },
  
  // Navigate to group details page
  goToGroup: function() {
    my.navigateTo({
      url: `/pages/groupDetails/groupDetails?groupId=${encodeURIComponent(this.data.groupId)}`
    });
  }
});