;(function(){
    const allVideo = document.querySelectorAll('video')

    if (allVideo)
        for (const vid of allVideo){
            vid.addEventListener('click', function(){
                if (vid.paused) {
                    vid.play();
                } else {
                    vid.pause();
                }
            })
        }
})();