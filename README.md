### XDOMPATH
Library for query DOM nodes similar to XPATH language with new features (ShadowDOM support)

### Purpose of creating
XPATH language is oriented only on clear XML document model, but real DOM model now differs from XML because of ShadowDOM technology. XDomPath is new extended language which can handle ShadowDOM and allows to use DOM with ShadowDOM as XML language.

### API
1) Import library into your file:
```Javascript
	import { XDomPath } from '@telenko/xdompath';
```
2) Create a xdompath instance by using query as argument
```Javascript
	const allDivsPath = new XDomPath('.//div');
```
3) Select a scope to query for and run XDomPath:
```Javascript
	const divsArr = allDivsPath.perform(document.body);
```
### Extended XML model for DOM with ShadowDOM:
XDomPath is trying to treat DOM with ShadowDOM as XML model. To achieve that DOM model XDomPath parses in such way:
1) shadowRoot elements are parsed as **always first children** of host element
2) child nodes of shadowRoot are parsed as direct children of shadowRoot element
3) slotted elements are parsed as direct children of host element

### Examples
```Javascript
//setup DOM
const container = document.createElement('div');
container.innerHTML = `
    <div id='with-shadow'></div>
    <span>some text</span>
    <div>
        <p class='bold_paragraph'>another text</p>
    </div>
`;
const divWithShadow = container.children[0];
divWithShadow.attachShadow({ mode: "open" });
divWithShadow.shadowRoot.innerHTML = `
    <p class='bold_paragraph'>text inside shadow</p>
    <input type='text'/>
    <div>some container inside shadow</div>
    <p>text</p>
`;
```
1) Deep querying through Light/Shadow DOM
```Javascript
//let's query
const queryDivs = new XDomPath('.//div');
const allDivs = queryDivs.perform(container);
console.log(allDivs.length);//3

const divsInsideShadow = new XDomPath('.//shadow()//div');
const shadowDivs = queryDivs.perform(container);
console.log(shadowDivs.length);//1

const particularText = new XDomPath('.//text()[.="text inside shadow"]');
const texts = particularText.perform(container);
console.log(texts.length);//1
```
2) Querying by class existence
```Javascript
const withClassQuery = new XDomPath('.//p[class("bold_paragraph")]');
const psWithClass = particularText.perform(container);
console.log(psWithClass.length);//2
```
3) Querying focusable elements
```Javascript
const withClassQuery = new XDomPath('.//focusable()');
const psWithClass = particularText.perform(container);
console.log(psWithClass.length);//1
```
4) Using regular XPATH axes
```Javascript
const withClassQuery = new XDomPath('.//p[class("bold_paragraph")]/following-subling::input');
const psWithClass = particularText.perform(container);
console.log(psWithClass.length);//1
```
### Supported features
1) All XPATH axes
2) Function list:
-    text()
-     position()
-     last()
-     not()
-     name() -- planned, but not supported for now
-     id() -- planned, but not supported for now
-     string()
-     substring()
-     substring-after()
-     substring-before()
-     string-length()
-     count()
-     concat() -- planned, but not supported for now
-     normalize-space()
-     starts-with()
-     contains()
-     translate() -- planned, but not supported for now 
-     ceiling() -- planned, but not supported for now 
-     floor() -- planned, but not supported for now 
-     round() -- planned, but not supported for now 
-     sum() -- planned, but not supported for now 

   ** new XDomPath functions:**

-    shadow() -- returns nodes which are instances of ShadowRoot
-    class() -- receives string and returns true if node has class
-    focusable() -- returns nodes which are focusable HTML elements

### Limitations
1) Mathematical operations (except of comparison operators '=' '<' '>' '<=' '>=')
2) Some particular functions (from item above)
3) Union operator | (plan to support in future)
4) 'or' 'and' operators inside filters
5) '( )' group operators inside of filters:
```Javascript
         new XDomPath('(.//div)[0]');//will work
         new XDomPath('.//div[(position() < 3)]');//won't work
```

### Current issues
1) '..' parent axis working not properly for now. For now alias '/parent::' recommended to use instead

### Plans
1) Cover more XPATH features
2) Introduce new method:
```Javascript
	  XDomPath.defineFunction(...);
```
to make possible extend base set of functions with custom ones