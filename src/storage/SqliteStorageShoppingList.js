import {PRODUCT_NOT_COMPLETED} from './data/ProductStatus';

const DB_NAME = 'shoppingList.db';

const PRODUCT_TABLE = 'productTable';
const PRODUCT_TABLE_ID = 'id';
const PRODUCT_TABLE_NAME = 'name';
const PRODUCT_TABLE_COUNT = 'count';
const PRODUCT_TABLE_COUNT_TYPE = 'countType';
const PRODUCT_TABLE_NOTE = 'note';
const PRODUCT_TABLE_STATUS = 'status';

const SQlite = require('react-native-sqlite-storage');
const db = SQlite.openDatabase(DB_NAME);

export class SqliteStorageShoppingList {
  static init() {
    const createValuesTable =
      'CREATE TABLE IF NOT EXISTS ' +
      PRODUCT_TABLE +
      ' ' +
      '(' +
      PRODUCT_TABLE_ID +
      ' INTEGER PRIMARY KEY NOT NULL, ' +
      PRODUCT_TABLE_NAME +
      ' TEXT, ' +
      PRODUCT_TABLE_COUNT +
      ' TEXT, ' +
      PRODUCT_TABLE_COUNT_TYPE +
      ' TEXT, ' +
      PRODUCT_TABLE_NOTE +
      ' TEXT, ' +
      PRODUCT_TABLE_STATUS +
      ' TEXT)';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          createValuesTable,
          [],
          (tx, result) => resolve(),
          (tx, error) => reject(error),
        );
      });
    });
  }

  static loadProductsList() {
    const loadValuesStatement = 'SELECT * FROM ' + PRODUCT_TABLE;

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          loadValuesStatement,
          [],
          (tx, result) => resolve(result.rows),
          (tx, error) => reject(error),
        );
      });
    });
  }

  static addProduct({productName, count, countType, note}) {
    const addProductStatement =
      'INSERT INTO ' +
      PRODUCT_TABLE +
      ' (' +
      PRODUCT_TABLE_NAME +
      ', ' +
      PRODUCT_TABLE_COUNT +
      ', ' +
      PRODUCT_TABLE_COUNT_TYPE +
      ', ' +
      PRODUCT_TABLE_NOTE +
      ', ' +
      PRODUCT_TABLE_STATUS +
      ') VALUES (?, ?, ?, ?, ?)';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          addProductStatement,
          [productName, count, countType, note, PRODUCT_NOT_COMPLETED],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error),
        );
      });
    });
  }

  static deleteAll() {
    const deleteAllStatement =
      'DELETE FROM ' + PRODUCT_TABLE + ' WHERE ' + PRODUCT_TABLE_ID + ' > 0';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          deleteAllStatement,
          [],
          (_, result) => resolve(result.rowsAffected),
          (_, error) => reject(error),
        );
      });
    });
  }

  static deleteProduct(id) {
    const deleteProductStatement =
      'DELETE FROM ' + PRODUCT_TABLE + ' WHERE ' + PRODUCT_TABLE_ID + ' = ?';
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          deleteProductStatement,
          [id],
          (_, result) => resolve(result.rowsAffected),
          (_, error) => reject(error),
        );
      });
    });
  }

  static changeProductStatus(status, id) {
    const changeProductStatusStatement =
      'UPDATE ' +
      PRODUCT_TABLE +
      ' SET ' +
      PRODUCT_TABLE_STATUS +
      ' = ? WHERE ' +
      PRODUCT_TABLE_ID +
      ' = ? ';
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          changeProductStatusStatement,
          [status, id],
          (_, result) => resolve(result.rowsAffected),
          (_, error) => reject(error),
        );
      });
    });
  }

  static loadProduct(id) {
    const loadProductStatusStatement =
      'SELECT * FROM ' + PRODUCT_TABLE + ' WHERE ' + PRODUCT_TABLE_ID + ' = ? ';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          loadProductStatusStatement,
          [id],
          (tx, result) => resolve(result.rows),
          (tx, error) => reject(error),
        );
      });
    });
  }

  static updateProduct(id, productName, count, countType, note) {
    const updateProductStatement =
      'UPDATE ' +
      PRODUCT_TABLE +
      ' SET ' +
      PRODUCT_TABLE_NAME +
      ' = ?, ' +
      PRODUCT_TABLE_COUNT +
      ' = ?, ' +
      PRODUCT_TABLE_COUNT_TYPE +
      ' = ?, ' +
      PRODUCT_TABLE_NOTE +
      ' = ? WHERE ' +
      PRODUCT_TABLE_ID +
      ' = ?';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          updateProductStatement,
          [productName, count, countType, note, id],
          (_, result) => resolve(result.rowsAffected),
          (_, error) => reject(error),
        );
      });
    });
  }
}
