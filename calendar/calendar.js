const NO_OF_DAYS_IN_WEEK = 7;
const MAX_NO_OF_ROWS_IN_MONTH = 6;
const DAY_IN_MILLIS = 24 * 3600 * 1000;
const DAY_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

// parent element to render
const tBody = document.getElementById('t-body');

/**
 * Returns total no of days in particular month of particular year.
 *
 * @param {number} year
 * @param {numner} month
 *
 * @returns {number}
 */
const getNoOfDayInMonth = (year, month) => {
  // return 32 - new Date(year, month, 32).getDate();
  return (new Date(year, month + 1) - new Date(year, month)) / DAY_IN_MILLIS;
};

/**
 * Checks if passed date is current or not
 *
 * @param {number} day
 * @param {number} month
 * @param {number} year
 */
const isCurrentDate = (day, month, year) => {
  return (
    day === today.getDate() && month === currentMonth && year === currentYear
  );
};

/**
 * Renders empty cell to parent
 *
 * @param {HTMLElement} parent
 */
const renderEmptyCell = parent => {
  const td = document.createElement('td');
  td.appendChild(document.createTextNode(''));
  parent.appendChild(td);
};

/**
 * Renders filled cell with content to parent
 *
 * @param {HTMLElement} parent
 * @param {number} content
 * @param {boolean} isSelected
 */
const renderFilledCell = (parent, content, isSelected = false) => {
  const td = document.createElement('td');

  if (isSelected) {
    td.style.backgroundColor = 'cyan';
  }

  td.appendChild(document.createTextNode(content));
  parent.appendChild(td);
};

/**
 * Renders days of week
 */
const renderDaysInWeek = () => {
  const tr = document.createElement('tr');

  for (let i = 0; i < NO_OF_DAYS_IN_WEEK; i++) {
    const day = document.createElement('td');
    day.appendChild(document.createTextNode(DAY_OF_WEEK[i]));
    tr.appendChild(day);
  }

  // add row to table
  tBody.appendChild(tr);
};

/**
 * Renders the calendar UI for passed month and year
 *
 * @param {number} year
 * @param {numner} month
 */
const renderCalendar = (year = currentYear, month = currentMonth) => {
  const totalNoOfDayInMonth = getNoOfDayInMonth(year, month);
  const monthStartDay = new Date(year, month).getDay();

  let currentDate = 1;

  for (let i = 0; i < MAX_NO_OF_ROWS_IN_MONTH; i++) {
    const tr = document.createElement('tr');

    for (let j = 0; j < NO_OF_DAYS_IN_WEEK; j++) {
      const day = i * MAX_NO_OF_ROWS_IN_MONTH + j;

      // Fill days with empty cell till month start day
      if (monthStartDay > day) {
        renderEmptyCell(tr);
      } else if (currentDate > totalNoOfDayInMonth) {
        // Current day is greater than total no of days in month, break
        break;
      } else {
        renderFilledCell(
          tr,
          currentDate,
          isCurrentDate(currentDate, month, year)
        );
        currentDate++;
      }
    }

    // add row to table
    tBody.appendChild(tr);
  }
};

// Render calendar
renderDaysInWeek();
renderCalendar(2019, 02);
