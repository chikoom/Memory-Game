import CardFactory from './CardFactory.js'
const cardFactory = new CardFactory()

class GameModule{
  constructor(){
    this.totalCards = 0
    this.cardsFlipped = 0
    this.cardsLeft = 0
    this.gameCards = []
    this.flippedCards = []
    this.score = 0
  }
  initiateGame(urlsArray){
    
    this.gameCards = cardFactory.createCards(urlsArray)
    this.cardsLeft = this.gameCards.length
    return this.gameCards
  }
  checkMatch(){
    if(this.gameCards[this.flippedCards[0]-1].image === this.gameCards[this.flippedCards[1]-1].image){
      this.flippedCards = []
      return true
    }
    this.flippedCards = []
    return false
  }
}

export default GameModule