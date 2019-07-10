import { Compiler } from "../../src/Compiler/Compiler";
import { XpathTokenizer } from "../../src/Tokenizer/XpathTokenizer";

describe('focusable() function', function() {
    it('should get nodes by class name', function() {
        let container = document.createElement('li');
        let compiler = new Compiler(new XpathTokenizer(`.//div/focusable()`));
        compiler.compile();
        container.innerHTML = `
        <div>
            <textarea></textarea>
            <p></p>
            <span></span>
            <input/>
            <button></button>
            <select></select>
            <ul></ul>
        </div>
        `;
        let response = compiler.process(container);
        expect(response.length).to.be.equal(4);
        expect(response[0].tagName.toLowerCase()).to.be.equal('textarea');
        expect(response[1].tagName.toLowerCase()).to.be.equal('input');
        expect(response[2].tagName.toLowerCase()).to.be.equal('button');
        expect(response[3].tagName.toLowerCase()).to.be.equal('select');
    });
});