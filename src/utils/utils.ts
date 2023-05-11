
export const toKebabCase = (str: string): string => (
	str.replace(/[A-Z_]/g, letter => `-${letter.toLowerCase()}`)
)

export const capitalise = (str: string): string => (
	str.charAt(0).toUpperCase() + str.slice(1)
)

type cssParams = Record<string, boolean>
type css = (params: cssParams) => string

export const css: css = (params) => {
	return Object
		.entries(params)
		.reduce((acc, [key, value]) => {
			return value === true ? acc.concat(` ${toKebabCase(key)}`) : acc
		}, ``)
		.trim()
}

export const countCharacterInString = (str: string, ch: string): number => {
	let count = 0
	for (let i = 0; i < str.length; i++) {
		if (str[i] === ch) {
			count++
		}
	}
	return count
} 

export const calculateStringCh = (str: string): number => {
	return str.length * 0.9 - (countCharacterInString(str, ' ') * 0.5)
}
