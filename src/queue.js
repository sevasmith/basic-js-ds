const { NotImplementedError } = require("../lib/errors");
const { ListNode } = require("../extensions/list-node.js");

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  getUnderlyingList() {
    function makeObject(node) {
      if (!node) {
        return null;
      }
      return { value: node.value, next: makeObject(node.next) };
    }
    return makeObject(this.head);
  }

  enqueue(value) {
    const newNode = new ListNode(value);
    if (this.head === null) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  dequeue() {
    if (this.head === null) {
      return;
    } else {
      let removed = this.head.value;
      this.head = this.head.next;
      if (this.head === null) {
        this.tail = null;
      }
      return removed;
    }
  }
}

module.exports = {
  Queue,
};
