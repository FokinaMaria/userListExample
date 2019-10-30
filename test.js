const { getSliced } = require('./utils');
const { data } = require('./data');

test('test getSliced, count = 3', () => {
  expect(getSliced(data, 3).length).toBe(3);
});

test('test getSliced, count = -1', () => {
  expect(getSliced(data, -1).length).toBe(0);
});

test('test getSliced, count = -5', () => {
  try {
    getSliced(data, -5);
  } catch (e) {
    expect(e.message).toBe('some error');
  }
});

test('test getSliced, count = {}', () => {
    expect(getSliced(data, {}).length).toBe(0);
});
