var pageIntro = {

    pageLoader: {
        loaderShowMethod: 'theme.showLoader()',
        loaderFiles: {
            files: [
                { 'type': 'VIDEO', 'sources': { 'h264': { 'source': 'soft-theme/escola-da-inteligencia/assets/medias/mp4/intro.mp4', 'size': 1437696 } } },

                { 'type': 'IMAGE', 'source': 'soft-theme/escola-da-inteligencia/assets/img/intro/btn-next-active.png', 'size': 2591 },
                { 'type': 'IMAGE', 'source': 'soft-theme/escola-da-inteligencia/assets/img/intro/btn-next-hover.png', 'size': 2660 },
                { 'type': 'IMAGE', 'source': 'soft-theme/escola-da-inteligencia/assets/img/intro/btn-next.png', 'size': 2613 },
                { 'type': 'IMAGE', 'source': 'soft-theme/escola-da-inteligencia/assets/img/intro/video-poster.jpg', 'size': 61291 }
            ]
        }
    },

    pageHtml: '\
        <div class="wrap-scaled soft-scaled" initial-width="1280" initial-height="768">\
            <div class="video-bg"></div>\
            <video id="video" playsinline webkit-playsinline preload="metadata" poster="soft-theme/escola-da-inteligencia/assets/img/intro/video-poster.jpg" src="soft-theme/escola-da-inteligencia/assets/medias/mp4/intro.mp4"></video>\
            <div class="partner-school">\
                <div class="board-bg"></div>\
                <div class="school-logo"></div>\
            </div>\
            <div class="mask">\
                <div class="btn btn-next">Começar</div>\
            </div>\
        </div>\
    ',

    pageAvatarTexts: [
        'Clique em "<b>COMEÇAR</b>" para conhecer todos os diferenciais da <b>Escola da Inteligência</b>.'
    ],

    pageTemplate: 'no-template',

    pageIncludes: [
        {
            includeId: 'hud-include',
            includeHandler: '',
            includeClass: ''
        }
    ],

    pageShowMethod: 'theme.intro()',
    pageHideMethod: ''

}