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
import Reinput from 'reinput';
import {LoadShoppingList} from '../../store/actions/shoppingListActions';
import {addProduct} from '../../store/actions/shoppingListActions';
import MainShoppingListScreen from '../main/MainShoppingListScreen';

const AddProductScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [productName, setproductName] = useState('');
  const [count, setCount] = useState('');
  const [countType, setCountType] = useState('');
  const [note, setNote] = useState('');

  // let shoppingLists = useSelector(state => state.shoppingList.allShoppingLists);

  const productNameChangeHandler = textValue => {
    setproductName(textValue);
  };

  const countChangeHandler = textValue => {
    setCount(textValue);
  };

  const countTypeChangeHandler = textValue => {
    setCountType(textValue);
  };

  const noteChangeHandler = textValue => {
    setNote(textValue);
  };

  const saveButtonHandler = () => {
    dispatch(
      addProduct({
        productNameValue: productName,
        countValue: count,
        countTypeValue: countType,
        noteValue: note,
      }),
    );
    navigation.navigate('MainShoppingList');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.nameInputContainer}>
        <Reinput
          style={styles.nameInput}
          fontSize={20}
          value={productName}
          label={'Название продукта'}
          onChangeText={productNameChangeHandler}
        />
        <Reinput
          style={styles.quantityInput}
          value={count}
          label={'Количество'}
          fontSize={20}
          onChangeText={countChangeHandler}
          keyboardType="numeric"
        />
        <Reinput
          style={styles.unitInput}
          value={countType}
          label={'Единица'}
          fontSize={20}
          onChangeText={countTypeChangeHandler}
        />
        <Reinput
          style={styles.noteInput}
          value={note}
          label={'Примечание'}
          fontSize={20}
          onChangeText={noteChangeHandler}
        />
      </View>
      <View style={styles.button}>
        <Button
          title={'Сохранить'}
          color={'#20B2AA'}
          onPress={saveButtonHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    flex: 1,
  },
  nameInputContainer: {
    flex: 1,
  },
  nameInput: {
    height: 70,
    fontSize: 20,
    // backgroundColor: 'purple',
  },
  quantityInput: {
    height: 70,
    fontSize: 20,
  },
  unitInput: {
    height: 70,
    fontSize: 20,
  },
  noteInput: {
    height: 70,
    fontSize: 20,
  },
  button: {
    justifyContent: 'flex-end',
    // flex: 1,
    // backgroundColor: 'grey',
  },
});

AddProductScreen.navigationOptions = ({navigation}) => ({
  headerTitle: 'Добавление',
});

export default AddProductScreen;
