import {
  ADD_PRODUCT,
  DELETE_ALL,
  DELETE_PRODUCT,
  CHANGE_STATUS,
  LOAD_PRODUCT_START,
  LOAD_PRODUCT_FINISH,
  LOAD_PRODUCT_ERROR,
  UPDATE_PRODUCT,
  LOAD_SHOPPING_LIST_START,
  LOAD_SHOPPING_LIST_FINISH,
  LOAD_SHOPPING_LIST_ERROR,
} from '../types/shoppingListActionTypes';

// первоначальное состояние данных относящихся к списку продуктов
const initialState = {
  // список продуктов
  productList: {
    // состояние загрузки списка продуктов
    loading: true,
    // сам спсиок продуктов (его данные)
    data: [],
    // возможная ошибка при загрузке списка продуктов
    error: '',
  },
  // текущий редактируемый продукт
  editingProduct: {
    // состояние загрузки редактируемого продукта
    loading: false,
    // сам редактируемый продукт
    product: null,
    // возможная ошибка при загрузке редактируемого продукта
    error: '',
  },
};

export const shoppingListReduser = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SHOPPING_LIST_START: {
      return {
        ...state,
        productList: {...state.productList, loading: true, error: ''},
      };
    }
    case LOAD_SHOPPING_LIST_FINISH: {
      return {
        ...state,
        productList: {
          ...state.productList,
          loading: false,
          data: action.payload,
          error: '',
        },
      };
    }
    case LOAD_SHOPPING_LIST_ERROR: {
      return {
        ...state,
        productList: {
          ...state.productList,
          loading: false,
          error: action.payload,
        },
      };
    }
    case ADD_PRODUCT: {
      return {
        ...state,
        productList: {...state.productList, data: action.payload},
      };
    }
    case DELETE_ALL: {
      return {...state, productList: {...state.productList, data: []}};
    }
    case DELETE_PRODUCT: {
      return {
        ...state,
        productList: {...state.productList, data: action.payload},
      };
    }
    case CHANGE_STATUS: {
      return {
        ...state,
        productList: {...state.productList, data: action.payload},
      };
    }
    case LOAD_PRODUCT_START: {
      return {
        ...state,
        editingProduct: {
          ...state.editingProduct,
          loading: true,
          error: '',
          product: null,
        },
      };
    }
    case LOAD_PRODUCT_FINISH: {
      return {
        ...state,
        editingProduct: {
          ...state.editingProduct,
          loading: false,
          product: action.payload,
          error: '',
        },
      };
    }
    case LOAD_PRODUCT_ERROR: {
      return {
        ...state,
        editingProduct: {
          ...state.editingProduct,
          loading: false,
          error: action.payload,
        },
      };
    }
    case UPDATE_PRODUCT: {
      return {
        ...state,
        productList: {...state.productList, data: action.payload},
      };
    }
    default: {
      return state;
    }
  }
};
