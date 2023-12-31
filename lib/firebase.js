import { initializeApp, getApp, getApps } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  type: "service_account",
  projectId: "infosphere-7ba6e",
  private_key_id: "9eaa5f84632e08ee07e2de3db9f264cae11404c0",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDAmasglyf1u2EC\nU2hasQQNlDG5jTC+uEnY2HnDWNJVeMdhYQHa79YWOwqw0uJOmdG8hAndBkHPRgZ9\nTD6m7HKJwwM6TDDajn8sMLiwuxMWkbbOFggE2ZFe3SmO9VzuGrFZsHuo9lU9UNBO\n98iwkSSvoMQ0tTaqSiY0ZjjHnRvkhCYrkhU9vAL6Ib+UiFUvsSKqLK2i8Q8lOld2\nU5IZYvOOO/agzwTpCI8LoldYXh5n/G9WI8Sxb0+IBg/MMoq1a7LMl8+wTNxejema\nLbGCrnn4u5JXjTfW4WTc/ZMLxQPd1fomqYUfqEMwwNAvVfJ6te4MFZ4aBamZjTxX\nj2kiZs4BAgMBAAECggEACM6+MaZX8HfaLtYLnqIbsldFktuvD/mzftQfdVx5eekl\nDQH3qMBxBOE8UuvB56BHJBzRqqbfmY/1OgOjldSYRE6DtkXHsib0D9xGheZ4L/8H\n4hLF2Rrt9+2bOetkjYrw804LyaVCLqSkcggIyHJKwDFU56gl0NHFP34xOIepv+Bq\n4GBU+nsMtEcfISNjAswYzkss6Cm+f1a5DxXkyqh+jCZANV4g4oWAp0xDTZHw+eVJ\nODe7p77sTena/2wnOG5Ibn613LnMGD0eMXxwZidbZQMcYa8Gnysx3oq+t5Qx6k9j\nNQdeU23yKX1hOirFIT5NFKYhuHUaMh7oB9p65VYR5QKBgQDluSdWVSviSUVSPXXQ\nvEUgNyE/WtB5sTqe2ytsgbetz59ILZD1gmwfYCuih3xSasnB8ZmNnq3vPWsXE2xT\nbRm/czbYYPu1g1gjCWZYH2lBpnXn5p63c32Q/Pko+RI8gv5GUh3cUEd5q+y5949J\njnOZORJTQtiEv5Ehr91OOttLMwKBgQDWoXcEBznWxpKBTlDGYOB4H4G3+B6l7o5W\nInbT+GyOuP3bf5lvyHfG0F8qMhFUEzauoYhuo9UahK0sYFpc0R4y1ZDFIbuDcnfw\nMsOZvi1Bg9t05rB2HxIUIeh11UovGHJEJwLJzIk5ou9cCzAKji0erEzOa6Y2QgQe\n3HDd2IOh+wKBgQCdoJt+YLjY75/SW3vA+76O6WU13LGaHuLzZ733GVcYu5M26pVB\n8PkR2mJ2hnLm9oF0Q7wyccQ1mbYmwlwdLopxVLQ4auusU/ChMez44KzPsFHNCvCz\nPlrVps+srqM1xEiHpgb5SliRA0hPHrBCL63gYEnTudVp2SzTqaG38SjSAwKBgQDP\nZk2creLdQRtXKjdxyzF9wmxWOsRa8a/HWhxbbqZwMCDW13GMjDn5+2bKXoFSLhLc\nIym0SEpoCqdQx3bqVAULeEYhyBvrxFRT3qoWyafvtBv/1d/U9OdCXxXDr6y037mj\nU9Mk76n28RS9a+4rdQHyruq1WV7O9XIH5FqIdW2VuwKBgCAoMTHapD4PzQTd5z0R\njwamDLWahlZvgBe6JU2WZek6KCPsnGdtsrACca78aYtsimgFMSpgMAKtLOP7vmCi\nwYzKDSwQyn6Z1DVs++8A1N2mvaa3gHccxFqU+xB5KsUp1u/bxK9fd1SSgXDKzEFv\nPWj7pwKmhtblOONNTp1EnPFT\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-4qp9l@infosphere-7ba6e.iam.gserviceaccount.com",
  clientId: "107929017870516529557",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4qp9l%40infosphere-7ba6e.iam.gserviceaccount.com",
};
export const app =
  getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const guidesCollection = collection(db, "guides");
