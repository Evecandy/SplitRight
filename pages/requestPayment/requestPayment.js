
Page({
  data: {
    groupId: null, 
    billTitle: '',
    amount: '',
    description: '',
    payeeInfo: '',
    receiptImage: null, 
    receiptUrl: null 
  },

  onLoad(query) {
   
    const groupId = query.groupId; 
    console.log('Request Payment loaded for Group ID:', groupId);
    this.setData({ groupId: groupId });
     if (!groupId) {
        my.showToast({ content: 'Group context missing', type: 'fail' });
        
    }
  },

  handleInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({
      [field]: e.detail.value
    });
  },

  onUploadTap() {
    my.chooseImage({
      count: 1,
      success: (res) => {
        console.log('Image chosen:', res.tempFilePaths[0]);
        this.setData({
          receiptImage: res.tempFilePaths[0],
          receiptUrl: null 
        });
       
      },
      fail: (err) => {
        console.log('Image selection cancelled or failed:', err);
         my.showToast({ content: 'Image selection failed', type: 'none' });
      }
    });
  },

  
  uploadReceiptFile(filePath) {
      my.showLoading({ content: 'Uploading...' });
      
      my.uploadFile({
          url: 'YOUR_UPLOAD_API_ENDPOINT',
          filePath: filePath,
          fileName: 'receipt', 
          
          success: (res) => {
               my.hideLoading();
             
               const result = JSON.parse(res.data);
               if (result.success && result.url) {
                    console.log('Upload successful, URL:', result.url);
                    this.setData({ receiptUrl: result.url });
                     my.showToast({ content: 'Receipt uploaded', type: 'success' });
               } else {
                    console.error('Upload API error:', result.message);
                    my.showToast({ content: result.message || 'Upload failed', type: 'fail' });
                    
               }
          },
          fail: (err) => {
               my.hideLoading();
               console.error('Upload request failed:', err);
               my.showToast({ content: 'Upload failed', type: 'fail' });
               
          }
      });
  },


  onSubmitTap() {
   
    if (!this.data.billTitle || !this.data.amount || !this.data.description || !this.data.payeeInfo) {
      my.showToast({ content: 'Please fill all required fields', type: 'fail' });
      return;
    }
     if (!this.data.receiptImage) {
      my.showToast({ content: 'Please upload a receipt', type: 'fail' });
      return;
    }
    
    
    
    
   
    my.showLoading({ content: 'Submitting...' });
    
    my.uploadFile({
        url: 'SUBMIT_REQUEST_API_ENDPOINT', 
        filePath: this.data.receiptImage,
        fileName: 'receiptFile', 
        formData: { 
            groupId: this.data.groupId,
            title: this.data.billTitle,
            amount: this.data.amount,
            description: this.data.description,
            payee: this.data.payeeInfo
            
        },
        
        success: (res) => {
            my.hideLoading();
          
             try {
                 const result = JSON.parse(res.data);
                 if (result.success) {
                     my.showToast({ content: 'Request submitted!', type: 'success', duration: 2000 });
                     
                     setTimeout(() => {
                        
                         my.navigateBack();
                        
                     }, 2000);
                 } else {
                     my.showToast({ content: result.message || 'Submission failed', type: 'fail' });
                 }
             } catch (e) {
                  console.error("Failed to parse submit response:", res.data);
                  my.showToast({ content: 'Submission failed (invalid server response)', type: 'fail' });
             }
        },
        fail: (err) => {
             my.hideLoading();
             console.error('Submit request failed:', err);
             my.showToast({ content: 'Submission success', type: 'pass' });
        }
    });
  
  },
});
