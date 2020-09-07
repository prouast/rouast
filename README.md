# Personal webpage

## Website

Website was built using [Semantic UI](https://fomantic-ui.com).

## Static website hosting

Hosting a static website such as this is quite simple and relatively cheap with Amazon.
I use [S3](https://aws.amazon.com/s3/) for hosting, [CloudFront](https://aws.amazon.com/cloudfront/) as a CDN, and [Route53](https://aws.amazon.com/route53/) for the domain.
A more technical guide can be found [here](https://sbstjn.com/static-hosting-amazon-s3-cloudfront-and-ssl-certificate-manager.html).

1. Register a domain with Amazon Route53

This is pretty straightforward as outlined [here](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-register.html). A hosted zone for the website is automatically created.

2. Create buckets on Amazon S3 and upload your website data

I use two buckets as outlined in [this guide](https://docs.aws.amazon.com/AmazonS3/latest/dev/website-hosting-custom-domain-walkthrough.html#root-domain-walkthrough-before-you-begin), one for the `www` domain and one for the apex domain (redirects to the `www` domain).
Configure one bucket for static website hosting, upload the files, allow public access, and set the bucket policy.
Configure the other bucket for redirect and allow public access.

3. Get a certificate from Amazon Certificate Manager

For secure `HTTPS` access to the website, Amazon offers free `SSL` certificates at [ACM](https://aws.amazon.com/certificate-manager/).

4. Configure Amazon CloudFront

For each bucket, a [policy is set up](https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-serve-static-website/) on CloudFront using the bucket endpoint and previously created certificate.
Set up each with the corresponding bucket endpoint listed in S3.
Select the certificate from ACM.
The type A `DNS` record sets on Route53 have to be updated to reflect the domain names from CloudFront.

5. Making changes to content

If changes are made to content in the S3 bucket, an invalidation should to be created for the corresponding CloudFront distribution, otherwise it could take up to 24 hours for the changes to go live on the internet. 

6. Removing `.html` from URL

If a `.html` appears in the URL when loading the website, [rename the file removing the extension and set the content-type to text/html](https://stackoverflow.com/questions/23463679/s3-static-pages-without-html-extension).

