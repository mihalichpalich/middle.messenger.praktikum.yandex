import './styles/index.scss';
import {registerComponent, Router, Store} from "./core";
import {diffObjectsDeep, getScreenComponent} from "./utils";
import {Screens} from "./utils/getScreenComponent";
import {defaultState} from "./store";

import * as componentsMain from "./components";
import * as componentsChat from "./pages/chat/components";

Object.values(componentsMain).forEach((Component: any) => {
  registerComponent(Component);
});

Object.values(componentsChat).forEach((Component: any) => {
  registerComponent(Component);
});

declare global {
  interface Window {
    store: Store<AppState>;
    router: Router;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const store = new Store<AppState>(defaultState);
  const router = new Router();

  window.router = router;
  window.store = store;

  store.on('changed', (prevState, nextState) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(
        '%cstore updated',
        'background: #222; color: #bada55',
        nextState,
      );
      console.log(JSON.stringify(diffObjectsDeep.map(prevState, nextState)));
    }
  });

  router
    .use('/', getScreenComponent(Screens.Login))
    .use('/sign-up', getScreenComponent(Screens.SignUp))
    .use('/settings', getScreenComponent(Screens.Profile))
    .use('/messenger', getScreenComponent(Screens.Chat))
    .use('*', getScreenComponent(Screens.Error404))
    .use('/error500', getScreenComponent(Screens.Error500))
    .start();
});





