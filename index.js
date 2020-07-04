import GameModule from './modules/GameModule.js'
import Renderer from './views/renderer.js'



const renderer =  Renderer()
const gameModule = new GameModule()

renderer.renderWelcomeScreen(gameModule.getHighScores())



function imgLoad(numOfImages, source) {

  renderer.renderLoader('Getting Images...', 20, false)
  return new Promise(function(resolve, reject) {

    let imagesArray = []

    if(parseInt(source) === 1){

      $.ajax({
        method: "GET",
        url: `http://api.giphy.com/v1/gifs/trending?api_key=DKiA3kL5riYRm73jOgdluRNehaCQlaex&limit=${numOfImages}`,
        success: function(data){
          renderer.renderLoader('Images Downloaded...', 50, false)
          data.data.map(result => imagesArray.push(result.images.preview_gif.url))
          resolve(imagesArray);
        },
        error: function (xhr, text, error){
          reject(Error('Images didn\'t load successfully; error code:' + text));
        }
      })

    }else if(parseInt(source) === 2){

      $.ajax({
        method: "GET",
        url: `https://dog.ceo/api/breeds/image/random/${numOfImages}`,
        success: function(data){
          renderer.renderLoader('Images Downloaded...', 50, false)
          //data.data.map(result => imagesArray.push(result.images.preview_gif.url))
          resolve(data.message);
        },
        error: function (xhr, text, error){
          reject(Error('Images didn\'t load successfully; error code:' + text));
        }
      })

    }

    

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
  renderer.renderLoader('Preloading Images...', 75, false)
  var promises = [];
  for (var i = 0; i < srcs.length; i++) {
      promises.push(loadImage(srcs[i]));
  }
  return Promise.all(promises);
}





$('body').on('click', '.flip-card', function(){
  if($(this).hasClass('found') || $(this).hasClass('waiting')){
    return
  }
  else if(gameModule.cardsFlipped === 0){
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

    let matchResult = gameModule.checkMatch()
    renderer.renderFlip(matchResult)

    if(matchResult.matchFound){
      $('.waiting').addClass('found')
      $('.waiting').removeClass('flipped')
      $('.waiting').removeClass('waiting')
      gameModule.cardsFlipped = 0;
      console.log(`${gameModule.cardsLeft} Cards Left`)

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


$('body').on('click', '#btn-start-game', function(){

  const sourceSelection = parseInt($('#slct-image-src').val())
  renderer.renderLoader('Loading...', 10, false)

  imgLoad(12, sourceSelection).then(function(response) {

    preloadImages(response).then(function(imgs) {
  
      renderer.renderLoader('Enjoy!', 100, false)
      setTimeout(function(){
        renderer.renderLoader('Enjoy!', 100, true)
        renderer.renderGameArea(gameModule.initiateGame(imgs))
        gameModule.startGame(renderer.renderTime)
      },1000)
      
    }, function(errImg) {
  
      console.log('error loading images')
  
    });
  
  }, function(Error) {
    console.log(Error);
  });

})

$('body').on('click', '#btn-highscore', function(){
  if($('#highscore-name').val().length < 2){
    return
  }
  const name = $('#highscore-name').val()
  gameModule.setHighScore(name)
  $('#highscore-name').val('')
  $('#highscoreInput').empty()
  $('#highscoreInput').append(renderer.renderHighScore(gameModule.getHighScores()))
})