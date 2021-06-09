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
public class Node{
    int info;
    Node left;
    Node right;
    public Node(int info){
        this.info = info;
        this.left = null;
        this.right = null;
    }

    @Override
    public String toString() {
        return String.valueOf(info);
    }
    
}
