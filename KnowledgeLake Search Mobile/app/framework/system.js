define(["framework/logLevel", "i18n!nls/strings"], function (logLevel, strings) {
	var messageDisplayTime = 3000,
		isToastUp = false;
	
    return {
        logLevel: logLevel.Error,
        strings: strings,
		claimsSignInIndicators: ["wa=wsignin1.0", "_login", "Authenticate.aspx"],
		ajaxTimeout: 15000,
		setLogLevel: function (level) {
            this.logLevel = level;
        },
		logVerbose: function (msg) {
            var log = this.logLevel <= logLevel.Verbose;
            
            if (log) console.log(msg);
            
            return log;
        },
        logDebug: function (msg) {
            var log = this.logLevel <= logLevel.Debug;
            
            if (log) console.debug(msg);
            
            return log;
        },
        logWarning: function (msg) {
            var log = this.logLevel <= logLevel.Warn;
            
            if (log) console.warn(msg);
            
            return log;  
        },
        logError: function (msg) {
            var log = this.logLevel <= logLevel.Error;
            
            if (log) console.error(msg);
            
            return log;
        },
        logFatal: function (msg) {
            var log = this.logLevel <= logLevel.Fatal;
            
            if (log) console.error(msg);
            
            return log;
        },
		isRunningInSimulator: function () {
            // device uuids for simulated devices
            var iPhone = "e0101010d38bde8e6740011221af335301010333";
            var iPhone5 = "e0101010d38bde8e6740011221af335301010333";
            var iPad = "e0101010d38bde8e6740011221af335301010333";
            var Android = "e0908060g38bde8e6740011221af335301010333";
            var AndroidTablet = "e0101010d38bde8e6740011221af335301010333";
                      
            //for normal browsers
			if (!window.device) return true;
			
			// current device uuid
            var deviceUUID = device.uuid;
            
            if(deviceUUID === iPhone ||
                deviceUUID === iPhone5 ||
                deviceUUID === iPad ||
                deviceUUID === Android ||
                deviceUUID === AndroidTablet)
            {
                return true;
            }
            
            return false;
        },
		showToast: function (message) {
			var $msgbox = $("#messageBox");

			message = message || "";
			
			$msgbox.text(message);
			$msgbox.removeClass("fade-out");
			$msgbox.addClass("opaque");
			isToastUp = true;
			
			setTimeout(function () {
				$msgbox.addClass("fade-out");
				$msgbox.removeClass("opaque");
				isToastUp = false;
            }, messageDisplayTime);
        },
		isToastVisible: function() {
			return isToastUp;
        }
    };
});