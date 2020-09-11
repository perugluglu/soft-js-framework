var softContent = [

    {

        languageLabel: 'Pt-Br',
        languageClass: 'pt-br',

        contentTitle: 'Teeth',
        contentClass: '',
        
        contentPages: [

            {
                pageTitle: 'Splash Screen',
                pageId: 'splash-screen',
                pageFilePath: 'splash-screen/page.js'
            },

            {
                pageTitle: 'Cover',
                pageId: 'cover',
                pageFilePath: 'cover/page.js'  
            },

            {
                pageTitle: 'Gameplay',
                pageId: 'gameplay',
                pageFilePath: 'gameplay/page.js'
            }
    
        ],

        // Templates
        contentTemplates: '',

        // Includes
        contentIncludes: [
            {
                includeLabel: 'Default Include',
                includeId: 'default-include',
                includeHTML: ''
            }
        ],

        contentGlobal: {

            template: '',

            includes: [
                {
                    includeId: 'default-include',
                    includeClass: ''
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