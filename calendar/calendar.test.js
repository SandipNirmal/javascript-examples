const { isCurrentDate, getNoOfDayInMonth } = require('./calendar');

const today = new Date();

test('today to be current date', () => {
  expect(
    isCurrentDate(today.getDate(), today.getMonth(), today.getFullYear())
  ).toBe(true);
});
