const ImageGetter = () => {

  const getImages = (numOfImages) => {

    let imagesArray = []

    $.ajax({
      method: "GET",
      url: `http://api.giphy.com/v1/gifs/trending?api_key=DKiA3kL5riYRm73jOgdluRNehaCQlaex&limit=${numOfImages}`,
      success: function(data){

        console.log(data.data)
        data.data.map(result => imagesArray.push(result.images.fixed_height.url))
        return imagesArray

      },
      error: function (xhr, text, error){
        console.log(text)
      }
    })

  }

  return {
    getImages
  }
}

export default ImageGetter