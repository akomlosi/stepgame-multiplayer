# stepgame-multiplayer
"Step Over Me" game multiplayer version with socket.io


After npm install you should modify your mochachairunner.mustache file:
```html
<!doctype html>
<html>
<head>
<title>Test'em</title>
<link rel="stylesheet" href="/testem/mocha.css">
<script src="libs/traceur.js/"></script>
<script src="libs/bootstrap.js"></script>
<script src="/testem/mocha.js"></script>
<script src="/testem/chai.js"></script>
<script src="/testem.js"></script>
<script>mocha.setup('tdd')</script>
{{#scripts}}<script type="module" src="{{{src}}}"{{#attrs}} {{&.}}{{/attrs}}></script>{{/scripts}}
</head>
<body>
<div id="mocha"></div>
</body>
</html>

```
