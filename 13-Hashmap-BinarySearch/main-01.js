// BINARY SEARCH TREE 

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
    //Wenn das Array ist, gibt es "null" zurück. 
    //Der Ausdruck if (!array) return null; prüft, ob array falsy ist (d.h. null, undefined, 0, "", etc.). In diesem Fall wollen wir jedoch nur prüfen, ob das Array leer ist.
    if (array.length === 0) return null; 
    //Finde die Mitte des Arrays
    const mid = math.floor(array.length/2); 
    //Erstellt neuen Knoten mit dem mittleren Wert. 
    const root = new Node(array[mid]); 
    //Baut rekursiv erst den linken Teilbaum
    root.left = this.buildTree(array.slice(0, mid)); 
    //Baut rekursiv dann den rechten Teilbaum
    root.right = this.buildTree(array.slice(mid + 1)); 
    //gibt den Wurzelknoten des aktuellen Teilbaums zurück
    return root; 
  }
}


