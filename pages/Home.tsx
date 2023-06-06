import React, { useState, useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { SONGS } from '../sampledata/songlist.json'
import SongDetails from '../components/SongDetails';

export interface Song {
  title: string
  artist: string
  duration: number
}

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<number>(0);
  
  useMemo(() => {
    // Call API to get songs
    setSongs(SONGS)
  }, [SONGS])
  

  return (
    <View style={styles.container}>
      <SongDetails song={songs[currentSong]} />
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
