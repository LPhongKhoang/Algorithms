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
public class MainTest {
    
    public static void main(String[] args) {
        MyLinkedList lst = new MyLinkedList();
        
        lst.addFirst(new Color("blue", 123));
        lst.addFirst(new Color("yellow", 99));
        lst.addFirst(new Color("orange", 13));
        lst.addFirst(new Color("pink", 1));
        lst.addFirst(new Color("green", 5));
        lst.addFirst(new Color("red", 3));
        lst.addLast(new Color("gray", 222));
        
        
        
//        lst.traverse();
//        System.out.println(lst.size());
//        
//        System.out.println(lst.removeLast().info);
//        lst.traverse();
//        System.out.println("***********");
//        
//        System.out.println(lst.size());
//
//        
//        System.out.println(lst.removeFirst().info);
//        System.out.println(lst.size());
//        lst.remove(4);
//        lst.traverse();
        
//          lst.reverse();
//          lst.traverse();
//          System.out.println(lst.tail.info);
//          System.out.println(lst.size());
          
//          lst.sort();
//          lst.traverse();
          
          lst.addFirst(new Color("aaa", 1000));
          lst.addFirst(new Color("bbb", 1000));
          lst.addLast(new Color("ccc", 10));
          lst.traverse();
          
          
          lst.removeSecond();
          
          lst.traverse();
          
          System.out.println("The middle node of this list is: ");
          System.out.println(lst.middleNode().info);

        
       
    }
    
}
