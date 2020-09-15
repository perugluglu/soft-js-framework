var softPage = {

    pageClass: '',
    pageAttribute: '',

    pageLoader: {
        loaderShowMethod: 'theme.showLoader()',
        loaderFiles: {
            files: [
                //{ 'type': 'IMAGE', 'source': 'soft-theme/pearson/assets/img/custom/bg-btn-sound-off.png', 'size': 1434 },
            ]
        }
    },

    pageCode: '<h1>Gameplay</h1>',

    pageTemplate: '',

    pageIncludes: '',

    pageStatus: 'active',

    pageInMethod: 'theme.gameplay()',
    pageOutMethod: ''

}

soft.pageBuild();