class TestCache {
    constructor(maxItems) {
        this.cacheList = {};
        this.maxItems = maxItems;
        this.sorted = [];
        this.cacheIndexes = {};
        this.index = 0;
    }

    cachList = {};

    getValue(key) {
        this.updateSortedList(key)
        return this.cacheList[key] || undefined;
    }

    setValue(key, value) {
        this.updateSortedList(key)
        if (this.maxItems == Object.keys(this.cacheList).length) {
            this.deleteOldest()
        }
        this.cacheList[key] = value;
    }

    getList() {
        return this.cacheList;
    }

    updateSortedList(key) {
        // console.log('key', key, this.cacheIndexes[key]);
        if (this.index > 0) {
            let prevIndex = this.cacheIndexes[key]
            // console.log('pppp', prevIndex)
            if (prevIndex != undefined) {
                this.sorted.splice(prevIndex, 1);
                this.index -= 1;
            }
        }
        this.cacheIndexes[key] = this.index;
        this.sorted[this.index] = key;
        this.index += 1;
    }

    deleteOldest() {
        delete this.cacheList[this.sorted[0]]
    }
}

var tc = new TestCache(5);
tc.setValue('a', 1);
tc.setValue('b', 2);
tc.setValue('c', 3);
tc.setValue('d', 4);
tc.setValue('e', 5);
console.log('sortedIndexes', tc.sorted)
console.log('get i:', tc.getValue('i')); /// undefined
console.log('get a:', tc.getValue('a'));
tc.setValue('g', 6);
console.log('final sortedIndexes', tc.sorted)
console.log('Cache list:',tc.getList());
