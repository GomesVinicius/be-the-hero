const request = require('supertest')

const app = require('../../src/app')

const connection = require('../../src/database/connection')

describe('ONG', () => {
    it('should be able to create a new ONG', async () => {
        beforeEach(async () => {
            await connection.migrate.rollback() //Boa prática
            await connection.migrate.latest()
        })

        afterAll(() => {
            connection.destroy()
        })

         const response = await request(app).post('/ongs').send({
            name: "APAD3",
            email: "email@email",
            wpp: "470000000",
            city: "Rio Grande do Sul",
            uf: "SC"
        })
        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
        console.log(response.body)
    })
})