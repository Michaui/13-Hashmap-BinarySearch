import "./style.css";

class HashMap {
  constructor() {
    this.bucketSize = 8;
    // Array wird "genullt" und jedes Element wird mit einem Array ersetzt.
    // Jeder Bucket kann eine verkettete Liste von Elementen speichern, um Kollisionen in der Hash-Tabelle zu behandeln.
    this.bucket = new Array(this.bucketSize).fill(null).map(() => []);
    this.size = 0;
    this.loadFactor = 0.75;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      // charCodeAt(i) gibt den Unicode-Wert des Zeichens
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.bucketSize;
    }
    console.log(hashCode);
    return hashCode;
  }

  set(key, value) {
    //key wird mit hash Funktion ausgeführt.
    const index = this.hash(key);
    // Identifizierung vom spezifischen Bucket in der Hash-Tabelle. Bsp.:3
    const bucket = this.bucket[index];

    if (bucket[0] === key) {
      bucket[1] = value;
      return;
    }

    // Andernfalls soll key/value gepusht werden.
    bucket.push([key, value]);

    // ----- loadFactor -----
    this.size++;
    if (this.size > this.bucketSize * this.loadFactor) {
      resizeBucket();
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.bucket[index];

    //Gebe mir das Value, wenn an Punkt bucket[i] die Position [0] (das key vom bucket!) mit key übereinstimmt.
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }
    // Wenn nichts gefunden wird.
    return null;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.bucket[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.bucket[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        //Wenn das if: true, dann lösche an der Stelle das bucket.
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.size;
    // return this.bucket.length(); macht kein sinn,
    // weil es nur die aktuelle gesamtlänge zurückgibt, nicht wie viele bucket belegt sind.
  }

  clear() {
    this.bucket = new Array(this.bucketSize).fill(null).map(() => []);
    this.size = 0;
  }

  //KEYS
  keys() {
    const keysArray = [];
    // Gebe mir von jedem bucket das Key.
    for (const bucket of this.bucket) {
      for (const pair of bucket) {
        keysArray.push(pair[0]);
      }
    }
    //Array zurückgegeben
    return keysArray;
  }

  //VALUES
  values() {
    const valuesArray = [];
    // Gebe mir von jedem bucket das Key-Pair Value.
    for (const bucket of this.bucket) {
      for (const pair of bucket) {
        valuesArray.push(pair[1]);
      }
    }
    //Array zurückgegeben
    return valuesArray;
  }

  // KEY/VALUE ENTRIES
  entries() {
    const entriesArray = [];
    for (const bucket of this.bucket) {
      for (const pair of bucket) {
        entriesArray.push(pair);
      }
    }
    //Array zurückgegeben
    return entriesArray;
  }

  resizeBucket() {
    this.bucketSize *= 2;
    const oldBucket = [...this.bucket];
    this.bucket = new Array(this.bucketSize).fill(null).map(() => []);

    for (const bucket of oldBucket) {
      for (const pair of bucket) {
        // Nehme das alte bucket, führe das hash durch
        const index = this.hash(pair[0]);
        //setze die Key/Vales ins neue Bucket-Array
        this.bucket[index].push(pair);
      }
    }
  }
}

//INITIALISIERUNG HASHMAP
let map = new HashMap();

//INITIALISIERUNG KEY/VALUES
map.set("John", { name: "John", age: 30, adress: "123 Elonstreet 23" });
map.set("Sabrina", { name: "Sabrina", age: 23, adress: "123 Elonstreet 44" });
map.set("Alex", { name: "Alex", age: 44, adress: "456 Bobstreet 1" });

//ABFRAGEN
console.log(map.get("Sabrina"));
console.log(map.has("Sabrina"));
console.log(map.remove("Sabrina"));
console.log(map.length());
console.log(map.keys());
console.log(map.values());
console.log(map.entries());

class HashSet extends HashMap {
  constructor() {
    super();
  }

  set(key) {
    super.set(key, null);
  }

  values() {
    return [];
  }
}

let newmap = new HashSet();

console.log(
  newmap.set("Daniel", { name: "John", age: 30, adress: "123 Elonstreet 23" })
);

