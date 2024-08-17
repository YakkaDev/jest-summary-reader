const { readFile } = require('fs');


async function reader(path, format) {
	return new Promise((resolve, reject) => {
		
		readFile(path, 'utf-8', (error, data) => {
			if(error){
				reject(error);
			} else {
				let result = {
					average: null,
					functions: null,
					lines: null,
					statements: null,
					branches: null
				};
				
				if(format === 'txt'){
					let splittedData = data.split('\n');
					for(let i=1; i<5; i++){
						let key = splittedData[i].split(':')[0].toLowerCase().replace(/ /g, '');
						let value = splittedData[i].split(':')[1].split(' ')[1];
						result[key] = value;
					}
					result.average = Math.round((Number(result.functions.replace(/\%/, '')) + Number(result.lines.replace(/\%/, '')) + Number(result.statements.replace(/\%/, '')) + Number(result.branches.replace(/\%/, '')))/4)+'%'
					resolve(result);
					
				} else if(format === 'json'){
					let parsedData = JSON.parse(data);
					result.statements = parsedData.total.statements.pct + '%';
					result.functions = parsedData.total.functions.pct + '%';
					result.lines = parsedData.total.lines.pct + '%';
					result.branches = parsedData.total.branches.pct + '%';
					result.average = Math.round(parsedData.total.functions.pct + parsedData.total.lines.pct + parsedData.total.statements.pct + parsedData.total.branches.pct)/4 + '%';
					resolve(result);
					
				} else {
					reject(new Error("Available extensions for the file 'coverage-summary' are '.txt' and '.json'."));
				}
			}
		});
	})
};


module.exports = { 
	reader
};