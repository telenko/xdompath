describe('union |', function() {
    it.skip('should check | operator', function() {
        let container = document.createElement('li');
        container.innerHTML = `
        <div>
            <input/>
            <textarea></textarea>
            <select>
                <option>1</option>
            </select>
        </div>
        `;
        let compiler = new Compiler(new XpathTokenizer(`//input|//textarea|//select`));
        compiler.compile();
        let response = compiler.process(container);
        expect(response.length).to.be.equal(3);
    });
});