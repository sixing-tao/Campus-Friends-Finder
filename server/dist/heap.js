"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newHeap = void 0;
/**
 * Maintains a list of values, providing the ability to efficiently retrieve
 * (and remove) the smallest value from the list (in O(log n) time).
 */
class QuickHeap {
    /**
     * Creates an empty list. The given comparator will be used to compare
     * elements in the list, which is needed to find the minimum value.
     */
    constructor(cmp) {
        this.isEmpty = () => {
            return this.elems.length === 0;
        };
        this.min = () => {
            if (this.isEmpty())
                throw new Error("the list is emtpy -- there is no minimum");
            return this.elems[0];
        };
        this.add = (e) => {
            this.elems.push(e);
            this.moveUp_(this.elems.length - 1);
        };
        this.removeMin = () => {
            if (this.isEmpty())
                throw new Error("the list is emtpy -- there is no minimum");
            const m = this.elems[0];
            this.elems[0] = this.elems[this.elems.length - 1];
            this.elems.pop();
            if (!this.isEmpty())
                this.moveDown_(0);
            return m;
        };
        /**
         * Moves the element at the given index down the tree until it is as small as
         * both of its children.
         */
        this.moveDown_ = (index) => {
            if (index < 0 || this.elems.length <= index)
                throw new Error(`invalid index: ${index} of ${this.elems.length} elements`);
            const childIndex1 = 2 * index;
            const childIndex2 = 2 * index + 1;
            if (childIndex1 >= this.elems.length) {
                // This implies that Child 2 also does not exist, so the new element is a
                // leaf, which is a valid position.
            }
            else if (this.cmp(this.elems[index], this.elems[childIndex1]) <= 0) {
                // New element is smaller than child 1.
                if (childIndex2 >= this.elems.length ||
                    this.cmp(this.elems[index], this.elems[childIndex2]) <= 0) {
                    // New element is at least as small as both children, so it is a valid
                    // parent for both of them.
                }
                else {
                    // Child 2 is smaller than the new element but child 1 is larger.  This
                    // implies (transitivity) that child 2 is smaller than child 1 and,
                    // hence, is a valid parent of both of them.
                    this.swap_(index, childIndex2);
                    this.moveDown_(childIndex2); // check new element's new children
                }
            }
            else {
                // Child 1 is smaller than the new element.
                if (childIndex2 >= this.elems.length ||
                    this.cmp(this.elems[childIndex1], this.elems[childIndex2]) <= 0) {
                    // Child 1 is smaller than both the new element and child 2. This shows
                    // that child 1 is a valid parent of both of them.
                    this.swap_(index, childIndex1);
                    this.moveDown_(childIndex1); // check new element's new children
                }
                else {
                    // Child 2 is smaller than child 1 and the new element. This implies
                    // that child 2 is smaller than the new element and, hence, is a valid
                    this.swap_(index, childIndex2);
                    this.moveDown_(childIndex2); // check new element's new children
                }
            }
        };
        /** Swaps the elements at the two given indexes. */
        this.swap_ = (index1, index2) => {
            if (index1 < 0 || this.elems.length <= index1)
                throw new Error(`invalid index 1: ${index1} of ${this.elems.length} elements`);
            if (index2 < 0 || this.elems.length <= index2)
                throw new Error(`invalid index 2: ${index2} of ${this.elems.length} elements`);
            const t = this.elems[index1];
            this.elems[index1] = this.elems[index2];
            this.elems[index2] = t;
        };
        /**
         * Moves the element at the given index up the tree until it is as small as
         * both of its children.
         */
        this.moveUp_ = (index) => {
            if (index < 0 || this.elems.length <= index)
                throw new Error(`invalid index: ${index} of ${this.elems.length} elements`);
            if (index == 0) {
                // New element has no parent, so there is no parent condition to satisfy.
            }
            else {
                const parentIndex = Math.floor(index / 2);
                if (this.cmp(this.elems[index], this.elems[parentIndex]) <= 0) {
                    // New element is smaller than the parent. This implies (by
                    // transitivity) that it is also larger than the parent's other child,
                    // so it is valid parent for both of them.
                    this.swap_(index, parentIndex);
                    this.moveUp_(parentIndex); // check new element's new parent
                }
                else {
                    // Parent is smaller than the new element, so it is a valid parent.
                }
            }
        };
        this.elems = [];
        this.cmp = cmp;
    }
}
/**
 * Creates a new heap where elements are sorted with given comparator
 * @param cmp to sort elements by
 * @returns new Heap object
 */
const newHeap = (cmp) => {
    return new QuickHeap(cmp);
};
exports.newHeap = newHeap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9oZWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQXFDQTs7O0dBR0c7QUFDSCxNQUFNLFNBQVM7SUFJYjs7O09BR0c7SUFDSCxZQUFZLEdBQXFCO1FBS2pDLFlBQU8sR0FBRyxHQUFZLEVBQUU7WUFDdEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFBO1FBRUQsUUFBRyxHQUFHLEdBQVMsRUFBRTtZQUNmLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFBO1lBRTdELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUE7UUFFRCxRQUFHLEdBQUcsQ0FBQyxDQUFPLEVBQVEsRUFBRTtZQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQTtRQUVELGNBQVMsR0FBRyxHQUFTLEVBQUU7WUFDckIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUE7WUFFN0QsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNqQixJQUFJLENB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