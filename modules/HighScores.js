const HighScores = () => {

  const checkHighScore = (newScore) => {
    let currentHighscores = getHighScores()
    if(currentHighscores.length < 3){
      return true
    }
    for(let score of currentHighscores){
      if(newScore > score.score){
        return true
      }
    }
    return false
  }

  const setHighScore = (name, newScore) => {
    let currentHighscores = getHighScores()
    if(currentHighscores.length === 0){
      currentHighscores.push({name:name,score:newScore})
      localStorage.setItem('highscores', JSON.stringify(currentHighscores))
    } else {
      for(let i = 0; i < currentHighscores.length ; i++){
        if(currentHighscores[i].score < newScore){
          currentHighscores.splice(i,0,{name:name,score:newScore})
          localStorage.setItem('highscores', JSON.stringify(currentHighscores))
          return
        }
        if(i === 3) {
          return
        }
      }
      currentHighscores.push({name:name,score:newScore})
      localStorage.setItem('highscores', JSON.stringify(currentHighscores))
      return

    }
    
  }

  const getHighScores = () => {
    return JSON.parse(localStorage.getItem('highscores') || '[]')
  }

  return {
    checkHighScore,
    setHighScore,
    getHighScores
  }
}


export default HighScores