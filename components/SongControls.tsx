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
      <IconButton 
        style={styles.button} 
        icon="shuffle" size={24} 
        iconColor={isShuffle ? theme.colors.primary : theme.colors.surfaceDisabled} 
        containerColor={theme.colors.surfaceDisabled} 
        rippleColor={theme.colors.surfaceDisabled}
        onPress={onShuffleClick} />
      <IconButton 
        style={styles.button} 
        icon="skip-previous" 
        containerColor={theme.colors.surfaceDisabled} 
        rippleColor={theme.colors.surfaceDisabled}
        size={24} 
        onPress={onPreviousClick} />
      {isPlay ? 
        <IconButton 
          style={styles.button} 
          icon="pause-circle" 
          size={32} 
          containerColor={theme.colors.surfaceDisabled} 
          rippleColor={theme.colors.surfaceDisabled}
          onPress={onPlayPauseClick} /> : 
        <IconButton 
          style={styles.button} 
          icon="play-circle" 
          size={32} 
          containerColor={theme.colors.surfaceDisabled} 
          rippleColor={theme.colors.surfaceDisabled}
          onPress={onPlayPauseClick}/>
      }
      <IconButton 
        style={styles.button} 
        icon="skip-next" 
        size={24} 
        containerColor={theme.colors.surfaceDisabled} 
        rippleColor={theme.colors.surfaceDisabled}
        onPress={onNextClick} />
      <IconButton 
        style={styles.button} 
        icon="repeat" 
        size={24} 
        iconColor={isRepeat ? theme.colors.primary : theme.colors.surfaceDisabled} 
        containerColor={theme.colors.surfaceDisabled} 
        rippleColor={theme.colors.surfaceDisabled}
        onPress={onRepeatClick} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    padding: 0
  }
});
