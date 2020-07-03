import GameModule from './modules/GameModule.js'
import Renderer from './views/renderer.js'

const renderer =  Renderer()
const gameModule = new GameModule()



function imgLoad(numOfImages) {

  return new Promise(function(resolve, reject) {

    let imagesArray = []

    $.ajax({
      method: "GET",
      url: `http://api.giphy.com/v1/gifs/trending?api_key=DKiA3kL5riYRm73jOgdluRNehaCQlaex&limit=${numOfImages}`,
      success: function(data){
        console.log(data)
        data.data.map(result => imagesArray.push(result.images.preview_gif.url))
        resolve(imagesArray);
      },
      error: function (xhr, text, error){
        reject(Error('Images didn\'t load successfully; error code:' + text));
      }
    })

  })
}




function preloadImages(srcs) {
  function loadImage(src) {
      return new Promise(function(resolve, reject) {
          var img = new Image();
          img.onload = function() {
              resolve(src);
          };
          img.onerror = img.onabort = function() {
              reject(src);
          };
          img.src = src;
      });
  }
  var promises = [];
  for (var i = 0; i < srcs.length; i++) {
      promises.push(loadImage(srcs[i]));
  }
  return Promise.all(promises);
}


imgLoad(12).then(function(response) {

  preloadImages(response).then(function(imgs) {

    renderer.renderGameArea(gameModule.initiateGame(imgs))
  
  }, function(errImg) {

    console.log('error loading images')

  });

}, function(Error) {
  console.log(Error);
});


$('body').on('click', '.flip-card', function(){

  if(gameModule.cardsFlipped === 0){
    $(this).find('.flip-card-inner').css('transform', 'rotateY(180deg)')
    $(this).addClass('flipped waiting')
    gameModule.cardsFlipped = 1;
    gameModule.flippedCards.push($(this).data().cardid)
  }
  else if(gameModule.cardsFlipped === 1){
    $(this).find('.flip-card-inner').css('transform', 'rotateY(180deg)')
    $(this).addClass('flipped waiting')
    gameModule.cardsFlipped = 2;
    gameModule.flippedCards.push($(this).data().cardid)

    let matchFound = gameModule.checkMatch()

    console.log(matchFound)

    if(matchFound){
      $('.waiting').removeClass('flipped')
      $('.waiting').removeClass('waiting')
      gameModule.cardsFlipped = 0;
    }else{
      setTimeout(function(){
        $('.flipped').find('.flip-card-inner').css('transform', 'rotateY(0deg)')
        $('.waiting').removeClass('flipped')
        $('.waiting').removeClass('waiting')
        gameModule.cardsFlipped = 0;
      },1000)
    }

  }

})


