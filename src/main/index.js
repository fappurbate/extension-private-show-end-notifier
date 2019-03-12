let soundId = null;

fb.storage.onChanged.addListener((key, change) => {
  if (key === 'soundId') {
    soundId = change.newValue;
  }
});

fb.runtime.onEvent.addListener('set-sound-id', (sender, data) => {
  fb.storage.set('soundId', data.soundId);
});

fb.cb.onMessage.addHandler((type, timestamp, data) => {
  if (type === 'private-show-end') {
    if (soundId) {
      fb.gallery.playAudio(soundId);
    } else {
      fb.logger.warn(`A private show has ended, but no sound ID is set!`);
    }
  }
});

async function bootstrap() {
  soundId = await fb.storage.get('soundId');
}

bootstrap();
