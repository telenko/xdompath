import { Compiler } from "../../src/Compiler/Compiler";
import { XpathTokenizer } from "../../src/Tokenizer/XpathTokenizer";

describe('count() function', function() {
    it('should check count() func', function() {
        let container = document.createElement('li');
        container.innerHTML = `
        <div>
            <span test='2'>
                text-testing
                <p>22</p>
                <p>26</p>
                <p>27</p>
            </span>
            <span>
                2
                <p>25</p>
            </span>
            <span>3</span>
            <span>
               4
               <p>23</p>
               <p>24</p>
            </span>
        </div>
        `;
        let compiler = new Compiler(new XpathTokenizer(`./div/span[count(./p) > 1]`));
        compiler.compile();
        let response = compiler.process(container);
        expect(response.length).to.be.equal(2);
    });
});