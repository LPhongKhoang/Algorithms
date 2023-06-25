interface WebNotification {
	type: string;
	deviceId?: string;
	send(message: string, from: string, to: string): void;
}

class OrderNotification implements WebNotification {
	type: string = 'order';
	deviceId?: string | undefined;
	send(message: string, from: string, to: string): void {
		console.log(`From: ${from} -> To: ${to} - ${message}`);
	}
}

class BaseRepo {
	create() {
		console.log('BaseRepo: creating');
	}
	list(filters: string) {
		console.log('BaseRepo: list with filters', filters);
		return 1;
	}
}

class ProductRepo extends BaseRepo {
	list(filters: string): number {
		super.list(filters);
		console.log('ProductRepo: list with filters', filters);
		return 2;
	}
	
	create(data: string): void {
		
	}

	updateQuantity(id: string, quantity: number) {
		console.log('ProductRep: update quantity', id, quantity);
	}
}

const productRepo = new ProductRepo();
productRepo.list('name: "long vu"');
productRepo.updateQuantity('11', 2);

const b: BaseRepo = productRepo; // b always access .list method