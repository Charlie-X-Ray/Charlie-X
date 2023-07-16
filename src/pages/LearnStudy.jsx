import SubpageLayout from "../commons/SubpageLayout";

function LearnStudy() {
  return (
    <SubpageLayout heading="Learn & Study">
      <FlashcardFrontPage/>

    </SubpageLayout>
  )
}

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, ScrollView } from 'react-native';
import FlashcardFrontPage from './FlashcardFrontPage.jsx';
import { getDownloadURL, ref, list } from "firebase/storage";
import { fbstorage } from "../commons/Firebase"
import { BsBluetooth } from "react-icons/bs";

const FlashcardApp = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isEndReached, setIsEndReached] = useState(false);
  const [writeUp, setWriteUp] = useState('');
  const [isWriteUpVisible, setIsWriteUpVisible] = useState(false);


  const flashcards = [
    {
      image: ('https://firebasestorage.googleapis.com/v0/b/charlie-x-ray.appspot.com/o/xrays%2FFor%20Learn%20Study%20Flashcard%2FPneumonia.jpeg?alt=media&token=238c3862-e459-4ae8-81ee-2ca4ec6a5917&_gl=1*9vfxwj*_ga*MTQ1NTMyMTU1Mi4xNjgyNzgyMjMz*_ga_CW55HF8NVT*MTY4NTQ1NDQwNi42LjEuMTY4NTQ1NTAwNy4wLjAuMA..'),
      annotatedImage: ('https://firebasestorage.googleapis.com/v0/b/charlie-x-ray.appspot.com/o/xrays%2FPneumonia%20%2B%20Lung%20Tumour.png?alt=media&token=ea9d033a-94d8-4950-aaa2-3bf334045041&_gl=1*171kfet*_ga*MTQ1NTMyMTU1Mi4xNjgyNzgyMjMz*_ga_CW55HF8NVT*MTY4NTQ1NDQwNi42LjEuMTY4NTQ1NjE1OC4wLjAuMA..'),
      disease: 'Pneumonia',
      writeUp: 'Pneumonia is the infection within the lung resulting in infective fluid and pus filling alveolar spaces. Diagnostic Features on CXR are 1. airspace opacification representative of filling of alveoli with infectious material and pus 2. At later stage this becomes more confluent, forming a consolidation',
    },
    {
      image: ('https://firebasestorage.googleapis.com/v0/b/charlie-x-ray.appspot.com/o/xrays%2FFor%20Learn%20Study%20Flashcard%2Ftuberculosis.jpeg?alt=media&token=a5aec33e-d30d-4170-b21b-cb87cd85b5ef&_gl=1*17ox2o6*_ga*MTQ1NTMyMTU1Mi4xNjgyNzgyMjMz*_ga_CW55HF8NVT*MTY4NTQ1NDQwNi42LjEuMTY4NTQ1NTMwMi4wLjAuMA..'),
      annotatedImage:('https://firebasestorage.googleapis.com/v0/b/charlie-x-ray.appspot.com/o/xrays%2FTuberculosis.png?alt=media&token=6e19dc04-d899-4b4e-b234-e19b3a74faec'),
      disease: 'Tuberculosis',
      writeUp: 'Write-up for Tb',
    },
    {
      image:('https://firebasestorage.googleapis.com/v0/b/charlie-x-ray.appspot.com/o/xrays%2FFor%20Learn%20Study%20Flashcard%2Fspontaneous%20pneumothorax.jpeg?alt=media&token=0f47d6ea-3de5-4acd-a50b-0a60fc5b9467'),
      annotatedImage: ('https://firebasestorage.googleapis.com/v0/b/charlie-x-ray.appspot.com/o/xrays%2Fpneumothorax.jpeg?alt=media&token=33ea5ab1-7afd-460b-ae83-11aedb3bcad6'),
      disease: 'Pneumothorax',
      writeUp: 'Write-up for Pneumonothorax',
    },
    {
      image:('https://firebasestorage.googleapis.com/v0/b/charlie-x-ray.appspot.com/o/xrays%2FILD.png?alt=media&token=c4a01be0-bb7e-44e5-acbb-ddb993cba8d4'),
      annotatedImage: ('https://firebasestorage.googleapis.com/v0/b/charlie-x-ray.appspot.com/o/xrays%2FILDann.png?alt=media&token=156ef420-d4f1-4723-88ee-486bd6456591'),
      disease: 'Interstitial Lung Disease',
      writeUp: 'Write-Up for ILD',
    },
    {
      image:('https://firebasestorage.googleapis.com/v0/b/charlie-x-ray.appspot.com/o/xrays%2FPleuralEffusion%2BConsolidation.png?alt=media&token=6238499a-7c31-45a0-a12a-2c035c5b1969'),
      annotatedImage:('https://firebasestorage.googleapis.com/v0/b/charlie-x-ray.appspot.com/o/xrays%2FPleuralEffusion%2BConsolidationann.png?alt=media&token=ab8d6583-b231-4999-a2ec-2317d50f3d70'),
      disease: 'Pleural Effusion & Consolidation',
      writeUp: 'Write Up',
    },
    {
      image:('https://firebasestorage.googleapis.com/v0/b/charlie-x-ray.appspot.com/o/xrays%2FCardiomegaly%2BPleuralEffusion%2BAorticEnlarge.png?alt=media&token=41f11394-3b72-47d1-ad3d-912e302c1427'),
      annotatedImage:('https://firebasestorage.googleapis.com/v0/b/charlie-x-ray.appspot.com/o/xrays%2FCardiomegaly%2BPleuralEffusion%2BAorticEnlargeann.png?alt=media&token=995518de-49b8-4ade-b298-5edd45aafc0c'),
      disease: 'Cardiomegaly, Aortic Enlargement',
      writeUp: 'WriteUp',
    }
    // Add more flashcards as needed
  ];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setIsWriteUpVisible(!isWriteUpVisible);
  };

  const handleNext = () => {
    if (currentIndex === flashcards.length - 1) {
      setIsEndReached(true);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setIsFlipped(false);
      setUserAnswer('');
      setWriteUp('');
    }
  };

  const handleStartOver = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsEndReached(false);
    setUserAnswer('');
    setWriteUp('');
  };

  const handleReturnToMenu = () => {
    // Logic to return to the menu goes here
    // You can navigate to a different screen or perform any necessary actions
  };

  const handleSubmit = () => {
    setIsFlipped(true);
    setIsWriteUpVisible(true);
  };

  const handleWriteUpChange = (text) => {
    setWriteUp(text);
  };

  return (
    <View style={styles.container}>
      {isEndReached ? (
        <View>
          <TouchableOpacity onPress={handleStartOver}>
            <Text style={styles.startOverButton}>Start Over</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleReturnToMenu}>
            <Text style={styles.returnToMenuButton}>Return to Menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>  
           <TouchableOpacity onPress={handleFlip} activeOpacity={1.0}>
            {isFlipped ? (
              <View>
                <Image source={{uri:flashcards[currentIndex].annotatedImage}} style={styles.image}/>
                <Text style={styles.answerText}>{flashcards[currentIndex].disease}</Text>
              </View>
            ) : (
              <Image source={flashcards[currentIndex].image} style={styles.image} />
            )}
            </TouchableOpacity>
            
          {!isFlipped && (
            <View style={[styles.inputContainer, {flexDirection: 'column'}]}>
              <Text style={styles.questionText}>What disease is this?</Text>
              <TextInput
                value={userAnswer}
                onChangeText={setUserAnswer}
                placeholder="Type your answer"
                style={styles.input}
              />
              <TouchableOpacity onPress={handleSubmit}>
                <Text style={[styles.submitButton,{flexDirection: 'row'}]}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
          {isFlipped && (
            <TouchableOpacity onPress={handleFlip}>
              <Text style={styles.flipBackButton}>Flip Back</Text>
            </TouchableOpacity>
          )}
          {(!isFlipped || isFlipped) &&(
            <View style={styles.nextButtonContainer}>
              <TouchableOpacity onPress={handleNext}>
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          )}
          {isFlipped && (
            <View style={styles.writeUpContainer}>
              <View style={styles.WriteUpInputContainer}>
                <Text style={styles.writeUpText}>{flashcards[currentIndex].writeUp}</Text>
              </View>
            </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 20,
    marginTop: 20
  },
  writeUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  writeUpInputContainer: {
    flex: 1,
    marginRight: 10,
  },
  writeUpInput: {
    flex: 1,
    height: 80,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 1,
    marginRight: 10,
  },
  writeUpText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    maxWidth: 600,
    marginBottom: 20,
  },
  answerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    textAlign: 'center',
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
    fontSize: 16,
    Width: "20",
    color: 'white',
    marginBottom: 20,
    backgroundColor: "#45B0CD",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderColor: "blue",
    borderRadius: 20,
    flexDirection: "row"
  },
  flipBackButton: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 16,
    color: 'white',
    backgroundColor: "#45B0CD",
    paddingHorizontal: 40,
    paddingVertical: 10,
    flexDirection: "row",
    borderRadius: 20
  },
  endCard: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    marginTop: 10
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
    marginVertical: 10
  },
  nextButtonContainer: {
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: '#45B0CD',
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 20,
  },
  nextButtonText: {
    fontSize: 16,
    color: 'white',
  },
  startOverButton: {
    marginTop: 20,
    fontsize: 18,
    color: 'white',
    marginVertical: 15,
    backgroundColor: '#45B0CD',
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 20,
  },
  returnToMenuButton:{
    fontsize: 18,
    color: 'white',
    marginVertical: 10,
    backgroundColor:'#45B0CD',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  }

});

export default LearnStudy;