import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';

const MainScreenV2 = () => {
  const [firstNumber, firstSetNumber] = useState(0);
  const [secondNumber, secondSetNumber] = useState(0);
  const [text, setText] = useState('+');

  const plusButtonHandler = () => {
    firstSetNumber(firstNumber + 1);
  };
  const minusButtonHandler = () => {
    firstSetNumber(firstNumber - 1);
  };
  const secondPlusButtonHandler = () => {
    secondSetNumber(secondNumber + 1);
  };
  const secondMinusButtonHandler = () => {
    secondSetNumber(secondNumber - 1);
  };
  const textHandler = textValue => {
    if (textValue !== '-') {
      setText('+');
    } else {
      setText(textValue);
    }
  };
  let x = 0;
  if (text === '+') {
    x = firstNumber + secondNumber;
    console.log(x);
  } else if (text === '-') {
    x = firstNumber - secondNumber;
    console.log(x);
  }
  return (
    <View style={styles.mainContainer}>
      <Text>{firstNumber}</Text>
      <View>
        <Button title={'плюс'} onPress={plusButtonHandler} />
      </View>
      <View>
        <Button title={'минус'} onPress={minusButtonHandler} />
      </View>
      <Text>{secondNumber}</Text>
      <View>
        <Button title={'плюс'} onPress={secondPlusButtonHandler} />
      </View>
      <View>
        <Button title={'минус'} onPress={secondMinusButtonHandler} />
      </View>
      <View>
        <TextInput
          style={styles.text}
          value={text}
          onChangeText={textHandler}
        />
      </View>
      <Text>{x}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    flex: 1,
  },
  text: {
    height: 50,
    fontSize: 20,
  },
});

export default MainScreenV2;
