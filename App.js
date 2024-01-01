import { ModalPortal } from 'react-native-modals';
import StackNavigation from './navigation/StackNavigation';

import store from './store';
import { Provider } from 'react-redux';
import { UserContext } from './context/UserContext';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <UserContext>
          <StackNavigation/>
          <ModalPortal/>
        </UserContext>
      </Provider>
    </>
  );
}