// pages/welcome/welcome.js - a static page
Page({
  data: {
    
  },

 

  onGetStartedTap() {
    console.log('Get Started tapped');
    
    my.redirectTo({
       url: '/pages/home/home' 
    });

  
  }
});