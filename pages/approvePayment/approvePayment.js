
Page({
  data: {
    requestId: null, // Passed via query params
    paymentDetails: { // Example structure, fetch real data
      title: 'Loading...',
      amount: '0',
      requestedBy: 'N/A',
      groupName: 'N/A',
      approvals: 0,
      requiredApprovals: 0,
      receiptUrl: null, // URL to full receipt image/pdf
      receiptThumbnail: null // Optional URL to thumbnail
    },
    comment: '',
    hasVoted: false // Indicates if the current user has already voted
  },

  onLoad(query) {
    const requestId = query.id; // Expecting request ID like ?id=PAY-123
    console.log('Approve Payment loaded for Request ID:', requestId);
    if (!requestId) {
        console.error("Error: Request ID is missing!");
        my.showToast({ content: 'Error: Invalid request ID', type: 'fail' });
        // my.navigateBack();
        return;
    }
    this.setData({ requestId: requestId });
    this.fetchPaymentDetails(requestId);
  },

  fetchPaymentDetails(requestId) {
     my.showLoading({ content: 'Loading...' });
      // TODO: Replace with your API call
      // Example API call structure
      /*
      my.request({
          url: `YOUR_API/paymentRequestDetails?id=${requestId}`,
          // headers: { 'Authorization': 'Bearer YOUR_TOKEN' },
          success: (res) => {
               my.hideLoading();
               if (res.data.success) {
                   console.log("Fetched details:", res.data.details);
                   // Check if user has voted based on API response
                   const alreadyVoted = res.data.details.currentUserVoteStatus !== 'pending'; // Example check
                   this.setData({
                       paymentDetails: res.data.details,
                       hasVoted: alreadyVoted
                    });
               } else {
                   my.showToast({ content: res.data.message || 'Failed to load details', type: 'fail' });
                   // Maybe navigate back if request not found
               }
          },
          fail: (err) => {
              my.hideLoading();
              console.error("Fetch details failed:", err);
              my.showToast({ content: 'Network error', type: 'fail' });
          }
      });
      */
      // --- Simulation ---
      setTimeout(() => {
          my.hideLoading();
          if (requestId === 'PAY-123') { // Simulate finding the request
               this.setData({
                   paymentDetails: {
                       title: 'Hotel Booking',
                       amount: '5,000',
                       requestedBy: 'John',
                       groupName: 'Weekend Trip',
                       approvals: 2, // Example status
                       requiredApprovals: 5,
                       receiptUrl: '/images/sample-receipt.jpg', // Placeholder URL
                       receiptThumbnail: '/images/sample-receipt-thumb.jpg' // Placeholder thumb
                   },
                   // Simulate if user has voted (set to false to allow voting)
                   hasVoted: false
               });
          } else {
               my.showToast({ content: 'Payment Request not found', type: 'fail' });
               // Navigate back or show error state
          }
      }, 500);
      
  },

  onViewReceiptTap() {
    if (this.data.paymentDetails.receiptUrl) {
      my.previewImage({
        urls: [this.data.paymentDetails.receiptUrl], // API expects an array of URLs
      });
    } else {
         my.showToast({ content: 'Receipt not available', type: 'none' });
    }
  },

  handleInput(e) {
    // Handle comment input
    const field = e.currentTarget.dataset.field;
    this.setData({
      [field]: e.detail.value
    });
  },

  onVoteTap(e) {
    if (this.data.hasVoted) return; // Prevent re-voting

    const vote = e.currentTarget.dataset.vote; // 'approve' or 'reject'
    const comment = this.data.comment;

    console.log(`Vote cast: ${vote}, Comment: ${comment}, Request ID: ${this.data.requestId}`);

    my.showLoading({ content: 'Submitting vote...' });
    // TODO: Replace with your API call to submit the vote
    /*
    my.request({
        url: 'YOUR_API/submitVote',
        method: 'POST',
        data: {
            requestId: this.data.requestId,
            vote: vote, // 'approve' or 'reject'
            comment: comment
            // user ID/token is likely implicit via auth headers
        },
        success: (res) => {
            my.hideLoading();
            if (res.data.success) {
                 my.showToast({ content: 'Vote submitted!', type: 'success' });
                 this.setData({ hasVoted: true }); // Update UI state

                 // Optional: Refresh details to show updated count immediately
                 // this.fetchPaymentDetails(this.data.requestId);

                 // Optional: Navigate back after success?
                 // setTimeout(() => { my.navigateBack(); }, 1500);

                 // Or navigate to the 'approved' view if the vote caused final approval?
                 // if (res.data.isNowApproved) {
                 //    my.redirectTo({ url: `/pages/paymentApproved/paymentApproved?id=${this.data.requestId}`});
                 // }

            } else {
                 my.showToast({ content: res.data.message || 'Failed to submit vote', type: 'fail' });
            }
        },
        fail: (err) => {
             my.hideLoading();
             console.error("Vote submission failed:", err);
             my.showToast({ content: 'Network error', type: 'fail' });
        }
    });
    */
    // --- Simulation ---
    setTimeout(() => {
        my.hideLoading();
        my.showToast({ content: 'Vote submitted!', type: 'success' });
        this.setData({ hasVoted: true }); // Lock UI

        // Simulate potential navigation after voting
         // setTimeout(() => { my.navigateBack(); }, 1500);
          // Or simulate immediate update and stay?
           const newApprovalCount = this.data.paymentDetails.approvals + (vote === 'approve' ? 1 : 0);
           this.setData({
                [`paymentDetails.approvals`]: newApprovalCount
           });
          // Simulate if it got fully approved
           if (newApprovalCount >= this.data.paymentDetails.requiredApprovals && vote === 'approve') {
                 my.showToast({ content: 'Payment Approved!', type: 'success', duration: 2000 });
                 setTimeout(() => {
                     my.redirectTo({ url: `/pages/paymentApproved/paymentApproved?id=${this.data.requestId}`});
                 }, 2000);
           }


    }, 800);
    // --- End Simulation ---
  }
});

