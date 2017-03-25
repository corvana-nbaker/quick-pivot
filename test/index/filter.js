import chai from 'chai';
import Pivot from '../../src';

chai.expect();
const expect = chai.expect;
const dataArray = [
 ['name', 'gender', 'house', 'age'],
 ['Jon', 'm', 'Stark', 14],
 ['Arya', 'f', 'Stark', 10],
 ['Cersei', 'f', 'Baratheon', 38],
 ['Tywin', 'm', 'Lannister', 67],
 ['Tyrion', 'm', 'Lannister', 34],
 ['Joffrey', 'm', 'Baratheon', 18],
 ['Bran', 'm', 'Stark', 8],
 ['Jaime', 'm', 'Lannister', 32],
 ['Sansa', 'f', 'Stark', 12],
];
const rowsToPivotTestOne = ['house', 'gender', 'name'];
const colsToPivotTestOne = [];
const aggregationCategory = 'age';
const aggregationType = 'sum';

export default () => {
  it('should return an unmodified pivot if parameters are wrong type', () => {
    const pivot = new Pivot(
      dataArray,
      rowsToPivotTestOne,
      colsToPivotTestOne,
      aggregationCategory,
      aggregationType,
    );
    const originalTable = [...pivot.data.table];

    pivot.filter(['house', 'name'], ['Stark', 'Jon', 'Sanza']);
    expect(pivot.data.table).to.deep.equal(originalTable);
  });

  it('should take a fieldName string, filterValues array, filterType', () => {
    const pivot = new Pivot(
      dataArray,
      rowsToPivotTestOne,
      colsToPivotTestOne,
      aggregationCategory,
      aggregationType,
    );

    const expectedResult = [
      { value: [ 'sum age', 'sum age' ], depth: 0, type: 'colHeader', row: 0 },
      { value: [ 'Stark', 30 ], depth: 0, type: 'rowHeader', row: 1 },
      { value: [ 'f', 22 ], depth: 1, type: 'rowHeader', row: 2 },
      { value: [ 'Arya', 10 ], type: 'data', depth: 2, row: 3 },
      { value: [ 'Sansa', 12 ], type: 'data', depth: 2, row: 4 },
      { value: [ 'm', 8 ], depth: 1, type: 'rowHeader', row: 5 },
      { value: [ 'Bran', 8 ], type: 'data', depth: 2, row: 6 },
      { value: [ 'Baratheon', 56 ], depth: 0, type: 'rowHeader', row: 7 },
      { value: [ 'f', 38 ], depth: 1, type: 'rowHeader', row: 8 },
      { value: [ 'Cersei', 38 ], type: 'data', depth: 2, row: 9 },
      { value: [ 'm', 18 ], depth: 1, type: 'rowHeader', row: 10 },
      { value: [ 'Joffrey', 18 ], type: 'data', depth: 2, row: 11 },
      { value: [ 'Lannister', 133 ], depth: 0, type: 'rowHeader', row: 12 },
      { value: [ 'm', 133 ], depth: 1, type: 'rowHeader', row: 13 },
      { value: [ 'Tywin', 67 ], type: 'data', depth: 2, row: 14 },
      { value: [ 'Tyrion', 34 ], type: 'data', depth: 2, row: 15 },
      { value: [ 'Jaime', 32 ], type: 'data', depth: 2, row: 16 },
    ];

    pivot.filter('name', ['Jon'], 'exclude');
    expect(pivot.data.table).to.deep.equal(expectedResult);
  });

  it('should take a fieldName string and filterValues array', () => {
    const pivot = new Pivot(
      dataArray,
      rowsToPivotTestOne,
      colsToPivotTestOne,
      aggregationCategory,
      aggregationType,
    );

    const expectedResult = [
      { value: [ 'sum age', 'sum age' ], depth: 0, type: 'colHeader', row: 0 },
      { value: [ 'Stark', 30 ], depth: 0, type: 'rowHeader', row: 1 },
      { value: [ 'f', 22 ], depth: 1, type: 'rowHeader', row: 2 },
      { value: [ 'Arya', 10 ], type: 'data', depth: 2, row: 3 },
      { value: [ 'Sansa', 12 ], type: 'data', depth: 2, row: 4 },
      { value: [ 'm', 8 ], depth: 1, type: 'rowHeader', row: 5 },
      { value: [ 'Bran', 8 ], type: 'data', depth: 2, row: 6 },
      { value: [ 'Baratheon', 56 ], depth: 0, type: 'rowHeader', row: 7 },
      { value: [ 'f', 38 ], depth: 1, type: 'rowHeader', row: 8 },
      { value: [ 'Cersei', 38 ], type: 'data', depth: 2, row: 9 },
      { value: [ 'm', 18 ], depth: 1, type: 'rowHeader', row: 10 },
      { value: [ 'Joffrey', 18 ], type: 'data', depth: 2, row: 11 },
      { value: [ 'Lannister', 133 ], depth: 0, type: 'rowHeader', row: 12 },
      { value: [ 'm', 133 ], depth: 1, type: 'rowHeader', row: 13 },
      { value: [ 'Tywin', 67 ], type: 'data', depth: 2, row: 14 },
      { value: [ 'Tyrion', 34 ], type: 'data', depth: 2, row: 15 },
      { value: [ 'Jaime', 32 ], type: 'data', depth: 2, row: 16 },
    ];

    pivot.filter('name', ['Jon']);
    expect(pivot.data.table).to.deep.equal(expectedResult);
  });

  it('should take a callback function', () => {
    const pivot = new Pivot(
      dataArray,
      rowsToPivotTestOne,
      colsToPivotTestOne,
      aggregationCategory,
      aggregationType,
    );

    const expectedResult = [
      { value: [ 'sum age', 'sum age' ], depth: 0, type: 'colHeader', row: 0 },
      { value: [ 'Stark', 44 ], depth: 0, type: 'rowHeader', row: 1 },
      { value: [ 'm', 22 ], depth: 1, type: 'rowHeader', row: 2 },
      { value: [ 'Jon', 14 ], type: 'data', depth: 2, row: 3 },
      { value: [ 'Bran', 8 ], type: 'data', depth: 2, row: 4 },
      { value: [ 'f', 22 ], depth: 1, type: 'rowHeader', row: 5 },
      { value: [ 'Arya', 10 ], type: 'data', depth: 2, row: 6 },
      { value: [ 'Sansa', 12 ], type: 'data', depth: 2, row: 7 },
    ];

    function filterFunc(dataRow) {
      return dataRow.age < 15;
    }

    pivot.filter(filterFunc);

    expect(pivot.data.table).to.deep.equal(expectedResult);
  });

  it('should maintain collapsed state if filtering after collapse', () => {
    const pivot = new Pivot(
      dataArray,
      rowsToPivotTestOne,
      colsToPivotTestOne,
      aggregationCategory,
      aggregationType,
    );

    const expectedResult = [
      { value: [ 'sum age', 'sum age' ], depth: 0, type: 'colHeader', row: 0 },
      { value: [ 'Stark', 30 ], depth: 0, type: 'rowHeader', row: 1 },
      { value: [ 'Baratheon', 56 ],
        depth: 0,
        type: 'rowHeader',
        row: 7 },
      { value: [ 'f', 38 ], depth: 1, type: 'rowHeader', row: 8 },
      { value: [ 'm', 18 ], depth: 1, type: 'rowHeader', row: 10 },
      { value: [ 'Joffrey', 18 ], type: 'data', depth: 2, row: 11 },
      { value: [ 'Lannister', 133 ],
        depth: 0,
        type: 'rowHeader',
        row: 12 },
      { value: [ 'm', 133 ], depth: 1, type: 'rowHeader', row: 13 },
      { value: [ 'Tywin', 67 ], type: 'data', depth: 2, row: 14 },
      { value: [ 'Tyrion', 34 ], type: 'data', depth: 2, row: 15 },
      { value: [ 'Jaime', 32 ], type: 'data', depth: 2, row: 16 },
    ];

    pivot.collapse(2).collapse(3).collapse(1);
    pivot.filter('name', ['Jon'], 'exclude');

    expect(pivot.data.table).to.deep.equal(expectedResult);
  });

  it('should maintain collapsed state even when categories are filtered ' +
    'out', () => {
    const pivot = new Pivot(
      dataArray,
      rowsToPivotTestOne,
      colsToPivotTestOne,
      aggregationCategory,
      aggregationType,
    );

    const expectedResult = [
      { value: [ 'sum age', 'sum age' ], depth: 0, type: 'colHeader', row: 0 },
      { value: [ 'Stark', 44 ], depth: 0, type: 'rowHeader', row: 1 },
    ];

    function filterFunc(dataRow) {
      return dataRow.age < 15;
    }

    pivot.collapse(2).collapse(3).collapse(1);
    pivot.filter(filterFunc);

    expect(pivot.data.table).to.deep.equal(expectedResult);
  });
};