import request from "supertest";
import pool from "../../database/postgres/pool.js";
import UsersTableTestHelper from "../../../../tests/UsersTableTestHelper.js";
import container from "../../container.js";
import createServer from "../createServer.js";

describe("HTTP server", () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  it("should response 404 when request unregistered route", async () => {
    // Arrange
    const app = await createServer({});

    // Action
    const response = await request(app).get("/unregisteredRoute");

    // Assert
    expect(response.status).toEqual(404);
  });

  describe("when GET /", () => {
    it("should return 200 and hello world", async () => {
      // Arrange
      const app = await createServer({});

      // Action
      const response = await request(app).get("/");

      // Assert
      expect(response.status).toEqual(200);
      expect(response.body.data).toEqual("Hello world!");
    });
  });

  // Skenario testing lain ...
});
