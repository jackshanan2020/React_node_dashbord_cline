import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------
const turnaround = [...Array(24)].map((_, index)=>({
	id:faker.datatype.uuid(),
	date:faker.date.past().toString(),
	depot:sample([
    'APD',
    'Kumasi',
    'Bolga',
    'Buipe',
    'Akosombo'

  ]),
	brvNum:faker.datatype.uuid(),
	capacity:sample([
		28000,
		45000,
		75000,
		59000
		]),
	entryTime:'04:10',
	exitTime:'05:36',
	turnaroundTime:sample(['02:50','07:00','00:30','00:45']),
	operation:sample(['loading','discharging']),

}))

export default turnaround;