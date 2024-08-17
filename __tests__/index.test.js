const { run } = require('./../src/main.js');

jest.mock('./../src/main.js', () => ({
	run: jest.fn()
}));

describe('index.js tests', () => {
	it('calls run when imported', async () => {
		require('./../src/index.js');

		expect(run).toHaveBeenCalled();
	})
});