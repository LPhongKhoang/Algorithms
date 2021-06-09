/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package my_graph;

/**
 *
 * @author Phong Khoang
 */
public class MyDijkstra {
    // no. of vertices
    int n;
    // weighted matrix
    int[][] a;
    
    // label of each vertex (index -> label)
    char[] vertex = "ABCDEFGHIJKLM".toCharArray();
    // INF
    static int INF = Integer.MAX_VALUE;
    
    
    // constructor 
    public MyDijkstra(int[][] b){
        this.n = b.length;
        this.a = new int[n][n];
        // copy weighted graph b to this.a matrix
        for(int i = 0; i < this.n; i++){
            for(int j = 0; j < this.n; j++){
                this.a[i][j] = b[i][j];
            }
        }
    }
    
    // ********** Shortest Path *********** Dijkstra Algorithm **************
    
    // find the shortest path from src to all rest of others (here just to target node)
    void dijkstra_ShortestPath(int src, int target){
        // we need to buil weighted graph to manipulate
        
        
        // 1. array int dist[this.n] is a shortest path (update continuously) from Start to node i-th (index of array)
        // 2. array int parent[this.n] is a previous parent of node i-th 
        //      that leads to node i-th is lowest cost(index of array)
        // 3. array boolean choose[this.n] uses to answer question: 
        //      is node i-th chosen as minimum node at each step ? (true/false)
        int dist[] = new int[this.n];
        int parent[] = new int[this.n]; 
        boolean choose[] = new boolean[this.n]; // default initial is false
        // initial for dist, parent for each node is MAX_INT (infinite), itself;
        for(int i = 0; i < this.n; i++){
            dist[i] = Integer.MAX_VALUE;
            parent[i] = i;
        }
        
        // initial for node src
        dist[src] = 0; 
        
        
        // check if src and target belong to 2 component connected
        boolean hasPath = true;
        
        int curr = find_minimum(dist, choose);
        while(curr != target){
            // mark this node is chosen
            choose[curr] = true;
            
            // loop all adjacency nodes of curr node
            for(int i = 0; i < this.n ;i++){
                // check if node i-th is adjacency that not chosen
                if(i != curr && this.a[curr][i] < INF && !choose[i]){
                    // check for update dist of node i-th 
                    if(dist[curr] + this.a[curr][i] < dist[i]){
                        dist[i] = dist[curr] + this.a[curr][i];
                        parent[i] = curr;
                    }
                }
            }
            
            curr = find_minimum(dist, choose);
            // check if not find curr (because src and target belongs 2 component connected)
            if(curr == -1){
                hasPath = false;
                break;
            }
        }
        
        if(hasPath){
            System.out.printf("The shortest path from %c to %c has dist is: %d\n", vertex[src], vertex[target], dist[target]);
            printPath2(src, target, parent);
            System.out.println();
            printPath3(src, target, parent, dist);
            System.out.println();
        }else{
            System.out.printf("No path from %c to %c\n", vertex[src], vertex[target]);
        }
        
        
    }
    // find minimum of node's dist in each step
    private int find_minimum(int []dist, boolean []choose){
        // loop all node 
        int k = -1, min = INF;
        for(int i = 0; i < this.n; i++ ){
            // check if node i-th is not chosen and min > dist[i]
            if(!choose[i] && min > dist[i]){
                k = i;
                min = dist[i];
            }
        }
        return k;
    }
    private void printPath1(int src, int target, int[] parent){
        if(target == src){
            System.out.print(vertex[src]);
            return;
        }
        printPath1(src, parent[target], parent);
        System.out.print(vertex[target]);
    }
    // print has weighted of edges
    private void printPath2(int src, int target, int[] parent){
        if(target == src){
            System.out.print(vertex[src]);
            return;
        }
        printPath2(src, parent[target], parent);
        System.out.printf(" -%d-> %c", this.a[parent[target]][target], vertex[target]);
    }
    // print has dist of each edge
    private void printPath3(int src, int target, int[] parent, int []dist){
        if(target == src){
            System.out.print(vertex[src]);
            return;
        }
        printPath3(src, parent[target], parent, dist);
        System.out.printf(" --> %c(%d)", vertex[target], dist[target]);
    }
    
    
    
    
    public static void main(String[] args) {
        //graph       a, b, c, d, e, f  
        int[][] b = {{0, 7, 9, INF, 16, INF}, // a
                     {7, 0, 12, 17, INF, INF}, // b
                     {9, 12, 0, 13, 2, INF}, // c
                     {INF, 17, 13, 0, INF, 6}, // d
                     {16, INF, 2, INF, 0, 9}, // e
                     {INF, INF, INF, 6, 9, 0} // f
                    };
        // object MyDijkstra for handling this (find shortest path)
        MyDijkstra md = new MyDijkstra(b);
        
        // find shortest path from A (0-index) to others
        md.dijkstra_ShortestPath(0, 5);
    }
    
}
