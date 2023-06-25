package dp

func LongestPalindromicSubstr(s string) string {
	if len(s) == 0 {
		return ""
	}

	var (
		dp = make([][]bool, len(s))
		maxLen = 1
		start = 0
	)

	for i := range dp {
		dp[i] = make([]bool, len(s))
		dp[i][i] = true
	}

	for i := 0; i < len(s) - 1; i++ {
		if s[i] == s[i + 1] {
			dp[i][i + 1] = true
			maxLen = 2
			start = i
		}
	}

	for l := 3; l <= len(s); l++ {
		for i := 0; i < len(s) - l + 1; i++ {
			j := i + l - 1
			if s[i] == s[j] && dp[i + 1][j - 1] {
				dp[i][j] = true
				if l > maxLen {
					maxLen = l
					start = i
				}
			}
		}
	}

	return s[start:start + maxLen]
}