import ImageGetter from './ImageGetter.js'
import Card from './Card.js'

const imageGetter =  ImageGetter()

class CardFactory {
  constructor(){
    this.cardsIds = 0
    this.gameCards = []
  }
  createCards(urlsArray){
    urlsArray.forEach(url => this.gameCards.push(new Card(++this.cardsIds,url)))
    return this.gameCards
    
  }
}

export default CardFactory