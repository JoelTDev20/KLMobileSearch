define(["knockout", "framework/FileTransfer"], function (ko, FileTransfer) {
    var resultsViewModel = function () {
        var self = this;
        
        self.resultDataSource = ko.observableArray([{"title":"pdf document", "url":"http://prodsp2010.dev.local/sites/team2/RyanLib/10Page.pdf", "icon":"app/images/icons/ICPDF.png"}]); 
        
        self.selectedResult = null;
        self.navBarVisible = ko.observable(true);
        
        self.SetDataSource = function (results) {
            if(results)
                self.resultDataSource(results);
        }
        
        self.init = function (e) {
            system.logVerbose("resultsViewModel init");
        }
        
        self.beforeShow = function (e) {
            system.logVerbose("resultsViewModel beforeShow");
        }
        
        self.show = function (e) {
            system.logVerbose("resultsViewModel show");
        }
        
        self.afterShow = function (e) {
            system.logVerbose("resultsViewModel afterShow");
        }
        
        self.hide = function (e) {
            system.logVerbose("resultsViewModel hide");
        }
        
        self.setSelectedResult = function (selection) {
            if(self.selectedResult === selection)
                self.selectedResult = null;
            
            else
                self.selectedResult = selection;
            
            self.navBarVisible(self.selectedResult);
        }
        
        self.downloadResult = function () {
            if(self.selectedResult)
            {
                var transferPromise = FileTransfer.transfer(self.selectedResult.url);
                
                transferPromise.done(function (result) {                    
                    console.log(result);
                });
                
                transferPromise.fail(function (result) {
                    // pop failure to download file
                });	     
            }
        }
            
        return self;
    };
    
    return resultsViewModel;
});