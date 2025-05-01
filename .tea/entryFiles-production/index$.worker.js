if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');
require('./importScripts$');

var AFAppX = self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;
self.requirePlugin = AFAppX.requirePlugin;


if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../pages/index/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/AddMembers/AddMembers?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/approvePayment/approvePayment?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/createGroup/createGroup?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/creatingWallet/creatingWallet?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/firstContribution/firstContribution?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/fundRedistribution/fundRedistribution?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/groupCreated/groupCreated?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/groupDetails/groupDetails?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/home/home?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/joinGroup/joinGroup?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/paymentApproved/paymentApproved?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/requestPayment/requestPayment?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/walletExpiration/walletExpiration?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}