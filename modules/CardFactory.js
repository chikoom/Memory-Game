import ImageGetter from './ImageGetter.js'
import Card from './Card.js'

const imageGetter =  ImageGetter()

class CardFactory {
  constructor(){
    this.cardsIds = 0
    this.gameCards = []
  }
  dubleArray(urlsArray){
    let arrayLength = urlsArray.length
    for(let i = 0 ; i < arrayLength ; i++){
      urlsArray.push(urlsArray[i])
    }    
    return urlsArray
  }
  randomizeArray(urlsArray){
    let randomMap = this.createRandomMap(urlsArray.length)
    let randomArray = []
    for(let position of randomMap){
      randomArray.push(urlsArray[position])
    }
    return randomArray
  }
  createRandomMap = (nums) => {
    const randomMap = []
    for(let i = 0 ; i < nums ; i++){ 
      while(!randomMap.includes(i)){
        let randomPosition = Math.floor(Math.random() * nums)
        if(randomMap[randomPosition] === undefined){
          randomMap[randomPosition] = i
        }
      }
      
    }
    return randomMap
  }
  createCards(urlsArray){
    urlsArray = this.dubleArray(urlsArray)
    urlsArray = this.randomizeArray(urlsArray)
    urlsArray.forEach(url => this.gameCards.push(new Card(++this.cardsIds,url)))
    return this.gameCards
    
  }
  clearCards(){
    this.gameCards = []
  }
}

export default CardFactory

