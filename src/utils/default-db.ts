import {PluginData} from '../types'

export default JSON.stringify({
	"list": {
		"categoriesCount": 2,
		"categories": [
			{
				"id": 1,
				"name": "vegetable",
			},
			{
				"id": 2,
				"name": "fruit",
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
			},
			{
				"id": 2,
				"name": "apple",
				"categoryId": 2,
				"quantity": 3,
				"ticked": false,
			},
			{
				"id": 3,
				"name": "g potatoes",
				"categoryId": 1,
				"quantity": 500,
				"ticked": true,
			},
			{
				"id": 4,
				"name": "bananas",
				"categoryId": 2,
				"quantity": 1000,
				"ticked": false,
			},
			{
				"id": 5,
				"name": "ananas",
				"categoryId": 2,
				"quantity": 10,
				"ticked": false,
			},
			{
				"id": 6,
				"name": "love",
				"categoryId": -1,
				"quantity": 1,
				"ticked": false,
			},
		],
	},
	"settings": {
		"showTicked": true,
		"showCategories": true,
		"showUnticked": true,
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
// }
// } as PluginData)
