'use strict'
import  allJson from '../data/all.json';
const epsg = allJson
const proj4 = require('proj4')

const leadingEPSG = /^epsg:/i

const customizedTransform = (from: any, to: any) => {
	if ('string' !== typeof from) throw new Error('from must be a string')
	from = from.replace(leadingEPSG, '')
	const fromEPSG = epsg[from]
	if (!fromEPSG) throw new Error(from + ' is not a valid EPSG coordinate system')

	if ('string' !== typeof to) throw new Error('to must be a string')
	to = to.replace(leadingEPSG, '')
	const toEPSG = epsg[to]
	if (!toEPSG) throw new Error(to + ' is not a valid EPSG coordinate system')

	return proj4(fromEPSG.proj4, toEPSG.proj4)
}

export default customizedTransform
