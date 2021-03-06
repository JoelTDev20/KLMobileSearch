define(function () {
	
	if (!String.prototype.endsWith) {
		String.prototype.endsWith = function(suffix) {
		    return suffix != null && this.indexOf(suffix, this.length - suffix.length) !== -1;
		};
	}
	
	if (!String.prototype.startsWith) {
		String.prototype.startsWith = function (str){
		    return str != null && this.indexOf(str) == 0;
		};
	}
	
	if (!String.prototype.encodeXML) {
		String.prototype.encodeXML = function () {
			return this.replace(/&/g, '&amp;')
		           	.replace(/</g, '&lt;')
		           	.replace(/>/g, '&gt;')
		           	.replace(/"/g, '&quot;');
		};
	}
    
    if (!String.prototype.encodeXMLWithoutQuotes) {
		String.prototype.encodeXMLWithoutQuotes = function () {
			return this.replace(/&/g, '&amp;')
		           	.replace(/</g, '&lt;')
		           	.replace(/>/g, '&gt;');
		};
	}
	
	if (!String.prototype.encodeAngleBrackets) {
		String.prototype.encodeAngleBrackets = function () {
			return this.replace(/</g, '&lt;')
		           	.replace(/>/g, '&gt;');
		};
	}
});