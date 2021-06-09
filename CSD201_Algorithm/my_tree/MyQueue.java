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
public class MyQueue{
    LinkedList<Node> listData;
    public MyQueue(){
        listData= new LinkedList<>();
    }
    
    public boolean isEmpty(){
        return listData.isEmpty();
    }
    
    public Node dequeue(){
        return listData.removeFirst();
    }
    
    public void enqueue(Node x){
        listData.addLast(x);
    }
    
}
