import { serve } from "bun";
import { S3Client } from "bun";

// const client = new S3Client({
//   endpoint: process.env.TIGRIS_S3_ENDPOINT || "https://fly.storage.tigris.dev", 
//   region: "auto",
//   bucket:   "homelab",
//     accessKeyId: process.env.TIGRIS_S3_ACCESS_KEY || "tid_BFZXvJqrlzMifnpGIHWdTWfhruOi_eCREMlLJzuOWxyiBaaXBZ",
//     secretAccessKey: process.env.TIGRIS_S3_SECRET_KEY || "tsec_BQvXV_Ag4jszy26u50bDnxL4riOjiaA-fkw-TJs_ZeYo78ypV4qxXa0HAKNux5KFD1Kicb"

// });

//await s3file.write("Hello World!");

const r2 = new S3Client({
    accessKeyId: "606a3cf8c902e174b1cbafffc0d42de0",
    secretAccessKey: "7f3cee115574e3079d6a6ff09b4e332c96f68c9d5cb9fc61bab724ed781579c4",
    bucket: "homelab",
    endpoint: "https://f12249d05845494d385d80253a902b04.r2.cloudflarestorage.com",
  });

  const s3file = r2.file("my-file.txt");
  const hi = await s3file.write("Hello World!");
  console.log('hi', hi);

    // await s3file.write(JSON.stringify({ name: "John", age: 30 }), {
    //     type: "application/json",
    // });

// serve({
//   port: process.env.PORT || 8000,
//   fetch: async (req) => {
//     // Example of returning an object from Tigris S3
//     const url = new URL(req.url);
    //if (url.pathname === "/hello") {

      //return new Response("Uploaded hello.txt to Tigris S3!");
    //}

//     return new Response("Hello from Bun + Cloudflare + Tigris!");
//   },
// });


//cloudflare r2
//backblaze b2 = https://www.backblaze.com/cloud-storage/pricing
//tigris = https://www.tigrisdata.com/docs/pricing/

//https://www.cloudflare.com/developer-platform/products/r2/


const storage_vendors = [
  {
    name: "cloudflare r2",
    url: "https://www.cloudflare.com/developer-platform/products/r2/",
    price: "10GB freer",
    // wlIgTxu5A9exnVxDz3vM-32pl-q0BC2ozjx6lrpO
    accessKeyId: "606a3cf8c902e174b1cbafffc0d42de0",
    secretAccessKey: "7f3cee115574e3079d6a6ff09b4e332c96f68c9d5cb9fc61bab724ed781579c4"
  },
  {
    name: "tigris",
    url: "https://www.tigrisdata.com/docs/pricing/",
    price: "5tb free"
  },
  {
    name: "backblaze b2",
    url: "https://www.backblaze.com/cloud-storage/pricing",
    price: "1TB of storage = $72 a year",
  },
  {
    name: "aws s3",
    url: "https://aws.amazon.com/s3/pricing/",
    price: "1TB of storage = $300 a year",
    
  },
]; 

//azure + gcp = identical pricing to aws

//$5000 on AWS can store 1TBV for 18 years
//or 10TBV for 2 years
// https://github.com/browser-use/browser-use/tree/main/examples
// https://bun.sh/docs/api/s3