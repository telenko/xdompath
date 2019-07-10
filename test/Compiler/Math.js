import { Compiler } from "../../src/Compiler/Compiler";
import { XpathTokenizer } from "../../src/Tokenizer/XpathTokenizer";

describe('maths', function() {
    it.skip('should check plus maths', function() {
        let container = document.createElement('li');
        container.innerHTML = `
        <div>
            <span test='2'>
                text-testing
            </span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
        </div>
        `;
        let compiler = new Compiler(new XpathTokenizer(`./div/span[position() + 1 < 3]`));
        compiler.compile();
        let response = compiler.process(container);
        expect(response.length).to.be.equal(2);
    });
});