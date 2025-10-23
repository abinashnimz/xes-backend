export default DOCUMENT_MODEL => ({
    create: async (data)=>{
    try{
        return await DOCUMENT_MODEL.create(data);
    }catch(err){
        throw err;
    }},
    findOne: async (criteria, project)=>{
        try{
            return await DOCUMENT_MODEL.findOne(criteria, project).lean().exec();
        }catch(err){
            throw err;
        }
    },
    findAll: async (criteria, project, sort, skip, limit)=>{
        try{
            return await DOCUMENT_MODEL.find(criteria, project, {sort, skip, limit}).lean().exec();
        }catch(err){
            throw err
        }
    },
    updateOne: async (criteria, data)=>{
        try{
            return await DOCUMENT_MODEL.findByIdAndUpdate(criteria, data, {returnDocument: 'after'}).lean().exec();
        }catch(err){
            throw err
        }
    },
    deleteOne: async (id)=>{
        try{
            return await DOCUMENT_MODEL.findByIdAndDelete(id);
        }catch(err){
            throw err
        }
    },
    count: async ()=>{
        try{
            return await DOCUMENT_MODEL.estimatedDocumentCount();
        }catch(err){
            throw err
        }
    },
	countDocuments: async (criteria) =>{
		try{
			return await DOCUMENT_MODEL.countDocuments(criteria).exec();
		}catch(err){
			throw err;
		}
	}
})