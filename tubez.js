const state = {}

const random = (length = 8) => {
  return Math.random().toString(16).slice(2, length + 2)
}

const getDataFromUrl = async (url) => {
  const result = await fetch(url)
  const data = await result.json()
  return data
}

// fetch the url
const getIt = async () => {
  const randomUrl = `https://www.googleapis.com/youtube/v3/search?id=7lCDEYXw3mM&key=AIzaSyDq9dghsRHEL-AIlG0-LMBcE0qdW1pI2Ns&maxResults=1&part=snippet&type=video&q=${random(4)}`
  const data = await getDataFromUrl(randomUrl)
  const { id: { videoId } } = data.items[0]

  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=AIzaSyDq9dghsRHEL-AIlG0-LMBcE0qdW1pI2Ns&part=snippet,contentDetails,statistics,status`
  const result = await getDataFromUrl(url)
  const title = result.items[0].snippet.title
  const viewCount = result.items[0].statistics.viewCount
  return { title, viewCount, videoId }
}

const makeVid1 = async() => {
  state.vid1 = await getIt()
  document.getElementById('vid1').innerHTML = `<h1>${state.vid1.title}</h1>`
}

const makeVid2 = async() => {
  state.vid2 = await getIt()
  document.getElementById('vid2').innerHTML = `<h1>${state.vid2.title}</h1>`
}

const choose = (vidNum) => {
  const win = vidNum === 1
    ? state.vid1.viewCount > state.vid2.viewCount
    : state.vid1.viewCount < state.vid2.viewCount
  
  document.getElementById('win').innerHTML = `<h1>${win ? 'GREAT SUCCESS' : 'ABJECT FAILURE'}</h1>`
  document.getElementById('vid1-views').innerHTML = `<h1>${state.vid1.viewCount}</h1>`
  document.getElementById('vid2-views').innerHTML = `<h1>${state.vid2.viewCount}</h1>`
  document.getElementById('vid1-link').innerHTML = `<a href="https://www.youtube.com/watch?v=${state.vid1.videoId}">Watch Video</a>`
  document.getElementById('vid2-link').innerHTML = `<a href="https://www.youtube.com/watch?v=${state.vid2.videoId}">Watch Video</a>`
}

//https://www.youtube.com/embed/${videoId}

//document.getElementById('vid1').innerHTML = `<span></span>`

makeVid1()
makeVid2()