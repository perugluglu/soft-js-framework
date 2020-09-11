/*
Source code created by Rustici Software, LLC is licensed under a 
Creative Commons Attribution 3.0 United States License
(http://creativecommons.org/licenses/by/3.0/us/)

Want to make SCORM easy? See our solutions at http://www.scorm.com.

This example provides for the bare minimum SCORM run-time calls.
It will demonstrate using the API discovery algorithm to find the
SCORM API and then calling Initialize and Terminate when the page
loads and unloads respectively. This example also demonstrates
some basic SCORM error handling.
*/

//Include the standard ADL-supplied API discovery algorithm

///////////////////////////////////////////
//Begin ADL-provided API discovery algorithm
///////////////////////////////////////////
var findAPITries = 0;

function findAPI(win) {
   // Check to see if the window (win) contains the API
   // if the window (win) does not contain the API and
   // the window (win) has a parent window and the parent window
   // is not the same as the window (win)
   while ((win.API == null) && (win.parent != null) && (win.parent != win)) {
      // increment the number of findAPITries
      findAPITries++;

      // Note: 7 is an arbitrary number, but should be more than sufficient
      if (findAPITries > 7) {
        console.warn("---\nHummm... =/\nAté achamos a API do SCORM 1.2, mas aconteceu algum problema.\n----");
        return null;
      }

      // set the variable that represents the window being
      // being searched to be the parent of the current window
      // then search for the API again
      win = win.parent;
   }
   return win.API;
}

function getAPI() {
   // start by looking for the API in the current window
   var theAPI = findAPI(window);

   // if the API is null (could not be found in the current window)
   // and the current window has an opener window
   if ((theAPI == null) && (window.opener != null) && (typeof(window.opener) != "undefined")) {
      // try to find the API in the current window�s opener
      theAPI = findAPI(window.opener);
   }
   // if the API has not been found
   if (theAPI == null) {
      // Alert the user that the API Adapter could not be found
      console.warn("---\nOps!\nNão encontramos nenhuma API do SCORM 1.2.\nTem certeza que existe?\n----");
   }
   return theAPI;
}

///////////////////////////////////////////
//End ADL-provided API discovery algorithm
///////////////////////////////////////////
  
//Create function handlers for the loading and unloading of the page

//Constants
var SCORM_TRUE = "true";
var SCORM_FALSE = "false";
var SCORM_NO_ERROR = "0";

//Since the Unload handler will be called twice, from both the onunload
//and onbeforeunload events, ensure that we only call LMSFinish once.
var finishCalled = false;

//Track whether or not we successfully initialized.
var initialized = false;

var API = null;

var scormInit = true;
var scormStudentID = null;
var scormStudentName = null;
var scormLessonStatus = null;
var scormScoreRaw = 0;
var scormSuspendData = null;
var scormManifestWriter = null;
var scormExit = null;

function ScormProcessInitialize() {
    var result;
    
    API = getAPI();
    
    if (API == null) {
        console.warn("---\nXiii...\nTentamos, mas não conseguimos conectar ao LMS.\nOs resultados podem não ser gravados.\nÉ isso que queremos?\n----");
        return;
    }
    
    result = API.LMSInitialize("");
    
    if (result == SCORM_FALSE) {
        var errorNumber = API.LMSGetLastError();
        var errorString = API.LMSGetErrorString(errorNumber);
        var diagnostic = API.LMSGetDiagnostic(errorNumber);
        
        var errorDescription = "Number: " + errorNumber + "\nDescription: " + errorString + "\nDiagnostic: " + diagnostic;
        
        console.warn("---\nXiii...\nTentamos, mas não conseguimos conectar ao LMS.\nOs resultados podem não ser gravados.\nÉ isso que queremos?\n" + errorDescription + '\n----');
        return;
    }
    
    initialized = true;

    ScormActions();
}

function ScormActions() {

    scormStudentID = ScormProcessGetValue('cmi.core.student_id');
    scormStudentName = ScormProcessGetValue('cmi.core.student_name').split(', ').reverse().join(' ');

    scormLessonStatus = {
        get: ScormProcessGetValue('cmi.core.lesson_status'),
        set: function(value) {
            ScormProcessSetValue('cmi.core.lesson_status', value);
            ScormActions();
            return value;
        }
    }
    if (scormInit == true) {
        scormInit = false;

        if (scormLessonStatus.get == 'not attempted') {
            scormLessonStatus.set('incomplete');
            console.warn('Olá, ' + scormStudentName + '.\nBem-vindo(a) à atividade!');
        }
        else if (scormLessonStatus.get == 'incomplete') {
            console.warn('Olá, ' + scormStudentName + '.\nBem-vindo(a) de volta à atividade!');
        }
        else if (scormLessonStatus.get == 'completed' || scormLessonStatus.get == 'passed') {
            console.warn('Olá, ' + scormStudentName + '.\nEsta atividade já foi concluída.');
        }
    }
    
    scormScoreRaw = {
        get: ScormProcessGetValue('cmi.core.score.raw'),
        set: function(value) {
            ScormProcessSetValue('cmi.core.score.raw', value);
            ScormActions();
            return value;
        },
        setMin: function(value) {
            ScormProcessSetValue('cmi.core.score.min', value);
            ScormActions();
            return value;
        },
        setMax: function(value) {
            ScormProcessSetValue('cmi.core.score.max', value);
            ScormActions();
            return value;
        }
    }
    
    scormSuspendData = {
        get: ScormProcessGetValue('cmi.suspend_data'),
        set: function(value) {
            ScormProcessSetValue('cmi.suspend_data', value);
            ScormActions();
            return value;
        }
    }
    
    scormManifestWriter = function(listPages) {
    
        if (listPages == undefined) console.warn('É necessário informar o parâmetro "index-only" ou "all-pages" para a listagem das páginas do SCORM.');
    
        var xmlDocument = '\
        <?xml version="1.0" encoding="UTF-8" standalone="no" ?>\n\n\
    \
        <manifest identifier="scorm-1.2" version="1"\n\
            xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"\n\
            xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"\n\
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n\
            xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd\n\
                                http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd\n\
                                http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">\n\n\
    \
            <metadata>\n\
                <schema>ADL SCORM</schema>\n\
                <schemaversion>1.2</schemaversion>\n\
                <adlcp:location>metadata.xml</adlcp:location>\n\
            </metadata>\n\n\
    \
            <organizations default="SOFTJS">\n\n\
    \
                <organization identifier="SOFTJS">\n\n\
    \
                    <title>' + soft.get('current-content-title') + '</title>\n\n';
    
        if (listPages == 'index-only') {
            xmlDocument += '\
                    <item identifier="index" identifierref="index" isvisible="true">\n\
                        <title>Index</title>\n\
                    </item>\n\n';
        }
        else if (listPages == 'all-pages') {
            var totalPages = soft.get('total-pages');
            var i = 0;
            if (softConfig.splashScreen == true) { totalPages++; i = 1; }
            for (i; i<totalPages; i++) {
                xmlDocument += '\
                    <item identifier="' + softContent[0].contentPages[i].pageId + '" identifierref="' + softContent[0].contentPages[i].pageId + '" isvisible="true">\n\
                        <title>' + softContent[0].contentPages[i].pageTitle.replace(/<[^>]*>?/gm, '') + '</title>\n\
                    </item>\n\n';
            }
        }
    
        xmlDocument += '\
                </organization>\n\n\
    \
            </organizations>\n\n\
    \
            <resources>\n\n';
            
        if (listPages == 'index-only') {
            xmlDocument += '\
                <resource identifier="index" type="webcontent" adlcp:scormtype="sco" href="index.html">\n\
                    <file href="index.html" />\n\
                </resource>\n\n';
        }
        else if (listPages == 'all') {
            var totalPages = soft.get('total-pages');
            var i = 0;
            if (softConfig.splashScreen == true) { totalPages++; i = 1; }
            for (i; i<totalPages; i++) {
                xmlDocument += '\
                <resource identifier="' + softContent[0].contentPages[i].pageId + '" type="webcontent" adlcp:scormtype="sco" href="index.html">\n\
                    <file href="index.html" />\n\
                </resource>\n\n';
            }
        }
    
        xmlDocument += '\
            </resources>\n\n\
    \
        </manifest>\n\n';
    
        return xmlDocument;
    
    }
    
    scormExit = function() {
        ScormProcessFinish();
    }

    document.body.setAttribute('onBeforeUnload', 'scormExit()');
    window.onbeforeunload = scormExit;
    window.addEventListener('unload', scormExit, false);

}

function ScormProcessGetValue(element) {
    
    var result;
    
    if (initialized == false || finishCalled == true) { return; }
    
    result = API.LMSGetValue(element);
    
    if (result == "") {
    
        var errorNumber = API.LMSGetLastError();
        
        if (errorNumber != SCORM_NO_ERROR) {
            var errorString = API.LMSGetErrorString(errorNumber);
            var diagnostic = API.LMSGetDiagnostic(errorNumber);
            
            var errorDescription = "Number: " + errorNumber + "\nDescription: " + errorString + "\nDiagnostic: " + diagnostic;
            
            console.warn("---\nPoxa...\nNão conseguimos recuperar os resultados do LMS.\n" + errorDescription + '\n----');
            return "";
        }
    }
    
    return result;
}

function ScormProcessSetValue(element, value) {
   
    var result;
    
    if (initialized == false || finishCalled == true) { return; }
    
    result = API.LMSSetValue(element, value);
    
    if (result == SCORM_FALSE) {
        var errorNumber = API.LMSGetLastError();
        var errorString = API.LMSGetErrorString(errorNumber);
        var diagnostic = API.LMSGetDiagnostic(errorNumber);
        
        var errorDescription = "Number: " + errorNumber + "\nDescription: " + errorString + "\nDiagnostic: " + diagnostic;
        
        console.warn("---\nXiii...\nTentamos, mas não conseguimos gravar os resultados no LMS.\n" + errorDescription + '\n----');
        return;
    }
    
}

function ScormProcessFinish() {
    
    var result;
    
    //Don't terminate if we haven't initialized or if we've already terminated
    if (initialized == false || finishCalled == true) { return; }
    
    ScormProcessSetValue('cmi.core.exit', 'suspend');
    
    result = API.LMSFinish("");
    
    finishCalled = true;
    
    if (result == SCORM_FALSE) {
        var errorNumber = API.LMSGetLastError();
        var errorString = API.LMSGetErrorString(errorNumber);
        var diagnostic = API.LMSGetDiagnostic(errorNumber);
        
        var errorDescription = "Number: " + errorNumber + "\nDescription: " + errorString + "\nDiagnostic: " + diagnostic;
        
        console.warn("---\nEita!\nNo finalzinho não conseguimos encerrar a comunicação com o LMS.\nOs resultados podem não ser registrados.\n" + errorDescription + '\n----');
        return;
    }
}

ScormProcessInitialize();