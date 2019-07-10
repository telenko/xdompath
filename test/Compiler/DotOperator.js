import { XpathTokenizer } from "../../src/Tokenizer/XpathTokenizer";
import { Compiler } from "../../src/Compiler/Compiler";

describe('dot operator .', function() {
    it('should verify dot operator inside expression', function() {
        let container = document.createElement('li');
        container.innerHTML = `
        <div>
            <span test='2'>
                text-testing
                <span>2</span>
                <span>3</span>
                <span>4</span>
            </span>
        </div>
        `;
        let compiler = new Compiler(new XpathTokenizer(`.//span[.='2']`));
        compiler.compile();
        let response = compiler.process(container);
        expect(response.length).to.be.equal(1);

        compiler = new Compiler(new XpathTokenizer(`.//span[not(.='2')]`));
        compiler.compile();
        response = compiler.process(container);
        expect(response.length).to.be.equal(3);
    });

    it('should verify dot operator as axis inside filter', function() {
        let container = document.createElement('li');
        container.innerHTML = `
        <div>
            <span test='2'>
                text-testing
                <span>2</span>
                <span>3</span>
                <span>4</span>
            </span>
            <span test='2'>
                <div>
                    <p>parag</p>
                    <div class='row large'>
                        <span>testv</span>
                    </div>
                </div>
            </span>
        </div>
        `;

        let compiler;
        let response;

        compiler = new Compiler(new XpathTokenizer(`.//span[@test='2'][./div/p]`));
        compiler.compile();
        response = compiler.process(container);
        expect(response.length).to.be.equal(1);

        compiler = new Compiler(new XpathTokenizer(`.//span[./parent::div]`));
        compiler.compile();
        response = compiler.process(container);
        expect(response.length).to.be.equal(3);

        compiler = new Compiler(new XpathTokenizer(`.//span[./parent::div[class('large')]]`));
        compiler.compile();
        response = compiler.process(container);
        expect(response.length).to.be.equal(1);

        compiler = new Compiler(new XpathTokenizer(`.//span[not(./parent::div[class('large')])]`));
        compiler.compile();
        response = compiler.process(container);
        expect(response.length).to.be.equal(5);
    });
});