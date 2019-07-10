import { Compiler } from "../../src/Compiler/Compiler";
import { XpathTokenizer } from "../../src/Tokenizer/XpathTokenizer";

describe('following-sibling axis', function() {
    it('should get following nodes after finded node', function() {
        let container = document.createElement('li');
        let compiler = new Compiler(new XpathTokenizer(`.//div/span[@test='2']/following-sibling::span`));
        compiler.compile();
        container.innerHTML = `
        <div id='with-shadow'>
            <span test='2'>3</span>
            <span test='3'>4</span>
            <span test='2'>5</span>
            <span>6</span>
            <p>t</p>
        </div>
        `;
        const withShadow = container.querySelector('#with-shadow');
        withShadow.attachShadow({ mode: 'open' });
        withShadow.shadowRoot.innerHTML = `
        <span test='2'>
            <div>
                <span test='3'>7</span>
                <span test='2'>3</span>
                <span test='3'>4</span>
                <span test='2'>5</span>
                <div>test</div>
            </div>        
        </span>
        `;
        let response = compiler.process(container);
        expect(response.length).to.be.equal(5);
    });
});