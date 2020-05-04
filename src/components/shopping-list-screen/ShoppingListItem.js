import React from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  deleteProduct,
  changeStatusProduct,
  loadProduct,
} from '../../store/actions/shoppingListActions';
import {
  PRODUCT_COMPLETED,
  PRODUCT_NOT_COMPLETED,
} from '../../storage/data/ProductStatus';
import {icons} from '../../assets/icons';

const ShoppingListItem = ({listItem, navigation}) => {
  const dispatch = useDispatch();

  const changeStatusHandler = () => {
    let newStatus = PRODUCT_NOT_COMPLETED;
    if (listItem.status === PRODUCT_NOT_COMPLETED) {
      newStatus = PRODUCT_COMPLETED;
    }
    dispatch(changeStatusProduct(newStatus, listItem.id));
  };

  const editingHandler = () => {
    dispatch(loadProduct(listItem.id));
    navigation.navigate('EditScreen');
  };

  const deleteHandler = () => {
    dispatch(deleteProduct(listItem.id));
  };

  let productCompleted = false;
  if (listItem.status === PRODUCT_COMPLETED) {
    productCompleted = true;
  } else {
    productCompleted = false;
  }

  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: productCompleted ? 'rgba(255,255,255,0.2)' : 'white'},
      ]}>
      <TouchableOpacity
        onPress={changeStatusHandler}
        style={styles.infoTouchable}
        onLongPress={editingHandler}>
        <View style={styles.infoContainer}>
          <View style={styles.majorInfoContainer}>
            <View style={styles.productNameContainer}>
              <Text
                style={[
                  styles.productName,
                  {
                    color: productCompleted ? 'grey' : 'black',
                    textDecorationLine: productCompleted
                      ? 'line-through'
                      : 'none',
                  },
                ]}
                numberOfLines={2}
                elipsizeMode="tail">
                {listItem.name}
              </Text>
            </View>
            <View style={styles.quantityContainer}>
              <View style={styles.quantityCountContainer}>
                <Text
                  style={[
                    styles.quantityCount,
                    {
                      color: productCompleted ? 'grey' : 'black',
                      textDecorationLine: productCompleted
                        ? 'line-through'
                        : 'none',
                    },
                  ]}
                  numberOfLines={1}>
                  {listItem.count}
                </Text>
              </View>
              <View style={styles.quantityUnitContainer}>
                <Text
                  style={[
                    styles.quantityUnit,
                    {
                      color: productCompleted ? 'grey' : 'black',
                      textDecorationLine: productCompleted
                        ? 'line-through'
                        : 'none',
                    },
                  ]}
                  numberOfLines={1}>
                  {listItem.countType}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.noteContainer}>
            <Text style={styles.note}>{listItem.note}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteHandler}>
        <View style={styles.deleteContainer}>
          <Image style={styles.deleteButton} source={icons.delete} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 7,
    // backgroundColor: 'white',
    borderRadius: 12,
  },
  infoTouchable: {
    flex: 1,
    alignSelf: 'stretch',
  },
  deleteContainer: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    // backgroundColor: 'green',
  },
  deleteButton: {
    width: 30,
    height: 30,
    backgroundColor: 'transparent',
    borderRadius: 15,
    // elevation: 6,
    // marginRight: 10,
  },
  // контэйнер, в кот-ом распологается название продукта, кол-во и примечание.
  infoContainer: {
    flex: 1,
    // backgroundColor: 'gold',
    alignSelf: 'stretch',
  },
  // конт-р, в котором распологается название продукта, кол-во.
  majorInfoContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 50,
    // backgroundColor: 'cyan',
  },
  // конт-р, в котором распологается название продукта.
  productNameContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  // стиль для названия продукта
  productName: {
    marginLeft: 8,
    marginRight: 8,
    fontSize: 18,
  },
  // конт-р, в котором распологается кол-во и ед-ца измерения продукта.
  quantityContainer: {
    alignSelf: 'stretch',
    width: 70,
    flexDirection: 'row',
    // backgroundColor: 'blue',
  },
  // конт-р, в котором распологается кол-во продукта.
  quantityCountContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'flex-end',
    // backgroundColor: 'orange',
  },
  // строка с кол-вом продукта
  quantityCount: {
    marginLeft: 2,
    marginRight: 2,
    fontSize: 18,
  },
  // конт-р, в котором распологается ед-ца измерения продукта.
  quantityUnitContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  // строка с единицей измерения кол-ва продукта
  quantityUnit: {
    // marginLeft: 8,
    marginRight: 2,
    fontSize: 18,
  },
  // конт-р, в котором распологается примечание к продукту.
  noteContainer: {
    flex: 1,
    alignSelf: 'stretch',
    borderTopColor: 'grey',
    borderTopWidth: 0.5,
  },
  note: {
    margin: 4,
    color: 'grey',
  },
});

export default ShoppingListItem;
