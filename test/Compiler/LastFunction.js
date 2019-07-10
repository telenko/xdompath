import { Compiler } from "../../src/Compiler/Compiler";
import { XpathTokenizer } from "../../src/Tokenizer/XpathTokenizer";

describe('last() function', function() {
    it('should check last() func', function() {
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
        let compiler = new Compiler(new XpathTokenizer(`./div/span[last()]`));
        compiler.compile();
        let response = compiler.process(container);
        expect(response.length).to.be.equal(1);
        expect(response[0].textContent.trim()).to.be.equal("4");
    });
});