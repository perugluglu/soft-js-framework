var softPage = {

    pageClass: '',
    pageAttribute: '',

    pageLoader: {
        loaderShowMethod: 'theme.showLoader()',
        singularFiles: {
            files: [
                //{ 'type': 'IMAGE', 'source': 'soft-theme/richmond/assets/img/default/em/bg-cover-bottom-left.png', 'size': 2071 },

                // not supported on IE
                // { 'type': 'AUDIO', 'sources': { 'mp3': { 'source': 'soft-theme/example/assets/medias/click.mp3', 'size': 4096 }}}
            ]
        },
        animationSequenceImages: []
    },

    pageCode: '<h1>Cover</h1>',

    pageTemplate: 'no-template',

    pageIncludes: '',

    pageStatus: 'active',

    pageInMethod: 'theme.cover()',
    pageOutMethod: ''

}

soft.pageBuild();