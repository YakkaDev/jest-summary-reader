const core = require('@actions/core');
const { reader } = require('./reader.js');


async function run() {
	try {
		const format = core.getInput('format', { required: false });
		const path = core.getInput('path', { required: true });
		
		let resolvedSummary = await reader(path, format);
		
		core.setOutput('average', resolvedSummary.average);
		core.setOutput('functions', resolvedSummary.functions);
		core.setOutput('lines', resolvedSummary.lines);
		core.setOutput('statements', resolvedSummary.statements);
		core.setOutput('branches', resolvedSummary.branches);
	} catch (error) {
		core.setFailed(error.message);
	}
};


module.exports = {
	run
};