/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package my_graph;

import java.util.LinkedList;

/**
 *
 * @author Phong Khoang
 */
public class MyStack {
    LinkedList<Object> head;
    
    public MyStack(){
        head = new LinkedList<>();
    }
    public boolean isEmpty(){
        return head.isEmpty();
    }
    public void push(Object x){
        // insert first of linked list O(1)
        head.addFirst(x);
    }
    
    public Object pop(){
        // remove first: O(1)
        if(isEmpty()) return null;
        return head.removeFirst();
    }
    public Object top(){
        if(isEmpty()) return null;
        return head.getFirst();
    }
}
