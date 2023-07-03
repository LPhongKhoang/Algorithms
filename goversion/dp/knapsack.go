package dp

import (
	"regexp"
	"strings"
)

func knapsack(weights, values []int, capacity, n int) int {
	// Init dp array
	dp := make([][]int, n + 1)
	for i := range dp {
		dp[i] = make([]int, capacity + 1)
	}

	// Fill dp array
	for i := 1; i <= n; i++ {
		// get item's weight and value
		itemWeight, itemValue := weights[i-1], values[i-1]

		for w := 1; w <= capacity; w++ {
			// If current item's weight is more than the capacity, then this item cannot be included in the optimal solution
			if itemWeight <= w {
				dp[i][w] = max(itemValue + dp[i-1][w-itemWeight], dp[i-1][w])
			} else {
				dp[i][w] = dp[i-1][w]
			}

		}
	}

	return dp[n][capacity]
}

func isValidPalindrome(s string) bool {
	// convert to lowercase
	s = strings.ToLower(s)
	
	// Use regex to remove all non-alphanumeric characters
	regex := regexp.MustCompile("[^a-z0-9]")
	s = regex.ReplaceAllString(s, "")



	i, j := 0, len(s) - 1
	for i < j {
		if s[i] != s[j] {
			return false
		}

		i++
		j--
	}

	return true
}