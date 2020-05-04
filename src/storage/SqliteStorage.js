const DB_NAME = 'project.db';

const VALUES_TABLE = 'valuesTable';
const VALUES_TABLE_ID = 'id';
const VALUES_TABLE_NUMBER = 'numberValue';
const VALUES_TABLE_STRING = 'stringValue';

const SQlite = require('react-native-sqlite-storage');
const db = SQlite.openDatabase(DB_NAME);

export class SqliteStorage {
  static init() {
    const createValuesTable =
      'CREATE TABLE IF NOT EXISTS ' +
      VALUES_TABLE +
      ' ' +
      '(' +
      VALUES_TABLE_ID +
      ' INTEGER PRIMARY KEY NOT NULL, ' +
      VALUES_TABLE_NUMBER +
      ' INTEGER NOT NULL, ' +
      VALUES_TABLE_STRING +
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

  static addValues({numberValue, stringValue}) {
    const addValuesStatement =
      'INSERT INTO ' +
      VALUES_TABLE +
      ' (' +
      VALUES_TABLE_NUMBER +
      ', ' +
      VALUES_TABLE_STRING +
      ') VALUES (?, ?)';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          addValuesStatement,
          [numberValue, stringValue],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error),
        );
      });
    });
  }

  static getValues() {
    const getValuesStatement = 'SELECT * FROM ' + VALUES_TABLE;

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          getValuesStatement,
          [],
          (tx, result) => resolve(result.rows),
          (tx, error) => reject(error),
        );
      });
    });
  }

  static deleteItem(id) {
    const deleteItemStatement =
      'DELETE FROM ' + VALUES_TABLE + ' WHERE ' + VALUES_TABLE_ID + ' = ?';
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          deleteItemStatement,
          [id],
          (_, result) => resolve(result.rowsAffected),
          (_, error) => reject(error),
        );
      });
    });
  }

  static updateLastValue({number, text}) {
    const getAllDbDataStatement = 'SELECT * FROM ' + VALUES_TABLE;

    const insertDataStatement =
      'INSERT INTO ' +
      VALUES_TABLE +
      ' (' +
      VALUES_TABLE_NUMBER +
      ', ' +
      VALUES_TABLE_STRING +
      ') VALUES (?, ?)';

    const updateStatement =
      'UPDATE ' +
      VALUES_TABLE +
      ' SET ' +
      VALUES_TABLE_NUMBER +
      ' = ?, ' +
      VALUES_TABLE_STRING +
      ' = ? ' +
      'WHERE ' +
      VALUES_TABLE_ID +
      ' LIKE (SELECT ' +
      VALUES_TABLE_ID +
      ' FROM ' +
      VALUES_TABLE +
      ' ORDER BY ' +
      VALUES_TABLE_ID +
      ' DESC LIMIT 1)';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          getAllDbDataStatement,
          [],
          (tx, result) => {
            if (result.rows.length <= 0) {
              tx.executeSql(
                insertDataStatement,
                [number, text],
                (tx, result) => resolve(),
                (tx, error) => {
                  console.log('error1')
                  reject(error);
                },
              );
            } else {
              tx.executeSql(
                updateStatement,
                [number, text],
                (tx, result) => resolve(),
                (tx, error) => {
                  console.log('error2')
                  reject(error)
                },
              );
            }
          },
          (_, error) => {
            console.log('error3')
            reject(error);
          },
        );
      });
    });
  }

  static getLastValue() {
    const getLastValueStatement =
      'SELECT * FROM ' +
      VALUES_TABLE +
      ' WHERE ' +
      VALUES_TABLE_ID +
      ' LIKE (SELECT ' +
      VALUES_TABLE_ID +
      ' FROM ' +
      VALUES_TABLE +
      ' ORDER BY ' +
      VALUES_TABLE_ID +
      ' DESC LIMIT 1)';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          getLastValueStatement,
          [],
          (tx, result) => resolve(result.rows),
          (tx, error) => reject(error),
        );
      });
    });
  }
}
