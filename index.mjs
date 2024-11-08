import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const dynamodb = new DynamoDBClient({ region: 'ap-southeast-2' });
const TABLE_NAME = 'VisitorCount';
const PRIMARY_KEY = 'id';
const VISITOR_ID = 'visitorCount';

export const handler = async (event) => {
    // console.log("Event:", JSON.stringify(event, null, 2)); // Log the event

    // Determine HTTP method, defaulting to 'GET' if event is empty
    const method = event.httpMethod || event.requestContext?.http?.method || 'GET';
    const isIncrement = method === 'POST';

    try {
        // Retrieve the current visitor count
        const getParams = {
            TableName: TABLE_NAME,
            Key: {
                [PRIMARY_KEY]: VISITOR_ID
            }
        };

        const getCommand = new GetCommand(getParams);
        const result = await dynamodb.send(getCommand);

        // Set initial count value
        let count = 0;
        if (result.Item) {
            count = result.Item.count ? parseInt(result.Item.count) : 0;
        }

        // Only increment if method is POST
        if (isIncrement) {
            count += 1;

            const updateParams = {
                TableName: TABLE_NAME,
                Key: {
                    [PRIMARY_KEY]: VISITOR_ID
                },
                UpdateExpression: "SET #count = :count",
                ExpressionAttributeNames: {
                    "#count": "count"
                },
                ExpressionAttributeValues: {
                    ":count": count
                },
                ReturnValues: "UPDATED_NEW"
            };

            const updateCommand = new UpdateCommand(updateParams);
            await dynamodb.send(updateCommand);
        }

        // Return the current count, updated or not
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ count })
        };
    } catch (error) {
        console.error('Error handling visitor count:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not fetch or update visitor count' })
        };
    }
};
