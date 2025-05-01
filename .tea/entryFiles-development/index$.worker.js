/**! __CODEPLACEHOLDER_START__ */ /*[PositionForHostEntryCodeBegin]*/ /**! __CODEPLACEHOLDER_END__ */
if(!self.__appxInited) {
self.__appxInited = 1;
require('@alipay/appx-compiler/lib/sjsEnvInit');

require('./config$');
require('./importScripts$');

      function getUserAgentInPlatformWeb() {
        return typeof navigator !== 'undefined' ? navigator.swuserAgent || navigator.userAgent || '' : '';
      }
      if(getUserAgentInPlatformWeb() && (getUserAgentInPlatformWeb().indexOf('LyraVM') > 0 || getUserAgentInPlatformWeb().indexOf('AlipayIDE') > 0) ) {
        var AFAppX = self.AFAppX.getAppContext ? self.AFAppX.getAppContext().AFAppX : self.AFAppX;
      } else {
        importScripts('https://appx/af-appx.worker.min.js');
        var AFAppX = self.AFAppX;
      }
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

if(AFAppX.compilerConfig){ AFAppX.compilerConfig.component2 = true; }

function success() {
require('../../app');
require('../../node_modules/antd-mini/es/Loading/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/antd-mini/es/Icon/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/antd-mini/es/Button/index?hash=19ce9f67101419dba449818e100154044fb178ab');
require('../../pages/index/index?hash=61b125165c769058bd27bd20fd6c8936bb62d4ae');
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