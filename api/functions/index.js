const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    switch (event.routeKey) {
      case "DELETE /items/{id}":
        await dynamo
          .delete({
            TableName: "concept-items",
            Key: {
              id: event.pathParameters.id,
            },
          })
          .promise();
        body = `Deleted item ${event.pathParameters.id}`;
        break;
      case "GET /items/{id}":
        body = await dynamo
          .get({
            TableName: "concept-items",
            ProjectionExpression:
              "id, displayName, description, parentIds, childIds, alternateName",
            Key: {
              id: event.pathParameters.id,
            },
          })
          .promise();
        break;
      case "GET /items":
        body = await dynamo
          .scan({
            TableName: "concept-items",
            ProjectionExpression:
              "id, displayName, description, parentIds, childIds, alternateName",
          })
          .promise();
        break;
      case "PUT /items":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "concept-items",
            Item: {
              id: requestJSON.id,
              displayName: requestJSON.displayName,
              description: requestJSON.description,
              parentIds: requestJSON.parentIds,
              childIds: requestJSON.childIds,
              alternateName: requestJSON.alternateName,
            },
          })
          .promise();
        body = `Put item ${requestJSON.id}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
