import { Compiler } from "../../src/Compiler/Compiler";
import { XpathTokenizer } from "../../src/Tokenizer/XpathTokenizer";

describe('contains() function', function() {

    it('should test contains filter', function() {
        let compiler;
        let response;
        let container = document.createElement('li');
        compiler = new Compiler(new XpathTokenizer(`.//*[contains(string(), '2')]`));
        compiler.compile();
        container.innerHTML = `
        <div> <span>test</span> <span>2</span> </div>  <div> <span>test22</span> <span>2333</span> </div>
        `;
        response = compiler.process(container);
        expect(response.length).to.be.equal(9);

        compiler = new Compiler(new XpathTokenizer(`.//div[contains(string(), '2')]`));
        compiler.compile();
        container.innerHTML = `
        <div> <span>test</span> <span>2</span> </div>  <div> <span>test22</span> <span>2333</span> </div>
        `;
        response = compiler.process(container);
        expect(response.length).to.be.equal(2);

        compiler = new Compiler(new XpathTokenizer(`.//div[contains(string(), '2')]/parent::`));
        compiler.compile();
        container.innerHTML = `
        <div> <span>test</span> <span>2</span> </div>  <div> <span>test22</span> <span>2333</span> </div>
        `;
        response = compiler.process(container);
        expect(response.length).to.be.equal(1);

        compiler = new Compiler(new XpathTokenizer(`.//div[contains(text(), '2')]`));
        compiler.compile();
        container.innerHTML = `
        <div> <span>2</span> <span>2</span> </div>  <div>2<span>test22</span> <span>2333</span> </div> <div> <span>3</span> 2 </div>
        `;
        response = compiler.process(container);
        expect(response.length).to.be.equal(1);
    });

});