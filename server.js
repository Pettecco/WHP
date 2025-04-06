import { fastify } from "fastify";
import Database from "./database.js";

const server = fastify();
const database = new Database();

server.addHook("onReady", async () => {
  await database.connect("mongodb://localhost:27017/WHP");
});

server.post("/calls", async (request, reply) => {
  const { name, location } = request.body;

  try {
    const callData = { name, location, createdAt: new Date() };
    const result = await database.insertCall("whp", callData);

    return reply
      .code(201)
      .send({ message: "Chamado criado com sucesso", result });
  } catch (err) {
    console.error(err);
    return reply.code(500).send({ error: "Erro ao criar chamado" });
  }
});

server.get("/calls", async (request, reply) => {
  try {
    const data = await database.getCalls("whp");
    return reply.code(200).send(data);
  } catch (err) {
    console.error(err);
    return reply.code(500).send({ error: "Erro ao buscar chamados" });
  }
});

server.listen({
  port: 3333,
});
