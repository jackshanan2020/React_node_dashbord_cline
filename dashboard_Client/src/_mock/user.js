import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const _USERLIST = [...Array(10)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.findName(),
  userName:faker.name.findName().split(' ')[0],
  status: sample(['active', 'banned']),
  createdAt:faker.date.past(),
  role: sample([
    'Admin',
    'Hr Manager',
    'Accountant'
  ]),
}));

export default _USERLIST;
