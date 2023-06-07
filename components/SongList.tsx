import React from 'react'
import { FlatList, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import { Song } from '../pages/Home';
import { List, useTheme } from 'react-native-paper';


interface SongListProps {
  songs: Song[]
  currentSong: number
  onSongSelect: (i: number) => void
}
export default function SongList({songs, currentSong, onSongSelect}: SongListProps) {
  
  const { colors } = useTheme();
  const styles = makeStyles(colors)

  return (
    <ScrollView style={styles.scrollView}>
      {songs.map((song, i) => (
        <List.Item
          key={i}
          title={song.title}
          description={song.artist}
          descriptionNumberOfLines={1}
          onPress={() => onSongSelect(i)}
          style={(i===currentSong) ? styles.currentSong : null}
        />
      ))}
    </ScrollView>
  );
}

const makeStyles = (colors: any) => StyleSheet.create({
  scrollView: {
    width: '100%',
  },
  currentSong: {
    backgroundColor: colors.surfaceDisabled
  }
});
