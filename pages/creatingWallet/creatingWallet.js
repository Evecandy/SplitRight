// pages/creatingWallet/creatingWallet.js
Page({
  data: {
    statusSteps: [
      { id: 1, text: 'Creating group profile', done: false },
      { id: 2, text: 'Registering members', done: false },
      { id: 3, text: 'Setting up M-Pesa wallet', done: false },
      { id: 4, text: 'Sending invitations', done: false },
      { id: 5, text: 'Finalizing setup', done: false }
    ],
    progressTimer: null, // To hold interval timer
    currentStep: 0,
    groupData: null // To hold data retrieved from storage
  },

  onLoad() {
    // Retrieve data saved by the previous screen
    my.getStorage({
        key: 'newGroupData',
        success: (res) => {
            if (res.data) {
                console.log('Retrieved group data:', res.data);
                this.setData({ groupData: res.data });
                 this.startCreationProcess(); // Start simulation/API call
            } else {
                 console.error("Failed to retrieve group data from storage.");
                 my.showToast({ content: 'Error: Missing group data', type: 'fail'});
                 my.navigateBack(); // Go back if data is missing
            }
        },
        fail: (err) => {
             console.error("Storage retrieval failed:", err);
             my.showToast({ content: 'Error retrieving data', type: 'fail'});
             my.navigateBack();
        }
    });
  },

  startCreationProcess() {
    // --- SIMULATION ---
    // In a real app, replace this simulation with your actual API calls
    // You'd likely make one call to start creation, then maybe poll for status
    // or use websockets.

    this.setData({ currentStep: 0 }); // Reset step counter

    const timer = setInterval(() => {
      const currentStepIndex = this.data.currentStep;
      if (currentStepIndex < this.data.statusSteps.length) {
        // Mark current step as done
        this.setData({
          [`statusSteps[${currentStepIndex}].done`]: true,
          currentStep: currentStepIndex + 1
        });
      } else {
        // All steps done
        clearInterval(this.data.progressTimer);
        this.setData({ progressTimer: null });
        console.log('Group creation simulation complete!');

        // Simulate getting a group ID
        const newGroupId = "WKD-" + new Date().getFullYear() + "-" + Math.random().toString(36).substring(2, 8).toUpperCase();

        // Navigate to Success screen
        my.redirectTo({ // Use redirectTo to replace processing screen
          url: `/pages/groupCreated/groupCreated?groupId=${newGroupId}`
          // Pass necessary details (like ID, maybe name, member count etc.)
          // Or save details associated with the ID to storage/server
        });
         // Clear temporary storage
         my.removeStorage({ key: 'newGroupData' });
      }
    }, 1500); // Simulate 1.5 second per step

    this.setData({ progressTimer: timer });
     // --- END SIMULATION ---

     // --- REAL API CALL EXAMPLE ---
     /*
     my.request({
         url: 'YOUR_API_ENDPOINT/createGroup',
         method: 'POST',
         data: {
             groupDetails: this.data.groupData.details,
             members: this.data.groupData.members
         },
         success: (res) => {
             if (res.data.success) {
                 // Start polling for status or handle response
                 // Mark steps done based on progress updates
                 // On completion:
                 my.redirectTo({ url: `/pages/groupCreated/groupCreated?groupId=${res.data.groupId}` });
                 my.removeStorage({ key: 'newGroupData' });
             } else {
                 my.showToast({ content: 'Group creation failed', type: 'fail' });
                 // Maybe navigate back or show error details
             }
         },
         fail: (err) => {
              my.showToast({ content: 'API request failed', type: 'fail' });
         }
     });
     */
     // --- END REAL API CALL ---
  },

  onCancelTap() {
    console.log('Cancel tapped');
    // Stop the process if possible (e.g., cancel API request)
    if (this.data.progressTimer) {
      clearInterval(this.data.progressTimer);
      this.setData({ progressTimer: null });
    }
     // Clear temporary storage if cancelling
     my.removeStorage({ key: 'newGroupData' });
    // Navigate back (or to dashboard)
    my.navigateBack(); // Or navigate to a specific page
  },

  onUnload() {
    // Clean up timer if the page is unloaded unexpectedly
    if (this.data.progressTimer) {
      clearInterval(this.data.progressTimer);
    }
  }
});

