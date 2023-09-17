module.exports = (app) => {
    const findAll = () => {
        return app.db("users").select();
    }

    const save = (user) => {
        const res = validation(user);
        if (res) return res;
        
        return app.db("users").insert(user, "*");
    }

    const validation = (user) => {
        if (!user.name) return { error: "Nome é um attr obrigatorio" }

        if (!user.mail) return { error: "Email é um attr obrigatorio" } 
    }

    return { findAll, save }
}