var softConfig = {

    global: {

        documentTitle: 'Compass :: Richmond',
        documentTitleSeparator: ' :: ',
        
        pageTitleSeparator: ' :: ',

        defaultLanguage: 'pt-br',

        initConsoleClear: false,

        blockContextMenu: true,
        blockF12KeyAndCtrlShiftI: true,

        touchCallout: false,
        userSelect: false,
        userDrag: false,

    },

    splashScreen: true,

    theme: {

        themePath: 'example',
        themeFaviconFilePath: '',
        //themeFaviconFilePath: 'assets/img/default/favicon.png',

        themeFiles: {
            cssFiles: [
                'assets/css/reset.css',
                'assets/css/default.css',
                'assets/css/custom.css',
                'assets/css/default-responsive.css',
                'assets/css/custom-responsive.css'
            ],
            jsFiles: [
                'assets/js/theme.js'
            ]
        }

    },

    extensions: [

        {
            extensionName: 'SCORM 1.2',
            extensionPath: 'Scorm12',
            extensionVersion: '',
            extensionFiles: {
                cssFiles: [],
                jsFiles: [
                    'scormfunctions.js'
                ]
            },
            extensionConfig: {},
            active: false
        },

        {
            extensionName: 'GreenSock',
            extensionPath: 'GSAP',
            extensionVersion: '3.5.1',
            extensionFiles: {
                cssFiles: [],
                jsFiles: [
                    'gsap.min.js'
                ]
            },
            extensionConfig: {},
            active: true
        },

        {
            extensionName: 'howler.js',
            extensionPath: 'howler',
            extensionVersion: '2.1.2',
            extensionFiles: {
                cssFiles: [],
                jsFiles: [
                    'howler.min.js'
                ]
            },
            extensionConfig: {},
            active: true
        },

        {
            extensionName: 'mCustomScrollbar',
            extensionPath: 'mCustomScrollbar',
            extensionVersion: '3.1.5',
            extensionFiles: {
                cssFiles: [
                    'jquery.mCustomScrollbar.min.css'
                ],
                jsFiles: [
                    'jquery.mCustomScrollbar.min.js'
                ]
            },
            extensionConfig: {},
            active: true
        }

    ]

}