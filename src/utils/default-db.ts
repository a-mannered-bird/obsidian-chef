import {PluginData} from '../types'

export default JSON.stringify({
	"list": {
		"categoriesCount": 3,
		"categories": [
			{
				"id": 1,
				"name": "vegetable",
				"isFolded": false,
				"order": 1,
			},
			{
				"id": 2,
				"name": "fruit",
				"isFolded": false,
				"order": 2,
			},
			{
				"id": 3,
				"name": "tools",
				"isFolded": false,
				"order": 3,
			},
		],
		"itemsCount": 6,
		"items": [
			{
				"id": 1,
				"name": "avocado",
				"categoryId": 1,
				"quantity": 1,
				"ticked": false,
				"order": 1,
			},
			{
				"id": 2,
				"name": "apple",
				"categoryId": 2,
				"quantity": 3,
				"ticked": false,
				"order": 2,
			},
			{
				"id": 3,
				"name": "g potatoes",
				"categoryId": 1,
				"quantity": 500,
				"ticked": true,
				"order": 3,
			},
			{
				"id": 4,
				"name": "bananas",
				"categoryId": 2,
				"quantity": 1000,
				"ticked": false,
				"order": 4,
			},
			{
				"id": 5,
				"name": "ananas",
				"categoryId": 2,
				"quantity": 10,
				"ticked": false,
				"order": 5,
			},
			{
				"id": 6,
				"name": "love",
				"categoryId": -1,
				"quantity": 1,
				"ticked": false,
				"order": 6,
			},
		],
	},
	"settings": {
		"showTicked": true,
		"showCategories": true,
		"showUnticked": true,
		"sortAlphabetically": false,
		"sortByTickedItem": true,
	}
} as PluginData)

// TODO: Uncomment when app is ready
// export default JSON.stringify({
// 	"list": {
// 		"categoriesCount": 0,
// 		"categories": [],
// 		"itemsCount": 0,
// 		"items": [],
// 	},
// "settings": {
// 	"showTicked": true,
// 	"showCategories": true,
// 	"showUnticked": true,
//  "sortAlphabetically": false,
//  "sortByTickedItem": true,
// }
// } as PluginData)
