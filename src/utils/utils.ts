let currentAudio: HTMLAudioElement | null = null;

export function playAudio(src: string) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio.play();
  } else {
    const audio = new Audio(src);
    audio.volume = 0.5;
    audio.play();
    currentAudio = audio;
  }
}
