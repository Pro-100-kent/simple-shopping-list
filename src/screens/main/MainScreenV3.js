import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import {
  saveValues,
  showValues,
  deleteRecord,
  updateLastRecord,
  getLastValue,
} from '../../store/actions/projectActions';

const MainScreenV3 = () => {
  const uiDispatch = useDispatch();
  const [text, setText] = useState('');
  const [number, setNumber] = useState(0);

  let updatingStatus = useSelector(state => state.project.updatingStatus);
  console.log('UpdatingStatus :' + updatingStatus);

  let showValue = useSelector(state => state.project.lastVal);
  if (showValue.length) {
    console.log(
      'Последнее значение: ' +
        showValue.item(0).id +
        ' ' +
        showValue.item(0).numberValue +
        ' ' +
        showValue.item(0).stringValue,
    );
  }

  const plusButtonHandler = () => {
    if (number < 5) {
      setNumber(number + 1);
    }
  };
  const minusButtonHandler = () => {
    if (number > 0) {
      setNumber(number - 1);
    }
  };

  const changeTextHandler = textValue => {
    setText(textValue);
  };

  const saveButtonHandler = () => {
    uiDispatch(updateLastRecord(number, text));
  };

  const lastValuesButtonHandler = () => {
    uiDispatch(getLastValue());
  };

  return (
    <KeyboardAvoidingView style={styles.mainContainer}>
      <Text style={styles.naimPage}>Главный Экран</Text>
      <View style={styles.nameInputContainer}>
        <TextInput
          style={styles.nameInput}
          value={text}
          placeholder="Поле ввода"
          onChangeText={changeTextHandler}
        />
      </View>
      <Text> {number} </Text>
      <View>
        <Button title={'Плюс'} onPress={plusButtonHandler} />
      </View>
      <View>
        <Button title={'Минус'} onPress={minusButtonHandler} />
      </View>
      <Text> {number + ' ' + text} </Text>
      <View>
        <Button title={'Сохранить'} onPress={saveButtonHandler} />
      </View>
      <View>
        <Button
          title={'Выгрузить последнее значение'}
          onPress={lastValuesButtonHandler}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    // backgroundColor: 'red',
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  naimPage: {
    // marginTop: 10,
    height: 10,
    color: 'purple',
    fontSize: 7,
  },
  nameInputContainer: {
    // marginTop: 10,
    // flex: 1,
    // padding: 10,
    // backgroundColor: 'green',
    // alignSelf: 'center',
    //  justifyContent: 'center',
    // alignItems: 'center',
  },
  nameInput: {
    height: 50,
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'center',
    fontSize: 20,
  },
  showButton: {
    marginTop: 10,
  },
  deleteButton: {
    marginTop: 10,
  },
});

export default MainScreenV3;
