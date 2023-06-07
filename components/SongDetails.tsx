import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function SongDetails({song}) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{song.title}</Text>
      <Text>{song.artist}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 4
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14
  }
});
