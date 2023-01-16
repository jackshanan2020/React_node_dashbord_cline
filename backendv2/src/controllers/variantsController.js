const conn = require('../connection');
const url = process.env.PUBLIC_URL;


exports.addVariant=(req,res)=>{

	const sql = `INSERT INTO product_variant (product_id,variant_price,variant_description,variant_thumbnail,variant_sku,variant_attribute_id,variant_option,variant_attribute_name) VALUES ?`
	const {
		product_id,
		variant_price,
		variant_description,
		variant_thumbnail,
		variant_sku,
		variant_attribute_id,
		variant_option,
		variant_attribute_name
	}=req.body;
	
	const variants = req.body.variants?JSON.parse(req.body.variants):[]
	////console.log(req.body,variants,req.files,req.files.length,variants.length);
	//check original filenames against uploaded ones to find index

	let bulk_insert =[];
	if(variants&&variants.length > 0){
		if(req.files&&req.files.length >0){

			for (var i = 0; i < variants.length; i++) {
				for (var j = 0; j < req.files.length; j++) {
					
					if(variants[i].originalfilename===req.files[j].originalname){
						variants[i]['variant_thumbnail']=`${url}${req.files[j].filename}`
					}
				}
			}


		}
//console.log(variants)

	conn.query(sql,[variants.map((variant)=>[variant.product_id,variant.variant_price,variant.variant_description,variant.variant_thumbnail,variant.variant_sku,variant.variant_attribute_id,variant.variant_option,variant.variant_attribute_name])],(error,result)=>{
		if(error) throw error//res.status(500).json({message:'Operation failed'})
		if(result){
			res.status(200).json({data:result});
		}	
	})
}else{
	res.status(403).json({message:'Operation disallowed, please add product variants'})
}
	}
 
 exports.fetchProductVariants=(req,res)=>{
 	
 	const sql = `SELECT * FROM product_variant WHERE product_id = '${req.params.id}';SELECT * FROM materials;SELECT * FROM colors;SELECT * FROM sizes`
 	conn.query(sql,(error,result)=>{
 		if(error) throw error//res.status(500).json({message:'Operation failed'})
 		if(result){
 			
 			const v=result[0]
 			const material=result[1]
 			const  color =result[2]
 			const size = result[3]
 			const attributes ={material,color,size}
 			//reconstruct data structure
 			for (var i = 0; i <v.length;i++ ) {
 				//check variant type
 				for(let j=0;j<attributes[v[i].variant_attribute_name].length;j++){
 					////console.log(attributes[v[i].variant_attribute_name][j].name,v[i].variant_attribute_name,j,i)
					 if(attributes[v[i].variant_attribute_name][j].name===v[i].variant_option){
						////console.log(attributes[v[i].variant_attribute_name][j].name,'✨✨✨',j,i);
						//then push details to object
						v[i]['variant_detail']=attributes[v[i].variant_attribute_name][j]

					 }
					 //attributes[v[i].variant_attribute_name][j]
 				}
 				//if variant attribute id matches 

 			}
 			res.status(200).json({variants:v})
 		}
 	})
 }