// pages/welcome/welcome.js
Page({
  data: {
    
  },

  onLoad(query) {
    // Page load
    console.log('Welcome page loaded');
  },

  onGetStartedTap() {
    console.log('Get Started tapped');
    
    my.redirectTo({
       url: '/pages/home/home' 
    });

  
  }
});