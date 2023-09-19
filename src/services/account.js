const __ENTITY__ = "accounts";

module.exports = (app) => {
    const findAll = (filter = {}) => {
        return app.db(__ENTITY__).where(filter).select();
    }

    const save = async (account) => {
        // const res = await validation(user);
        // if (res) return res;

        return app.db(__ENTITY__).insert(account, "*");
    }

    const getByID = async (filter) => {
        const account = await findAll(filter);

        if (Array.isArray(account)) return account[0];

        return account;
    }

    const updateByID = async (filter, dataToUpdate) => {
        const result = await app.db(__ENTITY__).where(filter).update(dataToUpdate, "*");
    
        return result[0];
    } 

    const validation = async (user) => {

        // Validações de obrigatoriedade
        if (!user.name) return { error: "Nome é um attr obrigatorio" }
        if (!user.mail) return { error: "Email é um attr obrigatorio" } 
        if (!user.passwd) return { error: "Senha é um attr obrigatorio" }
        
        // Validações de duplicidade
        const userDB = await findAll({ mail: user.mail });
        if (userDB && userDB.length > 0) return { error: "Email ja existe" }
    }

    return { findAll, save, getByID, updateByID }
}