import { XpathTokenizer } from "../../src/Tokenizer/XpathTokenizer";
import { Compiler } from "../../src/Compiler/Compiler";

describe('axis as argument', function() {
    it('should run axes as function argument', function() {
        let container = document.createElement('li');
        container.innerHTML = `
        <div>
            <span test='2'>
                text-testing
                <span>2</span>
                <span>3<p></p></span>
                <span>4
                    <p></p>
                    <p></p>
                </span>
            </span>
        </div>
        `;
        let compiler = new Compiler(new XpathTokenizer(`.//span[//p]`));
        compiler.compile();
        let response = compiler.process(container);
        expect(response.length).to.be.equal(3);

        compiler = new Compiler(new XpathTokenizer(`.//span[/p]`));
        compiler.compile();
        response = compiler.process(container);
        expect(response.length).to.be.equal(2);

        compiler = new Compiler(new XpathTokenizer(`.//span[p]`));
        compiler.compile();
        response = compiler.process(container);
        expect(response.length).to.be.equal(2);

        compiler = new Compiler(new XpathTokenizer(`.//span[count(p) = 2]`));
        compiler.compile();
        response = compiler.process(container);
        expect(response.length).to.be.equal(1);
    });
});