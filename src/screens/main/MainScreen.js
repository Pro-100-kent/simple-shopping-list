import React, {useState} from 'react';
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
} from '../../store/actions/projectActions';

const MainScreen = () => {
  const uiDispatch = useDispatch();
  const [text, setText] = useState('');
  const [number, setNumber] = useState(0);
  const [idText, setIdText] = useState('');

  let idProject = useSelector(state => state.project.id);
  // console.log('idProject : ' + idProject);

  let dataDB = useSelector(state => state.project.dataBaseData);
  for (let i = 0; i < dataDB.length; ++i) {
    let record = dataDB.item(i);
    console.log(
      record.id + ' ' + record.stringValue + ' ' + record.numberValue,
    );
  }

  let removedId = useSelector(state => state.project.lastRemovedId);
  console.log('removedId: ' + removedId);

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

  const deletIdTextHandler = textValue => {
    setIdText(textValue);
  };

  const saveButtonHandler = () => {
    uiDispatch(
      saveValues({
        numberVal: number,
        stringVal: text,
      }),
    );
  };

  const deleteButtonHandler = () => {
    uiDispatch(deleteRecord(idText));
  };

  const showButtonHandler = () => {
    uiDispatch(showValues());
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
      <View style={styles.showButton}>
        {<Button title={'Выводить'} onPress={showButtonHandler} />}
      </View>
      <TextInput
        keyboardType={'numeric'}
        style={styles.nameInput}
        value={idText}
        placeholder="Удаление по ID"
        onChangeText={deletIdTextHandler}
      />
      <View style={styles.deleteButton}>
        {<Button title={'Удалить'} onPress={deleteButtonHandler} />}
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

export default MainScreen;
