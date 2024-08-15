import {config} from "@/config";
import {S3Client, PutObjectCommand, ObjectCannedACL} from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import QRCode from "qrcode";
export const s3Client = new S3Client({
  endpoint: config.spaceEndpoint,
  region: "sgp1",
  credentials: {
    accessKeyId: config.spaceAccessKeyId,
    secretAccessKey: config.spaceSecretAccessKey,
  },
});

export const assetUpload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "msquarefdc",
    acl: "public-read",
    key: (request, file, cb) => {
      cb(null, `foodie-pos/msquarefdc-batch3/sit-naing-soe/${Date.now()}_${file.originalname}`);
    },
  }),
}).single("file");
