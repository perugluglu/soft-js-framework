var softPage = {

    pageClass: '',
    pageAttribute: '',

    pageLoader: {
        loaderShowMethod: 'theme.showLoader()',
        loaderFiles: {
            files: [
                { 'type': 'IMAGE', 'source': 'soft-theme/richmond/assets/img/default/preloader.gif', 'size': 323350 },
                { 'type': 'IMAGE', 'source': 'soft-theme/richmond/assets/img/default/capa2.png', 'size': 4649857 },
            ]
        }
    },

    pageCode: '\
        <div class="logo-richmond">\
            <div class="logo"></div>\
            <div class="r"></div>\
            <div class="i"></div>\
            <div class="c"></div>\
            <div class="h"></div>\
            <div class="m"></div>\
            <div class="o"></div>\
            <div class="n"></div>\
            <div class="d"></div>\
        </div>',

    pageTemplate: 'no-template',

    pageIncludes: [],

    pageStatus: 'active',

    pageInMethod: 'theme.splashScreen()',
    pageOutMethod: ''

}

soft.pageBuild();