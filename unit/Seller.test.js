const mongoose = require("mongoose");
const request = require("supertest");
const { Seller } = require("../models/seller");
const { User } = require("../models/user");

let server;

describe("/api/seller", () => {
  beforeEach(() => {
    server = require("../index");
  });

  afterEach(async () => {
    await Seller.deleteMany({});
    await server.close();
  });

  describe("GET", () => {
    it("should return all famers", async () => {
      try {
        await Seller.insertMany([
          {
            navn: "aaa",
            address: "aaa",
            by: "aaa",
            pno: 7830,
            tlf: "12345678",
            email: "aaa@example.com",
          },
          {
            navn: "bbb",
            address: "bbb",
            by: "bbb",
            pno: 7830,
            tlf: "1234578",
            email: "bbb@example.com",
          },
        ]);
      } catch (err) {
        console.log(err);
      }
      const res = await request(server).get("/api/seller");
      expect(res.statusCode).toBe(200);
      expect(res.body.some((f) => f.navn === "aaa")).toBeTruthy();
    });
  });
});
describe("GET /:id", () => {
  it("should return the famer with given id", async () => {
    const seller = new Seller({
      navn: "aaa",
      address: "aaa",
      by: "aaa",
      pno: 7830,
      tlf: "12345678",
      email: "aaa@example.com",
    });
    await seller.save();
    const res = await request(server).get("/api/seller/" + seller._id);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("navn", seller.navn);
  });
  it("Should return 404 when given an invalid id", async () => {
    const res = await request(server).get("/api/seller/1");
    expect(res.status).toBe(404);
  });
  it("should return 404 when given an invalid id but nonexistent seller id", async () => {
    const res = await request(server).get(
      "/api/seller/" + new mongoose.Types.ObjectId()
    );
    expect(res.status).toBe(404);
  });
});

describe("POST /", () => {
  let token;
  let seller;

  beforeEach(() => {
    token = new User().gernerateAuthToken();
    seller = {
      navn: "mat",
      address: "aaa",
      by: "aaa",
      pno: 7830,
      tlf: "12345678",
      email: "aaa@example.com",
    };
  });
  it("should return 401 if the user is not logged in", async () => {
    token = "";
    const res = await request(server).post("/api/seller").send(seller);
    expect(res.status).toBe(401);
  });
  it("should return 400 if name is les then 3 characters", async () => {
    seller.name = "n";
    const res = await await request(server)
      .post("/api/seller")
      .set("x-auth-token", token)
      .send(seller);
    expect(res.status).toBe(400);
  });
  it("should return 400 if name is more than 255 characters", async () => {
    seller.name = new Array(255).join("a");
    const res = await request(server)
      .post("/api/seller")
      .set("x-auth-token", token)
      .send(seller);
    expect(res.status).toBe(400);
  });

  it("should save and return seller if valid", async () => {
    const res = await request(server)
      .post("/api/seller")
      .set("x-auth-token", token)
      .send(seller);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("navn", seller.navn);
  });
});
