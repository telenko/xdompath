import { Compiler } from "../../src/Compiler/Compiler";
import { XpathTokenizer } from "../../src/Tokenizer/XpathTokenizer";

const XPATH_TEST = './div/span';

describe('number filter', function() {

    it('compile number filters', function() {
        let container = document.createElement('li');
        container.innerHTML = `
        <div> <span>test</span> <span>2</span> </div>
        `;
        let compiler = new Compiler(new XpathTokenizer(XPATH_TEST + '[2]'));
        compiler.compile();
        let response = compiler.process(container);
        expect(response.length).to.be.equal(1);

        compiler = new Compiler(new XpathTokenizer(XPATH_TEST + '[3]'));
        compiler.compile();
        response = compiler.process(container);
        expect(response.length).to.be.equal(0);

        compiler = new Compiler(new XpathTokenizer(XPATH_TEST + '[2]'));
        compiler.compile();
        container.innerHTML = `
        <div> <span>test</span> <span>2</span> </div>  <div> <span>test22</span> <span>2333</span> </div>
        `;
        response = compiler.process(container);
        expect(response.length).to.be.equal(2);
    });

});