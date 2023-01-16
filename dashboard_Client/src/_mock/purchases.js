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
  'Flo'
]

//------------------------------------------------------------

const purchases = [...Array(6)].map((_, index)=>{
    const setIndex = index + 1;

    return {
        id:faker.datatype.uuid(),
        cover:`/static/mock-images/products/product_${setIndex}.jpg`,
        title:PRODUCT_NAME[index],
        createdAt:faker.datatype.datetime(),
        brand:sample(['Adidas','Umbro','Nike']),
        quantity:sample([300,29,40,60]),
        inStock:sample([400,50,85,52]),
        unitPrice:faker.datatype.number({min:4,max:99,precision:0.01}),
        total:faker.datatype.number({min:4,max:99,precision:0.01}),
        unit:sample(['kg','mg','litre','lb']),
        productCode:faker.datatype.uuid(),
        supplier:faker.company.companyName()
    }
});
export default purchases;