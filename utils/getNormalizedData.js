const {normalize, schema} = require("normalizr");

const getNormalizedData = (data) => {
  // Define a schema
  const dataJson = JSON.stringify(data);
  const dataParsed = JSON.parse(dataJson);

  const schemaAll = {
    id: 1,
    mensajes: dataParsed,
  };

  const authorSchema = new schema.Entity("author", undefined, {idAttribute: "email"});
  const mensajeSchema = new schema.Entity(
    "post",
    {author: authorSchema},
    {idAttribute: "_id"}
  );
  const mensajesSchema = new schema.Entity("posts", {messages: [mensajeSchema]});

  const normalizePost = normalize(schemaAll, mensajesSchema);

  //

  return normalizePost;
};

module.exports = getNormalizedData;
