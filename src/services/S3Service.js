import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { v4 as uuidv4 } from 'uuid';

let client = null;

async function S3Interface() {
  if (!client) {
    const region = 'eu-west-3';
    client = new S3Client({
      region,
      credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region }),
        identityPoolId: 'eu-west-3:141666ba-d6a2-4760-812a-f1d68c8ca26e', // IDENTITY_POOL_ID
      }),
    });
  }
  return client;
}

async function uploadImage(folderPath, file) {
  const uploadInterface = S3Interface();

  const fileName = uuidv4();
  const fileKey = `${folderPath}/${fileName}`;

  const uploadParams = {
    Bucket: folderPath,
    Key: fileKey,
    Body: file,
  };

  try {
    await uploadInterface.send(new PutObjectCommand(uploadParams));
    return true;
  } catch (err) {
    console.error('There was an error uploading your photo: ', err.message);
    return false;
  }
}

export default uploadImage();
