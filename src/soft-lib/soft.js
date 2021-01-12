// Soft methods
var soft = {

	// Global Soft variables
	version: '2.0.0',
	lastUpdate: '12/02/2021',

	initApp: true,

	documentTitle: softConfig.documentTitle,

	navigatorInfo: {},

	languageIndex: parseInt(_.findKey(softContent, { languageClass: softConfig.defaultLanguage })),
	languageLabel: null,
	languageClass: null,

	hasSplashScreen: softConfig.splashScreen,
	
	contentTitle: null,
	
	totalPages: null,

	hashChanged: false,

	pageIndex: null,
	pageTitle: null,
	pageId: null,
	pageClass: null,
	pageAttribute: null,

	pageTemplateId: null,
	pageTemplateClass: null,

	findPage: null,

	lastPage: false,

	lastViewedPageId: null,
	lastViewedPageIndex: null,

	generalProgress: 0,

	message: null,
	
	// Navigator - Native method. Must not be called in the application
	navigator: function() {

		var infoBrowser = navigator.userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
		var subInfoBrowser = navigator.userAgent.match(/\bOPR|Edge\/(\d+)/);

		if (infoBrowser[1] == 'Trident' || infoBrowser[1] == 'MSIE') {

			// IE
			soft.navigatorInfo.browserName = 'IE';
			soft.navigatorInfo.browserVersion = infoBrowser[2];
			
		}

		else if (infoBrowser[1] == 'Chrome' && subInfoBrowser != null) {

			// Opera
			if (subInfoBrowser[0] == 'OPR') {
				soft.navigatorInfo.browserName = 'Opera';
				soft.navigatorInfo.browserVersion = navigator.userAgent.match(/Opera|OPR\//).input.split('OPR/')[1].split('.')[0];
			}

			// Edge
			else {
				soft.navigatorInfo.browserName = subInfoBrowser[0].split('/')[0]
				soft.navigatorInfo.browserVersion = subInfoBrowser[1];
			}

		}

		// Chrome/Firefox
		else {
			soft.navigatorInfo.browserName = infoBrowser[1];
			soft.navigatorInfo.browserVersion = infoBrowser[2];
		}

		if (soft.navigatorInfo.browserName == undefined) soft.navigatorInfo.browserName = '';
		if (soft.navigatorInfo.browserVersion == undefined) soft.navigatorInfo.browserVersion = '';
		
		var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
		
		if (isMobile) {
			
			soft.navigatorInfo.device = 'mobile';
			
			if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
				soft.navigatorInfo.OSName = 'iOS';
				soft.navigatorInfo.OSVersion = navigator.userAgent.match(/OS [\d_]+/i)[0].substr(3).replace('_', '-');
			}
			else {
				soft.navigatorInfo.OSName = 'Android';
				soft.navigatorInfo.OSVersion = navigator.userAgent.match(/Android\s([0-9\.]*)/i)[0].split('Android ')[1].split('.').join('-');
			}

		}
		else {

			soft.navigatorInfo.device = 'desktop';

			soft.navigatorInfo.OSVersion = '';

			if (navigator.appVersion.indexOf('Win') != -1) {
				soft.navigatorInfo.OSName = 'Windows';

				if (soft.navigatorInfo.browserName != 'Firefox') {
					soft.navigatorInfo.OSVersion = navigator.appVersion.split('NT')[1].split(';')[0].trim().replace('.', '-').replace(')', '');
				}
			}
			else if (navigator.appVersion.indexOf('Mac') != -1) {
				soft.navigatorInfo.OSName = 'MacOS';
			}
			else if (navigator.appVersion.indexOf('X11') != -1) {
				soft.navigatorInfo.OSName = 'Unix';
			}
			else if (navigator.appVersion.indexOf('Linux') != -1) {
				soft.navigatorInfo.OSName = 'Linux';
			}
			
			if (soft.navigatorInfo.OSName == undefined) soft.navigatorInfo.OSName = '';
			if (soft.navigatorInfo.OSVersion == undefined) soft.navigatorInfo.OSVersion = '';

		}

		soft.navigatorInfo.appCodeName = navigator.appCodeName.replace(/\//gi, '-').replace(/;/gi, '');
		soft.navigatorInfo.appName = navigator.appName.replace(/\//gi, '-').replace(/;/gi, '');
		soft.navigatorInfo.appVersion = navigator.appVersion.replace(/\//gi, '-').replace(/;/gi, '');
		soft.navigatorInfo.platform = navigator.platform.replace(/\//gi, '-').replace(/;/gi, '');
		soft.navigatorInfo.product = navigator.product.replace(/\//gi, '-').replace(/;/gi, '');

	},
	
	// Start application - Native method. Must not be called in the application
	start: function() {

		if (softConfig.defaultLanguage == '' || softConfig.defaultLanguage == undefined) {
			console.warn('Language not defined in "softConfig.defaultLanguage".');
			return false;
		}

		if (softConfig.showLanguageUrl == true) {
			if (location.hash.indexOf('#') != -1) {
				if (location.hash.split('#')[1].split('/')[0] != undefined && location.hash.split('#')[1].split('/')[0] != '' && location.hash.split('#')[1].split('/')[0] != softConfig.defaultLanguage) {
					soft.languageIndex = parseInt(_.findKey(softContent, { languageClass: location.hash.split('#')[1].split('/')[0] }));
					if (isNaN(soft.languageIndex)) {
						soft.message = softContent[soft.languageIndex].contentGlobal.messages.languageNotFound;
						console.warn(soft.message);
						return false;
					}
				}
			}
		}

		if (location.hash.indexOf('#') == -1 || softConfig.showLanguageUrl == false) {
			soft.languageIndex = parseInt(_.findKey(softContent, { languageClass: softConfig.defaultLanguage }));
		}
		else {
			soft.languageIndex = parseInt(_.findKey(softContent, { languageClass: location.hash.split('#')[1].split('/')[0] }));
		}

		if (isNaN(soft.languageIndex)) {
			console.warn('Language not found.');
			return false;
		}

		soft.languageLabel = softContent[soft.languageIndex].languageLabel;
		soft.languageClass = softContent[soft.languageIndex].languageClass;

		soft.contentTitle = softContent[soft.languageIndex].contentTitle;

		$('html').attr('lang', soft.languageClass);

		soft.navigator();

		if (soft.hasSplashScreen == true) {
			soft.totalPages = softContent[soft.languageIndex].contentPages.length - 1;
			soft.pageIndex = 0;
		}
		else {
			soft.totalPages = softContent[soft.languageIndex].contentPages.length;
		}

		// Touch Callout
		if (softConfig.touchCallout == false) {
			$('body#soft').css({
				'-webkit-touch-callout': 'none',
				'-moz-touch-callout': 'none',
				'-ms-touch-callout': 'none',
				'touch-callout': 'none'
			});
		}

		// User Select
		if (softConfig.userSelect == false) {
			$('body#soft').css({
				'-webkit-user-select': 'none',
				'-moz-user-select': 'none',
				'-ms-user-select': 'none',
				'user-select': 'none'
			});
		}

		// User Drag
		if (softConfig.userDrag == false) {
			$('body#soft').css({
				'-webkit-user-drag': 'none',
				'-moz-user-drag': 'none',
				'-ms-user-drag': 'none',
				'user-drag': 'none',
			});
		}

		// Block Context Menu
		if (softConfig.blockContextMenu == true) {
			$(document).on('contextmenu', function(e) {
				e.preventDefault();
			});
		}

		// Block F12 Key and Ctrl+Shift+I
		if (softConfig.blockF12KeyAndCtrlShiftI == true) {
			$(document).keydown(function(event) {
				if (event.keyCode == 123) {
					return false;
				}
				else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {       
					return false;
				}
			});
		}

		// Add tags on <head>
		document.head.innerHTML += '<!-- Head Tags -->';
		for (var i=0; i<softConfig.headTags.length; i++) {
			var headTag = document.createElement(softConfig.headTags[i].type);
			for (var j=0; j<softConfig.headTags[i].attributes.length; j++) {
				headTag.setAttribute(softConfig.headTags[i].attributes[j].attribute, softConfig.headTags[i].attributes[j].value);
			}
			document.getElementsByTagName('head')[0].appendChild(headTag);
		}
		document.head.innerHTML += '<!-- -->';

		// Add favicon <link> on <head>
		document.head.innerHTML += '<!-- Favicon -->';
		var softFavicon = document.createElement('link');
		softFavicon.setAttribute('rel', 'shortcut icon');
		softFavicon.setAttribute('type', 'image/x-icon');
		if (softConfig.theme.themeFaviconFilePath == '')
			softFavicon.setAttribute('href', 'soft-lib/assets/img/favicon.png');
		else
			softFavicon.setAttribute('href', 'soft-theme/' + softConfig.theme.themePath + '/' + softConfig.theme.themeFaviconFilePath);
		document.getElementsByTagName('head')[0].appendChild(softFavicon);
		document.head.innerHTML += '<!-- -->';

		// Add Soft CSS files <link> on <head>
		document.head.innerHTML += '<!-- Soft CSS File -->';
		var softCssFile = document.createElement('link');
		softCssFile.setAttribute('rel', 'stylesheet');
		softCssFile.setAttribute('type', 'text/css');
		softCssFile.setAttribute('href', 'soft-lib/assets/css/soft.css');
		document.getElementsByTagName('head')[0].appendChild(softCssFile);
		document.head.innerHTML += '<!-- -->';

		// Add JS Scripts on <head>
		document.head.innerHTML += '<!-- Head JS Scripts -->';
		var headJsScript = '<script>';
		for (var i=0; i<softConfig.headJsScripts.length; i++) {
			headJsScript += softConfig.headJsScripts[i];
			if (i < softConfig.headJsScripts.length - 1) headJsScript += '\n\n';
		}
		headJsScript += '</script>';
		document.head.innerHTML += headJsScript;
		document.head.innerHTML += '<!-- -->';

		// Add extensions css files <link> on <head>
		document.head.innerHTML += '<!-- Extensions CSS Files -->';
		for (var i=0; i<softConfig.extensions.length; i++) {
			if (softConfig.extensions[i].extensionActive == true) {
				var totalCssFiles = softConfig.extensions[i].extensionFiles.cssFiles.head.length;
				if (totalCssFiles > 0) document.head.innerHTML += '<!-- ' + softConfig.extensions[i].extensionName + ' -->';
				for (var j=0; j<totalCssFiles; j++) {
					var cssFile = document.createElement('link');
					cssFile.rel = 'stylesheet';
					cssFile.type = 'text/css';
					cssFile.href = 'soft-extensions/' + softConfig.extensions[i].extensionPath + '/' + softConfig.extensions[i].extensionFiles.cssFiles.head[j];
					document.head.appendChild(cssFile);
				}
			}
		}
		document.head.innerHTML += '<!-- -->';

		// Add extensions js files <script> on <head>
		document.head.innerHTML += '<!-- Extensions JS Files -->';
		for (var i=0; i<softConfig.extensions.length; i++) {
			if (softConfig.extensions[i].extensionActive == true) {
				var totalJsFiles = softConfig.extensions[i].extensionFiles.jsFiles.head.length;
				if (totalJsFiles > 0) document.head.innerHTML += '<!-- ' + softConfig.extensions[i].extensionName + ' -->';
				for (var j=0; j<totalJsFiles; j++) {
					var jsFile = document.createElement('script');
					jsFile.type = 'text/javascript';
					jsFile.src = 'soft-extensions/' + softConfig.extensions[i].extensionPath + '/' + softConfig.extensions[i].extensionFiles.jsFiles.head[j];
					document.head.appendChild(jsFile);
				}
			}
		}
		document.head.innerHTML += '<!-- -->';

		// Add theme css files <link> on <head>
		document.head.innerHTML += '<!-- Theme CSS Files -->';
		for (var i=0; i<softConfig.theme.themeFiles.cssFiles.head.length; i++) {
			var cssFile = document.createElement('link');
			cssFile.rel = 'stylesheet';
			cssFile.type = 'text/css';
			cssFile.href = 'soft-theme/' + softConfig.theme.themePath + '/' + softConfig.theme.themeFiles.cssFiles.head[i];
			document.head.appendChild(cssFile);
		}
		document.head.innerHTML += '<!-- -->';

		// Add theme js files <script> on <head>
		document.head.innerHTML += '<!-- Theme JS Files -->';
		for (var i=0; i<softConfig.theme.themeFiles.jsFiles.head.length; i++) {
			var jsFile = document.createElement('script');
			jsFile.type = 'text/javascript';
			jsFile.src = 'soft-theme/' + softConfig.theme.themePath + '/' + softConfig.theme.themeFiles.jsFiles.head[i];
			document.head.appendChild(jsFile);
		}
		document.head.innerHTML += '<!-- -->';

		$('body#soft').addClass(soft.navigatorInfo.device + ' ' + soft.navigatorInfo.platform + ' ' + soft.navigatorInfo.OSName + ' ' + soft.navigatorInfo.OSVersion + ' ' + soft.navigatorInfo.browserName + ' ' + soft.navigatorInfo.browserVersion + ' ' + soft.navigatorInfo.appCodeName + ' ' + soft.navigatorInfo.appName + ' ' + soft.navigatorInfo.appVersion + ' ' + soft.navigatorInfo.product);

		$('body#soft').append('<main id="' + softConfig.theme.themePath + '"></main>');
		$('body#soft > main').append('<section id="soft-pages"></section>');

		// Add extensions css files <link> on <body>
		document.body.innerHTML += '<!-- Extensions CSS Files -->';
		for (var i=0; i<softConfig.extensions.length; i++) {
			if (softConfig.extensions[i].extensionActive == true) {
				var totalCssFiles = softConfig.extensions[i].extensionFiles.cssFiles.body.length;
				if (totalCssFiles > 0) document.body.innerHTML += '<!-- ' + softConfig.extensions[i].extensionName + ' -->';
				for (var j=0; j<totalCssFiles; j++) {
					var cssFile = document.createElement('link');
					cssFile.rel = 'stylesheet';
					cssFile.type = 'text/css';
					cssFile.href = 'soft-extensions/' + softConfig.extensions[i].extensionPath + '/' + softConfig.extensions[i].extensionFiles.cssFiles.body[j];
					document.body.appendChild(cssFile);
				}
			}
		}
		document.body.innerHTML += '<!-- -->';

		// Add extensions js files <script> on <body>
		document.body.innerHTML += '<!-- Extensions JS Files -->';
		for (var i=0; i<softConfig.extensions.length; i++) {
			if (softConfig.extensions[i].extensionActive == true) {
				var totalJsFiles = softConfig.extensions[i].extensionFiles.jsFiles.body.length;
				if (totalJsFiles > 0) document.body.innerHTML += '<!-- ' + softConfig.extensions[i].extensionName + ' -->';
				for (var j=0; j<totalJsFiles; j++) {
					var jsFile = document.createElement('script');
					jsFile.type = 'text/javascript';
					jsFile.src = 'soft-extensions/' + softConfig.extensions[i].extensionPath + '/' + softConfig.extensions[i].extensionFiles.jsFiles.body[j];
					document.body.appendChild(jsFile);
				}
			}
		}
		document.body.innerHTML += '<!-- -->';

		// Add JS Scripts on <body>
		document.body.innerHTML += '<!-- Body JS Scripts -->';
		var bodyJsScript = '<script>';
		for (var i=0; i<softConfig.bodyJsScripts.length; i++) {
			bodyJsScript += softConfig.bodyJsScripts[i];
			if (i < softConfig.bodyJsScripts.length - 1) bodyJsScript += '\n\n';
		}
		bodyJsScript += '</script>';
		document.body.innerHTML += bodyJsScript;
		document.body.innerHTML += '<!-- -->';

		// Add theme css files <link> on <body>
		document.body.innerHTML += '<!-- Theme CSS Files -->';
		for (var i=0; i<softConfig.theme.themeFiles.cssFiles.body.length; i++) {
			var cssFile = document.createElement('link');
			cssFile.rel = 'stylesheet';
			cssFile.type = 'text/css';
			cssFile.href = 'soft-theme/' + softConfig.theme.themePath + '/' + softConfig.theme.themeFiles.cssFiles.body[i];
			document.body.appendChild(cssFile);
		}
		document.body.innerHTML += '<!-- -->';

		// Add theme js files <script> on <body>
		document.body.innerHTML += '<!-- Theme JS Files -->';
		for (var i=0; i<softConfig.theme.themeFiles.jsFiles.body.length; i++) {
			var jsFile = document.createElement('script');
			jsFile.type = 'text/javascript';
			jsFile.src = 'soft-theme/' + softConfig.theme.themePath + '/' + softConfig.theme.themeFiles.jsFiles.body[i];
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
			soft.hashChanged = true;
			soft.checkUrlHash();
		});

		soft.globalIncludes();

	},

	// Global Include - Native method. Must not be called in the application
	globalIncludes: function() {

		var totalGlobalIncludes = softContent[soft.languageIndex].contentGlobal.includes.length;
		if (totalGlobalIncludes > 0 && soft.initApp == true) {
			for (var i=0; i<totalGlobalIncludes; i++) {
				var globalIncludeId = softContent[soft.languageIndex].contentGlobal.includes[i].includeId;
				var globalIncludeClass = softContent[soft.languageIndex].contentGlobal.includes[i].includeClass;
				var globalIncludeHtml = softContent[soft.languageIndex].contentGlobal.includes[i].includeHtml;

				$('body#soft > main').append('<div id="' + globalIncludeId + '" class="' + globalIncludeClass + '">' + globalIncludeHtml + '</div>');
			}
		}

		soft.checkUrlHash();

	},

	// Check URL Hash - Native method. Must not be called in the application
	checkUrlHash: function() {

		soft.blockAll(true);

		var splitHashAll, pageActive;
			
		if (isNaN(soft.languageIndex)) {
			soft.message = softContent[soft.languageIndex].contentGlobal.messages.languageNotFound;
			console.warn(soft.message);
		}
		else {

			soft.languageLabel = softContent[soft.languageIndex].languageLabel;
			soft.languageClass = softContent[soft.languageIndex].languageClass;

			soft.contentTitle = softContent[soft.languageIndex].contentTitle;

			$('html').attr('lang', soft.languageClass);
			
			if (location.hash == '' || location.hash == '#' + soft.languageClass || location.hash == '#' + soft.languageClass + '/') {
				soft.pageIndex = 0;
				soft.pageBuild(soft.pageIndex, 'append');
			}
			else {
				if (softConfig.showLanguageUrl == true) {
					splitHashAll = location.hash.split('#' + soft.languageClass + '/')[1];
				}
				else {
					splitHashAll = location.hash.split('#')[1];
				}
				
				soft.findPage = parseInt(_.findKey(softContent[soft.languageIndex].contentPages, { pageId: splitHashAll }));

				if (isNaN(soft.findPage)) {
					soft.message = softContent[soft.languageIndex].contentGlobal.messages.pageNotFound;
					console.warn(soft.message);
				}
				else {
					pageActive = softContent[soft.languageIndex].contentPages[soft.findPage].pageActive;
					if (pageActive == false) {
						soft.message = softContent[soft.languageIndex].contentGlobal.messages.pageInactive;
						console.warn(soft.message);
					}
					else {
						if (soft.hasSplashScreen == true && soft.initApp == true) {
							soft.pageIndex = 0;
						}
						else {
							soft.pageIndex = parseInt(soft.findPage);
						}
						soft.pageBuild(soft.pageIndex, 'append');
					}
				}
			}

		}

	},

	// Building the pages
	pageBuild: function(page, position) {

		var pageIndex, pageId, pageClass, pageAttribute, pageFilePath, pageActive, pageVarBase;

		if (page == undefined) {
			console.warn('Enter the parameter value. Accepted values: "pageIndex" or "pageId"');
		}
		else {
			if (isNaN(page)) {
				pageId = page;
			}
			else {
				pageId = softContent[soft.languageIndex].contentPages[page].pageId;
			}

			pageIndex = parseInt(_.findKey(softContent[soft.languageIndex].contentPages, { pageId: pageId }));
			if (isNaN(pageIndex)) {
				console.warn('This page does not exist.');
			}
			else {
				if (position != undefined && position != 'prepend' && position != 'append') {
					console.warn('Position value not supported. Leave empty or use: "prepend" or "append".');
				}
				else {
					if ($('body#soft > main > section#soft-pages #' + pageId).length == 0) {

						if (position == undefined) position = 'append';
					
						pageClass = softContent[soft.languageIndex].contentPages[pageIndex].pageClass;
						pageAttribute = softContent[soft.languageIndex].contentPages[pageIndex].pageAttribute;
						pageActive = softContent[soft.languageIndex].contentPages[pageIndex].pageActive;

						if (pageActive == false) {
							console.warn(softContent[soft.languageIndex].contentGlobal.messages.pageInactive);
						}
						else {
							// Add pre page js file <script> on <body>
							pageFilePath = document.createElement('script');
							pageFilePath.type = 'text/javascript';
							pageFilePath.id = 'page-' + pageId;
							pageFilePath.src = 'soft-content/' + softContent[soft.languageIndex].contentPages[pageIndex].pageFilePath;
							document.body.appendChild(pageFilePath);

							pageVarBase = softContent[soft.languageIndex].contentPages[pageIndex].pageVarBase;

							var checkScriptPageLoaded = setInterval(function() {
								try {
									var pageHtml = eval(pageVarBase).pageHtml;
									clearInterval(checkScriptPageLoaded);

									if (position == 'prepend')
										$('body#soft > main > section#soft-pages').prepend('<div id="' + pageId + '" ' + pageAttribute +'></div>');
									else if (position == 'append')
										$('body#soft > main > section#soft-pages').append('<div id="' + pageId + '" ' + pageAttribute +'></div>');
									$('body#soft > main > section#soft-pages > #' + pageId).addClass('soft-page ' + pageClass);

									pageDestroy = softContent[soft.languageIndex].contentPages[pageIndex].pageDestroy;
									if (pageDestroy == false) $('body#soft > main > section#soft-pages > #' + pageId).addClass('no-destroy');

									var globalTemplate = softContent[soft.languageIndex].contentGlobal.template;
									var pageTemplate = eval(pageVarBase).pageTemplate;

									var pageTemplateId, pageTemplateClass;
									
									if ((globalTemplate != '' || pageTemplate != '') && pageTemplate != 'no-template') {
										
										if (softContent[soft.languageIndex].contentGlobal.template.templateId != '') {
											pageTemplateId = softContent[soft.languageIndex].contentGlobal.template.templateId;
											pageTemplateClass = softContent[soft.languageIndex].contentGlobal.template.templateClass;
										}

										if (pageTemplate != '') {
											if (eval(pageVarBase).pageTemplate.templateId != '') {
												pageTemplateId = eval(pageVarBase).pageTemplate.templateId;
												pageTemplateClass = eval(pageVarBase).pageTemplate.templateClass;
											}
										}

										var templateIndex = _.findKey(softContent[soft.languageIndex].contentTemplates, { templateId: pageTemplateId });
										$('body#soft > main > section#soft-pages > #' + pageId).html('<div id="' + pageTemplateId + '" class="' + pageTemplateClass + '">' + softContent[soft.languageIndex].contentTemplates[templateIndex].templateHtml + '</div>');
										$('body#soft > main > section#soft-pages > #' + pageId + ' #' + pageTemplateId + ' #soft-content').html(pageHtml);

									}
									else {
										$('body#soft > main > section#soft-pages > #' + pageId).html(pageHtml);
									}

									soft.pageIncludes(pageIndex);

									if (soft.initApp == true || soft.hashChanged == true) {
										soft.hashChanged = false;
										soft.pageShow(pageIndex);
									}
								}
								catch {}
							}, 10);
						}
					}
					else if (!$('body#soft > main > section#soft-pages #' + pageId).hasClass('soft-current-page')) {
						soft.hashChanged = false;
						soft.pageShow(pageIndex);
					}
					else {
						console.warn('This page is already built and visible.');
					}
				}
			}
		}

	},

	// Page Include - Native method. Must not be called in the application
	pageIncludes: function(pageIndex) {

		var pageId, pageVarBase;

		pageId = softContent[soft.languageIndex].contentPages[pageIndex].pageId;
		pageVarBase = softContent[soft.languageIndex].contentPages[pageIndex].pageVarBase;

		var totalPageIncludes = eval(pageVarBase).pageIncludes.length;
		if (totalPageIncludes > 0) {
			for (var i=0; i<totalPageIncludes; i++) {
				var pageIncludeId = eval(pageVarBase).pageIncludes[i].includeId;
				var pageIncludeHandler = eval(pageVarBase).pageIncludes[i].includeHandler;
				var pageIncludeClass = eval(pageVarBase).pageIncludes[i].includeClass;
				
				var contentIncludeIndex = _.findKey(softContent[soft.languageIndex].contentIncludes, { includeId: pageIncludeId });
				var contentIncludeHtml = softContent[soft.languageIndex].contentIncludes[contentIncludeIndex].includeHtml;

				$('body#soft > main > section#soft-pages #' + pageId + '.soft-page ' + pageIncludeHandler).append('<div id="' + pageIncludeId + '" class="' + pageIncludeClass + '">' + contentIncludeHtml + '</div>');
			}
		}

	},

	// Show the preloaded page - Native method. Must not be called in the application
	pageShow: function(pageIndex) {

		var pageId, pageVarBase;

		pageId = softContent[soft.languageIndex].contentPages[pageIndex].pageId;

		soft.lastViewedPageId = $('body#soft > main > section#soft-pages .soft-current-page').attr('id');
		$('body#soft > main > section#soft-pages .soft-page').removeClass('soft-current-page');
		soft.lastViewedPageIndex = parseInt(_.findKey(softContent[soft.languageIndex].contentPages, { pageId: soft.lastViewedPageId }));

		$('body#soft > main').removeAttr('class').addClass(soft.languageClass).addClass(pageId);
		$('body#soft > main > section#soft-pages #' + pageId).addClass('soft-current-page');

		pageVarBase = softContent[soft.languageIndex].contentPages[pageIndex].pageVarBase;

		// Page Title of 'soft-content.js'
		pageTitle = softContent[soft.languageIndex].contentPages[pageIndex].pageTitle;

		// Set global vars
		soft.pageTitle = softContent[soft.languageIndex].contentPages[pageIndex].pageTitle;
		soft.pageId = softContent[soft.languageIndex].contentPages[pageIndex].pageId;
		soft.pageClass = softContent[soft.languageIndex].contentPages[pageIndex].pageClass;
		soft.pageAttribute = softContent[soft.languageIndex].contentPages[pageIndex].pageAttribute;
		soft.pageTemplateId = eval(pageVarBase).pageTemplate.templateId;
		soft.pageTemplateClass = eval(pageVarBase).pageTemplate.templateClass;

		if (soft.hasSplashScreen == true && pageIndex == 0) {
			$(document).attr('title', soft.contentTitle.replace(/<[^>]*>?/gm, '') + softConfig.documentTitleSeparator + soft.documentTitle.replace(/<[^>]*>?/gm, ''));
		}
		else {
			$(document).attr('title', pageTitle.replace(/<[^>]*>?/gm, '') + softConfig.pageTitleSeparator + soft.contentTitle.replace(/<[^>]*>?/gm, '') + softConfig.documentTitleSeparator + soft.documentTitle.replace(/<[^>]*>?/gm, ''));
		}

		var checkScriptThemeLoaded = setInterval(function() {
			try {
				if (typeof theme !== 'undefined') {
					clearInterval(checkScriptThemeLoaded);

					if (soft.initApp == true) {
						soft.initApp = false;
					}
					else {
						$('#soft > main > #soft-pages > .soft-page').each(function() {
							if (!$(this).hasClass('soft-current-page') && !$(this).hasClass('no-destroy')) {
								soft.pageDestroy($(this).attr('id'));
							}
						});
					}

					soft.toScale();
					soft.pageLoader(pageIndex);
				}
			}
			catch {}
		}, 10);

	},

	// Page destroy
	pageDestroy: function(page) {

		var pageId;

		if (page == undefined) {
			console.warn('Enter the parameter value. Accepted values: "pageIndex" or "pageId"');
		}
		else {
			if (isNaN(page)) {
				pageId = page;
			}
			else {
				pageId = softContent[soft.languageIndex].contentPages[page].pageId;
			}

			if ($('body#soft > main > section#soft-pages #' + pageId).length > 0) {

				$('body#soft > main > section#soft-pages > #' + pageId).remove();
				$('script#page-' + pageId).remove();

			}
			else {
				console.warn('This page is not in the application.');
			}
		}

	},

	// Set Page Status
	setPageDestroy: function(page, action) {

		if (page == undefined || action == undefined) {
			console.warn('Enter the parameter values. Accepted values: For page "pageIndex" or "pageId" and for action "true" or "false"');
		}
		else {
			if (isNaN(page)) {
				page = _.findKey(softContent[soft.languageIndex].contentPages, { pageId: page });
			}

			softContent[soft.languageIndex].contentPages[page].pageDestroy = action;
		}

	},

	// To Scale
	toScale: function() {

		$('.soft-scaled').each(function(){
			var handler = $(this);
			var initHandlerWidth = handler.attr('initial-width');
			if (initHandlerWidth == undefined) initHandlerWidth = 1024;
			var initHandlerHeight = handler.attr('initial-height');
			if (initHandlerHeight == undefined) initHandlerHeight = 768;
	
			var parentWidth = handler.parent().width();
			var parentHeight = handler.parent().height();
	
			var proportion = initHandlerWidth / initHandlerHeight;
	
			var resizedHeight = parentHeight;
			var resizedWidth = resizedHeight * proportion;
			if (parentWidth < resizedWidth) {
				resizedWidth = parentWidth;
				resizedHeight = resizedWidth / proportion;
			}
	
			widthScale = ((resizedWidth / initHandlerWidth) * 100) / 100;
			heightScale = ((resizedHeight / initHandlerHeight) * 100) / 100;
	
			handler.css({
				'width': initHandlerWidth,
				'height': initHandlerHeight,
				'position': 'absolute',
				'top': '50%',
				'left': '50%',
				'-webkit-transform': 'scale(' + widthScale + ',' + heightScale + ')',
				'-moz-transform': 'scale(' + widthScale + ',' + heightScale + ')',
				'-ms-transform': 'scale(' + widthScale + ',' + heightScale + ')',
				'-o-transform': 'scale(' + widthScale + ',' + heightScale + ')',
				'transform': 'scale(' + widthScale + ',' + heightScale + ')',
				'margin-top': (initHandlerHeight / 2) * -1,
				'margin-left': (initHandlerWidth / 2) * -1
			});
		});

	},

	// Start load files - Native method. Must not be called in the application
	pageLoader: function(pageIndex) {

		var pageVarBase;

		pageVarBase = softContent[soft.languageIndex].contentPages[pageIndex].pageVarBase;
		
		var totalPageFiles = eval(pageVarBase).pageLoader.loaderFiles.files.length;
		
		if (totalPageFiles > 0) {

			var pageLoaderShowMethod = eval(pageVarBase).pageLoader.loaderShowMethod;
			eval(pageLoaderShowMethod);
			
			$.html5Loader({
				
				filesToLoad: eval(pageVarBase).pageLoader.loaderFiles,
				
				onUpdate: function (percentage) {
					if (softConfig.showLoaderPercentNumber == true) {
						soft.percentPageLoaded = percentage + '%';
					}
					if (percentage >= 100) {}
				},
				
				onComplete: function() {
					console.warn('Page loaded: ' + softContent[soft.languageIndex].contentPages[pageIndex].pageTitle);
					console.warn(totalPageFiles + ' loaded file(s).\n\n');

					var pageShowMethod = eval(pageVarBase).pageShowMethod;
					eval(pageShowMethod);
					soft.updateNavigation();
				}

			});

		}
		else {
			console.warn('Page loaded: ' + softContent[soft.languageIndex].contentPages[pageIndex].pageTitle);
			console.warn('0 loaded file.\n\n');

			var pageShowMethod = eval(pageVarBase).pageShowMethod;
			eval(pageShowMethod);
			soft.updateNavigation();
		}

	},

	// Update Navigation
	updateNavigation: function() {

		$('body#soft .soft-btn-prev-page').addClass('soft-inactive');
		$('body#soft .soft-btn-next-page').addClass('soft-inactive');

		var pageActive = null;
		if (soft.hasSplashScreen == true) {
			if ((soft.pageIndex - 1) > 0) {
				pageActive = softContent[soft.languageIndex].contentPages[soft.pageIndex - 1].pageActive;
				if (pageActive != false) $('body#soft .soft-btn-prev-page').removeClass('soft-inactive');
			}
			if ((soft.pageIndex + 1) <= soft.totalPages) {
				pageActive = softContent[soft.languageIndex].contentPages[soft.pageIndex + 1].pageActive;
				if (pageActive != false) $('body#soft .soft-btn-next-page').removeClass('soft-inactive');
			}
		}
		else {
			if ((soft.pageIndex - 1) >= 0) {
				pageActive = softContent[soft.languageIndex].contentPages[soft.pageIndex - 1].pageActive;
				if (pageActive != false) $('body#soft .soft-btn-prev-page').removeClass('soft-inactive');
			}
			if ((soft.pageIndex + 1) < soft.totalPages) {
				pageActive = softContent[soft.languageIndex].contentPages[soft.pageIndex + 1].pageActive;
				if (pageActive != false) $('body#soft .soft-btn-next-page').removeClass('soft-inactive');
			}
		}

		if (soft.hasSplashScreen == true) {
			$('body#soft .soft-pagination').html('<p><b>' + soft.pageIndex + '</b> ' + softContent[soft.languageIndex].contentGlobal.paginationSeparator + ' <b>' + soft.totalPages + '</b></p>');
		}
		else {
			$('body#soft .soft-pagination').html('<p><b>' + (soft.pageIndex + 1) + '</b> ' + softContent[soft.languageIndex].contentGlobal.paginationSeparator + ' <b>' + soft.totalPages + '</b></p>');
		}

		soft.progressBar();

	},

	// Progress Bar
	progressBar: function() {

		var progress = null;

		if (soft.hasSplashScreen == true) {
			progress = (soft.pageIndex / soft.totalPages) * 100;
		}
		else {
			progress = ((soft.pageIndex + 1) / soft.totalPages) * 100;
		}

		if (soft.generalProgress < progress) soft.generalProgress = progress;

		return soft.generalProgress + '%';

	},

	// Get Page Status
	getPageActive: function(page) {

		if (page == undefined) {
			console.warn('Enter the parameter value. Accepted values: "pageIndex" or "pageId"');
		}
		else {
			if (isNaN(page)) {
				page = _.findKey(softContent[soft.languageIndex].contentPages, { pageId: page });
			}

			return softContent[soft.languageIndex].contentPages[page].pageActive;
		}

	},

	// Set Page Status
	setPageActive: function(page, active) {

		if (page == undefined || active == undefined) {
			console.warn('Enter the parameter values. Accepted values: For page "pageIndex" or "pageId" and active "true" or "false"');
		}
		else {
			if (isNaN(page)) {
				page = _.findKey(softContent[soft.languageIndex].contentPages, { pageId: page });
			}

			softContent[soft.languageIndex].contentPages[page].pageActive = active;
		}

	},

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

		if (soft.initApp == true) {
			console.info('%cSoft.js', cssTitle);
			console.info('%c' + softVersion, cssVersion);
		}
		else {
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

		if (language == undefined) {
			console.warn('Enter the parameter value. Accepted examples: "en", "pt-br", "es", etc.');
		}
		else if (language == soft.languageClass) {
			console.warn('This is the current language.');
		}
		else {

			soft.languageIndex = parseInt(_.findKey(softContent, { languageClass: language }));
			
			if (isNaN(soft.languageIndex)) {
				console.warn('Language not found.');
			}
			else {
				$('#soft > main > #soft-pages > .soft-page').each(function() {
					soft.pageDestroy($(this).attr('id'));
				});

				if (softConfig.showLanguageUrl == true) {
					location.hash = '#' + language + '/' + soft.pageId;
				}
				else {
					location.hash = '#' + soft.pageId;
					soft.checkUrlHash();
				}

				soft.hashChanged = true;
			}

		}

	},

	// Block and unlock page click
	blockAll: function(action) {

        if (action == true) $('body#soft').addClass('events-none');
        else if (action == false) $('body#soft').removeClass('events-none');
		
	},
	
	// Message
	message: function() {

		eval(softConfig.methodNameMessages);

	},

	// Next Page
	nextPage: function() {

		var pageId, pageActive;

		if ($('#soft > main > #soft-pages > .soft-current-page').next().length > 0) {
			if (softConfig.showLanguageUrl == true) {
				location.hash = '#' + soft.languageClass + '/' + $('#soft > main > #soft-pages > .soft-current-page').next().attr('id');
			}
			else {
				location.hash = '#' + $('#soft > main > #soft-pages > .soft-current-page').next().attr('id');
			}
		}
		else {

			if (soft.hasSplashScreen == true) {
				if (soft.pageIndex < soft.totalPages) {
					soft.pageIndex++;
				}
				else {
					soft.lastPage = true;
					console.warn('This is the last page.');
				}
			}
			else {
				if (soft.pageIndex < soft.totalPages - 1) {
					soft.pageIndex++;
				}
				else {
					soft.lastPage = true;
					console.warn('This is the last page.');
				}
			}

			if (soft.hasSplashScreen == true && soft.pageIndex == 1 && soft.findPage != null) {
				soft.pageIndex = soft.findPage;
			}

			pageId = softContent[soft.languageIndex].contentPages[soft.pageIndex].pageId;

			pageActive = softContent[soft.languageIndex].contentPages[soft.pageIndex].pageActive;

			if (pageActive == false) {
				soft.message = softContent[soft.languageIndex].contentGlobal.messages.pageInactive;
				console.warn(soft.message);
			}
			else {
				if (softConfig.showLanguageUrl == true) {
					if (location.hash == '#' + soft.languageClass + '/' + pageId) {
						soft.hashChanged = true;
						soft.pageBuild(pageId, 'append');
					}
					else {
						location.hash = '#' + soft.languageClass + '/' + pageId;
					}
				}
				else {
					if (location.hash == '#' + pageId) {
						soft.hashChanged = true;
						soft.pageBuild(pageId, 'append');
					}
					else {
						location.hash = '#' + pageId;
					}
				}
			}

		}

	},

	// Prev Page
	prevPage: function() {

		var pageId;

		soft.lastPage = false;

		if ($('#soft > main > #soft-pages > .soft-current-page').prev().length > 0) {
			if (softConfig.showLanguageUrl == true) {
				location.hash = '#' + soft.languageClass + '/' + $('#soft > main > #soft-pages > .soft-current-page').prev().attr('id');
			}
			else {
				location.hash = '#' + $('#soft > main > #soft-pages > .soft-current-page').prev().attr('id');
			}
		}
		else {

			if (soft.hasSplashScreen == true) {
				if (soft.pageIndex > 1) {
					soft.pageIndex--;
				}
				else {
					console.warn('This is the first page.');
				}
			}
			else {
				if (soft.pageIndex > 0) {
					soft.pageIndex--;
				}
				else {
					console.warn('This is the first page.');
				}
			}

			pageId = softContent[soft.languageIndex].contentPages[soft.pageIndex].pageId;

			if (softConfig.showLanguageUrl == true) {
				location.hash = '#' + soft.languageClass + '/' + pageId;
			}
			else {
				location.hash = '#' + pageId;
			}

		}

	},

	// Go To Page
	goToPage: function(page) {

		var pageId, findPage;

		if (page == undefined) {
			console.warn('Enter the parameter value. Accepted values for page "pageIndex" or "pageId".');
		}
		else {

			if (isNaN(page)) {
				pageId = page;
			}
			else {
				pageId = softContent[soft.languageIndex].contentPages[page].pageId;
			}

			findPage = parseInt(_.findKey(softContent[soft.languageIndex].contentPages, { pageId: pageId }));

			if (isNaN(findPage)) {
				soft.message = softContent[soft.languageIndex].contentGlobal.messages.pageNotFound;
				console.warn(soft.message);
			}
			else {

				if (softConfig.showLanguageUrl == true) {
					location.hash = '#' + soft.languageClass + '/' + pageId;
				}
				else {
					location.hash = '#' + pageId;
				}

			}

		}

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
		}
		else {
		
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

// On ready document
$(document).ready(function() {
	soft.start();
	soft.info();

	// Lock F11 to not activate full screen
	$(document).on('keydown', function(e) {
		if (e.keyCode === 122) return false;
	});
});