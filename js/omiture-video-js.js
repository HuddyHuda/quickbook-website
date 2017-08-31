<script>
    function roundUp(num, precision) {
        return Math.ceil(num * precision) / precision
    }

    videojs('dream-video', {}, function(){
        myplayer = this;
        var lengthOfVideo;
        var videoTitle = "Dream Video";
        var playername = "Dream Video";
        var windowWidth = getWindow();

        this.on('loadedmetadata', function(){
            var whereYouAt;
            var finalCurrent;

            lengthOfVideo = myplayer.duration();
            var totalDuration = parseInt(lengthOfVideo);
            var finalDuration = Math.round(totalDuration);

            myplayer.on('timeupdate', function(e) {
                whereYouAt = myplayer.currentTime();
                current = parseInt(whereYouAt);
                finalCurrent = Math.round(whereYouAt);
            });

            if (windowWidth > 600) {
                // Desktop Video Auto Play
                omniInitMediaTracking(videoTitle, finalDuration, playername)
                myplayer.on('play', function() {
                    if (typeof finalCurrent === 'undefined' || finalCurrent === null) {
                        var PlayOffset = 0;
                    } else {
                        var PlayOffset = finalDuration - finalCurrent;
                    }

                    console.log('finalDuration:',finalDuration);
                    console.log('finalCurrent:',finalCurrent);

                    console.log('video start play');
                    console.log('Title:',videoTitle);
                    console.log('Play Offset:',PlayOffset);
                });
            } else {
                // Mobile Video Click to Play
                myplayer.on('play', function() {
                    if (typeof finalCurrent === 'undefined' || finalCurrent === null) {
                        var PlayOffset = 0;
                    } else {
                        var PlayOffset = finalDuration - finalCurrent;
                    }

                    console.log('finalDuration:',finalDuration);
                    console.log('finalCurrent:',finalCurrent);

                    console.log('video start play');
                    console.log('Title:',videoTitle);
                    console.log('Play Offset:',PlayOffset);

                    omniInitMediaTracking(videoTitle, finalDuration, playername)
                });
            }

            // Video Resume
            var count = 0;
            myplayer.on('playing', function() {
                count++
                if (count > 1) {
                    console.log('video resume');
                    console.log('Title:',videoTitle);
                    console.log('Resume Offset:',finalCurrent);
                    omniMediaTrackingResume(videoTitle, finalCurrent);
                }
                console.log("playing count:",count);
            });

            // Video Pause
            myplayer.on('pause', function() {
                console.log('video pause');
                console.log('pause offset:',finalCurrent);
                omniMediaTrackingStop(videoTitle, finalCurrent);
            });

            // Video End
            myplayer.on('ended', function() {
               console.log('video is ended!');
               console.log('end Offset:',finalCurrent);
               omniMediaTrackingDone(videoTitle, finalCurrent);
            });
        });
    });
</script>