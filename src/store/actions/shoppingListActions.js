import {
  LOAD_SHOPPING_LIST,
  ADD_PRODUCT,
  DELETE_ALL,
  DELETE_PRODUCT,
  CHANGE_STATUS,
  LOAD_PRODUCT_START,
  LOAD_PRODUCT_ERROR,
  LOAD_PRODUCT_FINISH,
  UPDATE_PRODUCT,
  LOAD_SHOPPING_LIST_START,
  LOAD_SHOPPING_LIST_ERROR,
  LOAD_SHOPPING_LIST_FINISH,
} from '../types/shoppingListActionTypes';
import {SqliteStorageShoppingList} from '../../storage/SqliteStorageShoppingList';

export const LoadShoppingList = () => {
  return async dispatch => {
    // диспатчим экшен начала загрузки списка продуктов
    dispatch({
      type: LOAD_SHOPPING_LIST_START,
    });

    try {
      // выгружаем из базы данных данные списка продуктов
      const shoppingListData = await SqliteStorageShoppingList.loadProductsList();

      // создаем список продуктов. Изначально делаем его пустым
      const shoppingList = [];
      // заполняем список продуктов полученными из базы данных данными
      for (let i = 0; i < shoppingListData.length; ++i) {
        shoppingList.push(shoppingListData.item(i));
      }
      // диспатчим экшен со списком продуктов
      dispatch({
        type: LOAD_SHOPPING_LIST_FINISH,
        payload: shoppingList,
      });
    } catch (e) {
      // ловим ошибку при работе с базой данный
      dispatch({type: LOAD_SHOPPING_LIST_ERROR, payload: e});
    }
  };
};

export const addProduct = ({
  productNameValue,
  countValue,
  countTypeValue,
  noteValue,
}) => {
  return async dispatch => {
    // загружаем данные нового продукта в базу данных
    await SqliteStorageShoppingList.addProduct({
      note: noteValue,
      productName: productNameValue,
      count: countValue,
      countType: countTypeValue,
    });
    // выгружаем данные обновленного списка продуктов
    const shoppingListData = await SqliteStorageShoppingList.loadProductsList();

    // составляем список продуктов из выгруженных данных
    const shoppingList = [];
    for (let i = 0; i < shoppingListData.length; ++i) {
      shoppingList.push(shoppingListData.item(i));
    }
    // диспатчим экшен с обновленым списком продуктов
    dispatch({
      type: ADD_PRODUCT,
      payload: shoppingList,
    });
  };
};

export const deleteAllProducts = () => {
  return async dispatch => {
    // удаляем весь список продуктов из базы данных
    await SqliteStorageShoppingList.deleteAll();
    dispatch({
      type: DELETE_ALL,
    });
  };
};

export const deleteProduct = id => {
  return async dispatch => {
    // удаляем из базы данных продукт с соответсвующим id
    await SqliteStorageShoppingList.deleteProduct(id);

    // загружаем обновленные данные о списке продуктов
    const shoppingListData = await SqliteStorageShoppingList.loadProductsList();

    // составляем список продуктов из выгруженных данных
    const shoppingList = [];
    for (let i = 0; i < shoppingListData.length; ++i) {
      shoppingList.push(shoppingListData.item(i));
    }
    // диспатчим экшен с обновленым списком продуктов
    dispatch({
      type: DELETE_PRODUCT,
      payload: shoppingList,
    });
  };
};

export const changeStatusProduct = (status, id) => {
  return async dispatch => {
    // обращаемся к базе данных для изменения статуса у элементов с определенным id
    const updatedRows = await SqliteStorageShoppingList.changeProductStatus(
      status,
      id,
    );
    // загружаем обновленные данные о списке продуктов
    const shoppingListData = await SqliteStorageShoppingList.loadProductsList();

    // составляем список продуктов из выгруженных данных
    const shoppingList = [];
    for (let i = 0; i < shoppingListData.length; ++i) {
      shoppingList.push(shoppingListData.item(i));
    }
    // диспатчим экшен с обновленым списком продуктов
    dispatch({
      type: CHANGE_STATUS,
      payload: shoppingList,
    });
  };
};

export const updateProduct = (id, name, count, countType, note) => {
  return async dispatch => {
    // передаем в базу данных обновленные данные о продукте
    await SqliteStorageShoppingList.updateProduct(
      id,
      name,
      count,
      countType,
      note,
    );

    // загружаем обновленные данные о списке продуктов
    const shoppingListData = await SqliteStorageShoppingList.loadProductsList();

    // составляем список продуктов из выгруженных данных
    const shoppingList = [];
    for (let i = 0; i < shoppingListData.length; ++i) {
      shoppingList.push(shoppingListData.item(i));
    }
    // диспатчим экшен с обновленым списком продуктов
    dispatch({
      type: UPDATE_PRODUCT,
      payload: shoppingList,
    });
  };
};

export const loadProduct = id => {
  return async dispatch => {
    // диспатчим экшен начала загрузки продукта
    dispatch({
      type: LOAD_PRODUCT_START,
    });

    try {
      // выгружаем из базы даных данные продукта по его id
      const loadetProductData = await SqliteStorageShoppingList.loadProduct(id);
      // если данные об этом продукте есть - получаем продукт из этих данных
      // и диспачим этот продукт в редюсер.
      if (loadetProductData.length > 0) {
        const product = loadetProductData.item(0);
        dispatch({
          type: LOAD_PRODUCT_FINISH,
          payload: product,
        });
      } else {
        // если данные о продукте пустые - диспатчим экшен с ошибкой
        dispatch({
          type: LOAD_PRODUCT_ERROR,
          payload: 'Внимание! Элемент не найден!',
        });
      }
    } catch (e) {
      // ловим ошибку при работе с базой данных
      dispatch({type: LOAD_PRODUCT_ERROR, payload: e});
    }
  };
};
