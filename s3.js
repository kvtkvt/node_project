const AWS= require('aws-sdk');
const fs= require('fs');
const id='AKIAIRPZGB7EDSMD33XA';
const secret='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';

const s3=new AWS.S3({
    accessKeyId: id,
    secretAccessKey: secret
});

// const params_bucket = {
//     Bucket: bucketnamehere,
//     CreateBucketConfiguration: {
//         // Set your region here
//         LocationConstraint: "eu-west-1"
//     }
// };

// Create Bucket
// s3.createBucket(params_bucket,(err, data) =>{
//     if (err) console.log(err, err.stack);
//     else console.log('Bucket Created Successfully', data.Location);
// });

// const filecontent= fs.readFileSync('carsales.jpg');

// const params_file_upload={
//     Bucket: 'test-s3-595',
//     Key:'1.jpg',
//     Body : filecontent
// };

// s3.upload(params_file_upload,(err,data)=>{
//         if (err) {
//             throw err;
//         }
//         console.log(`File Uploaded ${data.Location}`);
// });

// list bucket
s3.listBuckets((err,data)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Success",data.Buckets);
    }
});

// list file in a buckt
const param_list={
    Bucket : 'test-s3-595'
}
s3.listObjects(param_list,(err,data)=>{
    if (err) {
        console.log('error',err);
    }
    else{
        console.log(data);
    }
});