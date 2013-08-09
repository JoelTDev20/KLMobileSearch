/*global QUnit*/
define(['services/claimsLogonService'],
    function (claimsLogonService) {
		var claimsTestUrl = "https://knowledgelake.sharepoint.com",
			office365SigninIndicator = "wa=wsignin1.0";
		
        QUnit.module("Testing claimsLogonService");

        QUnit.test("test can claimsLogonService initialize properly", function () {
            //arrange
            var service;
			
            //act 
			service = new claimsLogonService();
                        
            //assert
            QUnit.ok(service);
        });  
			
		QUnit.test("claimsLogonService.isLoggedOnUrl: exact URL with Office 365 Logon is false", function () {
			//arrange
			var service;
			
			//act
			service = new claimsLogonService(claimsTestUrl);
			
			//assert
			QUnit.equal(service.isLoggedOnUrl(claimsTestUrl + office365SigninIndicator), false);
        });
			
		QUnit.test("claimsLogonService.isLoggedOnUrl with exact url is true", function () {
			//arrange
			var service;
			
			//act
			service = new claimsLogonService(claimsTestUrl);
			
			//assert
			QUnit.ok(service);
			QUnit.equal(service.isLoggedOnUrl(claimsTestUrl), true);
        });
		
		QUnit.test("claimsLogonService.isLoggedOnUrl: wrong url returns false", function () {
			//arrange
			var service;
			
			//act
			service = new claimsLogonService(claimsTestUrl);
			
			//assert
			QUnit.equal(service.isLoggedOnUrl("http://www.google.com"), false);
        });
		
		QUnit.asyncTest("test claimsLogonService.logon pops window or logs on", function () {
			//arrange
            var service,
				logonPromise;
			
            //act 
			service = new claimsLogonService(claimsTestUrl);
			logonPromise = service.logon();
			
            //assert
			QUnit.ok(logonPromise);
			
			//give it 3 s to load properly
			setTimeout(function () {
				if (service.windowRef && !service.isLoggedOnUrl(service.windowRef.currentUrl)) {
					service.windowRef.close();
                }
            }, 3000);
			
			logonPromise.done(function () {
				QUnit.ok(service.isLoggedOnUrl(service.windowRef.currentUrl));
				
				QUnit.start();
            });
			
			logonPromise.fail(function () {
				QUnit.ok(!service.isLoggedOnUrl(service.windowRef.currentUrl));
				
				QUnit.start();
            });					
        });
		
		QUnit.asyncTest("test claimsLogonService.checkLogonStatus returns correct value", function () {
			//arrange
            var service,
				logonPromise,
				checkStatusPromise;
			
            //act 
			service = new claimsLogonService(claimsTestUrl);
			logonPromise = service.logon();
			
            //assert
			QUnit.ok(logonPromise);
			
			//give it 3 s to load properly
			setTimeout(function () {
				if (service.windowRef && !service.isLoggedOnUrl(service.windowRef.currentUrl)) {
					service.windowRef.close();
                }
            }, 3000);
			
			logonPromise.done(function () {
				//now check the status -- should be TRUE
				checkStatusPromise = service.checkLogonStatus();
				
				QUnit.ok(checkStatusPromise);
				
				checkStatusPromise.done(function () {
					QUnit.ok(true, "claims IS logged on");
					QUnit.start();
                });
				
				checkStatusPromise.fail(function () {
					QUnit.ok(false, "claimsLogonService.checkLogonStatus returned FALSE when it should have been true");
					QUnit.start();
                });							
            });
			
			logonPromise.fail(function () {
				//if logon failed, make sure we popped the window
				QUnit.ok(service.windowRef);
				
				//just close it and tell the other tests we are not logged on
				service.windowRef.close();
				
				//now check the status -- should be FALSE
				checkStatusPromise = service.checkLogonStatus();
				
				QUnit.ok(checkStatusPromise);
				
				checkStatusPromise.done(function () {
					QUnit.ok(false, "claims IS logged on and previously said it was not");
					QUnit.start();
                });
				
				checkStatusPromise.fail(function () {
					QUnit.ok(true, "claimsLogonService.checkLogonStatus is correctly not logged on");
					QUnit.start();
                });			
            });					
        });
	});