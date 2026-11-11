document.addEventListener("DOMContentLoaded", function () {

    const music = document.getElementById("backgroundMusic");

    const musicButton = document.getElementById("musicToggle");

    if (!music || !musicButton) return;

    const STORAGE_KEY = "wishWebsiteMusicTime";

    const PLAY_KEY = "wishWebsiteMusicPlaying";

    let musicStarted = false;


    // Restore previous music position

    music.addEventListener("loadedmetadata", function () {

        const savedTime = sessionStorage.getItem(STORAGE_KEY);

        if (savedTime) {

            const time = Number(savedTime);

            if (Number.isFinite(time) && time < music.duration) {
                music.currentTime = time;
            }

        }

    }, { once: true });


    // Save music position

    function saveMusicPosition() {

        if (!music.paused && Number.isFinite(music.currentTime)) {

            sessionStorage.setItem(
                STORAGE_KEY,
                music.currentTime
            );

        }

    }


    // Play music

    function playMusic() {

        music.play()

            .then(function () {

                musicStarted = true;

                sessionStorage.setItem(PLAY_KEY, "true");

                musicButton.classList.add("playing");

                musicButton.innerHTML = "♫";

                musicButton.setAttribute("aria-label", "Pause music");

            })

            .catch(function () {

                musicButton.classList.remove("playing");

                musicButton.innerHTML = "♡ ♪";

                musicButton.setAttribute("aria-label", "Play music");

            });

    }


    // Try autoplay when the page opens

    playMusic();


    // Backup: start after the first interaction if autoplay is blocked

    function firstInteraction() {

        if (!musicStarted) {
            playMusic();
        }

        document.removeEventListener("click", firstInteraction);

        document.removeEventListener("touchstart", firstInteraction);

        document.removeEventListener("keydown", firstInteraction);

    }

    document.addEventListener("click", firstInteraction);

    document.addEventListener("touchstart", firstInteraction);

    document.addEventListener("keydown", firstInteraction);


    // Music button

    musicButton.addEventListener("click", function () {

        if (music.paused) {

            playMusic();

        } else {

            music.pause();

            musicButton.classList.remove("playing");

            musicButton.innerHTML = "♡ ♪";

            musicButton.setAttribute("aria-label", "Play music");

            sessionStorage.setItem(PLAY_KEY, "false");

        }

    });


    // Remember playback position

    music.addEventListener("timeupdate", saveMusicPosition);

    window.addEventListener("pagehide", saveMusicPosition);


});