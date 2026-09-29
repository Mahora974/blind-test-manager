class Play {
    static #current = null;

    static toggle(fileTrack) {
        const current = Play.#current;

        if (!current || current.fileTrack !== fileTrack) {
            if (current) {
                current.song.pause();
            }
            Play.#current = { fileTrack, song: new Audio(fileTrack) };
            Play.#current.song.play();
        } else if (current.song.paused) {
            current.song.play();
        } else {
            current.song.pause();
        }
    }
}