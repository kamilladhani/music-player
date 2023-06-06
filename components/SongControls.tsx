import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Song } from '../pages/Home';
import { Button, IconButton, useTheme } from 'react-native-paper';

interface SongControlsProps {
  song: Song
  isPlay?: boolean
  isShuffle?: boolean
  isRepeat?: boolean
}

export default function SongControls({song, isPlay, isShuffle, isRepeat}: SongControlsProps) {
  const theme = useTheme()

  return (
    <View style={styles.container}>
      <IconButton icon="shuffle" size={32} iconColor={isShuffle ? theme.colors.primary : theme.colors.surfaceDisabled}></IconButton>
      <IconButton icon="skip-previous" size={32}></IconButton>
      {isPlay ? 
        <IconButton icon="pause-circle" size={48}></IconButton> : 
        <IconButton icon="play-circle" size={48}></IconButton>
      }
      <IconButton icon="skip-next" size={32}></IconButton>
      <IconButton icon="repeat" size={32} iconColor={isShuffle ? theme.colors.primary : theme.colors.surfaceDisabled}></IconButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
