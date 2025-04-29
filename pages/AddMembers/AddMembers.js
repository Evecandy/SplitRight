
Page({
  data: {
    groupDetails: { 
      name: '',
      desc: '',
      date: '',
      split: ''
    },
    memberInput: '',
    addedMembers: [
      
    ]
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
    // Navigate to the processing screen
    my.navigateTo({
      url: '/pages/creatingWallet/creatingWallet'

    });


    my.setStorage({
        key: 'newGroupData',
        data: {
            details: this.data.groupDetails,
            members: this.data.addedMembers
        },
        success: () => { console.log('Temp group data saved'); }
    });


  },

  onBackTap() {
    my.navigateBack();
  }
});

