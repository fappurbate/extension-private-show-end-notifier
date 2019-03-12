let soundId;

fb.storage.onChanged.addListener((key, change) => {
  if (key === 'soundId') {
    soundId = change.newValue;
  }
});

async function bootstrap() {
  soundId = await fb.storage.get('soundId');

  Vue.component('sound-upload', {
    template: `
      <button class="button" @click="onSelect">
        Select Audio
      </button>
    `,
    methods: {
      async onSelect() {
        const result = await fb.gallery.select({ type: 'audio' });
        if (result) {
          fb.runtime.emitEvent(['@main'], 'set-sound-id', { soundId: result });
        }
      }
    }
  });

  const app = new Vue({
    el: '#root'
  });
}

bootstrap();
