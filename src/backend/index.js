const express = require("express")
const cors = require("cors")
const pool = require("./db")
const crypto = require("crypto")
const app = express()
app.use(express.static("../../public"))
app.use(cors())
app.use(express.json())

// Serve static frontend files first
app.use(express.static("../../public"))

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000 ")
})


// CADASTRAR USUÁRIO
app.post('/cad_usuario', async (req, res) => {

    try {

        const { usuario, email, senha } = req.body

        // criptografar senha
        const senhaHash = crypto
        .createHash("sha256").update(senha).digest("hex")
        

        let sql = `INSERT INTO usuarios (usuario,email,senha) VALUES (?,?,?)`

        let [resultado] = await pool.query(sql, [usuario, email, senhaHash])

        if (resultado.affectedRows == 1) {
            res.json({ resposta: "Cadastro efetuado com sucesso!" })
        } else {
            res.json({ resposta: "Erro ao fazer cadastro" })
        }

    } catch (error) {
        console.log(error)
    }

})


// LISTAR USUÁRIOS
app.get('/listar_usuarios', async (req, res) => {

    try {

        let sql = `SELECT id_usuario, usuario, email FROM usuarios`

        let [usuarios] = await pool.query(sql)

        res.json(usuarios)

    } catch (error) {
        console.log(error)
    }

})


// EDITAR USUÁRIO
app.put('/editar_usuario/:id', async (req, res) => {

    try {

        const { usuario, email, senha } = req.body
        const { id } = req.params

        const senhaHash = crypto
        .createHash("sha256")
        .update(senha)
        .digest("hex")

        let sql = `UPDATE usuarios SET usuario=?, email=?, senha=? WHERE id=?`

        let [resultado] = await pool.query(sql, [usuario, email, senhaHash, id])

        if (resultado.affectedRows == 1) {
            res.json({ resposta: "Usuário atualizado com sucesso!" })
        } else {
            res.json({ resposta: "Erro ao atualizar usuário" })
        }

    } catch (error) {
        console.log(error)
    }

})


// DELETAR USUÁRIO
app.delete('/deletar_usuario/:id', async (req, res) => {

    try {

        const { id } = req.params

        let sql = `DELETE FROM usuarios WHERE id=?`

        let [resultado] = await pool.query(sql, [id])

        if (resultado.affectedRows == 1) {
            res.json({ resposta: "Usuário deletado com sucesso!" })
        } else {
            res.json({ resposta: "Erro ao deletar usuário" })
        }

    } catch (error) {
        console.log(error)
    }

})

