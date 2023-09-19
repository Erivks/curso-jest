module.exports = (app) => {
    const findAll = async (req, res) => {
        const result = await app.services.account.findAll()
        res.status(200).json(result);
    }

    const create = async (req, res) => {
        const result = await app.services.account.save(req.body);

        if (result.error) return res.status(400).json(result);
        
        res.status(201).json(result[0]);
    }

    const getByID = async (req, res) => {
        const result = await app.services.account.getByID({ id: req.params.id });
        
        console.log("[RESPONSE] Routes::Account->getByID:", result);
        res.status(200).json(result);
    }

    const updateByID = async (req, res) => {
        const result = await app.services.account.updateByID({ id: req.params.id }, req.body);
    
        console.log("[RESPONSE] Routes::Account->updateByID:", result);
        res.status(200).json(result);
    }

    return { create, findAll, getByID, updateByID };
}