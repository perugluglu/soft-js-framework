var pageAEi = {

    pageLoader: {
        loaderShowMethod: 'theme.showLoader()',
        loaderFiles: {
            files: [
                { 'type': 'VIDEO', 'sources': { 'h264': { 'source': 'soft-theme/escola-da-inteligencia/assets/medias/mp4/a-escola-da-inteligencia.mp4', 'size': 5058560 } } },

                { 'type': 'IMAGE', 'source': 'soft-theme/escola-da-inteligencia/assets/img/a-escola-da-inteligencia/btn-next-active.png', 'size': 2591 },
                { 'type': 'IMAGE', 'source': 'soft-theme/escola-da-inteligencia/assets/img/a-escola-da-inteligencia/btn-next-hover.png', 'size': 2660 },
                { 'type': 'IMAGE', 'source': 'soft-theme/escola-da-inteligencia/assets/img/a-escola-da-inteligencia/btn-next.png', 'size': 2613 },
                { 'type': 'IMAGE', 'source': 'soft-theme/escola-da-inteligencia/assets/img/a-escola-da-inteligencia/empty-frame.png', 'size': 79836 },
                { 'type': 'IMAGE', 'source': 'soft-theme/escola-da-inteligencia/assets/img/a-escola-da-inteligencia/escola.png', 'size': 22266 },
                { 'type': 'IMAGE', 'source': 'soft-theme/escola-da-inteligencia/assets/img/a-escola-da-inteligencia/estudante.png', 'size': 11511 },
                { 'type': 'IMAGE', 'source': 'soft-theme/escola-da-inteligencia/assets/img/a-escola-da-inteligencia/familia.png', 'size': 15904 },
                { 'type': 'IMAGE', 'source': 'soft-theme/escola-da-inteligencia/assets/img/a-escola-da-inteligencia/video-poster.jpg', 'size': 45056 }
            ]
        }
    },

    pageHtml: '\
        <div class="wrap-scaled soft-scaled" initial-width="1280" initial-height="768">\
            <audio id="audio" playsinline webkit-playsinline preload="metadata" src="soft-theme/escola-da-inteligencia/assets/medias/mp3/a-escola-da-inteligencia.mp3"></audio>\
            <div class="video-bg"></div>\
            <video id="video" playsinline webkit-playsinline muted preload="metadata" poster="soft-theme/escola-da-inteligencia/assets/img/a-escola-da-inteligencia/video-poster.jpg" src="soft-theme/escola-da-inteligencia/assets/medias/mp4/a-escola-da-inteligencia.mp4"></video>\
            <div class="mask">\
                <div class="btn btn-next">Continuar</div>\
            </div>\
        </div>\
        <div class="wrap-scaled soft-scaled pillars-drag" initial-width="1280" initial-height="768">\
            <div class="pillars">\
                <div class="btn btn-pillar escola"></div>\
                <div class="btn btn-pillar familia"></div>\
                <div class="btn btn-pillar estudante"></div>\
            </div>\
        </div>\
    ',

    pageAvatarTexts: [
        'Vamos memorizar os <b>PILARES</b> da proposta? Arraste-os para o canto superior esquerdo.',
        'Clique em "<b>CONTINUAR</b>" para seguir conhecendo mais sobre a <b>Escola da Inteligência</b>.'
    ],

    pageTemplate: 'no-template',

    pageIncludes: [
        {
            includeId: 'hud-include',
            includeHandler: '',
            includeClass: ''
        }
    ],

    pageShowMethod: 'theme.aEI()',
    pageHideMethod: ''

}