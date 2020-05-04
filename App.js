import React, {useState} from 'react';
import AppNavigation from './src/components/navigation/AppNavigation';
import {SqliteStorage} from './src/storage/SqliteStorage';
import {SqliteStorageShoppingList} from './src/storage/SqliteStorageShoppingList';
import {AppLoading} from './src/common/AppLoading';
import store from './src/store';
import {Provider} from 'react-redux';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={SqliteStorageShoppingList.init}
        onFinish={() => setIsReady(true)}
        onError={err => console.log('App.js: ' + err)}
      />
    );
  }
  // console.log();
  //
  // const resultPromise = SqliteStorage.addValues({
  //   numberValue: 69,
  //   stringValue: 'ИньЯнь',
  // });
  //
  // resultPromise.then(insertedId => {
  //   console.log('insertedValuesId: ' + insertedId);
  // });

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
