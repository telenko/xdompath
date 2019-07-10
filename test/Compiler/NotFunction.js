import { XpathTokenizer } from "../../src/Tokenizer/XpathTokenizer";
import { Compiler } from "../../src/Compiler/Compiler";

describe('not() function', function() {

    it('should verify not() function', function() {
        let container = document.createElement('li');
        container.innerHTML = `
        <div>
            <span test='2'>
                text-testing
            </span>
        </div>
        `;
        let compiler = new Compiler(new XpathTokenizer(`.//span[not(contains(string(), 'text-testing'))]`));
        compiler.compile();
        let response = compiler.process(container);
        expect(response.length).to.be.equal(0);
        
        compiler = new Compiler(new XpathTokenizer(`.//span[@test='2'][contains(string(), 'text-testing')]`));
        compiler.compile();
        response = compiler.process(container);
        expect(response.length).to.be.equal(1);
    });

    
});