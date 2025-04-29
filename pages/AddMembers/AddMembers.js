Page({
  data: {
    groupDetails: { 
      name: '',
      desc: '',
      date: '',
      split: ''
    },
    memberInput: '',
    addedMembers: []
  },

  onLoad(query) {
    console.log('Add Members page loaded with query:', query);

    const creatorInfo = { name: 'You (Creator)', number: 'YourNumber'}; 

    this.setData({
      groupDetails: {
        name: decodeURIComponent(query.name || 'New Group'),
        desc: decodeURIComponent(query.desc || ''),
        date: query.date || 'N/A',
        split: query.split || 'equal'
      },
     
      addedMembers: [creatorInfo]
    });
  },

  handleInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({
      [field]: e.detail.value
    });
  },

  onAddMemberTap() {
    const newNumber = this.data.memberInput.trim();
    if (!newNumber || !/^\d{7,}$/.test(newNumber)) { 
      my.showToast({ content: 'Please enter a valid phone number', type: 'fail' });
      return;
    }

    // Check if member already exists
    const exists = this.data.addedMembers.some(member => member.number === newNumber);
    if (exists) {
         my.showToast({ content: 'Member already added', type: 'fail' });
         return;
    }

    const currentMembers = this.data.addedMembers;
    currentMembers.push({ number: newNumber, name: null });

    this.setData({
      addedMembers: currentMembers,
      memberInput: '' // Clear input field
    });
  },

  onRemoveMemberTap(e) {
    const indexToRemove = e.currentTarget.dataset.index;
    
    if (indexToRemove === 0) return;

    const currentMembers = this.data.addedMembers;
    currentMembers.splice(indexToRemove, 1); 

    this.setData({
      addedMembers: currentMembers
    });
  },

  onCreateWalletTap() {
    // Validate if enough members are added (e.g., at least 1 besides creator)
    if (this.data.addedMembers.length < 2) {
      my.showToast({ content: 'Please add at least one other member', type: 'fail' });
      return;
    }

    console.log('Create Group Wallet tapped. Group Data:', this.data.groupDetails);
    console.log('Members:', this.data.addedMembers);
    
    
    my.showLoading({
      content: 'Creating wallet...'
    });

    // Generating a unique group ID
    const groupId = `WLID-${Date.now().toString(36).toUpperCase()}`;
    
    // Prepare the final group data
    const finalGroupData = {
      id: groupId,
      name: this.data.groupDetails.name,
      description: this.data.groupDetails.desc,
      validUntil: this.data.groupDetails.date,
      splitMethod: this.data.groupDetails.split,
      members: this.data.addedMembers,
      memberCount: this.data.addedMembers.length,
      approvalRate: '50%', // Default approval rate
      walletBalance: 0,
      createdAt: new Date().toISOString()
    };

    
    my.getStorage({
      key: 'userGroups',
      success: (res) => {
        
        const groups = res.data || [];
        groups.push(finalGroupData);
        
        my.setStorage({
          key: 'userGroups',
          data: groups,
          success: () => {
            my.hideLoading();
            // Navigate to success page with group ID
            my.navigateTo({
              url: `/pages/groupCreated/groupCreated?groupId=${encodeURIComponent(groupId)}`
            });
          },
          fail: (err) => {
            my.hideLoading();
            console.error('Failed to save group data:', err);
            my.showToast({ content: 'Failed to create group wallet', type: 'fail' });
          }
        });
      },
      fail: (err) => {
        // If userGroups doesn't exist yet, create it with this group
        my.setStorage({
          key: 'userGroups',
          data: [finalGroupData],
          success: () => {
            my.hideLoading();
            // Navigate to success page with group ID
            my.navigateTo({
              url: `/pages/groupCreated/groupCreated?groupId=${encodeURIComponent(groupId)}`
            });
          },
          fail: (storageErr) => {
            my.hideLoading();
            console.error('Failed to create first group:', storageErr);
            my.showToast({ content: 'Failed to create group wallet', type: 'fail' });
          }
        });
      }
    });
  },

  onBackTap() {
    my.navigateBack();
  }
});