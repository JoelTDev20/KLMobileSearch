/*global QUnit*/
define(['require',
        'jquery',
        'knockout',
        'viewmodels/resultsViewModel',
        'viewmodels/savedSearchViewModel',
        "domain/result",
        "domain/site",
        "domain/credential",
        "domain/credentialType",
        "domain/promiseResponse/logonResponse"],
    function (require, $, ko, resultsViewModel, savedSearchViewModel, result, site, credential, credentialType, logonResponse) {
        QUnit.module("Testing resultsViewModel");
        
        QUnit.test("test SetDataSource if resultDataSource is already defined", function () {
            //arrange
            var vm;
			var resultData = [];
            resultData.push(new result("http://prodsp2010.dev.local/sites/team2/RyanLib/5Page.pdf", {"title":"pdf"}));
            
            vm = new resultsViewModel();
            vm.resultDataSource(["test", "data"]);
            
			//act
            vm.SetDataSource(resultData);
			
			//assert
            QUnit.equal(vm.resultDataSource(), resultData);
        });
        
        QUnit.test("test SetDataSource if resultDataSource is empty", function () {
            //arrange
            var vm;
			var resultData = [];
            resultData.push(new result("http://prodsp2010.dev.local/sites/team2/RyanLib/5Page.pdf", {"title":"pdf"}));
            
            vm = new resultsViewModel();            
            vm.resultDataSource([]);
            
			//act
            vm.SetDataSource(resultData);
			
			//assert
            QUnit.equal(vm.resultDataSource(), resultData);
        });
       
        QUnit.test("test resultViewModel ctor", function () {
            //arrange
            var vm;
            
            //act 
            vm = new resultsViewModel();
                        
            //assert
            QUnit.ok(vm);
            QUnit.ok(window.App);
			QUnit.ok(window.App.isMock);
        });    
        
        QUnit.test("test resultViewModel init", function () {
            //arrange
            var vm;
            
            vm = new resultsViewModel();
            
            //act 
            vm.init();
            
            //assert
            QUnit.ok(vm);
        }); 
        
        QUnit.test("test resultsViewModel swipe", function () {
            //arrange
            var vm,
                swipeObject = {"direction":"right"};
            
            vm = new resultsViewModel();
            
            
            //act
            vm.swipe(swipeObject);
                        
            //assert
            QUnit.ok(vm);
        });
        
        QUnit.test("test resultsViewModel beforeShow", function () {
            //arrange
            var vm;
            
            vm = new resultsViewModel();
            
            //act
            vm.beforeShow();
                        
            //assert
            QUnit.ok(vm);
        });
       
        QUnit.asyncTest("test resultsViewModel show", function () {
            //arrange
            var vm,
                savedSearchVM,
				keywordSearchPromise;
            
            savedSearchVM = new savedSearchViewModel();
			vm = new resultsViewModel();
            savedSearchVM.site = ko.observable(new site("http://prodsp2010.dev.local/sites/team4", "ProdSP2010", 15, new credential(credentialType.ntlm, "ryan.braun", "password", "dev")));
            savedSearchVM.keyword = ko.observable("ryan");
            
            window.savedSearchViewModel = savedSearchVM;
            
            //act
            keywordSearchPromise = vm.show();
                        
            //assert
            QUnit.ok(vm);
			QUnit.ok(keywordSearchPromise);
			
			keywordSearchPromise.done(function () {
				QUnit.ok(true);
				QUnit.start();
            });
			
			keywordSearchPromise.fail(function () {
				QUnit.ok(false);
				QUnit.start();
            });
        });
        
        QUnit.test("test resultsViewModel hide", function () {
            //arrange
            var vm;
            
            vm = new resultsViewModel();
            
            //act
            vm.hide();
                        
            //assert
            QUnit.equal(vm.selectedResult, null);
            QUnit.deepEqual(vm.resultDataSource(), []);
        });
        
        QUnit.test("test resultsViewModel setSelectedResult if selectedResult is null", function () {
            //arrange
            var vm;
            var resultData = new result("http://prodsp2010.dev.local/sites/team2/RyanLib/5Page.pdf", {"title":"pdf"});
            
            vm = new resultsViewModel();
            vm.selectedResult = null;
            
            //act
            vm.setSelectedResult(resultData);
                        
            //assert
            QUnit.equal(vm.selectedResult, resultData);
        });
        
        QUnit.test("test resultsViewModel setSelectedResult if selectedResult is equal", function () {
            //arrange
            var vm;
            var resultData = new result("http://prodsp2010.dev.local/sites/team2/RyanLib/5Page.pdf", {"title":"pdf"});
            
            vm = new resultsViewModel();
            vm.selectedResult = resultData;
            
            //act
            vm.setSelectedResult(resultData);
                        
            //assert
            QUnit.equal(vm.selectedResult, null);
        });
        
        QUnit.test("test resultsViewModel setSelectedResult if selectedResult is not equal", function () {
            //arrange
            var vm;
            var resultData = new result("http://prodsp2010.dev.local/sites/team2/RyanLib/5Page.pdf", {"title":"pdf"});
            var testData = new result("http://prodsp2010.dev.local/sites/team2/RyanLib/10Page.pdf", {"title":"pdf"});
            
            vm = new resultsViewModel();
            vm.selectedResult= resultData;
            
            //act
            vm.setSelectedResult(testData);
                        
            //assert
            QUnit.equal(vm.selectedResult, testData);
        });
        
        QUnit.test("test resultsViewModel isSelectedResult if navBarVisible false", function () {
            //arrange
            var vm,
                resultData = new result("http://prodsp2010.dev.local/sites/team2/RyanLib/10Page.pdf", {"title":"pdf"});
            
            vm = new resultsViewModel();
            vm.navBarVisible(false);
            
            //act
            var product = vm.isSelectedResult(resultData);
                        
            //assert
            QUnit.equal(product, false);
        });
        
        QUnit.test("test resultsViewModel isSelectedResult if navBarVisible true", function () {
            //arrange
            var vm,
                resultData = new result("http://prodsp2010.dev.local/sites/team2/RyanLib/5Page.pdf", {"title":"pdf"});    
            
            vm = new resultsViewModel();
            vm.navBarVisible(true);
            vm.selectedResult = resultData;
            
            //act
            var product = vm.isSelectedResult(resultData);
                        
            //assert
            QUnit.equal(product, true);
        });
        
        QUnit.test("test resultsViewModel editProperties", function () {
            //arrange
            var vm,
                resultData = new result("http://prodsp2010.dev.local/sites/team2/RyanLib/5Page.pdf", {"title":"pdf"});    
            
            vm = new resultsViewModel();
            vm.selectedResult = resultData;
            
            //act
            vm.editProperties();
                        
            //assert
            QUnit.ok(vm);
        });
        
        QUnit.asyncTest("test resultsViewModel navigateToResult", function () {
            //arrange
            var vm,
                savedSearchVM,
                resultData = new result("http://prodsp2010.dev.local/sites/team5/Simulation Library/2013022000028SIMSR101.TIF", {"title":"Invoice"}); 
            
            savedSearchVM = new savedSearchViewModel();
			vm = new resultsViewModel();
            savedSearchVM.site = ko.observable(new site("http://prodsp2010.dev.local/sites/team4", "ProdSP2010", 15, new credential(credentialType.ntlm, "ryan.braun", "password", "dev")));
            
            window.savedSearchViewModel = savedSearchVM;      
            
            //act
            var navigatePromise = vm.navigateToResult(resultData);    
                        
            //assert
            navigatePromise.done(function (result) {
                QUnit.ok(true);
                
                if (vm.windowRef) {
					vm.windowRef.close();
                }
                
                QUnit.start();
            });
            
            navigatePromise.fail(function (error) {
                QUnit.ok(false);
                QUnit.start();
            });
        });
      
        QUnit.asyncTest("test resultsViewModel keywordSearch bad credentials", function () {
            //arrange
            var vm,            
                siteData = new site("http://prodsp2010.dev.local/sites/team4", "ProdSP2010", 15, new credential(credentialType.ntlm, "ryan", "pw", "dev"));  
            
            vm = new resultsViewModel();
            
            //act
            var keywordSearchPromise = vm.keywordSearchAsync(siteData);
            
            //assert
            keywordSearchPromise.done(function (result) {
                QUnit.ok(false);
                QUnit.start();
            });
            
            keywordSearchPromise.fail(function (error) {
                QUnit.equal(error.response, logonResponse.LogonFailed);
                QUnit.start();
            });
        });
        
        QUnit.asyncTest("test resultsViewModel keywordSearch good credentials", function () {
            //arrange
            var vm,            
                siteData = new site("http://prodsp2010.dev.local/sites/team4", "ProdSP2010", 15, new credential(credentialType.ntlm, "ryan.braun", "password", "dev"));  
            
            vm = new resultsViewModel();
            
            //act
            var keywordSearchPromise = vm.keywordSearchAsync(siteData, "ryan");
            
            //assert
            keywordSearchPromise.done(function (result) {
                QUnit.ok(true);
                QUnit.start();
            });
            
            keywordSearchPromise.fail(function (error) {
                QUnit.ok(false);
                QUnit.start();
            });
        });
        
        QUnit.test("test resultViewModel afterShow", function () {
            //arrange
            var vm, 
                object = {"view": {"footer": {"find": function (control) { return {"data": function(control) { return {"clear": function () {}}}}}}}};
            
            vm = new resultsViewModel();
            
            //act 
            vm.afterShow(object);
            
            //assert
            QUnit.ok(vm);
        });
    });
