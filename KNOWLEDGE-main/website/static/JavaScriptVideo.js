let max_res = 10
let api_key = 'AIzaSyCv-G53BF19kc3bQktqybib8TOWHDP3nOc'
let channel_http = "https://www.googleapis.com/youtube/v3/channels?"

function getChannelIcon(item){
    let it = item
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: item.snippet.channelId
    }))
        .then(res => res.json())
        .then(data => {
            it.channelThumb = data.items[0].snippet.thumbnails.default.url
        })
    return it
}

function addIframe(video_id){
    document.getElementById('player').innerHTML = `
    <iframe id="player" width="800" height="600" 
    src="http://www.youtube.com/embed/${video_id}?enablejsapi=1" 
    frameborder="0"></iframe>
    `
}

function addElements(video_right, background, video_container, search) {

    fetch('https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&eventType=none&maxResults=15&order=viewCount&q="'+search+'"&safeSearch=none&videoCaption=any&videoDefinition=any&videoDimension=any&videoDuration=any&videoEmbeddable=any&videoLicense=any&videoSyndicated=any&videoType=any&key=AIzaSyCv-G53BF19kc3bQktqybib8TOWHDP3nOc')
        .then((res) => {
            return res.json()
        }).then((data)=>{
        console.log(data)
        let videos = data.items
        console.log(data, search)
        let count = 0
        addIframe(videos[0].id.videoId)
        for(vid of videos) {
            let it = getChannelIcon(vid)
            // console.log(it.id.videoId)
            // console.log(it)
            //location.href = 'https://youtube.com/watch?v=${it.id.videoId}'
            video_right.innerHTML += `
                <input type="text" class="in" id="video_ID_${count}" value="${it.id.videoId}" hidden>
                <div class="video-card" onclick="addIframe(document.getElementById('video_ID_${count}').value)">
                    <img src="${it.snippet.thumbnails.high.url}" class="thumbnail-card" alt="">
                    <div class="content-card">
                        <img src="${it.channelThumb}" alt="" class="channel-icon-card">
                        <div class="info-card">
                            <h4 class="title-card">${it.snippet.title}</h4>
                            <p class="channel-name-card">${it.snippet.channelTitle}</p>
                        </div>
                    </div>
                </div>
            `
            count += 1
        }
    })
    video_container.append(video_right)
    background.append(video_container)
}

function video_add(search) {
    background.innerHTML ="";
    const video_container = document.createElement("div")
    video_container.classList.add("video")
    video_container.setAttribute('id', 'video')

    const video_left = document.createElement("div")
    video_left.classList.add("video-left")

    const play = document.createElement("div")
    play.setAttribute("id", "player")

    video_left.appendChild(play)
    video_container.appendChild(video_left)
    // onYouTubeIframeAPIReady()

    const video_rigth = document.createElement("div")
    video_rigth.classList.add("video-rigth")
    video_rigth.setAttribute("id", "video-rigth")
    // video_rigth.addEventListener('scroll', () => {
    //     const {scrollTop, scrollHeight, clientHeight} = document.documentElement
    //     console.log(scrollTop, scrollHeight, clientHeight - 5)
    //     if(clientHeight + scrollTop >= scrollHeight) {
    //         addElements(video_rigth, background, video_container)
    //     }
    // })
    addElements(video_rigth, background, video_container, search)
}

video.addEventListener('click', () =>{
    video_add('exemple')
})