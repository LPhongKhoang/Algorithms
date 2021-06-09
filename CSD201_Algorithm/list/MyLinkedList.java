
package list;

/**+  The most advantage of the linked list is that all elements of its are object (node)
 * Object are located in every where in the memory 
 * (Array is continously sequence cell memory in memory)
 * + So, linked list is more convenient for removing, adding if we know the given node is manipulated 
 * with new node
 *
 * @author Phong Khoang
 */


public class MyLinkedList {
    
    // a list of Nodes: just need to control first Node -> next -> access all nodes 
    Node<Color> head, tail;
    
    // constructor: initial null for head, tail
    public MyLinkedList(){
        head = tail = null;
    }
    
    //============= operators ================
    
    // 1. check is empty
    public boolean isEmpty(){
        return head == null;
    }
    
    
    // 2. add last
    public void addLast(Color c){
        Node<Color> newNode = new Node(c);
        if(isEmpty()){
            head = tail = newNode;
        }else{
            tail.next = newNode;
            tail = newNode;
        }
    }
    
    // 3. add first
    public void addFirst(Color c){
        Node<Color> newNode = new Node(c);
        if(isEmpty()){
            head = tail = newNode;
        }else{
            newNode.next = head;
            head = newNode;
        }
    }
    /**
     * ADD : 
     * + case 1: list is empty
     * + case 2: list has at leat one node
     * @return 
     */
    // 4. remove first
    public Node<Color> removeFirst(){
        if(isEmpty()){
            return null;
        }else{
            Node<Color> node = head;
            head = head.next;
            // remove arrow (next) of the first node to the second node -- old state
            // save memory when 
            node.next = null;
            return node;
        }
    }
    
    // 5. remove last
    public Node<Color> removeLast(){
        Node<Color> node;
        if(isEmpty()){
            // case 1: list is empty
            return null;
        }else if(head.next == null){
            // case 2: list has only one node
            node = head;
            head = tail = null;
            return node;        
        }else{
            // case 3: list has more than 2 node
            node = head;
            // loop to last exclusive node
            while(node.next.next != null){
                node = node.next;
            }
            tail = node;
            node = tail.next;
            // remove referencial next (arrow) of tail
            tail.next = null;
            return node;
        }    
    }
    
    // 6. remove node at k-index (0-index)
    public void remove(int k){
        if(isEmpty()) return;
        
        if (k == 0){
            // case 1: remove first
            Node<Color> node = head;
            head = head.next;
            node.next = null;
        }else{
            Node<Color> focus = getNode(k);
       
            // case 2: when k out of range (k >= size || k < 0)
            //  ==> check focus is null
            if(focus == null) return;
            
            // case 3: k is in range ( 1 <= k <= size()-1 )
            // ==> always exists previous Node (k-1 >= 0)
            Node<Color> previous = getNode(k-1);
      
            previous.next = focus.next;
            focus.next = null;
            
            // check if we remove tail --> refresh new tail
            if(focus == tail){
                tail = previous;
            }
        }
    }
    // 7. getNode at position k (start with 0)
    public Node<Color> getNode(int k){
        if(k < 0) return null;
        
        Node<Color> node = head;
        int t = 0;
        // loop until not come to the k-index or end of list
        while(t < k && node != null){
            t++;
            node = node.next;
        }
        // even if k > n-1 ==> node = null ==> return null is exactly suitable
        return node;
    }
    
    // 8. get size of linked list
    public int size(){
        int size = 0;
        Node<Color> node = head;
        while(node != null){
            size++;
            node = node.next;
        }
        return size;
    }
    
    // 9. reverse linked list
    public void reverse(){
        Node<Color>focus, already, store;
        already = store = null;
        //assign tail = head;
        tail = head;
        // focus to access all node ==> reverse arrow (next pointer)
        focus = head;
        while(focus != null){
            store = focus.next;
            focus.next = already;
            already = focus;
            focus = store;
        }
        
        head = already;
    }
    
    // 10. sort linked by value of Color in each Node
    // --> we just need to swap Color (not swap Node)
    public void sort(){
       Node<Color> pi, pj;
       pi = head;
       while(pi != null){
           pj = pi.next;
           while(pj != null){
               if(pi.info.value > pj.info.value){
                   swapNode(pi, pj);
               }
               pj = pj.next;
           }
           pi = pi.next;
       }
    }
    
    // swap Color
    private void swapNode(Node<Color> n1, Node<Color> n2){
        // note: involve to object and reference in Java
        // + we can only change object's attribute when pass it to function (parameter)
        // + ===> it means, we can change itself :)))
        Color cTemp = n1.info;
        n1.info = n2.info;
        n2.info = cTemp;
    }
    // 11. remove th second Biggest node (value of its info's color)
    public void removeSecond(){
        int posSecond = getSecondPosColor();
        remove(posSecond);
    }
    
    // 12. search node by name of its color
    public Node<Color> search(String name){
        Node<Color> node = head;
        while(node != null){
            if(node.info.name.equalsIgnoreCase(name)){
                break;
            }
            node = node.next;
        }
        return node;
    }
    
    // 13. find middle node in linked list
    public Node<Color> middleNode(){
        // n = size of list, start f = s = head (index = 0)
        
        // case 1: n is odd --> index of middle node = (n-1)/2
        // ==> we need to loop (n-1)/2 times
        // because, in that case: f = 0 + (n-1)/2, s = 0 + 2*(n-1)/2 = n-1
        // ===> f is in middle of the list and s is in the end of the list (s.next is null)
        
        // case 2: n is event --> index of middle node = floor( (n-1)/2 ) = (n-2)/2
        // in that case, f = (n-2)/2, s = n-2 (s.next.next is null)
        
        // spcial case: list is empty --> stop this function immediatly
        
        if(isEmpty()) return null;
        
        Node<Color> f, s;
        f = s = head;
        while(s.next != null && s.next.next != null){
            f = f.next;
            s = s.next.next;
        }
        return f;
        
    }
    
    // get position of second max Color (value)
    public int getSecondPosColor(){
        int pos = 0;
        Color second = null;
        Color max = getMaxColor();
       
        Node<Color> node = head;
        // initial for second: 
        // strongly note: when we compare node (check condition for this while loop)
        // ==> pos is coresponding with node (index of node = pos)
        while(node != null && node.info.value == max.value){
            node = node.next;
            pos++;
        }
      
        // check node is null (means all node is has max color)
        if(node == null){
            return -1;
        }
        
        second = node.info;
       
        int k = pos;
        while(node != null){
            if(node.info.value != max.value && node.info.value > second.value){
                second = node.info;
                pos = k;
            }
            k++;
            node = node.next;
        }
        
        return pos;
    }
    
    // get max Color (value)
    public Color getMaxColor(){
        if(isEmpty()) return null;
        Color max = head.info;
        Node<Color> node = head.next;
        while(node != null){
            if(max.value < node.info.value){
                max = node.info;
            
            }
            node = node.next;
        }
        return max;
    }
    // traveral linked list
    public void traverse(){
        Node<Color> node = head;
        while(node != null){
           System.out.println(node.info + "->");
           node = node.next;
        }
        System.out.println("=========");
    }
    
}
