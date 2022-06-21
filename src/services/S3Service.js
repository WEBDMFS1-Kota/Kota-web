import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { v4 as uuidv4 } from 'uuid';

let client = null;

function S3Interface() {
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
  const uploadInterface = await S3Interface();

  const fileName = uuidv4();
  const fileKey = `${folderPath}/${fileName}.${file.name.split('.')[1]}`;

  const uploadParams = {
    Bucket: 'kota-s3-prod',
    Key: fileKey,
    Body: file,
  };

  try {
    await uploadInterface.send(new PutObjectCommand(uploadParams));
    return `https://kota-s3-prod.s3.eu-west-3.amazonaws.com/${fileKey}`;
  } catch (err) {
    console.error('There was an error uploading your photo: ', err.message);
    return null;
  }
}

export default uploadImage;
