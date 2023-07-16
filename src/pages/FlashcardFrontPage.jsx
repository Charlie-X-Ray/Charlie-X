import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const FlashcardFrontPage = ({ onOrderSelected }) => {
  const handleAsPerDatabase = () => {
    onOrderSelected('asPerDatabase');
  };

  const handleRandomize = () => {
    onOrderSelected('randomize');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Flashcards!</Text>
      <Image source={'path/to/your/image.png'} style={styles.image} />
      <Text style={styles.subheading}>Choose Flashcard Order:</Text>
      <TouchableOpacity style={styles.button} onPress={handleAsPerDatabase}>
        <Text style={styles.buttonText}>As per Database</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRandomize}>
        <Text style={styles.buttonText}>Randomize</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  subheading: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#45B0CD',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default FlashcardFrontPage;
