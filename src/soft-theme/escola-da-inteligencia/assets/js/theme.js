var theme = {

  version: '1.0.0',

  // Variáveis globais
  vars: {

    initApp: true,

    currentAvatar: null,

    btnClicked: false,

    currentVideo: null,
    currentVideoEnded: false,

    userPaused: false,

    currentTimeline: null,

    score: 0

  },

  audios: {
    //click = new Howl({ src: ['soft-theme/escola-da-inteligencia/assets/medias/mp3/ensino-infantil.mp3'], loop: false, volume: 1, onend: function() { }})
  },

  // Método inicial
  init: function() {
    /*if (
      soft.pageId != 'splash-screen' &&
      theme.vars.initApp == true
      ) { window.location.href = location.href.split('#')[0]; }*/

    document.addEventListener('visibilitychange', function() {
      if (theme.vars.currentVideo != null) {
        if (document.visibilityState == 'visible') {
          if (theme.vars.userPaused == false && theme.vars.currentVideoEnded == false) {
            theme.vars.currentVideo.play();
          }
        }
        else {
          theme.vars.currentVideo.pause();
        }
      }

      //window.location.href = location.href.split('#')[0];
    });
  },

  // Método para exibir o preloader
  // ** NÃO ALTERAR **
  showLoader: function() {

    $('body#soft > main').append('<div id="soft-loader"><div></div></div></main>');
    gsap.to($('body#soft > main > #soft-loader'), { duration: 0.5, delay: 0, autoAlpha: 1, ease: 'power4.out', onComplete:function() { }});

  },

  // Método útil para ações comuns em todas ou na maioria das telas
  default: function() {

    theme.vars.btnClicked = false;

    theme.vars.userPaused = false;

    theme.vars.currentVideoEnded = false;

    theme.vars.tempItemsIndexPositions = [];
    theme.vars.tempItemsClassPositions = [];

    theme.vars.currentVideo = document.getElementById('video');

    $('#soft main #soft-pages #hud-include .avatar').addClass(theme.vars.currentAvatar);

    $('#soft main #soft-pages #hud-include .score span').html(theme.vars.score);

    gsap.to($('body#soft > main > #soft-loader'), { duration: 0.3, delay: 1, autoAlpha: 0, scale: 1.5, ease: 'expo.out', onComplete: function() {
      $('body#soft > main > #soft-loader').remove();
    }});

    gsap.to($('#soft main #soft-pages'), { duration: 0, delay: 0, autoAlpha: 1, ease: 'power4.out', onComplete: function() {}});

    for (var i=0; i<softContent[soft.languageIndex].pillarsDrop.length; i++) {
      $('#soft main #soft-pages #hud-include .pillars-scaled .pillars').append('<div class="pillar pillar-' + (i+1) + ' ease empty">' + (i+1) + '<i></i></div>');
      if (softContent[soft.languageIndex].pillarsDrop.indexOf('empty') < 0) {
        if (softContent[soft.languageIndex].pillarsDrop[i] != 'empty') {
          $('#soft main #soft-pages #hud-include .pillars-scaled .pillars .pillar:nth(' + i + ')').removeClass('empty').addClass(softContent[soft.languageIndex].pillarsDrop[i] + ' drop');
        }
      }
    }

    if (theme.vars.currentVideo != null) {
      gsap.to($('#soft main #soft-pages .soft-current-page .video-bg'), { delay: 0.3, duration: 0.8, autoAlpha: 1, scale: 1, ease: 'expo.out', onComplete: function() { }});

      showPlayVideo();
    }

    function showPlayVideo() {

      if (soft.pageId == 'intro') {

        theme.vars.currentTimeline = gsap.timeline();
        theme.vars.currentTimeline.to($('#soft main #soft-pages #intro .partner-school'), { delay: 0, duration: 9.4, scale: 0.55, ease: CustomEase.create("custom", "M0,0 C0.104,0.204 0.542,0.896 1,1 "), onComplete: function() {}}, 0);
        theme.vars.currentTimeline.pause();

        gsap.to($('#soft main #soft-pages #intro .partner-school'), { delay: 0.5, duration: 0.8, autoAlpha: 1, scale: 1, ease: 'expo.out', onComplete: function() {
          $('#soft main #soft-pages #intro .partner-school').addClass('origin');
          theme.endTransition();
          $('#soft main #soft-pages #intro .mask .btn-next').removeClass('ease');
        }});

      }

      gsap.to($('#soft main #soft-pages .soft-current-page #video'), { delay: 0.5, duration: 0.8, autoAlpha: 1, ease: 'expo.out', onComplete: function() {
        //theme.vars.currentVideo.play();
        //theme.videoControl();
      }});

    }

    gsap.to($('#soft main #soft-pages #hud-include .nav-scaled .nav'), { delay: 0.5, duration: 0.5, 'margin-right': 0, ease: 'expo.out', onComplete: function() {}});

    gsap.to($('#soft main #soft-pages #hud-include .pillars-scaled .pillars'), { delay: 0.6, duration: 0.5, autoAlpha: 1, scale: 1, ease: 'expo.out', onComplete: function() {}});

    gsap.to($('#soft main #soft-pages #hud-include .avatar-scaled .avatar'), { delay: 0.5, duration: 0.5, top: 182, right: 295, ease: 'expo.out', onComplete: function() {}});
    gsap.to($('#soft main #soft-pages #hud-include .avatar-scaled .avatar i'), { delay: 0.8, duration: 0.5, bottom: -12, ease: 'expo.out', onComplete: function() {}});

    gsap.to($('#soft main #soft-pages #hud-include .box-scaled .box'), { delay: 0.7, duration: 0.5, top: 202, ease: 'expo.out', onComplete: function() {}});

    gsap.to($('#soft main #soft-pages #hud-include .score-scaled .score'), { delay: 0.8, duration: 0.5, autoAlpha: 1, ease: 'expo.out', onComplete: function() {}});

    $(document).on('click', '#soft main #soft-pages #hud-include .box-scaled .btn-box', function() {
      if (theme.vars.btnClicked == false) {
        theme.vars.btnClicked = true;
        soft.blockAll(true);
        if ($(this).hasClass('open')) {
          gsap.to($('#soft main #soft-pages #hud-include .box-scaled .items'), { delay: 0, duration: 0.3, top: 640, left: -20, scale: 0.3, ease: 'back.in(1)', onComplete: function() {
            soft.blockAll(false);
            theme.vars.btnClicked = false;
          }});
          gsap.to($(document), { delay: 0.25, duration: 0, ease: 'back.in(1)', onComplete: function() {
            $('#soft main #soft-pages #hud-include .box-scaled .btn-box').removeClass('open');
          }});
        }
        else {
          $(this).addClass('open');
          gsap.to($('#soft main #soft-pages #hud-include .box-scaled .items'), { delay: 0, duration: 0.3, top: 75, left: -16, scale: 1, ease: 'back.out(1)', onComplete: function() {
            soft.blockAll(false);
            theme.vars.btnClicked = false;
          }});
        }
      }
    });

  },

  // Método útil para ações após o final das transições de telas e elementos
  endTransition: function() {

    soft.blockAll(false);

    $('#soft main .btn').addClass('ease');

  },

  // Método para avançar telas
  nextPage: function() {

    soft.blockAll(true);

    gsap.to($('#soft main #soft-pages'), 0.5, { delay: 0, autoAlpha: 0, ease: 'power4.out', onComplete: function() {
      soft.nextPage();
    }});

  },

  // Método para voltar telas
  prevPage: function() {

    soft.blockAll(true);

    gsap.to($('#soft main #soft-pages'), 0.5, { delay: 0, autoAlpha: 0, ease: 'power4.out', onComplete: function() {
      soft.prevPage();
    }});

  },

  // Método para ir à uma tela específica
  goToPage: function(id) {

    soft.blockAll(true);

    gsap.to($('#soft main #soft-pages'), 0.5, { delay: 0, autoAlpha: 0, ease: 'power4.out', onComplete: function() {
      soft.goToPage(id);
    }});

  },

  // Método do Overlay
  overlay: function(contentIndex) {

    $('#soft main .overlay .wrap-scaled').html('<div class="box"><div class="btn btn-close ease">×</div>' + pageCover.pageOverlayContent[contentIndex] + '</div>');

    gsap.to($('#soft main .overlay'), { delay: 0, duration: 0.5, autoAlpha: 1, ease: 'expo.out', onComplete: function() {}});
    gsap.to($('#soft main .overlay .box'), { delay: 0.3, duration: 0.5, autoAlpha: 1, ease: 'expo.out', onComplete: function() {
      theme.vars.btnClicked = false;
    }});

    $(document).on('click', '#soft main .overlay .box .btn-close', function() {
      if (theme.vars.btnClicked == false) {
        theme.vars.btnClicked = true;
        gsap.to($('#soft main .overlay .box'), { delay: 0, duration: 0.5, autoAlpha: 0, ease: 'expo.out', onComplete: function() {
          $('#soft main .overlay .box').remove();
        }});
        gsap.to($('#soft main .overlay'), { delay: 0.3, duration: 0.5, autoAlpha: 0, ease: 'expo.out', onComplete: function() {
          theme.vars.btnClicked = false;
        }});
      }
    });

  },

  // Método da tela SplashScreen
  splashScreen: function() {

    theme.default();

    gsap.to($('#soft main #soft-pages #splash-screen'), { delay: 1, duration: 0.5, autoAlpha: 1, ease: 'expo.out', onComplete: function() {}});
    gsap.to($('#soft main #soft-pages #splash-screen .ei-logo'), { delay: 1, duration: 0.8, scale: 1, ease: 'expo.out', onComplete: function() {}});
    gsap.to($('#soft main #soft-pages #splash-screen .ei-logo'), { delay: 2, duration: 0.8, autoAlpha: 0, scale: 2, ease: 'expo.out', onComplete: function() {
      soft.nextPage();
    }});

  },

  // Método da tela Cover
  cover: function() {

    theme.vars.initApp = false;

    theme.default();

    gsap.to($('#soft main #soft-pages #cover'), { delay: 0, duration: 0.5, autoAlpha: 1, ease: 'expo.out', onComplete: function() {}});
    gsap.to($('#soft main #soft-pages #cover .wrap-scaled .title'), { delay: 0.2, duration: 0.7, autoAlpha: 1, top: '-15%', ease: 'expo.out', onComplete: function() {}});
    gsap.to($('#soft main #soft-pages #cover .mila'), { delay: 0.3, duration: 0.7, autoAlpha: 1, bottom: 0, ease: 'expo.out', onComplete: function() {}});
    gsap.to($('#soft main #soft-pages #cover .wrap-scaled .ei-logo'), { delay: 0.4, duration: 0.5, autoAlpha: 1, scale: 1, ease: 'expo.out', onComplete: function() {
      $('#soft main #soft-pages #cover .btn-start').addClass('pulse-scale');
      soft.setPageActive('avatar', true);
      theme.endTransition();
    }});

    $(document).on('click', '#soft main #soft-pages #cover .btn-start', function() {
      if (theme.vars.btnClicked == false) {
        theme.vars.btnClicked = true;
        theme.nextPage();
      }
    });

    $(document).on('click', '#soft main #soft-pages #cover .btn-help', function() {
      if (theme.vars.btnClicked == false) {
        theme.vars.btnClicked = true;
        theme.overlay(0);
      }
    });
    
  },

  // Método da tela Avatar
  avatar: function() {

    theme.default();

    if (theme.vars.currentAvatar != null) {
      $('#soft main #soft-pages #avatar .avatars .btn-avatar.' + theme.vars.currentAvatar).addClass('selected');
      $('#soft main #soft-pages #avatar .btn-next').removeClass('inactive').addClass('pulse-scale');
      soft.setPageActive('intro', true);
    }

    gsap.to($('#soft main #soft-pages #avatar'), { delay: 0, duration: 0.5, autoAlpha: 1, ease: 'expo.out', onComplete: function() {}});
    gsap.to($('#soft main #soft-pages #avatar .title-scaled .title'), { delay: 0.2, duration: 0.7, left: '35%', ease: 'expo.out', onComplete: function() {}});
    gsap.to($('#soft main #soft-pages #avatar .title-scaled .ei-logo'), { delay: 0.2, duration: 0.7, left: '43%', ease: 'expo.out', onComplete: function() {
      for (var i=1; i<=$('#soft main #soft-pages #avatar .avatars ul li.btn-avatar').length; i++) {
        gsap.to($('#soft main #soft-pages #avatar .avatars ul li.avatar-' + i), { delay: (0.3 * i) / 2.5, duration: 0.7, autoAlpha: 1, top: 0, ease: 'expo.out', onComplete: function() {}});
      }
      gsap.to($('#soft main #soft-pages #avatar .avatars-scaled .btn-next'), { delay: 1, duration: 0.5, autoAlpha: 1, scale: 1, ease: 'expo.out', onComplete: function() {
        theme.endTransition();
        soft.pageBuild('intro');
      }});
    }});

    $(document).on('click', '#soft main #soft-pages #hud-include .nav-scaled .btn-prev', function() {
      if (theme.vars.btnClicked == false) {
        theme.vars.btnClicked = true;
        theme.prevPage();
      }
    });

    $(document).on('click', '#soft main #soft-pages #avatar .avatars ul li.btn-avatar', function() {
      $('#soft main #soft-pages #avatar .avatars ul li').removeClass('selected');
      $(this).addClass('selected');

      theme.vars.currentAvatar = 'avatar-' + ($(this).index() + 1);

      $('#soft main #soft-pages #avatar .btn-next').removeClass('inactive').addClass('pulse-scale');

      soft.setPageActive('intro', true);
    });

    $(document).on('click', '#soft main #soft-pages #avatar .btn-next', function() {
      if (theme.vars.btnClicked == false) {
        theme.vars.currentVideo = document.getElementById('video');
        theme.vars.currentVideo.play();

        theme.vars.btnClicked = true;
        theme.nextPage();
      }
    });
    
  },

  videoControl: function() {

    theme.vars.currentVideo.onplaying = function() {}

    theme.vars.currentVideo.onpause = function() {

      if (soft.pageId == 'intro') {
        theme.vars.currentTimeline.pause();
      }

    }

    theme.vars.currentVideo.ontimeupdate = function() {

      if (soft.pageId == 'intro') {
        if (theme.vars.currentVideo.currentTime > 0.1) {
          theme.vars.currentTimeline.resume();
        }
      }

      else if (soft.pageId == 'a-escola-da-inteligencia') {

        if (theme.vars.currentVideo.currentTime.toFixed(1) >= 41.4 && theme.vars.currentVideo.currentTime.toFixed(1) < 41.7) {

          if ($('#soft main #soft-pages #hud-include .pillars-scaled .pillars .pillar.drop').length < 3) {

            theme.vars.userPaused = true;
            theme.vars.currentVideo.pause();

            $('#soft main #soft-pages #a-escola-da-inteligencia .pillars-drag .pillars').addClass('show');

            gsap.to($(document), { delay: 0, duration: 0.5, ease: 'none', onComplete: function() {
              
              $('#soft main #soft-pages #hud-include .pillars-scaled .pillars .pillar-1').addClass('pulse-scale');
              $('#soft main #soft-pages #hud-include .pillars-scaled .pillars .pillar-2').addClass('pulse-scale-2');
              $('#soft main #soft-pages #hud-include .pillars-scaled .pillars .pillar-3').addClass('pulse-scale-3');

              $('#soft main #soft-pages #a-escola-da-inteligencia .pillars-drag .pillars .btn-pillar.escola').addClass('pulse-scale');
              $('#soft main #soft-pages #a-escola-da-inteligencia .pillars-drag .pillars .btn-pillar.familia').addClass('pulse-scale-2');
              $('#soft main #soft-pages #a-escola-da-inteligencia .pillars-drag .pillars .btn-pillar.estudante').addClass('pulse-scale-3');

              var pillarsDrop = null;

              Draggable.create('#soft main #soft-pages #a-escola-da-inteligencia .pillars-drag .pillars .btn-pillar', {
                type: 'x,y',
                bounds: '#soft',
                onPress: function() {
                  pillarsDrop = $('#soft main #soft-pages #hud-include .pillars-scaled .pillars .pillar.empty');

                  $(this.target).removeClass('ease').removeClass('pulse-scale').removeClass('pulse-scale-2').removeClass('pulse-scale-3').addClass('drag');
                  gsap.to($(this.target), { delay: 0, duration: 0.3, scale: 0.5, ease: 'expo.out', onComplete: function() {}});
                },
                onDrag: function() {
                  var i = pillarsDrop.length;
                  while (--i > -1) {
                    if (this.hitTest(pillarsDrop[i], '50%')) {
                      $(pillarsDrop[i]).addClass('hit');
                    }
                    else {
                      $(pillarsDrop[i]).removeClass('hit');
                    }
                  }
                },
                onRelease: function() {
                  var i = pillarsDrop.length;
                  var hitIndexElement = null;
                  while (--i > -1) {
                    if (this.hitTest(pillarsDrop[i], '50%')) {
                      $(this.target).addClass('hit');
                      $(pillarsDrop[i]).removeClass('hit').addClass('drop');
                      hitIndexElement = $(pillarsDrop[i]).index();
                      if ($(this.target).hasClass('escola')) $(pillarsDrop[i]).addClass('escola');
                      else if ($(this.target).hasClass('familia')) $(pillarsDrop[i]).addClass('familia');
                      else if ($(this.target).hasClass('estudante')) $(pillarsDrop[i]).addClass('estudante');
                      $('#soft main #soft-pages #hud-include .avatar-scaled .avatar .ballon').removeClass('show');
                    }
                  }

                  $(this.target).removeClass('drag');

                  $('#soft main #soft-pages #hud-include .pillars-scaled .pillars .pillar.drop').removeClass('empty');
                  
                  if ($(this.target).hasClass('hit')) {
                    var thisClass = null;
                    if ($(this.target).hasClass('escola')) thisClass = 'escola';
                    else if ($(this.target).hasClass('familia')) thisClass = 'familia';
                    else if ($(this.target).hasClass('estudante')) thisClass = 'estudante';
                    softContent[soft.languageIndex].pillarsDrop[hitIndexElement] = thisClass;
                  }
                  else {
                    gsap.to($(this.target), { delay: 0, duration: 0.3, scale: 1, x: 0, y: 0, ease: 'expo.out', onComplete: function() {
                      $(this.targets()).addClass('ease pulse-scale');
                    }});
                  }

                  if ($('#soft main #soft-pages #hud-include .pillars-scaled .pillars .pillar.drop').length == 3) {
                    $('#soft main #soft-pages #a-escola-da-inteligencia .pillars-drag .pillars').addClass('no-bg');
                    theme.vars.currentVideo.currentTime = 42.5;
                    theme.vars.currentVideo.play();
                    theme.vars.userPaused = false;
                    theme.setScore(50);
                  }
                }
              });

              $('#soft main #soft-pages #hud-include .avatar-scaled .avatar .ballon').html('<p>' + pageAEi.pageAvatarTexts[0] + '</p>').addClass('show');

            }});

          }

        }

      }

    }

    theme.vars.currentVideo.onended = function() {

      theme.vars.currentVideoEnded = true;

      if (soft.pageId == 'intro') {
        soft.setPageActive('a-escola-da-inteligencia', true);
        $('#soft main #soft-pages #intro .mask .btn-next').removeClass('ease');
        gsap.to($('#soft main #soft-pages #intro .mask .btn-next'), { delay: 0, duration: 1, right: 180, ease: 'expo.out', onComplete: function() {
          $('#soft main #soft-pages #intro .mask .btn-next').addClass('ease').addClass('pulse-scale');

          $('#soft main #soft-pages #hud-include .avatar-scaled .avatar .ballon').html('<p>' + pageIntro.pageAvatarTexts[0] + '</p>').addClass('show');
        }});
      }

      else if (soft.pageId == 'a-escola-da-inteligencia') {
        soft.setPageActive('educacao-socioemocional', true);
        $('#soft main #soft-pages #a-escola-da-inteligencia .mask .btn-next').removeClass('ease');
        gsap.to($('#soft main #soft-pages #a-escola-da-inteligencia .mask .btn-next'), { delay: 0, duration: 1, right: 180, ease: 'expo.out', onComplete: function() {
          $('#soft main #soft-pages #a-escola-da-inteligencia .mask .btn-next').addClass('ease').addClass('pulse-scale');

          $('#soft main #soft-pages #hud-include .avatar-scaled .avatar .ballon').html('<p>' + pageAEi.pageAvatarTexts[1] + '</p>').addClass('show');
        }});
      }

    }

  },

  // Método para atribuir o Score
  setScore: function(score) {

    theme.vars.score = theme.vars.score + score;
    gsap.to($('#soft main #soft-pages #hud-include .score'), { delay: 0, duration: 0.3, scale: 1.3, ease: 'expo.in', onComplete: function() {
      $('#soft main #soft-pages #hud-include .score span').html(theme.vars.score);
      gsap.to($('#soft main #soft-pages #hud-include .score'), { delay: 0, duration: 0.3, scale: 1, ease: 'expo.out', onComplete: function() {}});
    }});

  },

  // Método da tela Intro
  intro: function() {

    theme.vars.currentBackAudio = 'audioIntro';

    theme.default();

    if (soft.getPageActive('a-escola-da-inteligencia') == true) {
      $('#soft main #soft-pages #hud-include .nav-scaled .nav').removeClass('prev-only');
    }

    $('#soft main #soft-pages #intro .partner-school .school-logo').css('background-image', 'url(soft-content/_schools/' + customConfig.school.path + '/' + customConfig.school.logoImage + ')');

    gsap.to($('#soft main #soft-pages #intro'), { delay: 0, duration: 0.5, autoAlpha: 1, ease: 'expo.out', onComplete: function() {}});

    $(document).on('click', '#soft main #soft-pages #intro #hud-include .nav-scaled .btn-prev', function() {
      if (theme.vars.btnClicked == false) {
        theme.vars.btnClicked = true;
        theme.prevPage();
      }
    });

    $(document).on('click', '#soft main #soft-pages #intro #hud-include .nav-scaled .btn-next', function() {
      if (theme.vars.btnClicked == false) {
        theme.vars.btnClicked = true;
        theme.nextPage();
      }
    });

    $(document).on('click', '#soft main #soft-pages #intro .mask .btn-next', function() {
      if (theme.vars.btnClicked == false) {
        theme.vars.btnClicked = true;
        theme.nextPage();
      }
    });
    
  },

  // Método da tela A EI
  aEI: function() {

    theme.vars.currentBackAudio = 'audioAEscolaDaInteligencia';

    theme.default();

    if (soft.getPageActive('educacao-socioemocional') == true) {
      $('#soft main #soft-pages #hud-include .nav-scaled .nav').removeClass('prev-only');
    }

    gsap.to($('#soft main #soft-pages #a-escola-da-inteligencia'), { delay: 0, duration: 0.5, autoAlpha: 1, ease: 'expo.out', onComplete: function() {
      theme.endTransition();
    }});

    $(document).on('click', '#soft main #soft-pages #a-escola-da-inteligencia #hud-include .nav-scaled .btn-prev', function() {
      if (theme.vars.btnClicked == false) {
        theme.vars.btnClicked = true;
        theme.prevPage();
      }
    });

    $(document).on('click', '#soft main #soft-pages #a-escola-da-inteligencia #hud-include .nav-scaled .btn-next', function() {
      if (theme.vars.btnClicked == false) {
        theme.vars.btnClicked = true;
        theme.nextPage();
      }
    });

    $(document).on('click', '#soft main #soft-pages #a-escola-da-inteligencia .mask .btn-next', function() {
      if (theme.vars.btnClicked == false) {
        theme.vars.btnClicked = true;
        theme.nextPage();
      }
    });
    
  }

}

$(document).on('ready', function() {
  theme.init();
});