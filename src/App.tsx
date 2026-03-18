import './App.css'
import {useEffect, useState} from "react";

// const tracks = [
//   {
//     id: 1,
//     title: 'Musicfun soundtrack',
//     url: 'https://musicfun.it-incubator.app/api/samurai-way-soundtrack.mp3'
//   },
//   {
//     id: 2,
//     title: 'Musicfun soundtrack instrumental',
//     url: 'https://musicfun.it-incubator.app/api/samurai-way-soundtrack-instrumental.mp3'
//   },
// ]

function App() {

  const [selectedTrackId, setSelectedTrackId] = useState(null)
  const [selectedTrack, setSelectedTrack] = useState(null)
  const [tracks, setTracks] = useState(null)

  useEffect(() => {
    fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {
      headers: {
        'api-key': 'bcc9e78f-6f9c-4635-9406-30e4ae684d2a'
      }
    }).then(res => res.json()).then(json => setTracks(json.data))
  }, [])

  if (tracks === null) {
    return (
      <div>
        <h1>Musicfun player</h1>
        <span>Loading...</span>
      </div>
    )
  }

  if (tracks.length === 0) {
    return (
      <div>
        <h1>Musicfun player</h1>
        <span>No tracks</span>
      </div>
    )
  }


  return (
    <>
    <h1>MusicFun player</h1>
    <button
      onClick={() => {
        setSelectedTrackId(null)
        setSelectedTrack(null)
      }}
    >Reset selection
    </button>
    <div style={{display: 'flex', gap: '2rem'}}>
      <ul>
        {tracks.map((track) => {

          return (
            <li
              key={track.id}
              style={{border: track.id === selectedTrackId ? "1px solid orange" : "none"}}
            >
              <div
                onClick={() => {
                  setSelectedTrackId(track.id)

                  fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks/' + track.id, {
                    headers: {
                      'api-key': 'bcc9e78f-6f9c-4635-9406-30e4ae684d2a'
                    }
                  }).then(res => res.json()).then(json => setSelectedTrack(json.data))


                }}
              >{track.attributes.title}</div>

              <audio
                controls
                src={track.attributes.attachments[0].url}
              ></audio>
            </li>
          )
        })}

      </ul>
      <div>
        <h3>Details</h3>
        {
          selectedTrack === null ? (
            'Track does not selected'
          ) : (
            <div>
              {selectedTrack.id !== selectedTrackId ? (   // поменял условие
                <span>Loading</span>
              ) : (
                <>
                  <h3>{selectedTrack.attributes.title}</h3>
                  <p>{selectedTrack.attributes.lyrics ?? 'no lyrics'}</p>
                </>
              )}
            </div>
          )
        }
      </div>

    </div>

</>
)
}

export default App

