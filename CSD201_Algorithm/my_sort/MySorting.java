/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package my_sort;

import java.io.FileNotFoundException;
import java.io.PrintWriter;

/**
 *
 * @author Phong Khoang
 */
public class MySorting {
//    int n;
//    int[] a;
//    public MySorting(int []b){
//        this.n = b.length;
//        a = new int[n];
//        for(int i = 0; i < this.n; i++){
//            a[i] = b[i];
//        }
//    }

    void saveToFile(int[] a) throws FileNotFoundException {
        PrintWriter pw = new PrintWriter("data.txt");
        pw.write("Is this array sorted?: " + isSorted(a) + "\r\n");
        for (int i = 0; i < a.length; i++) {
            pw.write(a[i] + "\n");
        }
        pw.close();
    }

    void printArr(int[] a) {
        for (int i = 0; i < a.length; i++) {
            System.out.print(a[i] + ", ");
        }
        System.out.println("\n------------------");
    }

    // swap a[i], a[j] 
    void swap(int[] a, int i, int j) {
        int t = a[i];
        a[i] = a[j];
        a[j] = t;
    }

    // 1. Selection sort O(n^2)
    /* ======== Main Idea =========
        find the minimum element at step k (k is index) from k to the end of array
        swap(min, a[k])
    
    ==> need to loop (n-1) times to put suitable element to index k from 0 -> n-2 (index n-1 is auto correct)
     */
    void selectionSort(int[] a) {
        int n = a.length;
        for (int i = 0; i < n - 1; i++) {
            int index_min = i;
            for (int j = i + 1; j < n; j++) {
                if (a[index_min] > a[j]) {
                    index_min = j;
                }
            }
            swap(a, i, index_min);
        }
    }

    // 2. Insertion sort
    void insertionSort(int[] a) {
        int n = a.length;
        for (int i = 1; i < n; i++) {
            // gim 
            int x = a[i];
            int j = i - 1;
            while (j >= 0 && x < a[j]) {
                a[j + 1] = a[j];
                j--;
            }
            a[j + 1] = x;
        }
    }

    // 3. Bubble sort
    void bubbleSort(int[] a) {
        boolean isSorted = false;
        int n = a.length;
        int i = 0;
        // loop i-th time to put the suitable element to index i-th
        while (!isSorted && i < n - 1) {
            isSorted = true;
            // bubble from last element to right after element index i-th
            for (int j = n - 1; j > i; j--) {
                if (a[j] < a[j - 1]) {
                    isSorted = false;
                    swap(a, j, j - 1);
                }
            }

            i++;
        }
    }

    // 4. Quick sort
    void quickSort(int[] a, int left, int right) {
        // base case:
        if (left >= right) {
            return;
        }

        // step: partion , we choose pivot as the first elment
        int pivot = a[left];
        int i = left, j = right;

        while (i <= j) {
            while (i <= right && a[i] <= pivot) {
                i++;
            }
            while (j > left && a[j] > pivot) {
                j--;
            }

            if (i <= j) {
                swap(a, i, j);
                i++;
                j--;
            }
        }
        // swap pivot to the j (because, now a[j] is <= pivot)
        swap(a, left, j);

        // step: recursive
        quickSort(a, left, j - 1);
        quickSort(a, j + 1, right);

    }

    // 4.Extra: standard code at CodeFights.com
    void quickSortCodeFight(int[] a, int l, int r) {

        if (l >= r) {
            return;
        }

        int x = a[l];
        int i = l;
        int j = r;

        while (i <= j) {
            while (a[i] < x) {
                i++;
            }
            while (a[j] > x) {
                j--;
            }
            if (i <= j) {
                int t = a[i];
                a[i] = a[j];
                a[j] = t;
                i++;
                j--;
            }
        }

        quickSortCodeFight(a, l, j);
        quickSortCodeFight(a, i, r);
    }
    
    // 5. Merge Sort
    public void mergeSort(int []a, int left, int right){
        // base case : only one element 
        if(left >= right) return;
        
        int mid = (left+right)/2;
        mergeSort(a, left, mid);
        mergeSort(a, mid+1, right);
        
        // after recursive: we need to merge 2 sorted list into one
        // the big array now has size = ...
        int sizeT = right-left+1;
        int[] aT = new int[sizeT];
        int index = 0; // index for putting element to array aT
        // start with 2 first of 2 sorted list
        int i = left, j = mid+1;
        // loop until one of 2 sorted list out of range
        while(i <= mid && j <= right){
            // check if a[i] is put to aT
            if(a[i] <= a[j]) aT[index++] = a[i++];
            // else a[j] is put to aT
            else aT[index++] = a[j++];
        }
        
        // loop to put all rest of first sorted list to aT
        while(i <= mid) aT[index++] = a[i++];
        // loop to put all rest of second sorted list to aT
        while(j <= right) aT[index++] = a[j++];
        
        // copy aT to original array a
        for(int x = 0; x < sizeT; x++){
            a[x+left] = aT[x];
        }
    }
    
    // 6. function to check if array a is sorted (ascending order)
    public boolean isSorted(int[] a){
        int n = a.length;
        for(int i = 1; i < n; i++){
            if(a[i] < a[i-1]) return false;
        }
        return true;
    }

    // 7. counting sort
    public void countingSort(int []a){
        // only efficient in the case that element in a is small (0-9 or a-z, ...)
        // we will do for 0-9: then use it for radix sort
        // this is standard code from geeksforgeeks.org
        int n = a.length;
        int range = 10;
        int[] count = new int[range]; // index from 0, 1, 2,..., 9: auto initial 0 for value
        
        // loop each element in array a
        for(int i = 0; i < n; i++ ){
            // count the time appear of a[i]
            count[a[i]]++;
        }
        
        // modify count array ==> to calculate the real index (max index: index start from 1) of each element
        for(int i = 1; i < range; i++){
            count[i] += count[i-1];
        }
        
        // create new temp array to put each element in original array to particular index (by using count array)
        int output[] = new int[n];
        // loop all element in original array a
        
        for(int i = n-1; i >= 0; i--){
            // due to max index: index start from 1 so, we need to minus 1 to suitale with index in real array
            output[count[a[i]] - 1] = a[i];
            count[a[i]]--;
        }
        
        // copy array output to array a
        for(int i = 0; i < n; i++){
            a[i] = output[i];
        }
    }
    
    
    // this countSort is using for radix sort
    // we have number: x = abcde, ==> how to directly get specific digit of this number
    // x % 10 --> the ended digit: (x/10) % 10 --> the ended second digit
    private void countSort(int []a, int exp){
       
        int n = a.length;
        int range = 10;
        int[] count = new int[range]; // index from 0, 1, 2,..., 9: auto initial 0 for value
        
        // loop each element in array a
        for(int i = 0; i < n; i++ ){
            // count the time appear of digits with coresponding exp 
            count[(a[i]/exp)%10]++;
        }
        
        // modify count array ==> to calculate the real index (max index: index start from 1) of each element
        for(int i = 1; i < range; i++){
            count[i] += count[i-1];
        }
        
        // create new temp array to put each element in original array to particular index (by using count array)
        int output[] = new int[n];
        // loop all element in original array a
        // the position is every important: in current array: 
        // if 2 element has digit value equal --> which one appear first --> also appear first in the next array
        // so we need to loop from the end to the first to ensure that position
        for(int i = n-1; i >= 0; i--){
            // due to max index: index start from 1 so, we need to minus 1 to suitale with index in real array
            output[ count[(a[i]/exp)%10] - 1 ] = a[i];
            count[(a[i]/exp)%10]--;
        }
        
        // copy array output to array a
        for(int i = 0; i < n; i++){
            a[i] = output[i];
        }
    }
    // find max element in array 
    private int getMax(int []a){
        int n = a.length;
        int max = a[0];
        for(int i = 1; i < n; i++){
            if(max < a[i]) max = a[i];
        }
        return max;
    }
    
    // radix sort: using counting sort (base on sorting by each digits of value)    
    public void radixSort(int []a){
        int n = a.length;
        int exp = 1; // exp start with 10^0 then increase ten times at each step
        // find the max value in array a to know how many times we need to use countSort base on digits
        int max = getMax(a);
        
//        printArr(a);
        
        // loop util the last digit of the max value in array
        while(max/exp > 0){
            // count sort by specific digits of each element 
            countSort(a, exp);
            
            // increase exp to sort at next digits
            exp*=10;
            
//            printArr(a);
        }
    }
}
