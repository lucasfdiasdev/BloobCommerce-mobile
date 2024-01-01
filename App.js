import StackNavigation from './navigation/StackNavigation';

import store from './store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <StackNavigation/>
      </Provider>
    </>
  );
}