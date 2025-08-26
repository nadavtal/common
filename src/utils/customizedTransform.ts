'use strict'
import  allJson from '../data/all.json';
console.log('allJson', allJson);
export type EPSGType = {
  [key: string]: {
    code: string;
    kind: string;
    name: string;
    wkt: string | null;
    proj4: string | null; // <-- allow null
    bbox: number[];
    unit: string;
    area: string;
    accuracy: number;
  };
};

const epsg =  allJson as EPSGType
const proj4 = require('proj4')

const leadingEPSG = /^epsg:/i

const customizedTransform = (from: string, to: string) => {
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
