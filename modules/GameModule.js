import CardFactory from './CardFactory.js'
import Counter from './Counter.js'
import HighScores from './HighScores.js'
const cardFactory = new CardFactory()
const counter = Counter()
const highScores = HighScores()

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
  startGame(renderCallback){
    counter.startCounting(renderCallback, this)
  }
  checkMatch(){
    this.totalFlips += 1
    this.score = this.score - 10
    let matchFound = false

    if(this.gameCards[this.flippedCards[0]-1].image === this.gameCards[this.flippedCards[1]-1].image){
      this.flippedCards = []
      this.cardsLeft -= 2
      matchFound = true
    }
    this.flippedCards = []

    if(this.cardsLeft === 0){
      this.gameOver = true
      this.isHighScore = highScores.checkHighScore(this.score)
      counter.stopCounting()
    }

    return {
      isHighScore: this.isHighScore,
      gameOver: this.gameOver,
      score: this.score,
      totalFlips: this.totalFlips,
      matchFound
    }
  }
  getHighScores(){
    return highScores.getHighScores()
  }
  checkHighScore(score){
    return highScores.checkHighScore(score)
  }
  setHighScore(name){
    return highScores.setHighScore(name,this.score)
  }
  resetHighScore(){
    return highScores.resetHighScore()
  }
}

export default GameModule