const { reader } = require('./../src/reader.js');
const { expect } = require('@jest/globals');
const path = require('path');

const jsonpath = path.join(__dirname, 'coverage-dummary.json');
const txtpath = path.join(__dirname, 'coverage-dummary.txt');

const expected = {
	average: '95%',
	functions: '96.87%',
	lines: '93.72%',
	statements: '93.72%',
	branches: '95.31%'
};

describe('reader.js tests', () => {
	
	it('throws an invalid format', async () => {
		await expect(reader(jsonpath, 'exe')).rejects.toThrow("Available extensions for the file 'coverage-summary' are '.txt' and '.json'.");
	});
	
	it('throws an invalid path', async () => {
		await expect(reader('jopa', 'exe')).rejects.toThrow(`ENOENT: no such file or directory, open '${path.join(__dirname, '..', 'jopa')}'`);
	});
	
	it('resolves a .txt summary', async () => {
		await expect(reader(txtpath, 'txt')).resolves.toEqual(expected);
	});
	
	it('resolves a .json summary', async () => {
		await expect(reader(jsonpath, 'json')).resolves.toEqual(expected);
	});
	
});