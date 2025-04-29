

Page({
  data: {
    groups: [
      {
        id: 1,
        name: "Weekend Trip",
        amount: "12,500",
        members: 5,
        expiry: "Apr 15, 2025"
      },
      {
        id: 2,
        name: "Office Lunch Pool",
        amount: "3,200",
        members: 8,
        expiry: "Dec 31, 2025"
      }
    ]
  },
  onViewTap(){
    my.navigateTo({
      url: '/pages/groupDetail/groupDetails'
    })
  },
  onCreateTap(){
    my.navigateTo({
      url: '/pages/createGroup/createGroup',
   
    });
  }
}

);
