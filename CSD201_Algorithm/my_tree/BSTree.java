
package my_tree;

import java.util.ArrayList;

/** This BSTree class includes all ADT standard method
 *
 * @author Phong Khoang
 * ==== Type of binary Tree:
 * 1. Full binary tree: full 2-ary tree: 
 *      All internal vertex has 2 node left and right
 * 2. Complete binary tree: 
 *      All leaves are at the same level
 *          and
 *      is Full binary tree  
 * 
 *      ==> with height h: 
 *      ==> Complete binary tree has: 2^h leaves
 * 3. Nearly complete tree: (has height = h)
 *      Is Complete tree until height = h-1
 *          and
 *      The next level (h) has at least one node 
 * 
 */
public class BSTree {
    // Note: BST has unique element (not duplicate info) 
    // left.key < parent.key < right.key with all parent (is internal node)

    Node root;

    public BSTree() {
        root = null;
    }

    // check if tree is empty
    public boolean isEmpty() {
        return root == null;
    }

    // visit node
    public void visit(Node node) {
        System.out.println(node);
    }
    // 2. Add new node to tree
    public void insert(int x){
        Node newNode = new Node(x);
        
        // check if tree is empty
        if(isEmpty()){
            root = newNode;
            return;
        }
        
        // case that tree has at least one node
        Node parentNode = null, focusNode = root; 
        while(focusNode != null){
            parentNode = focusNode;
            
            if(focusNode.info == x){
                System.out.println("Insertion is failed (Duplicate node info)");
                return;
            }
            
            if(x > focusNode.info){
                focusNode = focusNode.right;
            }else{
                // x < focusNode.info
                focusNode = focusNode.left;
            }
        }
        
        // check for insert newNode to the left or right of parentNode
        if(x > parentNode.info) parentNode.right = newNode;
        else parentNode.left = newNode;
    }

    // 2. BFS (Breath-First Search)
    public void bfs(Node rootNode) {
        if (rootNode == null) {
            return;
        }

        MyQueue m = new MyQueue();
        m.enqueue(rootNode);

        Node node;
        while (!m.isEmpty()) {

            node = m.dequeue();
            visit(node);

            if (node.left != null) {
                m.enqueue(node.left);
            }
            if (node.right != null) {
                m.enqueue(node.right);
            }
        }

    }
    // 3.2: DFS (Depth Fisrt Search) use Recursion or Stack for store data
    // 3.2.1: pre-order traverse
    public void preOrder(Node node) {
        if (node == null) {
            return;
        }

        visit(node);
        preOrder(node.left);
        preOrder(node.right);
    }

    // 3.2.2: in-order traverse
    public void inOrder(Node node) {
        if (node == null) {
            return;
        }

        inOrder(node.left);
        visit(node);
        inOrder(node.right);
    }

    // 3.2.3: post-order traverse
    public void postOrder(Node node) {
        if (node == null) {
            return;
        }

        postOrder(node.left);
        postOrder(node.right);
        visit(node);
    }
    
    
    // 4. search
    public Node search(int x){
        // case when tree is empty
        if(isEmpty()) return null;
        
        // case when tree has at least one node
        Node node = root;
        while(node != null){
            if(node.info == x) break;
            
            if(x < node.info) node = node.left; //search left subtree if x < thisNode.info
            else node = node.right; // search right subtree if  x > thisNode.info
        }
        return node;
    
    }
    
    // 5. count number of node in tree: using BFS (can use DFS)
    public int count(Node rootNode){
        // case that tree is empty
        if(isEmpty()) return 0;
        
        // now normal case is correct
        int res = 0;
        MyQueue m = new MyQueue();
        m.enqueue(rootNode);
        
        
        while(!m.isEmpty()){
            Node node = m.dequeue();
            res++;
            
            if(node.left != null) m.enqueue(node.left);
            if(node.right != null) m.enqueue(node.right);
        }
        return res;
    }

    
    // 6. Delete node p on BST
    
    /* In general, we need to know the parent f of p (when deleting p)
    
     + case 1: p is leaf ==> delete p does not affect the structure of BST tree
        p is left child of f ==> f.left = null
        p is right child of f ===> f.right = null
     + case 2: 
    
    */
    // remove node in tree that has node.info = x
    public void  deleteByCopy(int x){
        // check case empty tree is makes problem easier
        if(isEmpty()) return;
        
       
        
        // find node f is parent node of "node"
        Node parent = null;
        Node node = root;
        
        while(node != null && node.info != x){
            parent = node;
            
            if(node.info > x) node = node.left;
            else if(node.info < x) node = node.right;
            
        }
        // check if not found node has age = x
        if(node == null) return;
        
        // case 1: node id leaf
        if(node.left == null && node.right == null){
            // check if node is root --> no parent
            if(parent == null) root = null;
            // otherwise, node has parent not null
            else if(parent.left == node) parent.left = null;
            else parent.right = null;
        }else if(node.left != null && node.right == null){
        // case 2: node has left child, no right child
            // check if node is root --> no parent
            if(parent == null){
                root = node.left;
            }else {
                // case node is not root --> has parent not null
                // check node is left child of parent
                if(parent.left == node) parent.left = node.left;
                else                    parent.right = node.left;
            }
        }else if(node.left == null && node.right != null){
        // case 3: node has right child, no left child
            // check if node is root --> no parent
            if(parent == null){
                root = node.right;
            }else{
                // case node is not root --> has parent not null
                if(parent.left == node) parent.left = node.right;
                else                    parent.right = node.right;
            }
        }else {
        // case 4: node has both left and right children
           // find the replaced node for this current node ("node")
           // choose way 1: the max node is in left subtree of "node" --> right most of left child of node
           //        way 2: the min node is in right subtree of "node" --> left most of right child of node
           // ==> The Goal is to find the node replace for "node" that still suitable the rule (structur) of BST
           
           // this deleting method is by copying 
           Node parentReplace = null, replace = node.left; // => choose way 1
           while(replace.right != null){
               parentReplace = replace;
               replace = replace.right;
           }
           
           // copy info
           node.info = replace.info;
           
           // actually remove reference to replace node
           // check if node.left does not have right child
           if(parentReplace == null){
               node.left = replace.left;
           }else{
           // node.left has at least one right child --> parentReplace != null
               parentReplace.right = replace.left;
           }
           
        }
    }
    // delete by mergin likes delete by copying (just different at case 4)
    // .... will 
    public void  deleteByMerging(int x){
        // check case empty tree is makes problem easier
        if(isEmpty()) return;
        
      
        
        // find node f is parent node of "node"
        Node parent = null;
        Node node = root;
        
        while(node != null && node.info != x){
            parent = node;
            
            if(node.info > x) node = node.left;
            else if(node.info < x) node = node.right;
            
        }
        // check if not found node has age = x
        if(node == null) return;
        
        // case 1: node id leaf
        if(node.left == null && node.right == null){
            // check if node is root --> no parent
            if(parent == null) root = null;
            // otherwise, node has parent not null
            else if(parent.left == node) parent.left = null;
            else parent.right = null;
        }else if(node.left != null && node.right == null){
        // case 2: node has left child, no right child
            // check if node is root --> no parent
            if(parent == null){
                root = node.left;
            }else {
                // case node is not root --> has parent not null
                // check node is left child of parent
                if(parent.left == node) parent.left = node.left;
                else                    parent.right = node.left;
            }
        }else if(node.left == null && node.right != null){
        // case 3: node has right child, no left child
            // check if node is root --> no parent
            if(parent == null){
                root = node.right;
            }else{
                // case node is not root --> has parent not null
                if(parent.left == node) parent.left = node.right;
                else                    parent.right = node.right;
            }
        }else {
        // case 4: node has both left and right children
           // find the replaced node for this current node ("node")
           // choose way 1: the max node is in left subtree of "node" --> right most of left child of node
           //        way 2: the min node is in right subtree of "node" --> left most of right child of node
           // ==> The Goal is to find the node replace for "node" that still suitable the rule (structur) of BST
           
           // this deleting method is by merging 
           Node parentReplace = null, replace = node.left; // => choose way 1
           while(replace.right != null){
               parentReplace = replace;
               replace = replace.right;
           }
           
           // handle node replacement ==================================
           // check if node.left does not have right child
           if(parentReplace == null){
               replace.right = node.right;
           }else{
           // node.left has at least one right child --> parentReplace != null
               parentReplace.right = replace.left;
               replace.left = node.left;
               
               replace.right = node.right;
           }
           
           // Handle parent of the node (node is removed) =================
           
           // check if node is root
           if(parent == null){
               root = replace;
           }else{
            //case node is not root --> parent not null
                if(parent.left == node) parent.left = replace;
                else                    parent.right = replace;
           }
           
        }
    }
    
    // BALANCED TREE
    // copy all nodes of tree to ArrayList order by inored traverse
    public void builArray(ArrayList<Integer> list, Node rootNode){
        if(rootNode == null) return;
        
        builArray(list, rootNode.left);
        list.add(rootNode.info);
        builArray(list, rootNode.right);
        
    }
    
    // balanced tree
    public void balanced(ArrayList<Integer> list, int first, int last){
        // base case
        if(first > last) return;
       
        // recursive case
        int midIndex = (first+last)/2;
        
        int x = list.get(midIndex);
        
        // buil tree
        insert(x);
        // recursion left of x node
        balanced(list, first, midIndex-1);
        // recursion right of x node
        balanced(list, midIndex+1, last);
        
    }
    
    public void balanced(Node p){
        // create new array list for store inorder node from old tree 
        ArrayList<Integer> list = new ArrayList<>();
        builArray(list, p);
        
        // balanced tree with node is p
        int first = 0, last = list.size()-1;
        
        // reset tree 
        root = null;
        // balaced tree call
        balanced(list, first, last);
    }
    
    
    // Way 2 : DSW (Day Stout Warrent) Algorithm
    // rotate left
    public Node rotateLeft(Node node){
        // check condition for left rotation
        if(node.right == null) return node;
        
        Node nr = node.right;
        node.right = nr.left;
        nr.left = node;
        return nr;
    }
    
    // rotate right
    public Node ratateRight(Node node){
        // check condition for right rotation
        if(node.left == null) return node;
        
        Node nl = node.left;
        node.left = nl.right;
        nl.right = node;
        return nl;
    }
    
}
