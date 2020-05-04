import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, TextInput, StyleSheet, Button, Text} from 'react-native';
import {updateProduct} from '../../store/actions/shoppingListActions';
import Reinput from 'reinput';

const EditProductScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [productName, setProductName] = useState('');
  const [count, setCount] = useState('');
  const [countType, setCountType] = useState('');
  const [note, setNote] = useState('');

  const productLoading = useSelector(
    state => state.shoppingList.editingProduct.loading,
  );
  const product = useSelector(
    state => state.shoppingList.editingProduct.product,
  );

  useEffect(() => {
    if (!productLoading) {
      setProductName(product.name);
      setCount(product.count);
      setCountType(product.countType);
      setNote(product.note);
    }
  }, [productLoading, product]);

  const productNameChangeHandler = textValue => {
    setProductName(textValue);
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
    dispatch(updateProduct(product.id, productName, count, countType, note));
    navigation.navigate('MainShoppingList');
  };

  const loadingComponent = (
    <View style={styles.mainContainer}>
      <Text>Загрузка... </Text>
    </View>
  );

  const editProductComponent = (
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

  let displayingComponent = null;
  if (productLoading === true) {
    displayingComponent = loadingComponent;
  } else {
    displayingComponent = editProductComponent;
  }

  return displayingComponent;
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

EditProductScreen.navigationOptions = ({navigation}) => ({
  headerTitle: 'Редактирование',
});

export default EditProductScreen;
