<img src="./assets/skipper.png" width="64">  

# Skipper
A script that skips video parts. 

## Idea
Idea for this script inspired by YouTube SponsorBlock's functionality.

## Real life example
<img src="./assets/skipper.gif" width="400">  

> This example can be found in `/examples`

# Usage
- Copy script file into your project.
- Define type `module` for your main script:
```html
<!-- index.html -->
<script src="./main.js" type="module"></script>
```
- Import `skipper` with ES6 `import` statement:
```js
// main.js
import skipper from "./skipper.js"
```
- Call the `skipper` function
```js
const skipPoints = [{ start: 10, end: 20 }];

skipper("#vid", skipPoints);

// or

const vid = document.querySelector("#vid");

skipper(vid, skipPoints);
```

`skipper` function takes 2 arguments:
- `vid` (string | HTMLVideoElement) - An Element where skip points will be skipped
- `skipPoints` (array) - And array of objects that represent intrevals in video that will be skipped.
Interval object:
```js
{ 
    start: number, 
    end: number 
}
```
> Both `start` and `end` are time count in *seconds*  
  
`skipper` return a Promise that will be resolved when all intervals will be skipped:
```js
skipper(vid, skipPoints).then(() => {
    console.log("No more skips!");
})
```