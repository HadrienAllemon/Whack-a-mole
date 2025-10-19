import testReducer ,{ increment, reset } from './testSlice';

describe('gameSlice', () => {
  it('should increment the increment button is click', () => {
    const initialState = { value : 0 };
    const result = testReducer(initialState, increment());
    expect(result.value).toBe(1);
  });

  it('should reset score when reset is dispatched', () => {
    const initialState = { value : 0 };
    const result = testReducer(initialState, reset());
    expect(result.value).toBe(0);
  });
});