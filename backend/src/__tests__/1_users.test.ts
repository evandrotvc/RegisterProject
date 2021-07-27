import request from "supertest";
import {app} from '../server';

describe("Test the root path", () => {
    test("It should response the GET method", done => {
      request(app)
        .get("/")
        .then(response => {
            expect(response.text).toEqual("hello world with Typescript");
            expect(response.statusCode).toEqual(200);

            done();
        })
    });

    it("should can create new user", done => {

        const user = {
            name: 'teste',
            email: 'teste@gmail.com',
            password: '123456'
        }

        request(app)
          .post("/users/")
          .send(user)
          .then(response => {
              expect(response.body).toHaveProperty("email" , "teste@gmail.com");
              expect(response.body).toHaveProperty("name" , "teste");
            
              expect(response.statusCode).toEqual(200);
              done();
          });
      });

    it("should list users storaged", done => {
        request(app)
          .get("/users/list")
          .then(response => {
              expect(response.body).toHaveProperty("users");
              expect(response.statusCode).toEqual(200);
              done();
          });
      });


      it("should can show data user", done => {
        request(app)
          .get("/users/teste@gmail.com")
          .then(response => {
            //   expect(response.body).to("users");
              expect(response.statusCode).toEqual(200);
              done();
          });
      });


      it("should can sign in application", done => {
        const user_credentials = {
            email: 'teste@gmail.com',
            password: '123456'
        }

        request(app)
          .post("/sessions/")
          .send(user_credentials)
          .set('Content-Type', 'application/json')          
          .set('Accept', 'application/json')
          .then(response => {

              expect(response.statusCode).toEqual(200);
              done();
          });
          
      });      

      it("should can delete user", done => {
        request(app)
          .delete("/users/teste@gmail.com")
          .then(response => {
            //   expect(response.body).to("users");
              expect(response.statusCode).toEqual(200);
              done();
          });
      });
  });
