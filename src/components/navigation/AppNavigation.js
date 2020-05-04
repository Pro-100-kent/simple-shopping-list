import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MainScreenV3 from '../../screens/main/MainScreenV3';
import MainShoppingListScreen from '../../screens/main/MainShoppingListScreen';
import AddProductScreen from '../../screens/create-shopping-list/AddProductScreen';
import EditProductScreen from '../../screens/edit/EditProductScreen';
import ShoppingListItem from '../shopping-list-screen/ShoppingListItem';

const MainStack = createStackNavigator({
  MainShoppingList: {
    screen: MainShoppingListScreen,
  },
  AddProduct: {
    screen: AddProductScreen,
  },
  EditScreen: {
    screen: EditProductScreen,
  },
});

const AppNavigation = createAppContainer(MainStack);

export default AppNavigation;

// screen: MainScreenV3,
