/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package my_graph;

import java.util.ArrayList;

/**
 *
 * @author Phong Khoang
 */
public class Graph {

    // number of vertices
    int n;
    // Adjacency matrix
    int[][] a;

    // character transform from index to name of vertices (label of vertex)
    // A: 0, B: 1, C: 2,...
    char[] vertex = "ABCDEFGHIJKLM".toCharArray();

    // constructor with data is matrix represent for graph (adjacency matrix)
    public Graph(int[][] b) {
        this.n = b.length;
        this.a = new int[n][n];

        // copy array b to array a
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                this.a[i][j] = b[i][j];
            }
        }
    }

    // visit vertex i
    void visit(int i) {
        System.out.println(this.vertex[i] + ", ");
    }

    // ************************ traverse graph *********************
    void bfs(int i, boolean[] visited) {

        // create data structure to store data MyQueue
        MyQueue m = new MyQueue();
        // put the start vertex of this bfs algorithm
        m.enqueue(i);
        // initial visited for vertex i is true
        visited[i] = true;

        // loop until queue m is empty
        while (!m.isEmpty()) {
            // get and remove the first node is added to the queue
            int k = m.dequeue();
            // visit k
            visit(k);

            // loop all adjacency node with k 
            for (int j = 0; j < this.n; j++) {
                // check if j is adjacency with k and that node is not visited yet
                if (this.a[k][j] > 0 && !visited[j]) {
                    // add to the queue
                    m.enqueue(j);
                    // mark this node is visited
                    visited[j] = true;
                }
            }

        }
    }

    void bfs() {
        // create array store info what is vertex i-th is visited or not
        // java automatically initialize the value for boolean array is false
        boolean[] visited = new boolean[this.n];

        // loop each node to start traverse bfs with that node is start vertex
        //                      (for unconnected graph)
        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                bfs(i, visited);
            }
        }
    }

    void dfs(int i, boolean[] visited) {
        // visit node i-th
        visit(i);
        // remark this node i-th is visited
        visited[i] = true;

        // loop each ajacency nodes of this node i-th
        for (int j = 0; j < n; j++) {
            // check if j is adjacency with i and that node is not visited yet
            if (this.a[i][j] > 0 && !visited[j]) {
                dfs(j, visited);
            }
        }
    }

    void dfs() {
        // create array store info what is vertex i-th is visited or not
        // java automatically initialize the value for boolean array is false
        boolean[] visited = new boolean[this.n];

        // loop each node to start traverse dfs with that node is start vertex
        //                      (for unconnected graph)
        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                dfs(i, visited);
            }
        }
    }

    // ************* path from vertex u to vertex v ********************
    // if dfs path found the path from src --> target (u --> v)
    private boolean found = false;

    private void dfspath(int src, int target, boolean[] visited, int[] trade) {
       
        
        // remark this 
        visited[src] = true;
        if(src == target){
            found = true;
            return;
        }
        
        for (int j = 0; j < n; j++) {
            // check if j is adjacency with src and that node is not visited yet
            if (this.a[src][j] > 0 && !visited[j]) {
                // set trade parent for this j node is src
                trade[j] = src;
                System.out.println("adjacency: " + vertex[j] +", parent: " + vertex[src] + ", found: " + found);
                
//                check if this j is target
//                if (j == target) {
//                    found = true;
//                    return;
//                }
                
                // recursive if not found
                dfspath(j, target, visited, trade);
                
            }
        }
    }

    void path(int src, int target) {
        // create array store info what is vertex i-th is visited or not
        // java automatically initialize the value for boolean array is false
        boolean[] visited = new boolean[this.n];

        // create array that store the parent (previous node) of each vertex
        int[] trade = new int[this.n];
        // initial -1 for every trade[i]
        for (int i = 0; i < n; i++) {
            trade[i] = -1;
        }
        found = false;
        dfspath(src, target, visited, trade);

        if (found) {
            System.out.printf("The path from %c to %c is: \n", vertex[src], vertex[target]);
            tradeBack(src, target, trade);
        } else {
            System.out.printf("Not found path from %c to %c\n", vertex[src], vertex[target]);
        }

//        // print trade 
        System.out.println();
        for(int i = 0; i < n; i++) System.out.print(trade[i] + ", ");
    }

    // function to trade back from node target to node source
    // this function is supported method, only use if has the path from src to target
    private void tradeBack(int src, int target, int[] trade) {
        int node = target;

        while (node != -1) {
            System.out.printf("%c <-- ", vertex[node]);
            node = trade[node];
//            if(node == src){
//                break;
//            }
        }
    }

    // ************ Count and list all vertex in one component connected ************
    private int countCon = 0;

    void connectivity() {
        // create array store info what is vertex i-th is visited or not
        // java automatically initialize the value for boolean array is false
        boolean[] visited = new boolean[this.n];

        // array tp is used to store information 
        // about what component connected that node i belongs to
        int tp[] = new int[this.n];
        // reset countcon = 0 for each time we call this features (method)
        countCon = 0;

        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                countCon++;
                dfsCon(i, tp, visited);
            }
        }

        // output the tp (detail about connected component)
        // (note: 1 <= countCon <= n)
        
        // loop each label of connected component 
        for (int i_con = 1; i_con <= countCon; i_con++) {
            System.out.print("The component " + i_con + "-th is: ");
            // loop all vertex in graph
            for (int x = 0; x < n; x++) {
                // check if this node belongs to connected component i_con
                if (tp[x] == i_con) {
                    System.out.print(vertex[x] + ", ");
                }
            }
            System.out.println();
        }

    }

    private void dfsCon(int i, int[] tp, boolean[] visited) {
        //set which component of node i-th belongs to
        tp[i] = countCon;
        // remark node i-th is visited
        visited[i] = true;

        for (int j = 0; j < n; j++) {
            // check if j is adjacency with src and that node is not visited yet
            if (this.a[i][j] > 0 && !visited[j]) {
                dfsCon(j, tp, visited);
            }

        }
    }
    
    
    // ******************* Euler Cycle ******************************
    /*____ 3 condition: ___
        1. all non-zero nodes has even degree
        2. graph is connected between all non-zero nodes
        3. we consider the undirected graph (multiple graph)
    */
    
    void eulerTour(){
        // create new stack
        MyStack stack = new MyStack();
        // dynamic array to store vertices in euler tour
        ArrayList<Integer> list = new ArrayList<>();
        
        // peek and push arbitrary node into stack
        stack.push(0);
        
        // loop until stack is empty
        while(!stack.isEmpty()){
            int r =  (int) stack.top();
            // check if r is isolated node (deg(r) = 0)
            int i = 0; // i is node
            while(i < this.n && this.a[r][i] == 0) i++;
            
            // if every node is not adjacency of r ==> r is isolate
            if(i == this.n){
                // add r to the result list
                list.add(r);
                // remove r from stack
                stack.pop();
            }else{
                // r is not isolated --> i is first adjacency node (alphabet order)
                // push i to the stack
                stack.push(i);
                // remove edge (r, i)
                this.a[r][i] -= 1;
                this.a[i][r] -= 1;
            }
        }
        
        // output euler cycle
        for(Integer i: list){
            System.out.print(this.vertex[i]);
        }
        System.out.println();
        
        
    }
    
    
    
    // ********** Minimumn Spannign Tre (MST) ***************
    // 1. Prim Algorithm implemenation by myself
    void primAlgo(){
        
    }
}
