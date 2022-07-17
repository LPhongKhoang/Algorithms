let counter = 0;

function haNoiTower(n, a, b, c) {
	if(n === 1) {
		console.log(`Move disk ${n} from ${a} to ${c}`);
		counter++;
		return;
	}

	haNoiTower(n-1, a, c, b);
	console.log(`Move disk ${n} from ${a} to ${c}`);
	counter++;
	haNoiTower(n-1, b, a, c);

}




function main() {
	const n = 7; // n = 1 (co ban nhat); n = 3 (bai toan mau)
	const a = "A", b = "B", c = "C";
	haNoiTower(n, a, b, c);
	console.log('number of move: ', counter);
}

main();

/*
n = 1 : 1
n = 2 : 3
n = 3 : 7
... 
n = 7 : 127
F(n) = 2F(n-1) + 1 > 2F(n-1)

F(n) > 2^2 F(n-2)
F(n) > 2^3 F(n-3)

F(n) > 2^(n-1) F(1) = 2^(n-1) 

O(2^n)

*/