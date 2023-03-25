/**
 * Generate function list.
 * Exec command
 *   dumpbin /exports C:\Windows\System32\user32.dll
 *   dumpbin /exports kernel32.dll
 * Example
 *   "C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Tools\MSVC\14.32.31326\bin\Hostx64\x64\dumpbin.exe" /exports C:\Windows\System32\user32.dll > user.txt
 */

import { user } from '../src/libs/user.ts';
import { kernel } from '../src/libs/kernel.ts';

interface FuncInfo {
	name: string;
	url?: string;
	base?: boolean;
	baseA?: boolean;
	baseW?: boolean;
	ex?: boolean;
	exA?: boolean;
	exW?: boolean;
}

function ParseLine(line: string) {
	if (line.match(/^[0-9]+\s+[0-9A-F]+\s[^\[]/)) {
		const data = line.replace(/^[0-9]+\s+[0-9A-F]+\s(.*)$/, '$1');
		if (data.match(/^\s/)) {
			return data.trim().split(/\s/)[0];
		} else {
			return data.split(/\s+/)[1];
		}
	}
	return '';
}

function ParseFunctionName(fileName: string) {
	const type = <'A' | 'W' | string> fileName.replace(/^.+([AW])$/, '$1');
	const noTypeName = fileName.replace(/[AW]$/, '');
	const ex = noTypeName.match(/Ex$/);
	const baseName = noTypeName.replace(/Ex$/, '');
	return {
		name: baseName,
		ex: !!ex,
		type: <'A' | 'W' | ''> (['A', 'W'].includes(type) ? type : ''),
	};
}

// deno-lint-ignore no-explicit-any
function Parse(data: string, libs: Deno.DynamicLibrary<any>) {
	const lines = data.split(/[\r\n]+/);
	const funcNames: string[] = [];
	for (const line of lines) {
		const name = ParseLine(line.trim());
		if (name) {
			funcNames.push(name);
			// console.log(name);
		}
	}

	const funcs: {
		[keys: string]: FuncInfo;
	} = {};
	for (const name of funcNames) {
		const exists = typeof libs.symbols[<'CreateWindowExW'> name] !== 'undefined';
		const info = ParseFunctionName(name);
		const key = info.name;
		if (key.match(/^_/)) {
			continue;
		}
		if (!funcs[key]) {
			funcs[key] = {
				name: info.name,
			};
		}
		funcs[key][`${info.ex ? 'ex' : 'base'}${info.type}`] = exists;
	}

	const list = Object.keys(funcs).sort().map((key) => {
		return funcs[key];
	});

	function CountFunc(item: FuncInfo) {
		return (item.base ? 1 : 0) +
			(item.baseA ? 1 : 0) +
			(item.baseW ? 1 : 0) +
			(item.ex ? 1 : 0) +
			(item.exA ? 1 : 0) +
			(item.exW ? 1 : 0);
	}

	return {
		list: list,
		aggregate: {
			all: {
				total: funcNames.length,
				implemented: list.reduce((prev, item) => {
					return prev + CountFunc(item);
				}, 0),
			},
			noDuplication: {
				total: Object.keys(funcs).length,
				implemented: list.reduce((prev, item) => {
					return prev + (0 < CountFunc(item) ? 1 : 0);
				}, 0),
			},
		},
	};
}

// deno-lint-ignore no-explicit-any
async function Report(target: string, libs: Deno.DynamicLibrary<any>, template: string) {
	const result = Parse(await Deno.readTextFile(`report/${target}.txt`), libs);

	try {
		const funcs = <FuncInfo[]> JSON.parse(await Deno.readTextFile(`docs/${target}.json`)).list;
		const urls: { [keys: string]: string } = {};
		for (const func of funcs) {
			if (func.url) {
				urls[func.name] = func.url.replace(/\/ja-jp\//, '/en-us/');
			}
		}
		for (const func of result.list) {
			const key = func.name;
			if (urls[key]) {
				func.url = urls[key];
			}
		}
		// deno-lint-ignore no-empty
	} catch (_error) {}
	Deno.writeTextFile(`docs/${target}.json`, JSON.stringify(result, null, '\t'));

	console.log(target);
	console.log(
		`all: ${result.aggregate.all.implemented} / ${result.aggregate.all.total} ... ${100 * result.aggregate.all.implemented / result.aggregate.all.total}%`,
	);
	console.log(
		`noDuplication: ${result.aggregate.noDuplication.implemented} / ${result.aggregate.noDuplication.total} ... ${
			100 * result.aggregate.noDuplication.implemented / result.aggregate.noDuplication.total
		}%`,
	);

	Deno.writeTextFile(
		`docs/${target}.html`,
		template.replace(/<title>(.+)<\/title>/, `<title>${target} - $1</title>`)
			.replace(/<h1><\/h1>/, `<h1>${target}</h1>`)
			.replace(/<script><\/script>/, `<script id="data" data-target="${target}">const data = ${JSON.stringify(result)};</script>`),
	);
}

const template = await Deno.readTextFile('report/template.html');

await Report('user', user, template);
await Report('kernel', kernel, template);
