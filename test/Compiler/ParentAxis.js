import { Compiler } from "../../src/Compiler/Compiler";
import { XpathTokenizer } from "../../src/Tokenizer/XpathTokenizer";

const XPATH_TEST = './div/span';
describe('parent axis', function() {
    it('should find parent xpath', function() {
        const container = document.createElement('li');
        container.innerHTML = `
            <div> <span>test</span> <span>2</span> </div>
        `;
        let compiler = new Compiler(new XpathTokenizer(XPATH_TEST + "/parent::"));
        compiler.compile();
        let response = compiler.process(container);
        expect(response.length).to.be.equal(1);
        expect(response[0].tagName.toLowerCase()).to.be.equal('div');

        compiler = new Compiler(new XpathTokenizer(XPATH_TEST + "/parent::/parent::"));
        compiler.compile();
        response = compiler.process(container);
        expect(response.length).to.be.equal(1);
        expect(response[0].tagName.toLowerCase()).to.be.equal('li');
    });
});