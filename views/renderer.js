
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

  const renderWelcomeScreen = () => {
    $('#root-container').empty()
    const $welcomeScreen = $(`<div id="welcome-container">
                                <div id="welcome-inner">
                                  <p id="welcome-heading">REMEMBER ME?</p>
                                  <p id="welcome-subheading">just another memory game</p>
                                  <p id="welcome-select">select image source:</p>
                                  <select id="slct-image-src">
                                    <option value="1">Giphy Trending Gifs</option>
                                    <option value="2">Random Dogs</option>
                                  </select>
                                  <button id="btn-start-game">START GAME!</button>
                                </div>
                              </div>`)
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

  return {
    renderGameArea,
    renderLoader,
    renderWelcomeScreen
  }
}

export default Renderer