package main

import (
	"fmt"
	"unicode"
)

func main() {

	// fmt.Println(dp.LongestPalindromicSubstr("babad"))
	// fmt.Println(dp.LongestPalindromicSubstr("cbbaeeabbcbbaeeacb"))
	fmt.Println(rune('a'),  rune('A'))
	fmt.Println(unicode.ToLower(rune('A')))
	fmt.Println(unicode.IsLetter(rune('A')), unicode.IsLetter('B'), unicode.IsDigit('b'), unicode.IsDigit('1'))
}