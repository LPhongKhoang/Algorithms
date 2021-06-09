/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package my_tree;

/**
 *
 * @author Phong Khoang
 */
public class TestTree {
    
    public static void main(String[] args) {
//        int[] arr = {8, 4, 2, 1, 3, 6, 5, 7, 12, 10, 9, 11, 14, 13, 15};
//        // create new tree
//        BSTree tree = new BSTree();
//        for(int x: arr){
//            tree.insert(x);
//        }
//        
//        // traverse tree BFS
//        tree.bfs(tree.root);
//        
//        System.out.println();
//        
////        // traverse tree inorder
////        tree.bfs(tree.root);
////        
////        
////        // search node
////        System.out.println(tree.search(100));
////        
////        // count node
////        System.out.println("Number of node in tree is: " + tree.count(tree.root));
//        
//        tree.deleteByMerging(8);
//        
//        tree.bfs(tree.root);

        int[] arr = {60, 50, 40, 45, 90, 80, 120};
        // create new tree
        BSTree tree = new BSTree();
        for(int x: arr){
            tree.insert(x);
        }
        
        tree.bfs(tree.root);
        
        tree.balanced(tree.root);
        
        System.out.println();
        tree.bfs(tree.root);

      
        
    }
    
}
