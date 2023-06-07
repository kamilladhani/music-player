import React, { useState, useMemo, useEffect, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { SONGS } from '../sampledata/songlist.json'
import SongDetails from '../components/SongDetails';
import SongControls from '../components/SongControls';
import Scrubber from 'react-native-scrubber'
import { useTheme } from 'react-native-paper';

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
      <SongDetails song={songs[currentSong]} />
      <View style={styles.footer}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    marginTop: 32
  },
  footer: {
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 48
  },
});
