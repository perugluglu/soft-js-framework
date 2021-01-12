var pageAvatar = {

    pageLoader: {
        loaderShowMethod: 'theme.showLoader()',
        loaderFiles: {
            files: [
                { 'type': 'IMAGE', 'source': 'soft-theme/escola-da-inteligencia/assets/img/avatar/avatar-1.png', 'size': 9228 },
                { 'type': 'IMAGE', 'source': 'soft-theme/escola-da-inteligencia/assets/img/avatar/avatar-2.png', 'size': 8587 },
                { 'type': 'IMAGE', 'source': 'soft-theme/escola-da-inteligencia/assets/img/avatar/avatar-3.png', 'size': 9981 },
                { 'type': 'IMAGE', 'source': 'soft-theme/escola-da-inteligencia/assets/img/avatar/avatar-4.png', 'size': 11169 },
                { 'type': 'IMAGE', 'source': 'soft-theme/escola-da-inteligencia/assets/img/avatar/avatar-5.png', 'size': 11743 },
                { 'type': 'IMAGE', 'source': 'soft-theme/escola-da-inteligencia/assets/img/avatar/avatar-6.png', 'size': 12387 },
                { 'type': 'IMAGE', 'source': 'soft-theme/escola-da-inteligencia/assets/img/avatar/bg-avatar-box-selected.png', 'size': 3560 },
                { 'type': 'IMAGE', 'source': 'soft-theme/escola-da-inteligencia/assets/img/avatar/bg-avatar-box.png', 'size': 2354 },
                { 'type': 'IMAGE', 'source': 'soft-theme/escola-da-inteligencia/assets/img/avatar/bg-title.png', 'size': 100183 },
                { 'type': 'IMAGE', 'source': 'soft-theme/escola-da-inteligencia/assets/img/avatar/border-bg.png', 'size': 36652 },
                { 'type': 'IMAGE', 'source': 'soft-theme/escola-da-inteligencia/assets/img/avatar/btn-next-active.png', 'size': 2355 },
                { 'type': 'IMAGE', 'source': 'soft-theme/escola-da-inteligencia/assets/img/avatar/btn-next-hover.png', 'size': 2404 },
                { 'type': 'IMAGE', 'source': 'soft-theme/escola-da-inteligencia/assets/img/avatar/btn-next-inactive.png', 'size': 2249 },
                { 'type': 'IMAGE', 'source': 'soft-theme/escola-da-inteligencia/assets/img/avatar/btn-next.png', 'size': 2429 },
                { 'type': 'IMAGE', 'source': 'soft-theme/escola-da-inteligencia/assets/img/avatar/texture-bg.png', 'size': 12106 }
            ]
        }
    },

    pageHtml: '\
        <div class="title-scaled soft-scaled">\
            <div class="title">\
                <h1>Matrícula<span>Virtual</span></h1>\
                <p>Escolha o seu avatar para te auxiliar durante toda a jornada:</p>\
            </div>\
            <div class="ei-logo"></div>\
        </div>\
        <div class="avatars-scaled soft-scaled" initial-width="1600" initial-height="768">\
            <div class="border-bg"></div>\
            <div class="avatars">\
                <ul>\
                    <li class="btn btn-avatar avatar-1"><i></i></li>\
                    <li class="btn btn-avatar avatar-2"><i></i></li>\
                    <li class="btn btn-avatar avatar-3"><i></i></li>\
                    <li class="btn btn-avatar avatar-4"><i></i></li>\
                    <li class="btn btn-avatar avatar-5"><i></i></li>\
                    <li class="btn btn-avatar avatar-6"><i></i></li>\
                </ul>\
            </div>\
            <div class="btn btn-next inactive">Avançar</div>\
        </div>\
    ',

    pageAvatarTexts: [
        ''
    ],

    pageTemplate: 'no-template',

    pageIncludes: [
        {
            includeId: 'hud-include',
            includeHandler: '',
            includeClass: ''
        }
    ],

    pageShowMethod: 'theme.avatar()',
    pageHideMethod: ''

}