var softConfig = {

    defaultLanguage: 'pt-br',
    showLanguageUrl: true,

    documentTitle: 'Escola da Inteligência',
    documentTitleSeparator: ' :: ',
    
    pageTitleSeparator: ' :: ',

    headTags: [

        /* Do not index */
        //{ type: 'meta', attributes: [ { attribute: 'name', value: 'robots' }, { attribute: 'content', value: 'noindex, nofollow' } ] },
        //{ type: 'meta', attributes: [ { attribute: 'name', value: 'googlebot' }, { attribute: 'content', value: 'noindex' } ] },
        //{ type: 'meta', attributes: [ { attribute: 'name', value: 'googlebot-news' }, { attribute: 'content', value: 'noindex' } ] },
        //{ type: 'meta', attributes: [ { attribute: 'name', value: 'googlebot-news' }, { attribute: 'content', value: 'nosnippet' } ] },

        /* Meta tags */
        { type: 'meta', attributes: [ { attribute: 'charset', value: 'utf-8' } ] },
        { type: 'meta', attributes: [ { attribute: 'http-equiv', value: 'X-UA-Compatible' }, { attribute: 'content', value: 'IE=edge' } ] },
        { type: 'meta', attributes: [ { attribute: 'name', value: 'viewport' }, { attribute: 'content', value: 'width=device-width, height=device-height, initial-scale=1, user-scalable=no' } ] },
        { type: 'meta', attributes: [ { attribute: 'name', value: 'description' }, { attribute: 'content', value: 'Conheça todos os diferenciais que a EI oferece aos seus alunos.' } ] },
        
        /* SEO tags */
        { type: 'meta', attributes: [ { attribute: 'property', value: 'og:locale' }, { attribute: 'content', value: 'pt_BR' } ] },
        { type: 'meta', attributes: [ { attribute: 'property', value: 'og:type' }, { attribute: 'content', value: 'website' } ] },
        { type: 'meta', attributes: [ { attribute: 'property', value: 'og:title' }, { attribute: 'content', value: 'Escola da Inteligência - Matrícula Virtual' } ] },
        { type: 'meta', attributes: [ { attribute: 'property', value: 'og:description' }, { attribute: 'content', value: 'Conheça todos os diferenciais que a EI oferece aos seus alunos.' } ] },
        { type: 'meta', attributes: [ { attribute: 'property', value: 'og:url' }, { attribute: 'content', value: 'https://www.escoladainteligencia.com.br' } ] },
        { type: 'meta', attributes: [ { attribute: 'property', value: 'og:site_name' }, { attribute: 'content', value: 'Escola da Inteligência - Matrícula Virtual' } ] }

    ],

    headJsScripts: [],

    blockContextMenu: true,
    blockF12KeyAndCtrlShiftI: true,

    touchCallout: false,
    userSelect: false,
    userDrag: false,

    splashScreen: true,

    theme: {

        themePath: 'escola-da-inteligencia',
        themeFaviconFilePath: 'assets/img/favicon.png',

        themeFiles: {
            cssFiles: {
                head: [
                    'assets/css/reset.css',
                    'assets/css/styles.css',
                    'assets/css/responsive.css'
                ],
                body: ''
            },
            jsFiles: {
                head: '',
                body: [
                    'assets/js/theme.js'
                ]
            }
        }

    },

    bodyJsScripts: [],

    extensions: [

        {
            extensionName: 'GreenSock',
            extensionPath: 'GSAP',
            extensionVersion: '3.5.1',
            extensionFiles: {
                cssFiles: {
                    head: '',
                    body: ''
                },
                jsFiles: {
                    head: '',
                    body: [
                        'gsap.min.js',
                        'CustomEase.min.js',
                        'Draggable.min.js'
                    ]
                }
            },
            extensionHeadScript: {},
            extensionBodyScript: {},
            extensionActive: true
        },

        {
            extensionName: 'howler.js',
            extensionPath: 'howler',
            extensionVersion: '2.1.2',
            extensionFiles: {
                cssFiles: {
                    head: '',
                    body: ''
                },
                jsFiles: {
                    head: '',
                    body: [
                        'howler.min.js'
                    ]
                }
            },
            extensionHeadScript: {},
            extensionBodyScript: {},
            extensionActive: true
        }

    ]

}

var customConfig = {

    school: {

        path: 'colegio-batista',
        logoImage: 'logo.png',

    }

}