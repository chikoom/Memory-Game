
const source = $("#cards-template").html();
const template = Handlebars.compile(source);


const Renderer = () => {

  const renderGameArea = (cardsArray) => {
    $('#root-container').empty()
    const $gameArea = $('<div id="gameArea"></div>')
    

    const cardsHTML = template({ cards:cardsArray })
    $gameArea.append(cardsHTML)
    $('#root-container').append($gameArea)
    

  }

  const renderWelcomeScreen = (highscores) => {
    $('#root-container').empty()
    const $welcomeScreen = $(`<div id="welcome-container"></div>`)
    const $welcomeScreenInner = $(`<div id="welcome-inner"></div>`)
    const $welcomeScreenContent = $(`<p id="welcome-heading">REMEMBER ME?</p>
                                      <p id="welcome-subheading">just another memory game</p>
                                      <p id="welcome-select">select image source:</p>
                                      <select id="slct-image-src">
                                        <option value="1">Giphy Trending Gifs</option>
                                        <option value="2">Random Dogs</option>
                                      </select>
                                      <button id="btn-start-game">START GAME!</button>`)

    $welcomeScreen.append($welcomeScreenInner)
    $welcomeScreenInner.append($welcomeScreenContent)
    console.log(highscores)
    if(highscores.length > 0)
      $welcomeScreenInner.append(renderHighScore(highscores))
    
    $('#root-container').append($welcomeScreen)
  }

  const renderLoader = (text, percent, isDone) => {
    $('#loader-container').remove()
    if(!isDone){
      
      const $loaderScreen = $(`<div id="loader-container">
                                <div id="loader-inner">
                                  <div id="loader-bar-outer">
                                    <div id="loader-bar-inner" style="width:${percent}%;"></div>
                                  </div>
                                  <p id="loader-text">${text}</p>
                                </div>
                              </div>`)
      $('#root-container').append($loaderScreen)
    }
  }

  const renderFlip = (gameState) => {
    $('#tries-count').text(gameState.totalFlips)
    $('#score-sum').text(gameState.score)
    if(gameState.gameOver){
      console.log('GAME OVER')
      renderEndGame(gameState)
    }
  }

  const renderEndGame = (gameState) => {
    const $endGameWrapper = $(`<div id="endGameWrapper"></div>`)
    const $endGameInner = $(`<div id="endGameInner"></div>`)
    const $endGameText = $(`<h2>Great Job!</h2>
                      <p>Your score is: ${gameState.score}</p>`)
    const $endGameInput = $(`<div id="highscoreInput">
                          <h3>New HighScore!</h3>
                          <p>Enter Your Name: </p>
                          <input type="text" id="highscore-name" />
                          <button id="btn-highscore">Submit</button>
                        </div>`)
    $endGameInner.append($endGameText)
    if(gameState.isHighScore){
      $endGameInner.append($endGameInput)
    }
    $endGameWrapper.append($endGameInner)
    $('#root-container').append($endGameWrapper)
    
  }

  const renderTime = (seconds) => {
    $('#time-seconds').text(seconds)
    let scoreVal = parseInt($('#score-sum').text())
    $('#score-sum').text(--scoreVal)
  }

  const renderHighScore = (highscores) => {
    $(`.highscore-wrapper`).remove()
    const $highscoreWrapper = $(`<div class="highscore-wrapper"></div>`)
    const $highscoreInner = $(`<div class="highscore-inner">
                                  <h3>HIGH SCORES</h3>
                                  <hr/>
                                </div>`)
    const $highscoreTable = $(`<table class="highscoreTable">
                                  <tr>
                                    <th>Name</th>
                                    <th>Score</th>
                                  </tr>
                                </table>`)

    for(let i = 0 ; i < highscores.length ; i++){
      $highscoreTable.append($(`<tr>
                        <td class="h_name">${highscores[parseInt(i)].name}</td>
                        <td class="h_score">${highscores[parseInt(i)].score}</td>
                      </tr>`))
      if(i === 2){
        break
      }
    }

    const $resetHighscore = $(`<div class="reset-highscore-container"><button class="btn-reset-highscore">Reset Highscore</button></div>`)
    $highscoreInner.append($highscoreTable)
    $highscoreInner.append($resetHighscore)
    $highscoreWrapper.append($highscoreInner)
    return $highscoreWrapper
  }

  return {
    renderGameArea,
    renderLoader,
    renderWelcomeScreen,
    renderFlip,
    renderTime,
    renderHighScore
  }
}

export default Renderer