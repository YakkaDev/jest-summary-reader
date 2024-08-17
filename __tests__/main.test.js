const core = require('@actions/core');
const main = require('./../src/main.js');

const getInputMock = jest.spyOn(core, 'getInput').mockImplementation();
const setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation();
const setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation();

const runMock = jest.spyOn(main, 'run');


describe('github action tests', () => {
	
	beforeEach(() => {
		jest.clearAllMocks()
	});
	
	
	it('sets the time output', async () => {
		getInputMock.mockImplementation(name => {
			switch (name) {
				case 'format': return 'json';
				case 'path': return './__tests__/coverage-dummary.json';
				default: return '';
			}
		});
		
		await main.run();
		expect(runMock).toHaveReturned();
		
		expect(setOutputMock).toHaveBeenNthCalledWith(1, 'average', "95%");
		expect(setOutputMock).toHaveBeenNthCalledWith(2, 'functions', "96.87%");
		expect(setOutputMock).toHaveBeenNthCalledWith(3, 'lines', "93.72%");
		expect(setOutputMock).toHaveBeenNthCalledWith(4, 'statements', "93.72%");
		expect(setOutputMock).toHaveBeenNthCalledWith(5, 'branches', "95.31%");
		
	});
	
	it('fails if no input is provided', async () => {
		getInputMock.mockImplementation(name => {
			switch (name) {
				case 'format': return 'json';
				case 'path': throw new Error('Input required and not supplied: path');
				default: return '';
			}
		});
		
		await main.run();
		expect(runMock).toHaveReturned();
		
		expect(setFailedMock).toHaveBeenNthCalledWith(1, 'Input required and not supplied: path');
		
	});
	
});