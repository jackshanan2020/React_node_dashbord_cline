import {useState} from 'react';
import PropTypes from 'prop-types';
import {sentenceCase} from 'change-case';
//	mui
import {
	Box,
	Typography,
	Stack,
	Paper,
	styled,
	IconButton,
	Table,
	TableRow,
  	TableBody,
  	TableCell,
  	TableHead
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Close';
import {fCurrency} from '../../../utils/formatNumber';
import {discountCalculator} from '../../../utils/discountCalculator';

//	components
import Label from '../../../components/Label';
// table head
const TABLE_HEAD =[
	 { id: 'name', label: 'Name', alignRight: false },
	 { id: 'price', label: 'Price', alignRight: false },
	 { id: 'quantity', label: 'Quantity', alignRight: false },
	 { id: 'unit', label: 'Unit', alignRight: false },
	 { id: 'discount', label: 'Discount', alignRight: false },
	 { id: 'subTotal', label: 'Total', alignRight: false },
]	

const OrderPaper= styled(Paper)({
	width:'47rem',
	padding:'1.5rem',
	margin:'auto',
	marginTop:'2rem',
	minHeight:'70vh'
})

OrderViewPane.propTypes={
	order: PropTypes.object.isRequired
};


export default function OrderViewPane({order,close}){
	
	const {orderId,createdAt,status,firstName,lastName} = order;
	
	console.log(JSON.parse(order.items));

	const parseJSON=()=>{return JSON.parse(order.items)};

	const tot = JSON.parse(order.items).map((c) => c.cartItemQty * discountCalculator(c.discount,c.price));
	
    const calculateGrandTotal = () => {
     let tmp = 0;
     tot.map((t)=> {
      	tmp +=t;
      	 return tmp
      })
      /* for (let i = 0; i < tot.length; i+1) {
        tmp += tot[i];
        console.log(tmp)
      } */
    console.log(tmp)
      return tmp;
    };

	console.log(tot,order)

	return(
			<OrderPaper square>
				<Box>
					<IconButton style={{float:'right'}} onClick={close}><CancelIcon/></IconButton>
					<Stack>
						<Typography variant="h4">Order #{orderId}</Typography>
					</Stack>

				    <Box sx={{marginTop:'3rem'}}>
				        <Typography variant="h5" noWrap>
                              {sentenceCase(firstName)} {sentenceCase(lastName)}
                        </Typography>
                        <br/>
                        <Label variant="filled" color={(status==='pending'&&'info')||(status==='canceled'&&'error')||(status==='paid'&&'success')||'default'}>
									{sentenceCase(status)}
					    </Label>
						<Table>
                          <TableHead>
                          <TableRow>
                          	<TableCell>Product</TableCell>
                          	<TableCell>Price</TableCell>
                          	<TableCell>Qty.</TableCell>
                          	<TableCell>Unit</TableCell>
                            <TableCell>Discount %</TableCell>
                          	<TableCell>Sub Total ($)</TableCell>
                          </TableRow>

                          </TableHead>

							{
								(parseJSON()||[]).map((item,index)=>{
									const {
										cartId,
										cartItemQty,
										coverImage,
										discount,
										name,
										price,
										slug,
										unit
									} = item;
									return (
										<TableRow key={index}>
											<TableCell>{name}</TableCell>
											<TableCell>$ {price}</TableCell>
											<TableCell>{cartItemQty}</TableCell>
											<TableCell>{unit}</TableCell>
											<TableCell>{discount}</TableCell>
											<TableCell><strike>{fCurrency(price*cartItemQty)}</strike> {fCurrency(discountCalculator(discount,price))} </TableCell>
										</TableRow>
										)
								})
							}

						<TableRow sx={{width:'100%'}}>
							<TableCell align='right' sx={{mt:5}}>
								<Box sx={{mt:5}}>
									<Typography variant='h5'>Total ${fCurrency(calculateGrandTotal())}</Typography>
								</Box>
							</TableCell>
							
						</TableRow>				
						</Table>
					</Box>
				</Box>
			</OrderPaper>
		)
}