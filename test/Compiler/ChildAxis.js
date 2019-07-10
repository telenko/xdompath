import { XDomPath } from "../../src";
import { Compiler } from "../../src/Compiler/Compiler";
import { XpathTokenizer } from "../../src/Tokenizer/XpathTokenizer";

const XPATH_TEST = './div/span';

describe("child axis", function() {

    it('should find child span', function() {
        const container = document.createElement('li');
        container.innerHTML = `
            <div> <span>test</span> <span>2</span> </div>
        `;
        const xpath = new XDomPath(XPATH_TEST);
        let response = xpath.perform(container);
        expect(response.length).to.be.equal(2);
        expect(response[0].tagName.toLowerCase()).to.be.equal('span');
        expect(response[1].tagName.toLowerCase()).to.be.equal('span');
    });

    it('should fail xpath', function() {
        const container = document.createElement('li');
        container.innerHTML = `
            <div> <p>test</p> </div>
        `;
        const compiler = new Compiler(new XpathTokenizer(XPATH_TEST));
        compiler.compile();
        let response = compiler.process(container);
        expect(response.length).to.be.equal(0);
    });

});