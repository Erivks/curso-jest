const ValidationError = require("../error/ValidationError");

const __ENTITY__ = "users";

module.exports = (app) => {
    const findAll = (filter = {}) => {
        return app.db(__ENTITY__).where(filter).select();
    }

    const save = async (user) => {
        await validation(user);
        return app.db(__ENTITY__).insert(user, "*");
    }

    const validation = async (user) => {

        // Validações de obrigatoriedade
        if (!user.name) throw new ValidationError("Nome é um attr obrigatorio");
        if (!user.mail) throw new ValidationError("Email é um attr obrigatorio"); 
        if (!user.passwd) throw new ValidationError("Senha é um attr obrigatorio");
        
        // Validações de duplicidade
        const userDB = await findAll({ mail: user.mail });
        if (userDB && userDB.length > 0) throw new ValidationError("Email ja existe");
    }

    return { findAll, save }
}