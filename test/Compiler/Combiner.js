import { Compiler } from "../../src/Compiler/Compiler";
import { XpathTokenizer } from "../../src/Tokenizer/XpathTokenizer";

const XPATH_TEST = './div/span';
describe('combiner', function() {

    it('should test grouper', function() {
        let container = document.createElement('li');
        const compiler = new Compiler(new XpathTokenizer(`(${XPATH_TEST})[2]`));
        compiler.compile();
        container.innerHTML = `
        <div> <span>test</span> <span>2</span> </div>  <div> <span>test22</span> <span>2333</span> </div>
        `;
        const response = compiler.process(container);
        expect(response.length).to.be.equal(1);
    });
    
});