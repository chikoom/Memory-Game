const Counter = (seconds = 0) => {

  const _counterData = {
    seconds: seconds,
    isCounting: false,
    counterInterval: 0
  }

  const startCounting = (intervalCallback, endCallback) => {

    if(!_counterData.isCounting) {
      _counterData.counterInterval = setInterval(function(){
        console.log(`count: ${_counterData.seconds}`)
        --_counterData.seconds
        intervalCallback()
      },1000)
      console.log('Counter Started')
      
    }else{
      console.log('Counter already counting')
      return false
    }
    _counterData.isCounting = true
    
    return 
  }

  const stopCounting = () => {

    clearInterval(_counterData.counterInterval);
    _counterData.isCounting = false
    console.log('Counter Stopped')
    return _counterData.isCounting
  }

  const resetCounter = (initialSeconds) => {

    stopCounting()
    _counterData.seconds = initialSeconds;
    console.log(`Counter reset to ${initialSeconds} seconds.`)
    return true

  }

  const addSeconds = (secondsToAdd) => {
    _counterData.seconds += secondsToAdd
    console.log(`${secondsToAdd} seconds added. Now: ${_counterData.seconds} seconds.`)
    return _counterData.seconds
  }

  const setSeconds = (secondsToSet) => {

    _counterData.seconds = secondsToSet
    console.log(`Counter set to ${secondsToSet} seconds.`)
    return _counterData.seconds
  }

  const getSeconds = () => {
    
    console.log(`Got seconds`)
    return _counterData.seconds
  }

  return {
    startCounting,
    stopCounting,
    resetCounter,
    addSeconds,
    setSeconds,
    getSeconds
  }

}

export default Counter