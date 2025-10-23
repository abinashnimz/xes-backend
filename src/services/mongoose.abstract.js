export default DOCUMENT_MODEL => ({
	create: data => new Promise(
		(resolve, reject) => DOCUMENT_MODEL.create(data, (err, data) => err ? reject(err) : resolve(data))
	),
	findOne: (criteria, project) => new Promise(
		(resolve, reject) => DOCUMENT_MODEL.findOne(criteria, project).lean().exec(
			(err, data) => err ? reject(err) : resolve(data)
		)
	),
	findAll: (criteria, project, sort, skip, limit) => new Promise(
		(resolve, reject) => DOCUMENT_MODEL.find(criteria, project, { sort, skip, limit}).lean().exec(
			(err, data) => err ? reject(err) : resolve(data)
		)
	),
	updateOne: (criteria, data) => new Promise(
		(resolve, reject) => DOCUMENT_MODEL.findByIdAndUpdate(criteria, data, { returnDocument: 'after' }).lean().exec(
			(err, data) => err ? reject(err) : resolve(data)
		)
	),
	deleteOne: (id) => new Promise(
		(resolve, reject) => DOCUMENT_MODEL.findByIdAndDelete(id, (err, data) => err ? reject(err) : resolve(data))
	),
	count: () => new Promise(
		(resolve, reject) => DOCUMENT_MODEL.estimatedDocumentCount((err, data) => err ? reject(err) : resolve(data))
	),
	countDocuments: criteria => new Promise(
		(resolve, reject) => DOCUMENT_MODEL.countDocuments(criteria).exec(
			(err, data) => err ? reject(err) : resolve(data)
		)
	)
})