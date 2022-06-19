class Collection {
    constructor(model) {
        this.model = model;
    }
    //this method will create a record in DB
    async createRecord(obj) {
        try {
            
            let newRecord = await this.model.create(obj);
            return newRecord;
        } catch (e) {
            console.error("error in creating a new record in model ", this.model)

        }
    }
    async read(data_id) {
        try {
            let record = null;
            //if we send an id that's mean we are searching about one customer
            if (data_id) {
                
                record = await this.model.findOne({ where: { id: data_id } });
                return record;
            }
            else {
                
                record = await this.model.findAll();
                return record;
            }

        } catch (e) {
            console.error("error in reading record in model ", this.model)
        }

    }
    async updateRecord(id,data) {
        try{
            return this.model.findOne({ where: { id } })
            .then(record => record.update(data));
            }
            catch(error){
                console.error("error while updating  record in ",this.model)
            }

    }

    
    async delete(data_id) {
        if (!data_id) {
            throw new Error('no id provided for model ', this.model)
        }
        try {
            let deleted = await this.model.destroy({ where: { id: data_id } });
            return deleted;
        } catch (e) {
            console.error('error in deleting record in model ', this.model);
        }
    }
}

module.exports = Collection;