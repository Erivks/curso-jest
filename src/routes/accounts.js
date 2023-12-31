module.exports = (app) => {
    const findAll = async (req, res) => {
        const result = await app.services.account.findAll()
        res.status(200).json(result);
    }

    const create = async (req, res, next) => {
        try {
            const result = await app.services.account.save(req.body);
            console.log("[RESPONSE] Routes::Account->create:", result);
            res.status(201).json(result[0]);
        } catch (error) {
            next(error);
        }
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

    const deleteByID = async (req, res) => {
        const result = await app.services.account.deleteByID(req.params.id);

        console.log("[RESPONSE] Routes::Account->deleteByID:", result);
        res.status(204).json(result);
    }

    return { create, findAll, getByID, updateByID, deleteByID };
}