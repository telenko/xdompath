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
        expect(response.length).to.be.equal(9);

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

    it('should get ancestor nodes', function() {
        let container = document.createElement('li');
        container.innerHTML = `
        <div>
            <span test='2'>
                <div id='with-shadow'>
                    <span test='2'>3</span>
                    <span test='3'>4</span>
                    <span test='2'>5</span>
                    <span>6</span>
                    <p>t</p>
                </div>
                <span>
                    <div>
                        <span test='4'></span>
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
                <span test='6'>5</span>
                <div>test</div>
            </div>
            <span></span>       
        </span>
        <span>13</span>
        `;

        let compiler = new Compiler(new XpathTokenizer(`.//span[@test='4']/ancestor::div`));
        compiler.compile();
        let response = compiler.process(container);
        expect(response.length).to.be.equal(2);

        compiler = new Compiler(new XpathTokenizer(`.//span[@test='6']/ancestor::div`));
        compiler.compile();
        response = compiler.process(container);
        expect(response.length).to.be.equal(3);

        compiler = new Compiler(new XpathTokenizer(`.//shadow()//span[contains(string(), '13')]/ancestor::div`));
        compiler.compile();
        response = compiler.process(container);
        expect(response.length).to.be.equal(2);

        compiler = new Compiler(new XpathTokenizer(`.//shadow()//span[contains(string(), '13')]/ancestor-or-self::span`));
        compiler.compile();
        response = compiler.process(container);
        expect(response.length).to.be.equal(2);
    });

    it('should check precending axes', function() {
        let container = document.createElement('li');
        container.innerHTML = `
        <div>
            <span test='2'>
                <div id='with-shadow'>
                    <span test='2'>3</span>
                    <span test='3'>4</span>
                    <span test='2'>5</span>
                    <span>6</span>
                    <p>t</p>
                </div>
                <span>
                    <div>
                        <span test='4'></span>
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
                <span test='6'>5</span>
                <div>test</div>
            </div>
            <span></span>       
        </span>
        <span>13</span>
        `;

        let compiler = new Compiler(new XpathTokenizer(`.//span[@test='2']/preceding-sibling::span`));
        compiler.compile();
        let response = compiler.process(container);
        expect(response.length).to.be.equal(3);

        compiler = new Compiler(new XpathTokenizer(`.//span[string()='13']/preceding::span`));
        compiler.compile();
        response = compiler.process(container);
        expect(response.length).to.be.equal(7);
    });

    it('should verify not() function', function() {
        let container = document.createElement('li');
        container.innerHTML = `
        <div>
            <span test='2'>
                text-testing
            </span>
        </div>
        `;
        let compiler = new Compiler(new XpathTokenizer(`.//span[not(contains(string(), 'text-testing'))]`));
        compiler.compile();
        let response = compiler.process(container);
        expect(response.length).to.be.equal(0);
        
        compiler = new Compiler(new XpathTokenizer(`.//span[@test='2'][contains(string(), 'text-testing')]`));
        compiler.compile();
        response = compiler.process(container);
        expect(response.length).to.be.equal(1);
    });

});