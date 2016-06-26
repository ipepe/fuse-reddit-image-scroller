Observable = require('FuseJS/Observable')
#LocalNotify = require("FuseJS/LocalNotifications")

class App
  items: Observable()
#  reddit_url: 'https://www.reddit.com/r/HeresAFunFact.json'
#  reddit_url: 'https://www.reddit.com/r/AdviceAnimals.json'
  isLoading: Observable(false)

  constructor: ->
    console.log('App building...', new Date().toString())
    @getRedditPosts()

  nextPostId: null
  getRedditUrl: =>
    url = 'https://www.reddit.com/r/pics/new/.json?limit=5'
    url += "&after=#{@nextPostId}" if @nextPostId
    url

  loadMore: =>
    console.log('loadMore', @nextPostId)
    @getRedditPosts()

  endLoading: =>
    @isLoading.value = false

  reloadHandler: =>
    @isLoading.value = true
    @nextPostId = null
    @getRedditPosts()

  onPostClicked: (args) ->
    console.log(JSON.stringify(args))
#    LocalNotify.now("Boom!", "Just like that", "payload", true);

  getRedditPosts: ->
    fetch(@getRedditUrl()).then((response) -> response.json()).then (responseObject) =>
      responseObject?.data?.children?.forEach (post) =>
        if post?.data?.preview?.images?.length && !post.stickied && !post.is_self
          @items.add({
            title: post.data.title,
            image_url: post.data.preview.images[0].source.url
          })
      @nextPostId = responseObject.data.after
      @endLoading()


module.exports = new App()