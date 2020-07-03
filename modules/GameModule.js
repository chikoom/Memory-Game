import CardFactory from './CardFactory.js'
const cardFactory = new CardFactory()

class GameModule{
  constructor(){
    this.totalCards = 0
    this.cardsFlipped = 0
    this.cardsLeft = 0
    this.gameCards = []
    this.score = 0
  }
  initiateGame(urlsArray){
    
    this.gameCards = cardFactory.createCards(urlsArray)
    return this.gameCards
  }
}

export default GameModule