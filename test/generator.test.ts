import { 
	prefetchDNS,
	preconnetion
} from '../src/generator';
import path from 'path';

describe('HTML generator', () => {

	test('link for dns prefetch single', ()=>{

		let content = prefetchDNS(['example.com']);

		expect(content).toEqual('<link rel="dns-prefetch" href="example.com">');
	});

	test('link for dns prefetch multiple', ()=>{

		let content = prefetchDNS(['example.com','example1.com','domain.com']);

		content = content.replace(/\n\t/g,'');

		expect(content).toEqual('<link rel="dns-prefetch" href="example.com"><link rel="dns-prefetch" href="example1.com"><link rel="dns-prefetch" href="domain.com">');
	});

	test('link for preconnection single', ()=>{

		let content = preconnetion(['example.com']);

		expect(content).toEqual('<link rel="preconnect" href="example.com">');
	});

	test('link for preconnection multiple', ()=>{

		let content = preconnetion(['example.com','example1.com','domain.com']);

		content = content.replace(/\n\t/g,'');

		expect(content).toEqual('<link rel="preconnect" href="example.com"><link rel="preconnect" href="example1.com"><link rel="preconnect" href="domain.com">');
	});

});

