import { Compiler } from "../../src/Compiler/Compiler";
import { XpathTokenizer } from "../../src/Tokenizer/XpathTokenizer";

describe('class() function', function() {

    it('should get nodes by class name', function() {
        let container = document.createElement('li');
        let compiler = new Compiler(new XpathTokenizer(`.//div/span[class('testclass-3')]`));
        compiler.compile();
        container.innerHTML = `
        <div> <span>test</span> <span class='testclass-3 tester'>2</span> </div>
        `;
        const containerDiv = container.querySelector('div');
        containerDiv.attachShadow({ mode: "open" });
        containerDiv.shadowRoot.innerHTML = `<div><span class='testclass-3 2'>1</span><div class='testclass'><span class='testclass-3 3'>2</span></div></div>`;
        let response = compiler.process(container);
        expect(response.length).to.be.equal(3);
    });

});