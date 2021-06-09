/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package my_tree;

/** 1. Definition of AVL tree:
 *         + AVL tree is a self-balancing BST tree where the difference between heights of left and 
 *              right subtree cannot be more than one for all nodes
 *  2. Example: 
 *                          12
 *                        /    \
 *                      6        18
 *                     / \      /  
 *                    5   11   17   
 *                   /
 *                  4
 *                       
 * ==> this AVL tree
 * 
 *                          12
 *                        /    \
 *                      6        18
 *                     / \      /  
 *                    5   11   17   
 *                   / \
 *                  4   7
 *                 /
 *                2
 * ==> but, this is NOT AVL tree
 * 
 *  3. Rotate tree
 *      + Left rotation with pivot node is p: --> condition: is p must have right child
 *              x = p.right
 * 
 *      ==> Formula: p.right = x.left; x.left = p
 * 
 * 
 *      + Right rotation with pivot node is p: --> condition is p must have left child
 *              x = p.left
 *      ==> Formula: p.left = x.right; x.right = p;
 *                         
 * 
 *  4. Insert node in tree
 * 
 * 
 * 
 *  5. delete node from tree
 * 
 *          
 *
 * @author Phong Khoang
 */


public class AVLTree {
    Vertex root;

    public AVLTree() {
        root = null;
    }

    // this function is extra result for attribute h of each Vertex 
    // return 0 if Vertex is null (very important for updata h (height) for each Vertex
    int height(Vertex v){
        if (v == null) return 0;
        return v.h;
    }
    
    // rotate left
    Vertex rotateLeft(Vertex v){
        // this function need in the case that when we insert new node to the AVT tree
        // ==> it violated the structure of AVT ==> we trade back to find which vertex is wrong
        // ==> Vertex v is the first vertex that violated the rule of AVT
        Vertex rV = v.right;
        v.right = rV.left;
        rV.left = v;
        
        // update the height of vertices
        // 1. must update this v first 
        v.h = Math.max(height(v.left),  height(v.right)) + 1;
        // 2. after has updated value of height of v ( now is left child of rv (new root) )
        rV.h = Math.max(height(rV.right), height(rV.left)) + 1;
        
        
        // return new root
        return rV;
    }
    
    // rotate right
    Vertex rotateRight(Vertex v){
        // the same like in rotateLeft
        Vertex lV = v.left;
        v.left = lV.right;
        lV.right = v;
        
        // update new height for vertices that just have change position (:))))
        v.h = Math.max(height(v.right), height(v.left)) + 1;
        lV.h = Math.max(height(lV.left),  height(lV.right)) + 1;
        
        // return new root
        return lV;
    }
    
    // get Balanced : height(v.left) - height(v.right)
    // result return in [-2, 2] never abs(result) >= 3
    // because, if we add new Vertex to AVL tree ==> if balanced of any Vertex comes to 2 
    // ==> it is going to be re-balanced (rotate .... xyz ....)
    int getBalanced(Vertex v){
        if(v == null) return 0;     
        return height(v.left) - height(v.right);
    }
    
    
    
    // insert method
    Vertex insert(Vertex v, int x){
        // base case: check if we come to the end of tree
        if(v == null) return new Vertex(x);
        
        // recursive case
        if(v.value > x) v.left = insert(v.left, x);
        else if(v.value < x) v.right = insert(v.right, x);
        else{
            // not allow duplicate value in AVL tree (due to it is also BST tree)
            return v;
        }
        
        // update h of all vertices that in the path of insertion
        v.h = Math.max(height(v.left), height(v.right)) + 1;
        
        // get Balanced of this current vertex: this step will be backtracking 
        // bottom-up to all vertices in path of insertion
        int balanced = getBalanced(v);
        
        // case 1: left left
        if(balanced > 1 && v.left.value > x){
            // rotate to the right with v is pivot vertex
            return rotateRight(v);
        }
        
        // case 2: left right
        if(balanced > 1 && v.left.value < x){
            // step 1: rotate to the left with pivot is v.left
            Vertex newLeft = rotateLeft(v.left);
            // step 2: set new left reference for this current vertex v
            v.left = newLeft;
            // step 3: rotate to the right with pivoid is v
            return rotateRight(v);
        }
        // case 3: right right
        if(balanced < -1 && v.right.value < x){
            // rotate to the left with v is pivot vertex
            return rotateLeft(v);
        }
        
        // case 4: right left
        if(balanced < -1 && v.right.value > x){
            // step 1: rotate to the right with pivot is v.right
            Vertex newRight = rotateRight(v.right);
            // step 2: set new right reference for this current vertex v
            v.right = newRight;
            // step 3: rotate to the left with pivoid is v
            return rotateLeft(v);
        }
        
        // case 5: normal v is balanced node (tree with v is root is balanced)
        return v;
         
    }
    
    
    // get the right most Vertex of root vertex
    Vertex getRightMost(Vertex v){
        // when pass Vertex to this method 
        //==> constraint that v is not null
        while(v.right != null){
            v = v.right;
        }
        return v;
    }
    
    // delete
    Vertex delete(Vertex v, int x){
        // base case 1: that not found Vertex x to delete
        if(v == null) return null;
        
        if(x > v.value){
            v.right = delete(v.right, x);
        }else if(x < v.value){
            v.left = delete(v.left, x);
        }else{
            // case we must solve (this case found Vertex has value x)
            // ==> Consider 4 cases likes in BST
            // Vertex v has no child
            if(v.left == null && v.right == null){
                // remove Vertex v
                return null;
            }
            // Vertex v has left child
            else if(v.right == null && v.left != null){
                return v.left;
            }
            // Vertex v has right child
            else if(v.left == null && v.right != null){
                return v.right;
            }
            // Complicate case: case 4:  Vertex v has both children left, right
            else{
                Vertex replace = getRightMost(v.left);
                // delete by copying
                v.value = replace.value;
                
                v.left = delete(v.left, x);
            }
        }
        // just in case 4 we need to update the height of this current node 
        // updata height
        
        v.h = Math.max(height(v.left), height(v.right)) + 1;
        
        // just in case 4 we need to be check the unbalanced or not
        int balancedFactor = getBalanced(v);
        
        // for case in this deletion (same as in insertion)
        // Left left
        if (balancedFactor > 1 && getBalanced(v.left) >= 0){
            return rotateRight(v);
        }
        
        // Left right
        if (balancedFactor > 1 && getBalanced(v.left) < 0){
            v.left = rotateLeft(v.left);
            return rotateRight(v);
        }
        
        // Right right
        if (balancedFactor < -1 && getBalanced(v.right) <= 0){
            return rotateLeft(v);
        }
        // Right left
        if (balancedFactor < -1 && getBalanced(v.right) > 0){
            v.right = rotateRight(v.right);
            return rotateLeft(v);
        }
        
        // return Vertex in case 4 of deletion: if it does not in for L_L, L_R, R_R, R_L above
        return v;
    }
    
    
    
    
    
    
    
    
    
    
    
    
    // visit one Vertex
    void visit(Vertex v){
        System.out.println(v);
    }
    
    // DFS :
    void inOrder(Vertex v){
        // base case:
        if(v == null) return;
        
        // visit left subtree of v
        inOrder(v.left);
        // visit v
        visit(v);
        // visit right subtree of v
        inOrder(v.right);
        
    }
    
    
    
    void preOrder(Vertex v){
        if(v != null){
            System.out.println(v.value);
            preOrder(v.left);
            preOrder(v.right);
        }
    }
    
    
    // test AVL tree
    public static void main(String[] args) {
        AVLTree tree = new AVLTree();
//        tree.root = tree.insert(tree.root, 10);
//        tree.root = tree.insert(tree.root, 20);
//        tree.root = tree.insert(tree.root, 30);
//        tree.root = tree.insert(tree.root, 40);
//        tree.root = tree.insert(tree.root, 50);
//        tree.root = tree.insert(tree.root, 25);
//        
//        /* The constructed AVL tree would be:
//        
//                        30
//                      /    \
//                     20    40
//                    /  \   / \
//                   10  25     50
//        */
//        
//        tree.inOrder(tree.root);

        tree.root = tree.insert(tree.root, 9);
        tree.root = tree.insert(tree.root, 5);
        tree.root = tree.insert(tree.root, 10);
        tree.root = tree.insert(tree.root, 0);
        tree.root = tree.insert(tree.root, 6);
        tree.root = tree.insert(tree.root, 11);
        tree.root = tree.insert(tree.root, -1);
        tree.root = tree.insert(tree.root, 1);
        tree.root = tree.insert(tree.root, 2);
 
        /* The constructed AVL Tree would be
           9
          /  \
         1    10
        /  \    \
       0   5    11
      /   /  \
    -1   2    6
        
         */
        System.out.println("Preorder traversal of "+
                            "constructed tree is : ");
        tree.preOrder(tree.root);
 
        tree.root = tree.delete(tree.root, 10);
 
        /* The AVL Tree after deletion of 10
           1
          /  \
         0    9
        /     / \
        -1    5   11
        /  \
        2    6
         */
        System.out.println("");
        System.out.println("Preorder traversal after "+
                           "deletion of 10 :");
        tree.preOrder(tree.root);
        
    }
    
}


class Vertex{
    // height of the Vertex is the length of longest path from it to its leaf (in all its leaves)
    // But in here we calculate inclusive number of node in that longest path
    int value, h;
    Vertex left, right;

    public Vertex(int value, int h, Vertex left, Vertex right) {
        this.value = value;
        this.h = h;
        this.left = left;
        this.right = right;
    }
    
    // constructor, every one Vertex is created ==> its height = 1
    public Vertex(int value){
        this(value, 1, null, null);
    }

    @Override
    public String toString() {
        String l, r;
        if(left == null){
            l = "null";
        }else{
            l = String.valueOf(left.value);
        }
        
        if(right == null){
            r = "null";
        }else{
            r = String.valueOf(right.value);
        }
       
        return String.format("Node{value: %d, h: %d, left: %s, right: %s}", value, h, l, r);
    }
    
    
}



