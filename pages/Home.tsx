import React, { useState, useMemo, useEffect, useRef } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SONGS } from '../sampledata/songlist.json'
import SongDetails from '../components/SongDetails';
import SongControls from '../components/SongControls';
import Scrubber from 'react-native-scrubber'
import { useTheme } from 'react-native-paper';
import SongList from '../components/SongList';

export interface Song {
  title: string
  artist: string
  duration: number
}

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<number>(0);
  const [isPlay, setIsPlay] = useState<boolean>(true);
  const [isRepeat, setIsRepeat] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [scrubberValue, setScrubberValue] = useState<number>(0);
  const intervalRef = useRef<any>()

  const theme = useTheme()

  const onSongSelect = (i: number) => {
    setCurrentSong(i)
    setScrubberValue(0);
  }

  const playSong = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (isPlay) {
        setScrubberValue(scrubberValue => scrubberValue+1);
      }
    }, 1000);
  }

  const nextSong = () => {
    if (!isRepeat) {
      setCurrentSong(currentSong => (currentSong < songs.length-1) ? currentSong+1 : 0);
    }
    setScrubberValue(0);
  }

  const handlePrevClick = () => {
    if (scrubberValue < 2) {
      setCurrentSong(currentSong => (currentSong > 0) ? currentSong-1 : 0);
    }
    setScrubberValue(0);
  }

  useEffect(() => {
    if (scrubberValue >= songs[currentSong].duration) {
      nextSong()
    } 
  }, [scrubberValue])

  useEffect(() => {
    isPlay ? playSong() : clearInterval(intervalRef.current)
  }, [isPlay])

  useMemo(() => {
    // Call API to get songs
    setSongs(SONGS)
  }, [SONGS])
  
  const onSlidingComplete = (value: number) => {
    setScrubberValue(Math.floor(value))
  }

  return (
    <View style={styles.container}>
      <View style={styles.songlist}>
        <SongList songs={songs} onSongSelect={(i: number) => onSongSelect(i)}/>
      </View>
      <View style={styles.footer}>
        <SongDetails song={songs[currentSong]} />
        {songs.length > 0 ? 
          <Scrubber 
            value={scrubberValue} 
            onSlidingComplete={onSlidingComplete}
            totalDuration={songs[currentSong].duration}
            trackColor={theme.colors.secondary}
            scrubbedColor={theme.colors.primary}
          /> 
          : null
        }
        <SongControls 
          song={songs[currentSong]} 
          isPlay={isPlay}
          isRepeat={isRepeat}
          isShuffle={isShuffle}
          onNextClick={nextSong}
          onPreviousClick={handlePrevClick}
          onPlayPauseClick={() => setIsPlay(!isPlay)}
          onRepeatClick={() => setIsRepeat(!isRepeat)}
          onShuffleClick={() => setIsShuffle(!isShuffle)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    marginTop: 48
  },
  songlist: {
    flex: 1,
    width: '100%',
    paddingTop: 4,
    paddingBottom: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 2,
    borderRadius: 4
  },
  footer: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
