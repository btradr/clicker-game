export const randomHelper = (factor: number = 1): number => {
	return Math.round(Math.random() * factor);
};

export const timeCheckerHelper = (time: number): boolean => {
	return time > 0.1;
};

export const secondsMultiplierHelper = (time: number): number => {
	return time * 1000;
};

export const checkQuantityHelper = (array: number[], quantity: number): boolean => {
	return array.length === quantity;
}
