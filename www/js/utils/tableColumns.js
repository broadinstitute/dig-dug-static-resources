function tableColumns(json, ...columns) {
  let columnIndices = {};

  // don't return anything if an error or empty
  if (json.is_error || !json.variants) {
    return [];
  }

  // map column names to indices
  for (let i in columns) {
    let col = columns[i];

    // use the first variant since they are all in the same order
    json.variants[0].forEach((obj, i) => {
      if (!!obj[col]) columnIndices[col] = i;
    });

    if (!columnIndices[col]) {
      // TODO: warn indicating that the column doesn't exist?
    }
  }

  // map all the variants into the rows
  return json.variants.map(v => {
    return columns.map(col => v[columnIndices[col]][col]);
  });
}
