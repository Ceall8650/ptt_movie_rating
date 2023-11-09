import orderBy from 'lodash/orderBy';
import SORTING_ORDER from 'enums/SortingOrder';

enum LODASH_SORTING_ORDER {
  ASC = 'asc',
  DESC = 'desc',
}

/**
 * Sort data by key
 *
 * @param {Object[]} dataList - Data list to sort
 * @param {string|string[]} key - Key of data to sort by
 * @param {string|string[]} order - Order of sorting
 * @returns {Object[]} - Sorted data list
 */
export function sortByProperty(
		dataList: Object[],
		key:string|string[],
		order:string|string[]
	): Object[] {
	let innerOrder: LODASH_SORTING_ORDER[] | LODASH_SORTING_ORDER;

	// Lodash uses different values than aria-sort
	if (Array.isArray(order)) {
		innerOrder = order.map(item => (item === SORTING_ORDER.ASC ? LODASH_SORTING_ORDER.ASC : LODASH_SORTING_ORDER.DESC));
	} else {
		innerOrder = order === SORTING_ORDER.ASC ? LODASH_SORTING_ORDER.ASC : LODASH_SORTING_ORDER.DESC;
	}

	return orderBy(
		dataList,

		// Use lowercase to sort strings because uppercase strings have higher priority
		// - without lowercase: ['a', 'B', 'c', 'D'] => ['B', 'D', 'a', 'c']
		// - with lowercase: ['a', 'B', 'c', 'D'] => ['a', 'B', 'c', 'D']
		// https://stackoverflow.com/a/37848098/9826498
		(data: {[item:string]:string}) => {
			if (Array.isArray(key)) {
				return key.map(item => (typeof data[item] === 'string' ? data[item].toLowerCase() : data[item]));
			}

			return typeof data[key] === 'string' ? data[key].toLowerCase() : data[key];
		},
		innerOrder,
	) as Object[];
}

export function getImageUrl(path:string) {
	return `https://image.tmdb.org/t/p/w500${path}`
}
