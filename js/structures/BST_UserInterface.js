export const defaultBSTUI = {
    HIGHLIGHT: 'node__element--highlight', //css class for highlighting 
    HIGHLIGHT_TIME: 200, //duration of the highlight animation in milliseconds 
  };
  
  class BSTUI { //defining a class 
    timer = null; //timer variable for controlling the highlighting animation 
    containerSelector; //selector for the contrainer element where the tree will be rendered
    constructor(
      render, //render function 
      tree, //tree instance 
      treeSelector = '.tree', //selector for the tree container 
      containerSelector = '.bst-container', //selector for general container 
      configuration = {
        HIGHLIGHT: 'node__element--highlight', //css class for highlighting 
        HIGHLIGHT_TIME: 200, //duration 
      }
    ) {
      this.treeSelector = treeSelector; //set the tree container 
      this.containerSelector = containerSelector; //set the general container 
      this.configuration = configuration; //set the configuration 
      this.tree = tree; //set the binary search tree instance 
      this.render = render || this.renderTree; //set the render function or use a default rendertree function
      const root = document.documentElement; //get the root element of the document 
      root.style.setProperty( //set css variable for animation timing based on highlight time config
        '--animation-timing',
        `${this.configuration.HIGHLIGHT_TIME / 1000}s`
      );
    }
  
    // Other methods go here
  }
  