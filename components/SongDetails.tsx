import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Song } from '../pages/Home';

export default function SongDetails({song}) {

  return (
    <View style={styles.container}>
      <Text>{song.title}</Text>
      <Text>{song.artist}</Text>
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
