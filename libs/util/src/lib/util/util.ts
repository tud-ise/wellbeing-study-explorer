/**
 * aggregate data based on prefix and function
 * @param data
 * @param prefix
 * @param func
 *
 * @return array containing {prefix: aggregateValue}
 */
export function aggregateData(data: any[], prefix: string, func: string) {
  const keys = Object.keys(data[0]).filter((item) =>
    prefix ? item.indexOf(prefix) > -1 : true
  );
  return data.map((item) => {
    const values: number[] = [];
    for (const key of keys) {
      values.push(+item[key]);
    }
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length || 0;
    const newItem = {};
    if (prefix) {
      newItem[prefix] = func === 'sum' ? sum : avg;
    } else {
      newItem['value'] = func === 'sum' ? sum : avg;
    }
    return newItem;
  });
}

/**
 * get all values of an item that have the given Prefix
 * @param item
 * @param prefix
 */
export function getProperties(item: any, prefix: string): any {
  const obj = {};
  for (const key of Object.keys(item)) {
    if (key.indexOf(prefix) === 0) {
      obj[key.replace(prefix, '')] = item[key];
    }
  }
  return obj;
}

/**
 * parse a csv file to an array
 * @param str
 */
export function parseCSV(str: string): any[] {
  const arr = [];
  let quote = false;

  for (let row = 0, col = 0, c = 0; c < str.length; c++) {
    const cc = str[c],
      nc = str[c + 1];
    arr[row] = arr[row] || [];
    arr[row][col] = arr[row][col] || '';

    if (cc == '"' && quote && nc == '"') {
      arr[row][col] += cc;
      ++c;
      continue;
    }
    if (cc == '"') {
      quote = !quote;
      continue;
    }

    if ((cc == ',' || cc == ';') && !quote) {
      ++col;
      continue;
    }

    if (cc == '\r' && nc == '\n' && !quote) {
      ++row;
      col = 0;
      ++c;
      continue;
    }

    if (cc == '\n' && !quote) {
      ++row;
      col = 0;
      continue;
    }

    if (cc == '\r' && !quote) {
      ++row;
      col = 0;
      continue;
    }

    arr[row][col] += cc;
  }
  return arr;
}

export function parseArrayToObjects(content: string[]): any[] {
  const headerRow = content[0];
  const contentRows = content.slice(1, content.length);
  const data = [];
  for (const row of contentRows) {
    const obj = {};
    for (let i = 0; i < headerRow.length; i++) {
      let val: string | number = row[i];
      if (!isNaN(Number(val))) {
        val = Number(val);
      }
      obj[headerRow[i].toLowerCase()] = val;
    }
    data.push(obj);
  }
  return data;
}

export function getAverage(data: any[], prefix: string, func = 'avg'): number {
  const aggregatedData = aggregateData(data, prefix, func).map((item) =>
    prefix ? item[prefix] : item['value']
  );
  const sum = aggregatedData.reduce((a, b) => a + b, 0);
  return sum / aggregatedData.length || 0;
}
