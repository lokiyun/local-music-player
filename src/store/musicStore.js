
const Store = window.require('electron-store')
class DataStore extends Store {
  constructor(settings, title) {
    super(settings)
    this.title = title
    this.tracks = this.get(title) || []
  }
  saveTracks() {
    this.set(this.title, this.tracks)
    return this
  }
  getTracks() {
    return this.get(this.title) || []
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

export default DataStore