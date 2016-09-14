# Website Performance Optimization portfolio project

To run, install or clone the repository and run the following from the installed directory (assuming python is installed. Use any local webserver of your choice):

    cd dist
    python -m SimpleHTTPServer 8000

and point your browser to [http://localhost:8000/](http://localhost:8000/)

## Build tools/dependencies

Tools used to build dist/ directory:
* NPM
* grunt
  * grunt-image
  * grunt-contrib-cssmin
  * grunt-contrib-htmlmin
  * grunt-critical
  * psi-ngrok

## Optimizations to index.html:

* minified stylesheets
* inlined critical CSS
* loaded javascript asynchronously
* optimized images
* deferred webfont loading

## Optimizations to pizza main.js:

* Changed querySelectorAll to getElementsByClassName
* Changed functions to alter DOM less per loop
* Reduced amount of pizzas rendered
* Optimized pizza slider calculations

## Performance

As of latest commit, index.html showing Pagespeed Scores of 93 (mobile) and 95 (desktop)

pizza.html project showing 60fps and resizing pizzas is less than 5ms using the slider
