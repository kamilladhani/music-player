import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Song } from '../pages/Home';
import { Button, IconButton, useTheme } from 'react-native-paper';

interface SongControlsProps {
  song: Song
  isPlay: boolean
  isShuffle: boolean
  isRepeat: boolean
  onPlayPauseClick: () => void
  onShuffleClick: () => void
  onRepeatClick: () => void
  onPreviousClick: () => void
  onNextClick: () => void
}

export default function SongControls({song, isPlay, isShuffle, isRepeat, onPlayPauseClick, onShuffleClick, onRepeatClick, onPreviousClick, onNextClick}: SongControlsProps) {
  const theme = useTheme()

  return (
    <View style={styles.container}>
      <IconButton icon="shuffle" size={32} iconColor={isShuffle ? theme.colors.primary : theme.colors.surfaceDisabled} onPress={onShuffleClick}></IconButton>
      <IconButton icon="skip-previous" size={32} onPress={onPreviousClick}></IconButton>
      {isPlay ? 
        <IconButton icon="pause-circle" size={48} onPress={onPlayPauseClick}></IconButton> : 
        <IconButton icon="play-circle" size={48} onPress={onPlayPauseClick}></IconButton>
      }
      <IconButton icon="skip-next" size={32} onPress={onNextClick}></IconButton>
      <IconButton icon="repeat" size={32} iconColor={isRepeat ? theme.colors.primary : theme.colors.surfaceDisabled} onPress={onRepeatClick}></IconButton>
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
