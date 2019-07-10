import { Compiler } from "../../src/Compiler/Compiler";
import { XpathTokenizer } from "../../src/Tokenizer/XpathTokenizer";

describe('following axis', function() {
    it('should get following nodes', function() {
        let container = document.createElement('li');
        container.innerHTML = `
        <div>
            <span test='2'>
                <div id='with-shadow'>
                    <span test='2'>12</span>
                    <span test='3'>14</span>
                    <span test='2'>15</span>
                    <span>6</span>
                    <p>t</p>
                </div>
                <span>
                    <div>
                        <span></span>
                        <span></span>
                        <p></p>
                    </div>
                </span>
            </span>
            <span>11</span>
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
            <span></span>       
        </span>
        <span>13</span>
        `;

        let compiler = new Compiler(new XpathTokenizer(`.//div/span[@test='2']/following::span`));
        compiler.compile();
        let response = compiler.process(container);
        expect(response.length).to.be.equal(12);

        compiler = new Compiler(new XpathTokenizer(`.//shadow()/span[@test='2']/following::span`));
        compiler.compile();
        response = compiler.process(container);
        expect(response.length).to.be.equal(9);

        compiler = new Compiler(new XpathTokenizer(`.//shadow()//span[@test='2']/following::span`));
        compiler.compile();
        response = compiler.process(container);
        expect(response.length).to.be.equal(12);
    });
});