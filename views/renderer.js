
const source = $("#cards-template").html();
const template = Handlebars.compile(source);


const Renderer = () => {

  const renderGameArea = (cardsArray) => {

    $('#gameArea').empty()
    const cardsHTML = template({ cards:cardsArray })
    $("#gameArea").append(cardsHTML);    

  }

  return {
    renderGameArea
  }
}

export default Renderer