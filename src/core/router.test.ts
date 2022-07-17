import {Router} from "./Router";
import {Block} from "./Block";

jest.mock('nanoid', () => {
  return {
    nanoid: (num: number) => Math.floor(Math.random() * num)
  };
});

describe('Router', () => {
  const router = new Router();

  test('should return instance of router', () => {
    const anotherRouter = new Router();
    expect(router).toEqual(anotherRouter);
  });

  test('should update history after route to new page', () => {
    router.go('/sign-up');
    expect(window.history.length).toBe(2);
  });

  test('should stores all used routes', () => {
    class LoginPage extends Block {
      render() {
        return '<div>Login</div>'
      }
    }

    class SignUpPage extends Block {
      render() {
        return '<div>Sign Up</div>'
      }
    }

    class ChatPage extends Block {
      render() {
        return '<div>Chat</div>'
      }
    }

    router
      .use('/login', LoginPage)
      .use('/sign-up', SignUpPage)
      .use('/chat', ChatPage);
    expect(router.routes.length).toEqual(3);
  });
});