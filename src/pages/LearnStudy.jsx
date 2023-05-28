import SubpageLayout from "../commons/SubpageLayout";

function LearnStudy() {
  return (
    <SubpageLayout heading="Learn & Study">
      

    </SubpageLayout>
  )
}

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';

const FlashcardApp = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isEndReached, setIsEndReached] = useState(false);

  const flashcards = [
    {
      image: require('./path/to/chest-xray-1.jpg'),
      disease: 'Pneumonia'
    },
    {
      image: require('./path/to/chest-xray-2.jpg'),
      disease: 'Tuberculosis'
    },
    // Add more flashcards as needed
  ];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex === flashcards.length - 1) {
      setIsEndReached(true);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setIsFlipped(false);
      setUserAnswer('');
    }
  };

  const handleStartOver = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsEndReached(false);
    setUserAnswer('');
  };

  const handleReturnToMenu = () => {
    // Logic to return to the menu goes here
    // You can navigate to a different screen or perform any necessary actions
  };

  const handleSubmit = () => {
    setIsFlipped(true);
  };

  return (
    <View style={styles.container}>
      {isEndReached ? (
        <View style={styles.endCard}>
          <TouchableOpacity onPress={handleStartOver}>
            <Text style={styles.buttonText}>Start Over</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleReturnToMenu}>
            <Text style={styles.buttonText}>Return to Menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <TouchableOpacity onPress={handleFlip}>
            {isFlipped ? (
              <Text style={styles.answerText}>{flashcards[currentIndex].disease}</Text>
            ) : (
              <Image source={flashcards[currentIndex].image} style={styles.image} />
            )}
          </TouchableOpacity>
          {!isFlipped && (
            <View style={styles.inputContainer}>
              <Text style={styles.questionText}>What disease is this?</Text>
              <TextInput
                value={userAnswer}
                onChangeText={setUserAnswer}
                placeholder="Type your answer"
                style={styles.input}
              />
              <TouchableOpacity onPress={handleSubmit}>
                <Text style={styles.submitButton}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
          {isFlipped && (
            <TouchableOpacity onPress={handleFlip}>
              <Text style={styles.flipBackButton}>Flip Back</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20
  },
  answerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  inputContainer: {
    alignItems: 'center'
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  submitButton: {
    fontSize: 18,
    color: 'blue',
    marginBottom: 10
  },
  flipBackButton: {
    marginTop: 20,
    fontSize: 18,
    color: 'blue'
  },
  endCard: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    elevation: 5
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
    marginVertical: 10
  }
});

export default LearnStudy;