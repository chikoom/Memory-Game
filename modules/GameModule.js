import CardFactory from './CardFactory.js'
const cardFactory = new CardFactory()

class GameModule{
  constructor(){
    this.totalCards = 0
    this.cardsFlipped = 0
    this.cardsLeft = 0
    this.gameCards = []
    this.flippedCards = []
    this.totalFlips = 0
    this.initialScore = 1000
    this.score = 1000
    this.gameOver = false
    this.timePassed = 0
  }
  initiateGame(urlsArray){
    
    this.gameCards = cardFactory.createCards(urlsArray)
    this.cardsLeft = this.gameCards.length
    return this.gameCards
  }
  checkMatch(){
    this.totalFlips += 1
    this.score = this.initialScore - (this.totalFlips*10)
    let matchFound = false

    if(this.gameCards[this.flippedCards[0]-1].image === this.gameCards[this.flippedCards[1]-1].image){
      this.flippedCards = []
      matchFound = true
    }
    this.flippedCards = []

    return {
      gameOver: this.gameOver,
      score: this.score,
      totalFlips: this.totalFlips,
      matchFound
    }
  }
}

export default GameModule