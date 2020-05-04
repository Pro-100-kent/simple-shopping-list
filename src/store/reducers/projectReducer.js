import {
  SAVE_VALUES,
  SHOW_VALUES,
  DELETE_RECORD,
  UPDATING_START,
  UPDATING_COMPLETE,
  GET_LAST_VALUE,
} from '../types/projectActionTypes';

const initialState = {
  id: -1,
  dataBaseData: {},
  lastRemovedId: 0,
  updatingStatus: 'COMPLETE',
  lastVal: {},
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_VALUES: {
      return {...state, id: action.payload};
    }

    case SHOW_VALUES: {
      return {...state, dataBaseData: action.payload};
    }

    case DELETE_RECORD: {
      return {...state, lastRemovedId: action.payload};
    }

    case UPDATING_START: {
      return {...state, updatingStatus: 'STARTED'};
    }

    case UPDATING_COMPLETE: {
      return {...state, updatingStatus: 'COMPLETE'};
    }

    case GET_LAST_VALUE: {
      return {...state, lastVal: action.payload};
    }

    default: {
      return state;
    }
  }
};
