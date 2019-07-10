import { Compiler } from "../../src/Compiler/Compiler";
import { XpathTokenizer } from "../../src/Tokenizer/XpathTokenizer";

describe('comparators', function() {
    it('should check more comparator', function() {
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
        let compiler = new Compiler(new XpathTokenizer(`./div/span[position() > 2]`));
        compiler.compile();
        let response = compiler.process(container);
        expect(response.length).to.be.equal(2);

        compiler = new Compiler(new XpathTokenizer(`./div/span[position() >= 2]`));
        compiler.compile();
        response = compiler.process(container);
        expect(response.length).to.be.equal(3);
    });
});