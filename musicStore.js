const Store = require('electron-store')
class DataStore extends Store {
  constructor(settings) {
    super(settings)
    this.tracks = this.get('tracks') || []
  }
  saveTracks() {
    this.set('tracks', this.tracks)
    return this
  }
  getTracks() {
    return this.get('tracks') || []
  }
  addTracks(tracks) {
    let newTracks = []
    tracks.forEach((item) => {
      for(let i = 0; i < this.tracks.length; i++) {
        if(this.tracks[i].filename === item.filename) {
          return
        }
      }
      newTracks.push(item)
    })
    
    this.tracks = [ ...this.tracks, ...newTracks ]
    return this.saveTracks()
  }
  deleteTrack(deletedId) {
    this.tracks = this.tracks.filter(item => item.id !== deletedId)
    return this.saveTracks()
  }
}

module.exports = DataStore