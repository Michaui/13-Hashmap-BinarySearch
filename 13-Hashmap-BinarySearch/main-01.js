// BINARY SEARCH TREE 

// Suche: O(log n) im Durchschnitt
// Einfügen: O(log n) im Durchschnitt
// Löschen: O(log n) im Durchschnitt

class Node {
  constructor(data, left = null, right = null){
    this.data = data;
    this.left = left; 
    this.right = right; 
  }
}

class Tree{
  constructor(array){
    // new Set (Umwandeln des Arrays: in ein Set werden alle Duplikate entfernt.) Aus [3, 1, 2, 2, 3] wird ein Set {3, 1, 2}.
    // ... (Spread Operator: Set-Datenstruktur wird wieder in ein Array umgewandel) Aus {3, 1, 2} wird zu [3, 1, 2].
    // .sort Methode: aufsteigender Reihenfolge sortieren
    // deklaration zu root durch buildTree Methode. 
    this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
  }

  buildTree(array){
        // console.log(array);
      /*
        Wenn das Array ist, gibt es "null" zurück. 
        Der Ausdruck if (!array) return null; prüft, ob array falsy ist (d.h. null, undefined, 0, "", etc.). In diesem Fall wollen wir jedoch nur prüfen, ob das Array leer ist.
        Fährt da fort wo der letzte Funktionsaufruf (root.left/right) stattfand, bis return root vollständig am vorherigen Node gesetzt wird. 
        Return null: node left, right werden auf null gesetzt, wenn array.length 0 ist. 
      */
    if (array.length === 0) return null; 
    //Finde die Mitte des Arrays
    const mid = Math.floor(array.length / 2); 
        // console.log(mid, array[mid]);
    // Erstellt Node mit mittleren Wert, node.left/right default = null; 
    const root = new Node(array[mid]); 
        // console.log(root);
    //Baut rekursiv erst den linken Teilbaum
    root.left = this.buildTree(array.slice(0, mid)); 
        // console.log("left" + root.left);
    //Baut rekursiv dann den rechten Teilbaum
    root.right = this.buildTree(array.slice(mid + 1)); 
        // console.log("right" + root.right);
    //gibt den Wurzelknoten des aktuellen Teilbaums zurück
        // console.log(root); 
    /*  
        Das letzte vollständige Node wird zurückgegeben und an das vorherige Node (node.left) angehangen.
        Das letzte vollständige Node wird zurückgegeben und an das vorherige Node (node.right) angehangen.
        rekursiver Rückfluss auf die vorherigen Nodes: bis alle Zahlen als Node gesetzt sind. 
    */
    return root;
  }


  // default wird aktueller root node gesetzt, welches dann rekursiv ersetzt wird, wenn Funktion neu aufgerufen wird mit neuen node Werten.
  insert(value, node = this.root){
    //Node left, right defaults sind null. Falls dies erreicht wurde, soll neues Node mit Value gesetzt werden. 
    if (node === null) return new Node(value); 
      // console.log(value, node.data);
      // console.log(value, node.left)
      // console.log(value, node.right)
    if (value < node.data) 
      //Wenn value kleiner node, wird der value mit dem linken node aufgerufen 
      node.left = this.insert(value, node.left); 
    else 
      node.right = this.insert(value, node.right);
      // console.log(node);
    return node; 
  }


  deleteItem(value, node = this.root){
    if(node === null) return node; //Wenn neues Node (node.left/right) aus Rekursion === null ist, return node -> Andernfalls führe vergleich fort. 
          // console.log(value, node.data);
          // console.log(value, node.left)
          // console.log(value, node.right)
    // Wenn value kleiner/größer als Node ist... führe rekursion fort. 
    if(value < node.data){
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data){
      node.right = this.deleteItem(value, node.right); 
    } else { //Wenn Value NICHT größer oder kleiner als node.data, dann else... 
      //  If/Else Prozess durchlaufen: Wenn Ein Kind-Element "null" ist, gebe Node zurück (Kann Wert oder Null sein). 
      if (node.left == null) return node.right; // return node.right (Wert oder null) an node.left/right = this.deleteItem(); 
      if (node.right == null) return node.left; // return node.left (Wert oder null) an node.left/right = this.deleteItem(); 
      // Ist node.left !== null && node.right !== null, dann wird ein Element aus dem Baum gelöscht wird, welches zwei Kinder hat. 
      // Finde den kleinsten Wert im rechten Teilbaum und setze diesen auf den aktuellen Knotenwert.
      node.data = this.findMin(node.right).data; 
          // console.log(value, node.data);
          // console.log(value, node.left)
          // console.log(value, node.right)
      // löscht den Knoten, der den kleinsten Wert im rechten Teilbaum enthält, da dieser Wert jetzt im aktuellen Knoten steht.
      node.right = this.deleteItem(node.data, node.right);
    }
    return node; // letzter Node wird zurückgegeben
  }

  findMin(node){
    // Solange node.left nicht null, setzte node.left auf node. 
    while (node.left !== null) 
      node = node.left; 
      // console.log(node.data);
    return node; //Schleife Endet, weil node.left == null ist. 
  }


  find(value, node = this.root){
    // Wenn Node "null" ist oder der aktuelle Node der gesuchte Value ist. 
    if (node === null || node.data === value) return node; 
    // Ansonsten Tree durchsuchen. 
    if (value < node.data) return this.find(value, node.left); 
    return this.find(value, node.right); 
  }


  // The method should return an array of values if no callback is given as an argument
  // Verwendet eine Warteschlange, um alle Knoten der aktuellen Ebene zu verarbeiten, bevor zur nächsten Ebene gewechselt wird.
  levelOrder(callback){
    const queue = [this.root]; // 1. Initialisiere eine Warteschlange mit der Wurzel des Baums.
    const result = []; // 2. Initialisiere ein leeres Array, um die Ergebnisse zu speichern.

    while(queue.length){ // 3. Solange die Warteschlange nicht leer ist:
      const node = queue.shift(); // 4. Entferne den ersten Knoten aus der Warteschlange und speichere ihn in 'node'.
      /* 
        Ermöglicht sie es dem Benutzer, eine benutzerdefinierte Operation für jeden Knoten im Baum festzulegen. 
        Das bedeutet, dass der Benutzer entscheiden kann, welche spezifische Aktion auf jedem Knoten ausgeführt werden soll, 
        während der Baum in Breitensuche traversiert wird.
      */
      if (callback){ // 5. Wenn ein Callback gegeben ist:
        callback(node); // 6. Führe den Callback mit dem aktuellen Knoten aus. Callback ist eine Currying-Funktion welches ein Node als Paramter animmt.
      } // else {  
      /* 
        7. Wenn kein Callback gegeben ist:
        Wenn kein callback übergeben wird (if (!callback)), wird der node.data zum result-Array hinzugefügt, 
        was bedeutet, dass die Methode alle Knotendaten in der Reihenfolge ihres Besuchs speichert.*/
        result.push(node.data); // 8. Füge den Wert des aktuellen Knotens zum Ergebnis-Array hinzu.
      //}

      /* 
        Wenn der aktuelle Knoten Kinder hat (also node.left und/oder node.right nicht null sind), 
        werden diese Kinder der Queue hinzugefügt, um sie später zu verarbeiten. 
        Dadurch wird sichergestellt, dass die Methode alle Knoten auf derselben Ebene zuerst verarbeitet, 
        bevor sie zur nächsten Ebene übergeht.
      */
      if (node.left) queue.push(node.left); // 9. Wenn der linke Kindknoten existiert, füge ihn zur Warteschlange hinzu.
      if (node.right) queue.push(node.right); // 10. Wenn der rechte Kindknoten existiert, füge ihn zur Warteschlange hinzu.
    }
    if (!callback) return result; // Bsp.: 11. Wenn KEIN Callback gegeben ist, gib das Ergebnis-Array zurück.
    if (callback) return result; // Bsp.: 11. Wenn EIN Callback gegeben ist, gib das Ergebnis-Array zurück.
  }


  /*
    Write inOrder(callback), preOrder(callback), and postOrder(callback) functions that also accept an optional 
    callback as a parameter. Each of these functions should traverse the tree in their respective depth-first order 
    and yield each node to the provided callback. The functions should return an array of values if no callback is 
    given as an argument.
  */
  inOrder(node = this.root, callback = null, result = []){
    if(node){
      this.inOrder(node.left, callback, result); // 1. Durchquere den linken Teilbaum
      if(callback) callback(node); // 2. Verarbeiten den aktuellen Knoten
      result.push(node.data); // Speicher die Knotendaten im Ergebnisarray
      this.inOrder(node.right, callback, result); // 3. Durchquere den rechten Teilbaum
    }
    return result; // 4. Sammelt die Ergebnisse und gibt zum Schluss das Ergebnisarray zurück.
  }

  //Reihenfolge: Wurzel, linker Teilbaum, rechter Teilbaum
  preOrder(node = this.root, callback = null, result = []){
    if(node){
      if(callback) callback(node); 
      result.push(node.data); // Aktueller Knoten
      this.preOrder(node.left, callback, result); // Durchquere linken Teilbaum
      this.preOrder(node.right, callback, result); // Durchquere rechten Teilbaum 
    }
    return result; // Sammelt die Ergebnisse und gibt zum Schluss das Ergebnisarray zurück.
  }

  //Reihenfolge: linker Teilbaum, rechter Teilbaum, Wurzel
  postOrder(node = this.root, callback, result = []){
    if(node){
      this.postOrder(node.left, callback, result); // 1. Besuche den linken Teilbaum
      this.postOrder(node.right, callback, result); // 2. Besuche den rechten Teilbaum
      if (callback) callback(node); // 3. Verarbeite den aktuellen Knoten, falls ein Callback vorhanden ist
      result.push(node.data);  // Füge die Knotendaten dem Ergebnisarray hinzu
    }
    return result; // Sammelt die Ergebnisse und gibt zum Schluss das Ergebnisarray zurück.
  }


  /* 
  Die Höhe eines Knotens ist die Anzahl der Kanten auf dem längsten Weg von diesem Knoten zu einem Blatt.
  Es wird in der Regel von unten nach oben gemessen.
  */
  height(node = this.root){
    // -1 nur wenn, node === null ist, ansonsten wird pro Knotenpunkt +1 gerechnet: siehe return Math.max (Z:207)
    if(node === null){
      return -1; 
    }
    const leftHeight = this.height(node.left); 
    const rightHeight = this.height(node.right); 
    /* Die Höhe des aktuellen Knotens ist das Maximum der Höhen seiner linken und rechten Teilbäume, 
    plus 1 (um den aktuellen Knoten selbst zu berücksichtigen).*/
    // gibt den größten der beiden Argumente zurück
    return Math.max(leftHeight, rightHeight) +1; 
  }


  /* 
  Die Tiefe eines Knotens ist die Anzahl der Kanten von der Wurzel bis zu diesem Knoten.
  Es wird in der Regel von oben nach unten gemessen.
  */
  depth(node, current = this.root, depth = 0){
    if(current === null) return -1; //Knoten nicht gefunden
    if(node.data === current.data) return depth //Knoten gefunden 
    if(node.data < current.data){
      return this.depth(node, current.left, depth + 1); //return depth -> return this.depth -> depth()
    } else {
      return this.depth(node, current.right, depth + 1);
    }
  }


  /* 
  Methode zur Überprüfung, ob der Baum ausgeglichen ist
  checkBalance: Hilfsmethode zur Überprüfung der Balance eines Teilbaums
  */
  isBalanced(){
    // gibt entweder TRUE oder FALSE zurück, abhängig davon, was zurückgegeben wird. 
    return this.checkBalance(this.root) !== -1; //return ob condition TRUE oder FALSE; 
  }

  /*
  Die checkBalance(node)-Methode berechnet den Balancefaktor eines Knotens, 
  indem sie die Höhe seiner linken und rechten Teilbäume vergleicht. Sie liefert -1, 
  wenn der Baum an einer Stelle unbalanciert ist, andernfalls die Höhe des Knotens.
  */
  checkBalance(node){
    if(node === null) return 0; //Wenn node === null, return 0 an this.checkBalance(node.left/right); 

    //Höhe des linken Baums
    let leftHeight = this.checkBalance(node.left); 
    //Höhe des rechten Baum
    let rightHeight = this.checkBalance(node.right);

    // Überprüfen, ob der linke oder rechte Teilbaum unbalanciert ist (-1)
    // Math.abs: Prüfen, ob die Differenz der Höhen der Teilbäume größer als 1 ist
    if(leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) return -1; //Unbalancierter Baum, gibt -1 zurück
  
    /*
    Die Zeile return Math.max(leftHeight, rightHeight) + 1; im checkBalance()-Algorithmus wird verwendet, 
    um die Höhe des aktuellen Knotens im Binärbaum zu berechnen. Dies geschieht durch rekursive Berechnung der 
    Höhe der linken und rechten Teilbäume. Die Differenz zwischen der Höhe des linken und des rechten Teilbaums 
    wird dann überprüft, um festzustellen, ob der Baum an dieser Stelle ausgeglichen ist oder nicht.
    */
    return Math.max(leftHeight, rightHeight) +1; 
  }


  /*
  Um den rebalance()-Algorithmus zu verstehen, betrachten wir, wie er verwendet wird, um einen unbalancierten 
  Binärbaum auszugleichen. In der Regel wird dies durch Rotationen der Knoten im Baum erreicht. 
  Hier ist eine typische Implementierung eines AVL-Baums, der die Methode rebalance() verwendet:
  */
  rebalance(node) {
    let balanceFactor = this.checkBalance(node); // Berechnung des Balancefaktors für den aktuellen Knoten

    // Fall 1: Links schwer
    if (balanceFactor > 1) {
        if (this.checkBalance(node.left) < 0) {  // Links-Rechts Fall: Links-Rotation und danach Rechts-Rotation
            node.left = this.rotateLeft(node.left);}
        return this.rotateRight(node); // Einfache Rechts-Rotation
    }

    // Fall 2: Rechts schwer
    if (balanceFactor < -1) {
        if (this.checkBalance(node.right) > 0) { // Rechts-Links Fall: Rechts-Rotation und danach Links-Rotation
            node.right = this.rotateRight(node.right);}
        return this.rotateLeft(node); // Einfache Links-Rotation
    }

    // Wenn der Baum bereits balanciert ist, gebe den aktuellen Knoten zurück
    return node;
  }
}

// --- FUNKTIONEN ---

// Callback-Function: Funktion übernimmt den Wert und gibt eine Funktion zurück, die den Knoten vergleicht 
let foundNode = false;
function searchNode(value){
  return function(node){
    if(node.data === value) foundNode = true; 
  }
}


// Rekursive Funktion als eine Konstante mit 3 Parameter
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) { //Basisbedingung falls node leer ist 
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};


// Zum Start des Projekts: Array wird handisch erstellt. 
//let tree = new Tree([4,5,6,3,9,11,23,32,45,67,4,56,97,54,57]); 
// console.log(tree.root); 

//Array für Tree wird random generiert. 
function getRandomArray(size, max) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

const array = getRandomArray(15, 100);
const tree = new Tree(array);



/* #### AUFRUFE: DRIVER SCRIPT #### 
  Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.
  Confirm that the tree is balanced by calling isBalanced.
  Print out all elements in level, pre, post, and in order.
  Unbalance the tree by adding several numbers > 100.
  Confirm that the tree is unbalanced by calling isBalanced.
  Balance the tree by calling rebalance.
  Confirm that the tree is balanced by calling isBalanced.
  Print out all elements in level, pre, post, and in order.
*/

// Füge ein Node hinzu
tree.insert(7); 

//letzter Knoten im Baum
// tree.deleteItem(7);

// Wenn Knoten Kinderelemente hat. 
tree.deleteItem(4); 

// Finde bestimmten Wert im Tree und gebe den Node zurück. 
// console.log(tree.find(5));

/* 
  Wenn tree.levelOrder(createSearchNodeCallback(5)) aufgerufen wird, übergibst du levelOrder eine Funktion, 
  die in createSearchNodeCallback erzeugt wurde. Diese erzeugte Funktion nimmt einen Parameter (node).
*/
// console.log("Level Order:", tree.levelOrder(searchNode(54))); //levelOrder mit einer Callback-Function 
// console.log("Found Node: " + foundNode) //Callback-Ergebnis


/*
  Reihenfolge: linker Teilbaum, rechter Teilbaum, Wurzel
  Ohne Callback: 
  Mit Callback: Auch wenn inOrder das Node defailt mit this.root definiert ist, muss aufgrund der Reihenfolge das Root im 
  Funktionsaufruf angegeben werden, weil sonst die Reihenfolge nicht passt und die Callback-Funktion auf das Root 
  direkt durchgeführt wird.  
*/
// console.log(tree.inOrder()); 
// console.log(tree.inOrder(tree.root, searchNode(54))); 
// console.log("Found Node: " + foundNode) //Callback-Ergebnis


//Reihenfolge: Wurzel, linker Teilbaum, rechter Teilbaum
// console.log(tree.preOrder(tree.root, searchNode(54))); //Mit Callback
// console.log("Found Node: " + foundNode) //Callback-Ergebnis


//Reihenfolge: linker Teilbaum, rechter Teilbaum, Wurzel
// console.log(tree.postOrder(tree.root)); //Ohne Callback
// console.log(tree.postOrder(tree.root, searchNode(54))); //Mit Callback
// console.log("Found Node: " + foundNode) //Callback-Ergebnis


// Height misst, wie weit ein Knoten von seinen Blättern entfernt ist.
// console.log(tree.height());


//Depth misst, wie weit ein Knoten von der Wurzel entfernt ist.
    // console.log(tree.depth(tree.root[7])); FUNKTIONIERT NICHT, WEIL TREE KEIN ARRAY IST
// Für den Vergleich muss explizit ein Node erstellt werden. 
// const node = new Node(67); 
// console.log(tree.depth(node));


/*
Ein ausgeglichener Baum ist definiert als ein Baum, bei dem die Höhen der linken und rechten Teilbäume 
für jeden Knoten höchstens um 1 voneinander abweichen.
*/
// console.log(tree.isBalanced());


/*
Schreiben Sie eine Rebalance-Funktion, die einen unausgewogenen Baum wieder ins Gleichgewicht bringt. 
Tipp: Verwenden Sie eine Traversal-Methode, um ein neues Array für die buildTree-Funktion bereitzustellen.
*/
// tree.rebalance();
