Observable = require('FuseJS/Observable')
class App
  items: Observable()
#  reddit_url: 'https://www.reddit.com/r/HeresAFunFact.json'
  reddit_url: 'https://www.reddit.com/r/AdviceAnimals.json'
  isLoading: Observable(false)

  constructor: ->
    console.log('App building...', new Date().toString())
    @getRedditPosts()

  endLoading: =>
    @isLoading.value = false

  reloadHandler: =>
    @isLoading.value = true
    @getRedditPosts()

  onPostClicked: ->
    console.log 'testTest!'

  getRedditPosts: ->
    fetch(@reddit_url).then((response) -> response.json()).then (responseObject) =>
      responseObject?.data?.children?.forEach (post) =>
        if post?.data?.preview?.images?.length
          @items.add({
            title: post.data.title,
            image_url: post.data.preview.images[0].source.url
          })
      @endLoading()


module.exports = new App()