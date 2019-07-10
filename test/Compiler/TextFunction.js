import { Compiler } from "../../src/Compiler/Compiler";
import { XpathTokenizer } from "../../src/Tokenizer/XpathTokenizer";

describe('text function', function () {

    it('should test text function', function () {
        let container = document.createElement('li');
        let compiler = new Compiler(new XpathTokenizer(`.//text()`));
        compiler.compile();
        container.innerHTML = `<div><span>test</span><span>2</span></div><div><span>test22</span><span>2333</span></div>`;
        let response = compiler.process(container);
        expect(response.length).to.be.equal(4);

        compiler = new Compiler(new XpathTokenizer(`./div/span/text()`));
        compiler.compile();
        response = compiler.process(container);
        expect(response.length).to.be.equal(4);
    });

});