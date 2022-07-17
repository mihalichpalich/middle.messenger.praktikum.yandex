import {Block} from "./Block";

jest.mock('nanoid', () => {
  return {
    nanoid: (num: number) => Math.floor(Math.random() * num)
  };
});

describe('Block', () => {
  class TestBlock extends Block<{data: string}> {
    constructor(props: {data: string}) {
      super(props);
    }

    render()  {
      return `<div>${this.props.data}</div>`;
    }
  }

  const data = 'test';
  const testBlock = new TestBlock({data});

  test('should receive props', () => {
    expect(testBlock.props.data).toEqual(data);
  });

  test('should return block string', () => {
    expect(testBlock.render()).toEqual(`<div>${data}</div>`);
  });
})