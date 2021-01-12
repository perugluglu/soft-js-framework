var softContent = [

    {

        languageLabel: 'Pt-Br',
        languageClass: 'pt-br',

        contentTitle: 'Matrícula Virtual',
        
        contentPages: [

            {
                pageTitle: 'Splash Screen',
                pageId: 'splash-screen',
                pageClass: '',
                pageAttribute: '',
                pageFilePath: 'splash-screen/page.js',
                pageVarBase: 'pageSplashScreen',
                pageActive: true
            },

            {
                pageTitle: 'Cover',
                pageId: 'cover',
                pageClass: '',
                pageAttribute: '',
                pageFilePath: 'cover/page.js',
                pageVarBase: 'pageCover',
                pageActive: true
            },

            {
                pageTitle: 'Avatar',
                pageId: 'avatar',
                pageClass: '',
                pageAttribute: '',
                pageFilePath: 'avatar/page.js',
                pageVarBase: 'pageAvatar',
                pageActive: true
            },

            {
                pageTitle: 'Intro',
                pageId: 'intro',
                pageClass: '',
                pageAttribute: '',
                pageFilePath: 'intro/page.js',
                pageVarBase: 'pageIntro',
                pageActive: true
            },

            {
                pageTitle: 'A Escola da Inteligência',
                pageId: 'a-escola-da-inteligencia',
                pageClass: '',
                pageAttribute: '',
                pageFilePath: 'a-escola-da-inteligencia/page.js',
                pageVarBase: 'pageAEi',
                pageActive: false
            }
    
        ],

        // Templates
        contentTemplates: [

            {
                templateLabel: 'Template Exemplo',
                templateId: 'example-template',
                templateHtml: '\
                    <div class="template">\
                        <div class="coluna-direita"></div>\
                        <div id="soft-content"></div>\
                        <div class="coluna-esquerda"></div>\
                    </div>'
            }
        
        ],

        // Includes
        contentIncludes: [
            {
                includeLabel: 'HUD Include',
                includeId: 'hud-include',
                includeHtml: '\
                    <div class="pillars-scaled soft-scaled">\
                        <div class="pillars">\
                            Pilares\
                        </div>\
                    </div>\
                    <div class="avatar-scaled soft-scaled">\
                        <div class="avatar">\
                            <div class="mask">\
                                <i></i>\
                            </div>\
                            <div class="ballon"></div>\
                        </div>\
                    </div>\
                    <div class="score-scaled soft-scaled">\
                        <div class="score">Pontos: <span>0</span></div>\
                    </div>\
                    <div class="box-scaled soft-scaled">\
                        <div class="box">\
                            <div class="mask">\
                                <div class="items">\
                                    <p>Itens</p>\
                                    <div class="scroll-y">\
                                        <ul></ul>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="btn btn-box"></div>\
                        </div>\
                    </div>\
                    <div class="nav-scaled soft-scaled">\
                        <div class="nav prev-only">\
                            <div class="btn btn-prev"></div>\
                            <div class="btn btn-next"></div>\
                        </div>\
                    </div>'
            }
        ],

        pillarsDrop: [
            'empty',
            'empty',
            'empty'
        ],

        contentGlobal: {

            template: '',

            includes: [
                {
                    includeLabel: 'Overlay',
                    includeId: 'overlay-include',
                    includeClass: 'overlay',
                    includeHtml: '<div class="wrap-scaled soft-scaled" initial-width="1280" initial-height="768"></div>'
                }
            ],

            paginationSeparator: '/',

            messages: {

                pageNotFound: 'Erro 404. Página não encontrada.',

                pageInactive: 'Página inativa.',

                languageNotFound: 'Idioma não encontrado.'

            }

        }

    }

]