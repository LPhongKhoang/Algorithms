/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package my_tree;

import java.util.LinkedList;


/**
 *
 * @author Phong Khoang
 */

/* we will implement some add, remove operators later
*   Now, we will implement isBalanced tree for this tree 
*   < with this method, we do not need that tree is BST (Binary Search Tree) > :)))
*   + Definition of balanced tree: 
*     - if both 2 sub-tree (left sub-tree and right sub-tree of the root) are balanced (1)
*           AND
*     - the difference between their height is not more than one (2)
*    ==> a little bit different with definition in MAD (Discret Math): 
*       the balanced tree has all leaves at level h and h-1 (h is height of tree)
*
*                               1
*                            /      \
*                           5        8
*                         /   \    /   \
*                        3     9  4     10
*                             /
*                            6
*/

/*
BST: left < parent < right

*/

public class PK_BST {
    Node root;
    public PK_BST(){
        root = null;
    }
    // 0. check is tree empty or not
    public boolean isEmpty(){
        return root == null;
    }
    
    // 1. add node xto BST
    public void add(int info){
        Node newNode = new Node(info);
        // add in case tree is empty
        if(isEmpty()){
            root = newNode;
            return;
        }
        
        // add in case is not empty
        Node parentNode, focusNode;
        parentNode = null; 
        focusNode = root;
        while(focusNode != null){
            parentNode = focusNode;
            if(info > focusNode.info){
                focusNode = focusNode.right;
            }else if(info < focusNode.info){
                focusNode = focusNode.left;
            }else{
                System.out.println("Node has info " + info + " is already in this tree!");
                return;
            }
        }
        
        // check for adding to the lef or right of parentNode
        if(info > parentNode.info) parentNode.right = newNode;
        else parentNode.left = newNode;
    }
    
    // 1* add node x to BST using recursion
    public void addR(Node parent, Node node, int info, boolean isLeft){
        // base case
        if(node == null) {
            // check if tree is empty
            if(isEmpty()){
                root = new Node(info);
            } else{
                if(isLeft) parent.left = new Node(info);
                else parent.right = new Node(info);
            }
            return;
            
        }
        
        // recursive case
        if(info > node.info) addR(node, node.right, info, false);
        else if(info < node.info) addR(node, node.left, info, true);
        
      
    }
    
    // 2. remove node x from BST
    
    // 3. traversal BST: 
        // 3.0: Visit node (we can do anything with this function, here just print it)
    private void visit(Node node){
        System.out.println(node);
    }
    
        // 3.1: BFS (Breath First Search) use Queue to store node data
    public void BFS(){
        MyQueue queue = new MyQueue();
        queue.enqueue(root);
        
        Node node;
        while(!queue.isEmpty()){
            node = queue.dequeue();
            visit(node);
            
            // add the children of node to queue
            if(node.left != null) queue.enqueue(node.left);
            if(node.right != null) queue.enqueue(node.right);
        }
    }
    
    
        // 3.2: DFS (Depth Fisrt Search) use Recursion or Stack for store data
            // 3.2.1: pre-order traverse
    public void preOrder(Node node){
        if(node == null) return;
        
        visit(node);
        preOrder(node.left);
        preOrder(node.right);
    }
    
    
            // 3.2.2: in-order traverse
    public void inOrder(Node node){
        if(node == null) return;
        
        inOrder(node.left);
        visit(node);
        inOrder(node.right);
    }
    
    
            // 3.2.3: post-order traverse
    public void postOrder(Node node){
        if(node == null) return;
       
        postOrder(node.left);
        postOrder(node.right);
        visit(node);
    }
    
    
    // 4. check if tree is Balanced
    public boolean isBalanced(){
        if(heightOfTree(root) == -1) return false;
        return true;
    }
    
    // support method for isBalanced method
    private int heightOfTree(Node node){
        // base case: 
        if(node == null) return 0;
        
        int leftH = heightOfTree(node.left);
        int rightH = heightOfTree(node.right);
        
        // check for (2): both 2 sub-tree is balanced
        if(leftH == -1 || rightH == -1) return -1;
        
        // check for (1): the different between 2 sub-tree is not more than one
        if(Math.abs(leftH-rightH) > 1) return -1;
        
        // calculate the height of this tree (node is root)
        if(leftH > rightH) return leftH+1;
        else return rightH + 1;
    }
    
    
    
    // Test my home PK_BST
    public static void main(String[] args) {
        int arr[] = {12, 5, 20, 9, 3, 1, 8, 7, 10, 14, 30, 25, 40};
        
        // create tree
        PK_BST pk_tree = new PK_BST();
        // add these nodes to the tree
        for(int i = 0; i < arr.length; i++){
            pk_tree.addR(null, pk_tree.root, arr[i], true);
        }
        
        System.out.println(pk_tree.isBalanced());
        
        
        pk_tree.inOrder(pk_tree.root);
        
    }
    
    
}



