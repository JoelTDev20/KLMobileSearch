define(["jquery", 
		"system",
		"IWebsService",  
        "domain/promiseResponse/promiseResolveResponse", 
        "domain/promiseResponse/promiseRejectResponse", 
        "domain/promiseResponse/logonResponse"], 
	function ($, system, websService, PromiseResolveResponse, PromiseRejectResponse, logonResponse) {
		var claimsLogonService = function (siteUrl) {
			var self = this;
			
			self.isLoggingOn = false;
			self.windowRef = null;
                
			self.logonAsync = function () {
				var dfd = $.Deferred();
                
                if (self.isLoggingOn) return null;
                
                self.isLoggingOn = true;                        
                self.windowRef = window.open(siteUrl, "_blank");                                    
                
				self.windowRef.addEventListener("loadstart", function (e) {
					system.logVerbose("claimsLogonService.windowRef.loadstart: " + e.url);
                });
				
				self.windowRef.addEventListener("loaderror", function (e) {
					system.logVerbose("claimsLogonService.windowRef.loaderror: " + e.message);
                });
				
                self.windowRef.addEventListener("loadstop", function (e) {
					self.windowRef.currentUrl = e.url;
					
					system.logVerbose("claimsLogonService.windowRef.loadstop called!");
					
                    if (self.isLoggedOnUrl(e.url)) {
                        system.logVerbose(e.url + " successfully loaded in child window! Cookie should be obtained, closing child window."); 
                        self.windowRef.close();
                    }
                    else {
                        system.logVerbose(e.url + " loaded in child window...");
                    }
                });
                
                self.windowRef.addEventListener("exit", function (e) {                            
                    self.isLoggingOn = false;
                    
                    if (!self.isLoggedOnUrl(self.windowRef.currentUrl)) {
                        system.logVerbose(self.windowRef.currentUrl + " present when child browser closed! Cookie failed to be obtained."); 
                        dfd.reject(new PromiseRejectResponse(logonResponse.LogonFailed, null));          
                    }
					else {
						system.logVerbose("child window closed with successful result.");
						dfd.resolve(new PromiseResolveResponse(logonResponse.LogonSucceeded));
                    }							
                });
				
				return dfd.promise();
            };
			
			self.checkLogonStatusAsync = function () {
				var dfd = $.Deferred(),
					getWebPromise,
					service = new websService(siteUrl);
				
				//lightweight SP call to verify we are authenticated
				getWebPromise = service.GetWeb(siteUrl);
				
				getWebPromise.done(function () {
	                dfd.resolve(true);
	            });
				
	            getWebPromise.fail(function (XMLHttpRequest, textStatus, errorThrown) {
	                dfd.reject(false);
	            });
				
				return dfd.promise();
            };
			
            self.isLoggedOnUrl = function (url) {
				if (!url) return false;
				if (url.toUpperCase().indexOf(siteUrl.toUpperCase()) != 0) return false;
				
				for (var i = system.claimsSignInIndicators.length - 1; i >= 0; i--) {
					var indicator = system.claimsSignInIndicators[i];
					
					if (url.toUpperCase().indexOf(indicator.toUpperCase()) > -1) return false;
                }
				
                return true;
            };
			
			return self;
        };
		
		return claimsLogonService;
	});