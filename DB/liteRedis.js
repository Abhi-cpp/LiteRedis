class LiteRedis {
    constructor() {
        this.store = new Map(); //key-value pair
        this.key = new Set();  // store keys for future uses
    }

    /**
 * Sets a value with an optional TTL (Time to Live).
 * @param {string} key - The key to set.
 * @param {*} value - The value to associate with the key.
 * @param {number} ttl - Time to live in seconds (optional).
 */
    set(key, value, ttl = 0) {
        const expireAT = ttl ? ttl * 1000 : null;

        this.store.set(key, value);
        this.key.add(key)
        if (ttl)
            setTimeout(() => this.del(key), expireAT)
    }


    /**
  * Retrieves the value associated with a key.
  * @param {string} key - The key to retrieve.
  * @returns {*} The value if the key exists and hasn't expired; otherwise, null.
  */
    get(key) {
        return this.store.get(key) || null;
    }

    /**
     * Deletes a key and its associated value.
     * @param {string} key - The key to delete.
     */
    del(key) {
        const deleted = this.store.delete(key);
        const deleted2 = this.key.delete(key);
        if (deleted != deleted2)
            throw new Error("Something went wrong in deleting the key")

        return deleted;
    }

    /** 
     * @param {string} key - The key to check
     * @returns {boolean} - True if the key exists, otherwise false.
     */
    exists(key) {
        return this.key.has(key);
    }

    /**
     * Flushes all keys and values.
     */
    flush() {
        this.store.clear();
        this.key.clear();
    }

    /**
     * Returns the number of keys.
     */
    size() {
        return this.key.size;
    }

    /**
     * Returns all keys.
     */
    keys() {
        return Array.from(this.key);
    }
}

module.exports = LiteRedis;
