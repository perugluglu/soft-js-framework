var theme = {

  version: '1.0.0',

  // Variáveis globais
  vars: {

    initApp: true,

    soundMuted: false

  },

  // Método inicial
  init: function() {

    $(document).on('click', '#soft main #soft-pages #cover .title .btn-start', function() {
      theme.vars.initApp = false;
      //theme.vars.soundBG.play();
    });

  },

  // Chamadas de áudio
  allSounds: function() {

    /*theme.vars.soundBG = new Howl({
      src: ['soft-theme/pearson/assets/medias/bg.mp3'],
      loop: true,
      volume: 0.04
    });*/

  },

  // Método para exibir o preloader
  // ** NÃO ALTERAR **
  showLoader: function() {

    $('body#soft > main').append('<div id="soft-loader"><div></div></div></main>');
    gsap.to($('body#soft > main > #soft-loader'), { duration: 0.5, delay: 0, autoAlpha: 1, ease: 'power4.out', onComplete:function() { }});

  },

  // Método útil para ações comuns em todas ou na maioria das telas
  default: function() {

    //if (theme.vars.initApp == true) theme.allSounds();

    //theme.update();

    gsap.to($('body#soft > main > #soft-loader'), { duration: 0.5, delay: 1, autoAlpha: 0, scale: 1.5, ease: 'expo.out', onComplete: function() {
      $('body#soft > main > #soft-loader').remove();
    }});

    gsap.to($('#soft main #soft-pages'), { duration: 0, delay: 0, autoAlpha: 1, ease: 'power4.out', onComplete: function() {}});

  },

  // Método útil para ações após o final das transições de telas e elementos
  endTransition: function() {

    soft.blockAll(false);

    $('#soft main .btn').addClass('ease');

    gsap.to($('#soft main .pearson-buttons'), 0.5, { delay: 0, right: -1, ease: 'expo.out', onComplete: function() {}});

  },

  // Método para avançar telas
  // ** NÃO ALTERAR **
  nextPage: function() {

    soft.blockAll(true);

    gsap.to($('#soft main .pearson-buttons'), 0.5, { delay: 0, right: -1, ease: 'expo.out', onComplete: function() {}});

    gsap.to($('#soft main #soft-pages'), 0.5, { delay: 0, autoAlpha: 0, ease: 'power4.out', onComplete: function() {
      soft.nextPage();
    }});

  },

  // Método para voltar telas
  // ** NÃO ALTERAR **
  prevPage: function() {

    soft.blockAll(true);

    gsap.to($('#soft main .pearson-buttons'), 0.5, { delay: 0, right: -1, ease: 'expo.out', onComplete: function() {}});

    gsap.to($('#soft main #soft-pages'), 0.5, { delay: 0, autoAlpha: 0, ease: 'power4.out', onComplete: function() {
      soft.prevPage();
    }});

  },

  // Método da tela SplashScreen
  // ** NÃO ALTERAR **
  splashScreen: function() {

    theme.default();

    gsap.to($('#soft main #soft-pages #splash-screen .logo-richmond .logo'), { duration: 0.8, delay: 1, autoAlpha: 1, scale: 1, ease: 'elastic.out(1, 0.3)', onComplete: function() {}});
    gsap.to($('#soft main #soft-pages #splash-screen .logo-richmond .logo'), { duration: 0.8, delay: 1.8, 'margin-left': -120, ease: 'expo.inOut', onComplete: function() {}});
    gsap.to($('#soft main #soft-pages #splash-screen .logo-richmond .r'), { duration: 0.4, delay: 2.2, autoAlpha: 1, top: 0, ease: 'bounce.out', onComplete: function() {}});
    gsap.to($('#soft main #soft-pages #splash-screen .logo-richmond .i'), { duration: 0.4, delay: 2.3, autoAlpha: 1, top: 0, ease: 'bounce.out', onComplete: function() {}});
    gsap.to($('#soft main #soft-pages #splash-screen .logo-richmond .c'), { duration: 0.4, delay: 2.4, autoAlpha: 1, top: 0, ease: 'bounce.out', onComplete: function() {}});
    gsap.to($('#soft main #soft-pages #splash-screen .logo-richmond .h'), { duration: 0.4, delay: 2.5, autoAlpha: 1, top: 0, ease: 'bounce.out', onComplete: function() {}});
    gsap.to($('#soft main #soft-pages #splash-screen .logo-richmond .m'), { duration: 0.4, delay: 2.6, autoAlpha: 1, top: 0, ease: 'bounce.out', onComplete: function() {}});
    gsap.to($('#soft main #soft-pages #splash-screen .logo-richmond .o'), { duration: 0.4, delay: 2.7, autoAlpha: 1, top: 0, ease: 'bounce.out', onComplete: function() {}});
    gsap.to($('#soft main #soft-pages #splash-screen .logo-richmond .n'), { duration: 0.4, delay: 2.8, autoAlpha: 1, top: 0, ease: 'bounce.out', onComplete: function() {}});
    gsap.to($('#soft main #soft-pages #splash-screen .logo-richmond .d'), { duration: 0.4, delay: 2.9, autoAlpha: 1, top: 0, ease: 'bounce.out', onComplete: function() {}});
    
    gsap.to($('#soft main #soft-pages #splash-screen .logo-richmond'), { duration: 1, delay: 3.5, autoAlpha: 0, ease: 'expo.inOut', onComplete: function() {
      soft.nextPage();
    }});

  },

  // Método da tela Cover
  // ** NÃO ALTERAR **
  cover: function() {

    theme.default();

    gsap.to($('#soft main #soft-pages #cover .title'), { duration: 1, delay: 1.2, autoAlpha: 1, right: '10%', ease: 'expo.out', onComplete: function() {
      theme.endTransition();
    }});

    //theme.vars.soundBG.stop();
    
  },

  // Método da tela Gameplay
  // ** ALTERAR PARCIALMENTE **
  gameplay: function() {

    theme.default();

    if (theme.vars.initApp == true) {
      theme.vars.initApp = false;
      //theme.vars.soundBG.play();
    }

    gsap.to($('#soft main #soft-pages #gameplay'), 0.5, { delay: 0, autoAlpha: 1, ease: 'power4.out', onComplete: function() {
      theme.endTransition();
    }});

  },

  // Método de atualização
  update: function() {

    $('#soft main .mCustomScrollbar').mCustomScrollbar('update');

  }

}

$(window).on('resize', function() {
  theme.update();
});