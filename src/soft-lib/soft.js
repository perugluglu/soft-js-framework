// Soft methods
var soft = {

	version: '1.1.3',
	lastUpdate: '14/09/2020',

	// Variables
	vars: {

		initApp: null,

		documentTitle: softConfig.global.documentTitle,

		navigatorInfo: {},

		currentLanguageIndex: parseInt(_.findKey(softContent, { languageClass: softConfig.global.defaultLanguage })),
		currentLanguageLabel: null,
		currentLanguageClass: null,

		hasSplashScreen: softConfig.splashScreen,
		
		currentContentTitle: null,
		currentContentClass: null,
		
		totalPages: null,

		pageIndex: null,
		pageTitle: null,
		pageId: null,
		pageClass: null,
		pageAttribute: null,

		pageTemplateId: null,
		pageTemplateClass: null,

		pageStatus: null,

		pageInMethod: null,

		findPage: null,

		lastPage: false,

		generalProgress: 0,

		message: null

	},
	
	// Navigator
	navigator: function(value) {

		var infoBrowser = navigator.userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
		var subInfoBrowser = navigator.userAgent.match(/\bOPR|Edge\/(\d+)/);

		if (infoBrowser[1] == 'Trident' || infoBrowser[1] == 'MSIE') {

			// IE
			soft.vars.navigatorInfo.browserName = 'IE';
			soft.vars.navigatorInfo.browserVersion = infoBrowser[2];
			
		}

		else if (infoBrowser[1] == 'Chrome' && subInfoBrowser != null) {

			// Opera
			if (subInfoBrowser[0] == 'OPR') {
				soft.vars.navigatorInfo.browserName = 'Opera';
				soft.vars.navigatorInfo.browserVersion = navigator.userAgent.match(/Opera|OPR\//).input.split('OPR/')[1].split('.')[0];
			}

			// Edge
			else {
				soft.vars.navigatorInfo.browserName = subInfoBrowser[0].split('/')[0]
				soft.vars.navigatorInfo.browserVersion = subInfoBrowser[1];
			}

		}

		// Chrome/Firefox
		else {
			soft.vars.navigatorInfo.browserName = infoBrowser[1];
			soft.vars.navigatorInfo.browserVersion = infoBrowser[2];
		}

		if (soft.vars.navigatorInfo.browserName == undefined) soft.vars.navigatorInfo.browserName = '';
		if (soft.vars.navigatorInfo.browserVersion == undefined) soft.vars.navigatorInfo.browserVersion = '';
		
		var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
		
		if (isMobile) {
			
			soft.vars.navigatorInfo.device = 'mobile';
			
			if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
				soft.vars.navigatorInfo.OSName = 'iOS';
				soft.vars.navigatorInfo.OSVersion = navigator.userAgent.match(/OS [\d_]+/i)[0].substr(3).replace('_', '-');
			}
			else {
				soft.vars.navigatorInfo.OSName = 'Android';
				soft.vars.navigatorInfo.OSVersion = navigator.userAgent.match(/Android\s([0-9\.]*)/i)[0].split('Android ')[1].split('.').join('-');
			}

		}
		else {

			soft.vars.navigatorInfo.device = 'desktop';

			soft.vars.navigatorInfo.OSVersion = '';

			if (navigator.appVersion.indexOf('Win') != -1) {
				soft.vars.navigatorInfo.OSName = 'Windows';

				if (soft.vars.navigatorInfo.browserName != 'Firefox') {
					soft.vars.navigatorInfo.OSVersion = navigator.appVersion.split('NT')[1].split(';')[0].trim().replace('.', '-').replace(')', '');
				}
			}
			else if (navigator.appVersion.indexOf('Mac') != -1) {
				soft.vars.navigatorInfo.OSName = 'MacOS';
			}
			else if (navigator.appVersion.indexOf('X11') != -1) {
				soft.vars.navigatorInfo.OSName = 'Unix';
			}
			else if (navigator.appVersion.indexOf('Linux') != -1) {
				soft.vars.navigatorInfo.OSName = 'Linux';
			}
			
			if (soft.vars.navigatorInfo.OSName == undefined) soft.vars.navigatorInfo.OSName = '';
			if (soft.vars.navigatorInfo.OSVersion == undefined) soft.vars.navigatorInfo.OSVersion = '';

		}

		soft.vars.navigatorInfo.appCodeName = navigator.appCodeName.replace(/\//gi, '-').replace(/;/gi, '');
		soft.vars.navigatorInfo.appName = navigator.appName.replace(/\//gi, '-').replace(/;/gi, '');
		soft.vars.navigatorInfo.appVersion = navigator.appVersion.replace(/\//gi, '-').replace(/;/gi, '');
		soft.vars.navigatorInfo.platform = navigator.platform.replace(/\//gi, '-').replace(/;/gi, '');
		soft.vars.navigatorInfo.product = navigator.product.replace(/\//gi, '-').replace(/;/gi, '');

		switch (value) {
			case 'browserName': return soft.vars.navigatorInfo.browserName; break;
			case 'browserVersion': return soft.vars.navigatorInfo.browserVersion; break;
			case 'isMobile': if (soft.vars.navigatorInfo.isMobile == undefined) return false; else true; break;
			case 'device': return soft.vars.navigatorInfo.device; break;
			case 'OSName': return soft.vars.navigatorInfo.OSName; break;
			case 'OSVersion': return soft.vars.navigatorInfo.OSVersion; break;
			case 'appCodeName': return soft.vars.navigatorInfo.appCodeName; break;
			case 'appName': return soft.vars.navigatorInfo.appName; break;
			case 'appVersion': return soft.vars.navigatorInfo.appVersion; break;
			case 'platform': return soft.vars.navigatorInfo.platform; break;
			case 'product': return soft.vars.navigatorInfo.product; break;
			default: return infoBrowser; break;
		}

	},
	
	// Internal Methods
	// Start application
	start: function() {

		soft.navigator();

		soft.vars.initApp = true;

		soft.vars.currentLanguageLabel = softContent[soft.vars.currentLanguageIndex].languageLabel;
		soft.vars.currentLanguageClass = softContent[soft.vars.currentLanguageIndex].languageClass;
		
		soft.vars.currentContentTitle = softContent[soft.vars.currentLanguageIndex].contentTitle;

		soft.vars.currentContentClass = softContent[soft.vars.currentLanguageIndex].contentClass;

		if (soft.vars.hasSplashScreen == true) {
			soft.vars.totalPages = softContent[soft.vars.currentLanguageIndex].contentPages.length - 1;
			soft.vars.pageIndex = 0;
		}
		else {
			soft.vars.totalPages = softContent[soft.vars.currentLanguageIndex].contentPages.length;
		}

		// Touch Callout
		if (softConfig.global.touchCallout == false) {
			$('body#soft').css({
				'-webkit-touch-callout': 'none',
				'-moz-touch-callout': 'none',
				'-ms-touch-callout': 'none',
				'touch-callout': 'none'
			});
		}

		// User Select
		if (softConfig.global.userSelect == false) {
			$('body#soft').css({
				'-webkit-user-select': 'none',
				'-moz-user-select': 'none',
				'-ms-user-select': 'none',
				'user-select': 'none'
			});
		}

		// User Drag
		if (softConfig.global.userDrag == false) {
			$('body#soft').css({
				'-webkit-user-drag': 'none',
				'-moz-user-drag': 'none',
				'-ms-user-drag': 'none',
				'user-drag': 'none',
			});
		}

		// Block Context Menu
		if (softConfig.global.blockContextMenu == true) {
			$(document).on('contextmenu', function(e) {
				e.preventDefault();
			});
		}

		// Block F12 Key and Ctrl+Shift+I
		if (softConfig.global.blockF12KeyAndCtrlShiftI == true) {
			$(document).keydown(function(event) {
				if (event.keyCode == 123) {
					return false;
				}
				else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {       
					return false;
				}
			});
		}

		// Add extensions css files <link> on <head>
		document.head.innerHTML += '<!-- Extensions CSS Files -->';
		for (var i=0; i<softConfig.extensions.length; i++) {
			if (softConfig.extensions[i].active == true) {
				for (var j=0; j<softConfig.extensions[i].extensionFiles.cssFiles.length; j++) {
					var cssFile = document.createElement('link');
					cssFile.rel = 'stylesheet';
					cssFile.type = 'text/css';
					cssFile.href = 'soft-extensions/' + softConfig.extensions[i].extensionPath + '/' + softConfig.extensions[i].extensionFiles.cssFiles[j];
					document.head.appendChild(cssFile);
				}
			}
		}
		document.head.innerHTML += '<!-- -->';

		// Add theme others css files <link> on <head>
		document.head.innerHTML += '<!-- Theme Others CSS Files -->';
		for (var i=0; i<softConfig.theme.themeFiles.cssFiles.length; i++) {
			var cssFile = document.createElement('link');
			cssFile.rel = 'stylesheet';
			cssFile.type = 'text/css';
			cssFile.href = 'soft-theme/' + softConfig.theme.themePath + '/' + softConfig.theme.themeFiles.cssFiles[i];
			document.head.appendChild(cssFile);
		}
		document.head.innerHTML += '<!-- -->';

		// Add extensions js files <script> on <body>
		document.body.innerHTML += '<!-- Extensions JS Files -->';
		for (var i=0; i<softConfig.extensions.length; i++) {
			if (softConfig.extensions[i].active == true) {
				for (var j=0; j<softConfig.extensions[i].extensionFiles.jsFiles.length; j++) {
					var jsFile = document.createElement('script');
					jsFile.type = 'text/javascript';
					jsFile.src = 'soft-extensions/' + softConfig.extensions[i].extensionPath + '/' + softConfig.extensions[i].extensionFiles.jsFiles[j];
					document.body.appendChild(jsFile);
				}
			}
		}
		document.body.innerHTML += '<!-- -->';

		// Add theme others js files <script> on <body>
		document.body.innerHTML += '<!-- Theme Others JS Files -->';
		for (var i=0; i<softConfig.theme.themeFiles.jsFiles.length; i++) {
			var jsFile = document.createElement('script');
			jsFile.type = 'text/javascript';
			jsFile.src = 'soft-theme/' + softConfig.theme.themePath + '/' + softConfig.theme.themeFiles.jsFiles[i];
			document.body.appendChild(jsFile);
		}
		document.body.innerHTML += '<!-- -->';

		// Resize window
		$(window).resize(function() {
			soft.toScale();

			// FullScreen autodetect
			if (window.innerWidth != screen.width || window.innerHeight != screen.height) {
				soft.fullScreen('off');
				$('#soft').removeClass('fullscreen');
			}
		});

		// On change hash URL
		$(window).bind('hashchange', function() {
			soft.checkUrlHash();
		});

		$('html').attr('lang', soft.vars.currentLanguageClass);

		$('body#soft').addClass(soft.vars.navigatorInfo.device + ' ' + soft.vars.navigatorInfo.platform + ' ' + soft.vars.navigatorInfo.OSName + ' ' + soft.vars.navigatorInfo.OSVersion + ' ' + soft.vars.navigatorInfo.browserName + ' ' + soft.vars.navigatorInfo.browserVersion + ' ' + soft.vars.navigatorInfo.appCodeName + ' ' + soft.vars.navigatorInfo.appName + ' ' + soft.vars.navigatorInfo.appVersion + ' ' + soft.vars.navigatorInfo.product);

		$('body#soft').append('<main id="' + softConfig.theme.themePath + '" class="' + soft.vars.currentLanguageClass + '"><section id="soft-pages" class="' + soft.vars.currentContentClass + '"></section></main>');

		soft.checkUrlHash();

	},

	// Check URL Hash
	checkUrlHash: function() {

		soft.blockAll(true);

		var splitHashAll = null;

		if (location.hash != '') {
			splitHashAll = location.hash.split('#')[1];
			
			soft.vars.findPage = parseInt(_.findKey(softContent[soft.vars.currentLanguageIndex].contentPages, { pageId: splitHashAll }));

			if (!isNaN(soft.vars.findPage)) {
				soft.vars.pageStatus = softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.findPage].pageStatus;
				if (soft.vars.pageStatus == 'inactive') {
					soft.vars.message = softContent[soft.vars.currentLanguageIndex].contentGlobal.messages.pageInactive;
					console.warn(soft.vars.message);
					window.history.back();
					return false;
				}

				if (soft.vars.hasSplashScreen == true && soft.vars.initApp == true) {
					soft.vars.pageIndex = 0;
				}
				else {
					soft.vars.pageIndex = parseInt(soft.vars.findPage);
				}
			}
			else {
				soft.vars.message = softContent[soft.vars.currentLanguageIndex].contentGlobal.messages.pageNotFound;
				console.warn(soft.vars.message);
				window.history.back();
				return false;
			}
		}
		else {
			soft.vars.pageIndex = 0;
		}

		$('link#style-page').remove();
		$('script#script-page').remove();

		// Add page js file <script> on <body>
		var pageFilePath = document.createElement('script');
		pageFilePath.type = 'text/javascript';
		pageFilePath.id = 'script-page';
		pageFilePath.src = 'soft-content/' + softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.pageIndex].pageFilePath;
		document.body.appendChild(pageFilePath);

	},

	// Building the basic structure of the page
	pageBuild: function() {

		// Page Title and Page Id - soft-content.js
		soft.vars.pageTitle = softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.pageIndex].pageTitle;
		soft.vars.pageId = softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.pageIndex].pageId;

		// Page Content -> var softPage - page.js
		softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.pageIndex].pageContent = softPage; 

		// Page.js
		soft.vars.pageClass = softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.pageIndex].pageContent.pageClass;
		soft.vars.pageAttribute = softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.pageIndex].pageContent.pageAttribute;

		soft.vars.pageStatus = softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.pageIndex].pageContent.pageStatus;
		soft.vars.pageInMethod = softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.pageIndex].pageContent.pageInMethod;

		if (soft.vars.hasSplashScreen == true && soft.vars.pageIndex == 0) {
			$(document).attr('title', soft.vars.currentContentTitle.replace(/<[^>]*>?/gm, '') + softConfig.global.documentTitleSeparator + soft.vars.documentTitle.replace(/<[^>]*>?/gm, ''));
		}
		else {
			$(document).attr('title', soft.vars.pageTitle.replace(/<[^>]*>?/gm, '') + softConfig.global.pageTitleSeparator + soft.vars.currentContentTitle.replace(/<[^>]*>?/gm, '') + softConfig.global.documentTitleSeparator + soft.vars.documentTitle.replace(/<[^>]*>?/gm, ''));
		}

		$('body#soft > main').removeAttr('class').addClass(soft.vars.currentLanguageClass).addClass('main-' + soft.vars.pageId).addClass('main-' + soft.vars.pageClass);
		$('body#soft > main > section#soft-pages *').remove();
		$('body#soft > main > section#soft-pages').append('<div id="' + soft.vars.pageId + '" class="soft-current-page ' + soft.vars.pageClass + '" ' + soft.vars.pageAttribute + '></div>');

		if (soft.vars.initApp == true) {
			setTimeout(soft.themeInit, 1000);
		}
		else {
			soft.pageLoader(soft.vars.pageIndex);
		}

	},

	// Theme Init
	themeInit: function() {

		if (typeof theme !== 'undefined' && typeof theme.init !== 'undefined') {
			theme.init();
			soft.pageLoader(soft.vars.pageIndex);
		}
		else {
			setTimeout(soft.themeInit, 100);
		}

	},

	// Start load files
	pageLoader: function(page) {

		if (page == undefined) {
			console.warn('Insert a parameter "pageIndex" or "pageId"');
			return false;
		}

		var loadPageIndex = null;

		if (isNaN(page)) {
			loadPageIndex = parseInt(_.findKey(softContent[soft.vars.currentLanguageIndex].contentPages, { pageId: page }));
		}
		else {
			loadPageIndex = page;
		}

		console.warn('Page loaded: ' + softContent[soft.vars.currentLanguageIndex].contentPages[loadPageIndex].pageTitle);
		
		var totalPageFiles = softContent[soft.vars.currentLanguageIndex].contentPages[loadPageIndex].pageContent.pageLoader.loaderFiles.files.length;
		
		if (totalPageFiles > 0) {

			var pageLoaderShowMethod = softContent[soft.vars.currentLanguageIndex].contentPages[loadPageIndex].pageContent.pageLoader.loaderShowMethod;
			eval(pageLoaderShowMethod);
			
			$.html5Loader({
				
				filesToLoad: softContent[soft.vars.currentLanguageIndex].contentPages[loadPageIndex].pageContent.pageLoader.loaderFiles,
				
				onUpdate: function (percentage) {
					if (softConfig.global.showLoaderPercentNumber == true) {
						soft.percentPageLoaded = percentage + '%';
					}
					if (percentage >= 100) {
						console.log(totalPageFiles + ' loaded file(s).\n\n');
					}
				},
				
				onComplete: function() {
					soft.content();
					soft.updateNavigation();
					eval(soft.pageInMethod());
				}

			});

		}
		else {

			console.log('0 loaded file.\n\n');

			soft.content();
			soft.updateNavigation();
			eval(soft.pageInMethod());

		}

	},

	// Callback Loaded Page
	pageInMethod: function() {

		soft.vars.pageInMethod = softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.pageIndex].pageContent.pageInMethod;
		return softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.pageIndex].pageContent.pageInMethod;

	},

	// Update Navigation
	updateNavigation: function() {

		$('body#soft .soft-prev-page').addClass('soft-inactive');
		$('body#soft .soft-next-page').addClass('soft-inactive');

		var pageStatus = null;
		if (soft.vars.hasSplashScreen == true) {
			if ((soft.vars.pageIndex - 1) > 0) {
				pageStatus = softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.pageIndex - 1].pageStatus;
				if (pageStatus != 'inactive') $('body#soft .soft-prev-page').removeClass('soft-inactive');
			}
			if ((soft.vars.pageIndex + 1) <= soft.vars.totalPages) {
				pageStatus = softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.pageIndex + 1].pageStatus;
				if (pageStatus != 'inactive') $('body#soft .soft-next-page').removeClass('soft-inactive');
			}
		}
		else {
			if ((soft.vars.pageIndex - 1) >= 0) {
				pageStatus = softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.pageIndex - 1].pageStatus;
				if (pageStatus != 'inactive') $('body#soft .soft-prev-page').removeClass('soft-inactive');
			}
			if ((soft.vars.pageIndex + 1) < soft.vars.totalPages) {
				pageStatus = softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.pageIndex + 1].pageStatus;
				if (pageStatus != 'inactive') $('body#soft .soft-next-page').removeClass('soft-inactive');
			}
		}

		if (soft.vars.hasSplashScreen == true) {
			$('body#soft .soft-pagination').html('<p><b>' + soft.vars.pageIndex + '</b> ' + softContent[soft.vars.currentLanguageIndex].contentGlobal.paginationSeparator + ' <b>' + soft.vars.totalPages + '</b></p>');
		}
		else {
			$('body#soft .soft-pagination').html('<p><b>' + (soft.vars.pageIndex + 1) + '</b> ' + softContent[soft.vars.currentLanguageIndex].contentGlobal.paginationSeparator + ' <b>' + soft.vars.totalPages + '</b></p>');
		}

		soft.progressBar();

	},

	// Progress Bar
	progressBar: function() {

		var progress = null;

		if (soft.vars.hasSplashScreen == true) {
			progress = (soft.vars.pageIndex / soft.vars.totalPages) * 100;
		}
		else {
			progress = ((soft.vars.pageIndex + 1) / soft.vars.totalPages) * 100;
		}

		if (soft.vars.generalProgress < progress) soft.vars.generalProgress = progress;

		return soft.vars.generalProgress + '%';

	},

	// Page Content With Template
	content: function() {

		var globalTemplate = softContent[soft.vars.currentLanguageIndex].contentGlobal.template;
		var pageTemplate = softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.pageIndex].pageContent.pageTemplate;
		
		if ((globalTemplate != '' || pageTemplate != '') && pageTemplate != 'no-template') {
			
			if (softContent[soft.vars.currentLanguageIndex].contentGlobal.template.templateId != '') {
				soft.vars.pageTemplateId = softContent[soft.vars.currentLanguageIndex].contentGlobal.template.templateId;
				soft.vars.pageTemplateClass = softContent[soft.vars.currentLanguageIndex].contentGlobal.template.templateClass;
			}

			if (pageTemplate != '') {
				if (softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.pageIndex].pageContent.pageTemplate.templateId != '') {
					soft.vars.pageTemplateId = softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.pageIndex].pageContent.pageTemplate.templateId;
					soft.vars.pageTemplateClass = softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.pageIndex].pageContent.pageTemplate.templateClass;
				}
			}

			var templateIndex = _.findKey(softContent[soft.vars.currentLanguageIndex].contentTemplates, { templateId: soft.vars.pageTemplateId });
			$('body#soft > main > section#soft-pages #' + soft.vars.pageId + '.soft-current-page').html('<div id="' + soft.vars.pageTemplateId + '" class="' + soft.vars.pageTemplateClass + '">' + softContent[soft.vars.currentLanguageIndex].contentTemplates[templateIndex].templateHTML + '</div>');
			$('body#soft > main > section#soft-pages #' + soft.vars.pageId + '.soft-current-page #' + soft.vars.pageTemplateId + ' .soft-content').html(softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.pageIndex].pageContent.pageCode);

		}
		else {
			$('body#soft > main > section#soft-pages #' + soft.vars.pageId + '.soft-current-page').html(softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.pageIndex].pageContent.pageCode);
		}

		soft.pageIncludes();

		soft.globalIncludes();

		soft.toScale();

	},

	// Page Include
	pageIncludes: function() {

		var totalPageIncludes = softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.pageIndex].pageContent.pageIncludes.length;
		if (totalPageIncludes > 0) {
			for (var i=0; i<totalPageIncludes; i++) {
				var pageIncludeId = softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.pageIndex].pageContent.pageIncludes[i].includeId;
				var pageIncludeHolder = softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.pageIndex].pageContent.pageIncludes[i].includeHolder;
				var pageIncludeClass = softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.pageIndex].pageContent.pageIncludes[i].includeClass;
				
				var contentIncludeIndex = _.findKey(softContent[soft.vars.currentLanguageIndex].contentIncludes, { includeId: pageIncludeId });
				var contentIncludeHTML = softContent[soft.vars.currentLanguageIndex].contentIncludes[contentIncludeIndex].includeHTML;

				$('body#soft > main > section#soft-pages #' + soft.vars.pageId + '.soft-current-page ' + pageIncludeHolder).append('<div id="' + pageIncludeId + '" class="' + pageIncludeClass + '">' + contentIncludeHTML + '</div>');
			}
		}

	},

	// Global Include
	globalIncludes: function() {

		var totalGlobalIncludes = softContent[soft.vars.currentLanguageIndex].contentGlobal.includes.length;
		if (totalGlobalIncludes > 0 && soft.vars.initApp == true) {
			for (var i=0; i<totalGlobalIncludes; i++) {
				var globalIncludeId = softContent[soft.vars.currentLanguageIndex].contentGlobal.includes[i].includeId;
				var globalIncludeClass = softContent[soft.vars.currentLanguageIndex].contentGlobal.includes[i].includeClass;
				
				var contentIncludeIndex = _.findKey(softContent[soft.vars.currentLanguageIndex].contentIncludes, { includeId: globalIncludeId });
				var contentIncludeHTML = softContent[soft.vars.currentLanguageIndex].contentIncludes[contentIncludeIndex].includeHTML;

				$('body#soft > main').append('<div id="' + globalIncludeId + '" class="' + globalIncludeClass + '">' + contentIncludeHTML + '</div>');
			}
		}

		soft.vars.initApp = false;

	},

	// Project Methods
	// Info
	info: function() {

		var softVersion = 'Version: ' + soft.version;
		var lastUpdate = 'Last Update: ' + soft.lastUpdate;

		var cssTitle =
		'color: rgb(101, 53, 219);' +
		'font-family: Arial, Helvetica, sans-serif;' +
		'font-size: 40px;' +
		'font-weight: bold;' +
		'line-height: 50px';

		var cssVersion =
		'color: rgb(0, 0, 0);' +
		'font-family: Arial, Helvetica, sans-serif;' +
		'font-size: 15px;' +
		'font-weight: bold;' +
		'line-height: 18px';

		var cssLastUpdate =
		'color: rgb(0, 0, 0);' +
		'font-family: Arial, Helvetica, sans-serif;' +
		'font-size: 11px;' +
		'font-weight: bold;' +
		'line-height: 16px';

		if (softConfig.global.initConsoleClear == false) {
			console.info('%cSoft.js', cssTitle);
			console.info('%c' + softVersion, cssVersion);
			console.info('%c' + lastUpdate, cssLastUpdate);
			console.info('Perugluglu Interactive');
			console.info('https://perugluglu.net\n\n');
		}

		return 'Enjoy! =]';

	},

	// Change Language
	changeLanguage: function(language) {

		$('body#soft > main').remove();

		if (language == undefined) {
			soft.vars.currentLanguageIndex = parseInt(_.findKey(softContent, { languageClass: softConfig.global.defaultLanguage }));
		}
		else {
			soft.vars.currentLanguageIndex = parseInt(_.findKey(softContent, { languageClass: language }));
			
			if (isNaN(soft.vars.currentLanguageIndex)) {
				soft.vars.currentLanguageIndex = parseInt(_.findKey(softContent, { languageClass: softConfig.global.defaultLanguage }));
				
				soft.vars.message = softContent[soft.vars.currentLanguageIndex].contentGlobal.messages.languageNotFound;
				console.warn(soft.vars.message);
			}
		}

		soft.start();

	},

	// Block and unlock page click
	blockAll: function(action) {

        if (action == true) {
            $('body#soft').addClass('events-none');
        }
        else if (action == false){
            $('body#soft').removeClass('events-none');
		}
		
	},
	
	// Message
	message: function() {

		eval(softConfig.methodNameMessages);

	},

	// Next Page
	nextPage: function() {

		if (soft.vars.hasSplashScreen == true) {
			if (soft.vars.pageIndex < soft.vars.totalPages) {
				soft.vars.pageIndex++;
			}
			else {
				soft.vars.lastPage = true;
			}
		}
		else {
			if (soft.vars.pageIndex < soft.vars.totalPages - 1) {
				soft.vars.pageIndex++;
			}
			else {
				soft.vars.lastPage = true;
			}
		}

		if (soft.vars.hasSplashScreen == true && soft.vars.pageIndex == 1 && soft.vars.findPage != null) {
			soft.vars.pageIndex = soft.vars.findPage;
		}

		soft.vars.pageId = softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.pageIndex].pageId;
		location.hash = '#' + soft.vars.pageId;
		
		if (soft.vars.findPage == soft.vars.pageIndex && soft.vars.lastPage == false) {

			$('link#style-page').remove();
			$('script#script-page').remove();

			// Add page js file <script> on <body>
			var pageFilePath = document.createElement('script');
			pageFilePath.type = 'text/javascript';
			pageFilePath.id = 'script-page';
			pageFilePath.src = 'soft-content/' + softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.pageIndex].pageFilePath;
			document.body.appendChild(pageFilePath);

		}

	},

	// Prev Page
	prevPage: function() {

		soft.vars.lastPage = false;

		if (soft.vars.hasSplashScreen == true) {
			if (soft.vars.pageIndex > 1) {
				soft.vars.pageIndex--;
			}
		}
		else {
			if (soft.vars.pageIndex > 0) {
				soft.vars.pageIndex--;
			}
		}

		soft.vars.pageId = softContent[soft.vars.currentLanguageIndex].contentPages[soft.vars.pageIndex].pageId;
		location.hash = '#' + soft.vars.pageId;

	},

	// Go To Page
	goToPage: function(page) {

		if (!isNaN(page)) {
			soft.vars.pageId = softContent[soft.vars.currentLanguageIndex].contentPages[page].pageId;
		}
		else {
			soft.vars.pageId = page;
		}

		soft.vars.findPage = parseInt(_.findKey(softContent[soft.vars.currentLanguageIndex].contentPages, { pageId: soft.vars.pageId }));

		location.hash = '#' + soft.vars.pageId;

	},

	// Current Page
	currentPage: function(value) {
		
		switch (value) {
			case 'index': return soft.vars.pageIndex; break;
			case 'title': return soft.vars.pageTitle; break;
			case 'id': return soft.vars.pageId; break;
			case 'class': return soft.vars.pageClass; break;
			case 'attribute': return soft.vars.pageAttribute; break;
			case 'templateId': return soft.vars.pageTemplateId; break;
			case 'templateClass': return soft.vars.pageTemplateClass; break;
			default: return soft.vars.pageIndex; break;
		}

	},

	// To Scale
	toScale: function() {

		$('.soft-scaled').each(function(){
			var holder = $(this);
			var initHolderWidth = holder.attr('initial-width');
			if (initHolderWidth == undefined) initHolderWidth = 1024;
			var initHolderHeight = holder.attr('initial-height');
			if (initHolderHeight == undefined) initHolderHeight = 768;
	
			var parentWidth = holder.parent().width();
			var parentHeight = holder.parent().height();
	
			var proportion = initHolderWidth / initHolderHeight;
	
			var resizedHeight = parentHeight;
			var resizedWidth = resizedHeight * proportion;
			if (parentWidth < resizedWidth) {
				resizedWidth = parentWidth;
				resizedHeight = resizedWidth / proportion;
			}
	
			widthScale = ((resizedWidth / initHolderWidth) * 100) / 100;
			heightScale = ((resizedHeight / initHolderHeight) * 100) / 100;
	
			holder.css({
				'width': initHolderWidth,
				'height': initHolderHeight,
				'position': 'absolute',
				'top': '50%',
				'left': '50%',
				'-webkit-transform': 'scale(' + widthScale + ',' + heightScale + ')',
				'-moz-transform': 'scale(' + widthScale + ',' + heightScale + ')',
				'-ms-transform': 'scale(' + widthScale + ',' + heightScale + ')',
				'-o-transform': 'scale(' + widthScale + ',' + heightScale + ')',
				'transform': 'scale(' + widthScale + ',' + heightScale + ')',
				'margin-top': (initHolderHeight / 2) * -1,
				'margin-left': (initHolderWidth / 2) * -1
			});
		});

	},

	// Accessibility
	accessibility: {

		// Invert Color
		invertColor: function() {
			if ($('#soft').hasClass('invert-color')) {
				$('#soft').removeClass('invert-color');
			}
			else {
				$('#soft').addClass('invert-color');
			}
		}

	},

	// Fullscreen
	fullScreen: function(action) {

		if (action == undefined) {
			console.warn('Insert a parameter "on" or "off"');
			return false;
		}
		
		if (action == 'on') {
			document.documentElement.requestFullscreen();
			$('#soft').addClass('fullscreen');
		}
		else if (action == 'off') {
			if (document.fullscreenElement) {
				document.exitFullscreen();
				$('#soft').removeClass('fullscreen');
			}
		}

	}

	/*
	score: {

		get: function() {

		},

		set: function() {

		}

	},

	timer: function() {

	},

	console: function() {

	}*/

}

// Add favicon <link> on <head>
var favicon = document.createElement('link');
favicon.rel = 'shortcut icon';
favicon.type = 'image/x-icon';
if (softConfig.theme.themeFaviconFilePath == '')
	favicon.href = 'soft-lib/assets/img/favicon.png';
else
	favicon.href = 'soft-theme/' + softConfig.theme.themePath + '/' + softConfig.theme.themeFaviconFilePath;
document.head.appendChild(favicon);

// On ready document
$(document).ready(function() {
	soft.start();
	soft.info();

	// Lock F11 to not activate full screen
	$(document).on('keydown', function(e) {
		if (e.keyCode === 122) return false;
	});
});