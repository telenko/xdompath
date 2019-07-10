import { Compiler } from "../../src/Compiler/Compiler";
import { XpathTokenizer } from "../../src/Tokenizer/XpathTokenizer";

describe('attribute operator @', function() {

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

});