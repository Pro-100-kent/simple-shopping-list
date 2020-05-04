import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  FlatList,
  StyleSheet,
  Button,
  Text,
  SectionList,
  Alert,
} from 'react-native';
import ShoppingListItem from '../../components/shopping-list-screen/ShoppingListItem';
import {LoadShoppingList} from '../../store/actions/shoppingListActions';
import {deleteAllProducts} from '../../store/actions/shoppingListActions';
import {
  PRODUCT_COMPLETED,
  PRODUCT_NOT_COMPLETED,
} from '../../storage/data/ProductStatus';

const MainShoppingListScreen = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoadShoppingList());
  }, [dispatch]);

  const shoppingListLoading = useSelector(
    state => state.shoppingList.productList.loading,
  );
  let shoppingList = useSelector(state => state.shoppingList.productList.data);
  shoppingList.sort((s1, s2) => {
    return s2 > s1;
  });

  const completedShoppingList = shoppingList.filter(
    product => product.status === PRODUCT_COMPLETED,
  );
  const notCompletedShoppingList = shoppingList.filter(
    product => product.status === PRODUCT_NOT_COMPLETED,
  );
  // console.log('COMPLETED_LENGTH: ' + completedShoppingList.length);
  // console.log('NOT_COMPLETED_LENGTH: ' + notCompletedShoppingList.length);
  // console.log('');

  const deleteAllHandler = () => {
    Alert.alert(
      'Удаление всего списка',
      'Вы действительно хотите полностью удалить список?',
      [
        {text: 'Нет'},
        {text: 'Да', onPress: () => dispatch(deleteAllProducts())},
      ],
      {cancelable: true},
    );
    // dispatch(deleteAllProducts());
  };

  const addProductHandler = () => {
    navigation.navigate('AddProduct');
  };

  const completedSectionTitle = 'Куплено';
  const notCompletedSectionTitle = 'Нужно купить';

  const renderSectionHeader = ({section}) => {
    if (section.title === completedSectionTitle) {
      if (completedShoppingList.length <= 0) {
        return null;
      } else {
        return <Text>{section.title}</Text>;
      }
    } else if (section.title === notCompletedSectionTitle) {
      if (notCompletedShoppingList.length <= 0) {
        return null;
      } else {
        return <Text>{section.title}</Text>;
      }
    }
    return <Text>{section.title}</Text>;
  };

  const loadingComponent = (
    <View style={styles.mainContainer}>
      <Text>Загрузка... </Text>
    </View>
  );

  const emptyShoppingListComponent = (
    <View style={styles.mainContainer}>
      <Text style={styles.noProduct}> Ваш список пуст</Text>
      <View style={styles.addButtonNoProduct}>
        <Button title={'Добавить'} onPress={addProductHandler} />
      </View>
    </View>
  );

  const shoppingListComponent = (
    <View style={styles.mainContainer}>
      <SectionList
        style={styles.flatlistContainer}
        sections={[
          {title: notCompletedSectionTitle, data: notCompletedShoppingList},
          {title: completedSectionTitle, data: completedShoppingList},
        ]}
        renderSectionHeader={renderSectionHeader}
        renderItem={({item}) => {
          return <ShoppingListItem listItem={item} navigation={navigation} />;
        }}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.button}>
        <View style={styles.deleteButton}>
          <Button
            style={styles.deleteButtonStyle}
            title={'Удалить Все'}
            color={'#FF7F50'}
            onPress={deleteAllHandler}
          />
        </View>
        <View style={styles.addButton}>
          <Button title={'Добавить'} onPress={addProductHandler} />
        </View>
      </View>
    </View>
  );

  let displayingComponent = null;
  if (shoppingListLoading === true) {
    displayingComponent = loadingComponent;
  } else if (shoppingListLoading === false && shoppingList.length > 0) {
    displayingComponent = shoppingListComponent;
  } else if (shoppingListLoading === false && shoppingList.length === 0) {
    displayingComponent = emptyShoppingListComponent;
  }

  return displayingComponent;
};

MainShoppingListScreen.navigationOptions = ({navigation}) => ({
  headerTitle: 'Список покупок',
});

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  noProduct: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 350,
    fontSize: 30,
  },
  flatlistContainer: {
    marginBottom: 85,
  },
  button: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'flex-end',
    flex: 1,
    // backgroundColor: 'grey',
  },
  deleteButton: {
    justifyContent: 'flex-end',
    elevation: 8,
  },
  deleteButtonStyle: {
    borderRadius: 15,
    color: '#660066',
  },
  addButton: {
    marginTop: 10,
    justifyContent: 'flex-end',
    elevation: 8,
    borderRadius: 30,
  },
  addButtonNoProduct: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'flex-end',
  },
});

export default MainShoppingListScreen;
