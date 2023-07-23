import SubpageLayout from "../commons/SubpageLayout";
import { Outlet } from "react-router-dom";

function LearnStudy() {
  const [flashcardsData, setFlashcardsData] = useState([]);
  useEffect(() => {
    getXRays(fbstorage).then(setFlashcardsData).catch(console.error);
  }, []);

  return (
    <SubpageLayout heading="Learn & Study">
      <Outlet>
        
      </Outlet>

    </SubpageLayout>
  )
}

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, ScrollView } from 'react-native';
import FlashcardFrontPage from './FlashcardFrontPage.jsx';
import { getDownloadURL, ref, list } from "firebase/storage";
import { fbstorage } from "../commons/Firebase"
import { BsBluetooth } from "react-icons/bs";

// Returns an array of X Rays' metadata
const getXRays = async ( fbstorage ) => {
  console.log("getting XRays")
  
  let xRays = []

  const dirRef = ref(fbstorage, 'learn')
  const ogRef = ref(fbstorage, 'original')
  // Read api here https://firebase.google.com/docs/reference/js/storage.md#list
  const xRaysRaw = await list(dirRef, { maxResults:50, }).then( xs => xs.items ).then(xs => xs.filter( x => !x.name.includes("chestxray")))
  xRays = await Promise.all(xRaysRaw.map(async (xRayRef, i) => {
    // Interface can be found https://firebase.google.com/docs/reference/js/storage.storagereference
    const unannotatedImage = await getDownloadURL(xRayRef);
    const annotatedImageRef = ref(ogRef, xRayRef.name);
    const annotatedImage = await getDownloadURL(annotatedImageRef);
    return {
      disease:(await getMetadata(xRayRef)).customMetadata.condition,
      // srcPromise: await getDownloadURL(xRayRef),
      image: unannotatedImage,
      annotatedImage: annotatedImage,
      id: i,
    }
  }));

  if (xRays.length < 21) {
    xRays = [1,2,3,4,5,6,7].flatMap( _ => xRays).map( (x,i) => { return {...x, id:i}})
    xRays = xRays.slice(0, 21)
  }


  return xRays;
}

const FlashcardApp = ({imageDatas}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isEndReached, setIsEndReached] = useState(false);
  const [writeUp, setWriteUp] = useState('');
  const [isWriteUpVisible, setIsWriteUpVisible] = useState(false);

  const [flashcards, setImageData]= useState([])
    
    useEffect(() => {
      getXRays(fbstorage).then(setImageData.catch(console.error))
    }, [])
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
export {FlashcardApp}