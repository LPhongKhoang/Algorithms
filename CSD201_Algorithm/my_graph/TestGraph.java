
package my_graph;

/** ============= GRAPH =====================
 * 1. Graph definition: G is a pair of (V, E)
 *  + V is collection of nodes (call vertices)
 *  + E is collection of pair of 2 vertices in V (call edges)
 * 
 * 2. Type of graph
 *  + undirected graph: undigraph
 *  + directed graph: digraph
 *  + weighted graph:
 *
 * @author Phong Khoang
 */


public class TestGraph {
    
    public static void main(String[] args) {
//                      // a, b, c, d, e, f, g, h, i
//        int[][] b =    {{0, 1, 1, 1, 0, 0, 0, 0, 0}, // a _0
//                        {1, 0, 1, 1, 0, 0, 0, 0, 0}, // b _1
//                        {1, 1, 0, 1, 0, 0, 0, 0, 0}, // c _2
//                        {1, 1, 1, 0, 0, 1, 0, 0, 0}, // d _3
//                        {0, 0, 0, 0, 0, 1, 0, 0, 0}, // e _4
//                        {0, 0, 0, 1, 1, 0, 0, 0, 0}, // f _5
//                        {0, 0, 0, 0, 0, 0, 0, 1, 1}, // g _6
//                        {0, 0, 0, 0, 0, 0, 1, 0, 0}, // h _7
//                        {0, 0, 0, 0, 0, 0, 1, 0, 0}}; // i _8
//        
//        
//        Graph g = new Graph(b);
////        g.dfs();  ==> A, B, C, D, F, E, G, H, I
//        
//        // find the path from start to target
//        int start = 0; // A
//        int target = 3; // D
//        
//        g.path(start, target);
//        
////        g.connectivity();
            
        // *************  Test Euler Tour *************
        int[][] b = {
          // 1, 2, 3, 4, 5, 6
            {0, 1, 1, 0, 0, 0}, // 1
            {1, 0, 1, 0, 0, 0}, // 2
            {1, 1, 0, 1, 1, 0}, // 3
            {0, 0, 1, 0, 0, 1}, // 4
            {0, 0, 1, 0, 0, 1}, // 5
            {0, 0, 0, 1, 1, 0} // 6
        };
        
        
        Graph g = new Graph(b);
        g.eulerTour();
        
    }
    
}
