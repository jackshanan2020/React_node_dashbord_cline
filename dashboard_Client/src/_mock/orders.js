import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const PRODUCT_NAME=[
  'Nike Air Force 1 NDESTRUKT',
  'Nike Space Hippie 04',
  'Nike Air Zoom Pegasus 37 A.I.R. Chaz Bear',
  'Nike Blazer Low 77 Vintage',
  'Nike ZoomX SuperRep Surge',
  'Zoom Freak 2',
]

//------------------------------------------------------------

const orders = [...Array(6)].map((_, index)=>{
    const setIndex = index + 1;

    return {
        id:faker.datatype.uuid(),
        orderId: `TP-000${faker.datatype.number({ min: 4, max: 99 })}`,
        customer:faker.name.findName(),
        volume:sample([300,29,40,60]),
        createdAt:faker.date.past(),
        status:sample(['paid','canceled','pending']),
        orderList:[
            {
                title:PRODUCT_NAME[0],
                price:sample([100,45,89,20]),
                unit:sample(['Kg','litres','lb']),
                quantity:sample([100,45,89,20]),
            },
            {
                title:PRODUCT_NAME[1],
                price:sample([100,45,89,20]),
                unit:sample(['Kg','litres','lb']),
                quantity:sample([100,45,89,20]),
            },
            {
                title:PRODUCT_NAME[2],
                price:sample([100,45,89,20]),
                unit:sample(['Kg','litres','lb']),
                quantity:sample([100,45,89,20]),
            },

        ],
        orderTotal:sample([3000,2970,4000,160])
    }
});
export default orders;
 