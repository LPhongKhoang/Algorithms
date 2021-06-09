/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package my_sort;

import java.io.FileNotFoundException;
import java.util.Random;

/**
 *
 * @author Phong Khoang
 */
public class TestSort {
    

   public static void main(String[] args) throws FileNotFoundException {
        int max = 1000;
        int n = 200;
        int[] a = new int[n];
        
        // random value element in array a
        Random rd = new Random();
        for (int i = 0; i < n; i++) {
            a[i] =   rd.nextInt(max);
        }
        
//        int n = 8;
//        int[] a = {5, 2, 9, 7, 1, 12, 22, 10};
        MySorting sort = new MySorting();
        
//        sort.selectionSort(a);
//        sort.insertionSort(a);        
//        sort.quickSort(a, 0, n-1);
//        sort.mergeSort(a, 0, n-1);
//        sort.countingSort(a);
        sort.radixSort(a);
        sort.saveToFile(a);
    }

}
