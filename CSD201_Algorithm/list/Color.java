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
public class Color {
    String name;
    int value;

    public Color() {
    }

    public Color(String name, int value) {
        this.name = name;
        this.value = value;
    }

    @Override
    public String toString() {
        return this.name + " " + this.value;
    }
    
    
}
