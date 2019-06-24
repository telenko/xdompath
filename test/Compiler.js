import { Compiler } from '../src/Compiler/Compiler';
import { XpathTokenizer } from '../src/Tokenizer/XpathTokenizer';

const XPATH_TEST = './div/span';
describe('compiler', function() {

    it('should run xpath', function() {
        const container = document.createElement('li');
        container.innerHTML = `
            <div> <span>test</span> <span>2</span> </div>
        `;
        const compiler = new Compiler(new XpathTokenizer(XPATH_TEST));
        compiler.compile();
        let response = compiler.process(container);
        expect(response.length).to.be.equal(2);
        expect(response[0].tagName.toLowerCase()).to.be.equal('span');
        expect(response[1].tagName.toLowerCase()).to.be.equal('span');
    });

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

    it('compile number filters', function() {
        let container = document.createElement('li');
        container.innerHTML = `
        <div> <span>test</span> <span>2</span> </div>
        `;
        let compiler = new Compiler(new XpathTokenizer(XPATH_TEST + '[2]'));
        compiler.compile();
        let response = compiler.process(container);
        expect(response.length).to.be.equal(1);

        compiler = new Compiler(new XpathTokenizer(XPATH_TEST + '[3]'));
        compiler.compile();
        response = compiler.process(container);
        expect(response.length).to.be.equal(0);

        compiler = new Compiler(new XpathTokenizer(XPATH_TEST + '[2]'));
        compiler.compile();
        container.innerHTML = `
        <div> <span>test</span> <span>2</span> </div>  <div> <span>test22</span> <span>2333</span> </div>
        `;
        response = compiler.process(container);
        expect(response.length).to.be.equal(2);
    });

    it('should test text function', function() {
        let container = document.createElement('li');
        let compiler = new Compiler(new XpathTokenizer(`.//text()`));
        compiler.compile();
        container.innerHTML = `<div><span>test</span><span>2</span></div><div><span>test22</span><span>2333</span></div>`;
        let response = compiler.process(container);
        expect(response.length).to.be.equal(4);

        compiler = new Compiler(new XpathTokenizer(`./div/span/text()`));
        compiler.compile();
        response = compiler.process(container);
        expect(response.length).to.be.equal(4);
    });

    it('should test grouper', function() {
        let container = document.createElement('li');
        const compiler = new Compiler(new XpathTokenizer(`(${XPATH_TEST})[2]`));
        compiler.compile();
        container.innerHTML = `
        <div> <span>test</span> <span>2</span> </div>  <div> <span>test22</span> <span>2333</span> </div>
        `;
        const response = compiler.process(container);
        expect(response.length).to.be.equal(1);
    });

    it('should test contains filter', function() {
        let container = document.createElement('li');
        let compiler = new Compiler(new XpathTokenizer(`.//[contains(string(), '2')]`));
        compiler.compile();
        container.innerHTML = `
        <div> <span>test</span> <span>2</span> </div>  <div> <span>test22</span> <span>2333</span> </div>
        `;
        let response = compiler.process(container);
        expect(response.length).to.be.equal(8);

        compiler = new Compiler(new XpathTokenizer(`.//div[contains(string(), '2')]`));
        compiler.compile();
        container.innerHTML = `
        <div> <span>test</span> <span>2</span> </div>  <div> <span>test22</span> <span>2333</span> </div>
        `;
        response = compiler.process(container);
        expect(response.length).to.be.equal(2);

        compiler = new Compiler(new XpathTokenizer(`.//div[contains(string(), '2')]/parent::`));
        compiler.compile();
        container.innerHTML = `
        <div> <span>test</span> <span>2</span> </div>  <div> <span>test22</span> <span>2333</span> </div>
        `;
        response = compiler.process(container);
        expect(response.length).to.be.equal(1);
    });

    it('should test attribute filter', function() {
        let container = document.createElement('li');
        let compiler = new Compiler(new XpathTokenizer(`.//[@ro='te'][@tes='was']`));
        compiler.compile();
        container.innerHTML = `
        <div> <span ro='te'>test</span> <span ro='te' tes='was'>2</span> </div>  <div ro='ter'> <span>test22</span> <span>2333</span> </div>
        `;
        let response = compiler.process(container);
        expect(response.length).to.be.equal(1);
    });

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