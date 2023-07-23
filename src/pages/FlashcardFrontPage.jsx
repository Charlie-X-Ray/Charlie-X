import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, useNavigate } from "react-router-dom";

const FlashcardFrontPage = ({ onOrderSelected }) => {
  const handleAsPerDatabase = () => {
    onOrderSelected('asPerDatabase');
  };

  const handleRandomize = () => {
    onOrderSelected('randomize');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Learn & Study!</Text>
      <Image source={'https://firebasestorage.googleapis.com/v0/b/charlie-x-ray.appspot.com/o/xrays%2FFor%20Learn%20Study%20Flashcard%2FPneumonia.jpeg?alt=media&token=238c3862-e459-4ae8-81ee-2ca4ec6a5917'} style={styles.image} />
      <Text style={styles.subheading}>Speed up your recall of information with Charlie X's own Flashcards!</Text>
      <TouchableOpacity style={styles.button} onPress={handleAsPerDatabase}>
       <Link to="/Learn/Flashcards">
        <Text style={styles.buttonText}>START</Text>
        </Link> 
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
    marginTop: 20,
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
