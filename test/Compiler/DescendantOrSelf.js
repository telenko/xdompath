import { Compiler } from "../../src/Compiler/Compiler";
import { XpathTokenizer } from "../../src/Tokenizer/XpathTokenizer";

describe('descendant-or-self:: test', function() {

    it('should find node recursively inside shadow DOM', function() {
        let container = document.createElement('li');
        let compiler = new Compiler(new XpathTokenizer(`.//span`));
        compiler.compile();
        container.innerHTML = `
        <div> <span>test</span> <span>2</span> </div>
        `;
        const containerDiv = container.querySelector('div');
        containerDiv.attachShadow({ mode: "open" });
        containerDiv.shadowRoot.innerHTML = `<span>1</span><div><span>2</span></div>`;
        let response = compiler.process(container);
        expect(response.length).to.be.equal(4);

        compiler = new Compiler(new XpathTokenizer(`./div/shadow()`));
        compiler.compile();
        response = compiler.process(container);
        expect(response.length).to.be.equal(1);
    });


});