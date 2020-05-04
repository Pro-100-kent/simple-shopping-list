import {
  SAVE_VALUES,
  SHOW_VALUES,
  DELETE_RECORD,
  UPDATE_LAST_RECORD,
  UPDATING_START,
  UPDATING_COMPLETE,
  GET_LAST_VALUE,
} from '../types/projectActionTypes';
import {SqliteStorage} from '../../storage/SqliteStorage';

export const saveValues = ({numberVal, stringVal}) => {
  return async dispatch => {
    const identId = await SqliteStorage.addValues({
      numberValue: numberVal,
      stringValue: stringVal,
    });

    const action = {type: SAVE_VALUES, payload: identId};
    dispatch(action);
  };
};

export const showValues = () => {
  return async dispatch => {
    const bdData = await SqliteStorage.getValues();

    const action = {type: SHOW_VALUES, payload: bdData};
    dispatch(action);
  };
};

export const deleteRecord = id => {
  return async dispatch => {
    const removedItemsCount = await SqliteStorage.deleteItem(id);
    let action;
    if (removedItemsCount > 0) {
      action = {type: DELETE_RECORD, payload: id};
    } else {
      action = {type: DELETE_RECORD, payload: -1};
    }
    dispatch(action);
  };
};

export const updateLastRecord = (numer, text) => {
  return async dispatch => {
    let startAction = {type: UPDATING_START};
    dispatch(startAction);

    try {
      await SqliteStorage.updateLastValue({
        number: numer,
        text: text,
      });
    } catch (e) {
      console.log('ERROR: ' + e);
    }

    let completeAction = {type: UPDATING_COMPLETE};
    dispatch(completeAction);
  };
};

export const getLastValue = () => {
  return async dispatch => {
    const lastVal = await SqliteStorage.getLastValue();

    const action = {type: GET_LAST_VALUE, payload: lastVal};
    dispatch(action);
  };
};
