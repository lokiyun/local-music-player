export default class MusicAudio extends Audio {
  private static instance: MusicAudio
  private constructor() {
    super()
  }

  static getInstance (): MusicAudio {
    if (!MusicAudio.instance) {
      MusicAudio.instance = new MusicAudio()

    }
    return this.instance
  }

}