/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package list;

/**
 *
 * @author Phong Khoang
 */
public class Node<T> {
   
    T info;
    Node next;
    
    // constructor 1: make a new Node (next = givenNode)
    public Node(T info, Node next){
        this.info = info;
        this.next = next;
    }
    
    // constructor 2: make a new Node (next = null)
    public Node(T info){
        this(info, null);
    }
        
}
