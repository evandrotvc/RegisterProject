import request from "supertest";
import {app} from '../server';

describe("Test the routes users and sessions", () => {
    let cookie = '';    

    test("It should receive Not Authenticated", done => {
      request(app)
        .get("/")
        .then(response => {
            console.log(response.body);
            
            // expect(response.text).toEqual("hello world with Typescript");
            expect(response.statusCode).toEqual(401);

            done();
        })
    });

    it("should can create new user", done => {

        const user = {
            name: 'teste',
            email: 'teste4@gmail.com',
            password: '123456'
        }

        request(app)
          .post("/users/")
          .send(user)
          .then(response => {
            console.log(response.body);
        
            expect(response.statusCode).toEqual(200);
            done();
          });
      });

      it("should can sign in application", done => {
        const user_credentials = {
            email: 'teste4@gmail.com',
            password: '123456'
        }

        request(app)
          .post("/sessions/")
          .send(user_credentials)
          .set('Content-Type', 'application/json')          
          .set('Accept', 'application/json')
          .then(response => {
            // seta o cookie de autenticação
            cookie = response.headers["set-cookie"].pop().split(";")[0];
            console.log("cookie",cookie);            
              expect(response.statusCode).toEqual(200);
              done();
          });
          
      });

    it("should list users storaged", done => {
        request(app)
          .get("/users/list")
          .set("Cookie", [cookie])
          .then(response => {
              expect(response.body).toHaveProperty("users");
              expect(response.statusCode).toEqual(200);
              done();
          });
      });


      it("should can show data user", done => {
        request(app)
          .get("/users/teste4@gmail.com")
          .set("Cookie", [cookie])
          .then(response => {
            //   expect(response.body).to("users");
              expect(response.statusCode).toEqual(200);
              done();
          });
      });   
      
      it("should can update data user", done => {
          
        const user_data = {
            email: "teste4@gmail.com",
            name: "testefinal",
            cpf: "77777779911",
            pis: "21212454321",
            cep: "42424212421",
            complemento: "norte",
            pais: "Brasil",
            estado: "Distrito federal",
            municipio: "vicente pires",
            numero: "5",
            rua: "rua aguia dourada",
        }
     
        request(app)
          .put("/users/edit")
          .send(user_data)
          .set("Cookie", [cookie])
          .then(response => {
            //   expect(response.body).to("users");
              expect(response.statusCode).toEqual(200);
              done();
          });
        });    

      it("should can delete user", done => {
        request(app)
          .delete("/users/teste4@gmail.com")
          .set("Cookie", [cookie])
          .then(response => {
            //   expect(response.body).to("users");
            console.log(response.body);
              expect(response.statusCode).toEqual(200);
              done();
          });
      });
  });
