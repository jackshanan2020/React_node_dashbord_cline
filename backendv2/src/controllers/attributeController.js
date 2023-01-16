const conn = require('../connection')

exports.fetchAttributes=(req,res)=>{
	//query to get various attribute tables
	const sql = `SELECT * FROM materials; SELECT * FROM colors; SELECT * FROM sizes`;
	conn.query(sql,(error,result)=>{
		if(error)throw error//res.status(500).json({message:'Operation failed'})
		if(result){
			
			const material = result[0]
			const color = result[1]
			const size = result[2]
			return res.status(200).json({ material,color,size });
		}
	})

}
exports.addAttributes=(req,res)=>{

}