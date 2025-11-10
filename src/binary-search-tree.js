const { NotImplementedError } = require("../lib/errors");
const { Node } = require("../extensions/list-tree.js");

// //class Node {
//   constructor(data) {
//     this.data = data;
//     this.left = null;
//     this.right = null;
//   }
// }

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this._root) {
      this._root = newNode;
    } else {
      searchTree(this._root);
    }

    function searchTree(node) {
      if (data < node.data) {
        if (!node.left) {
          node.left = newNode;
        } else {
          searchTree(node.left);
        }
      } else if (data > node.data) {
        if (!node.right) {
          node.right = newNode;
        } else {
          searchTree(node.right);
        }
      } else return;
    }
  }

  find(data) {
    function findInTree(node) {
      if (!node) return null;
      else if (data === node.data) {
        return node;
      } else if (data < node.data) {
        return findInTree(node.left);
      } else {
        return findInTree(node.right);
      }
    }

    return findInTree(this._root);
  }

  has(data) {
    function findInTree(node) {
      if (!node) return false;
      else if (data === node.data) {
        return true;
      } else if (data < node.data) {
        return findInTree(node.left);
      } else {
        return findInTree(node.right);
      }
    }

    return findInTree(this._root);
  }

  remove(data) {
    this._root = removeNode(this._root, data);

    function removeNode(node, data) {
      if (!node) return null;

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        } else if (!node.left) {
          node = node.right;
          return node;
        } else if (!node.right) {
          node = node.left;
          return node;
        } else {
          let minFromRight = node.right;
          while (minFromRight.left) {
            minFromRight = minFromRight.left;
          }
          node.data = minFromRight.data;
          node.right = removeNode(node.right, minFromRight.data);
          return node;
        }
      }
    }
  }

  min() {
    if (!this._root) return null;

    function findMin(node) {
      if (!node.left) {
        return node.data;
      } else {
        return findMin(node.left);
      }
    }

    return findMin(this._root);
  }

  max() {
    if (!this._root) return null;

    function findMax(node) {
      if (!node.right) {
        return node.data;
      } else {
        return findMax(node.right);
      }
    }

    return findMax(this._root);
  }
}

module.exports = {
  BinarySearchTree,
};
