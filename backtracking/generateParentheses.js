/**
  111000
  110100
  110010
  101100
  101010
  // every time:
  // num1s >= num0s
  // num1s <= n
 */

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const state = {
    numOpen: 1,
    numClose: 0,
  };

  const res = [];
  const curr = ["("]; // contains '(' and ')'

  myTry(state, n, 2, curr, res);

  return res;
};

function myTry(state, n, k, curr, res) {
  if (k > 2 * n) return;

  //Check can put '('
  if (state.numOpen < n) {
    curr.push("(");
    state.numOpen += 1;
    myTry(state, n, k + 1, curr, res);
    curr.pop();
    state.numOpen -= 1;
  }

  //Check can put ')'
  if (state.numOpen > state.numClose) {
    curr.push(")");
    state.numClose += 1;

    // check build done
    if (k === 2 * n) {
      res.push(curr.join(""));
    } else {
      myTry(state, n, k + 1, curr, res);
    }

    curr.pop();
    state.numClose -= 1;
  }
}

function main() {
  console.log(generateParenthesis(4));
}

main();
