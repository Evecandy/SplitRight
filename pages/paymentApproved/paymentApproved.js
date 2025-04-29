
Page({
  data: {
    requestId: null, 
    paymentDetails: { 
      title: 'Loading...',
      amount: '0',
      requestedBy: 'N/A',
      groupName: 'N/A',
      approvals: 0,
      requiredApprovals: 0,
      receiptUrl: null,
      receiptThumbnail: null
    }
  },

  onLoad(query) {
    const requestId = query.id; 
    console.log('Payment Approved page loaded for Request ID:', requestId);
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
      // TODO: Replace with your API call - Fetch details which should include final 'approved' status
      
      setTimeout(() => {
          my.hideLoading();
          if (requestId === 'PAY-123') { 
               this.setData({
                   paymentDetails: {
                       title: 'Hotel Booking',
                       amount: '5,000',
                       requestedBy: 'John',
                       groupName: 'Weekend Trip',
                       approvals: 3, 
                       requiredApprovals: 5, 
                       receiptUrl: '/images/sample-receipt.jpg',
                       receiptThumbnail: '/images/sample-receipt-thumb.jpg',
                       status: 'approved' 
                   }
               });
          } else {
               my.showToast({ content: 'Payment Request not found', type: 'fail' });
          }
      }, 500);
     
  },

  onViewReceiptTap() {
    if (this.data.paymentDetails.receiptUrl) {
      my.previewImage({
        urls: [this.data.paymentDetails.receiptUrl],
      });
    } else {
         my.showToast({ content: 'Receipt not available', type: 'none' });
    }
  },

  
});

