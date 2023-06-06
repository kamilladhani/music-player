import React, { useState, useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { SONGS } from '../sampledata/songlist.json'
import SongDetails from '../components/SongDetails';
import SongControls from '../components/SongControls';

export interface Song {
  title: string
  artist: string
  duration: number
}

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<number>(0);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);


  useMemo(() => {
    // Call API to get songs
    setSongs(SONGS)
  }, [SONGS])
  

  return (
    <View style={styles.container}>
      <SongDetails song={songs[currentSong]} />
      <SongControls 
        song={songs[currentSong]} 
        isPlay={isPlay}
        isRepeat={isRepeat}
        isShuffle={isShuffle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
