+++
title = "Imposing mandatory http(s) security headers in NGINX ingress in Kubernetes"
description = "Making an application up and running does not qualify as a full-fledged product. It is particularly important to have security measure in the Product. Now in the ever-increasing digital revolution, security flaws are really risk for an organisation as-well as the users. Though we cannot eliminate all the risks, we can always try to address most of them and the important CVEs."
date = 2024-04-30
[taxonomies] 
tags = ["Kubernetes", "Open-Source", "NGINX", "Ingress"]
+++

Making an application up and running does not qualify as a full-fledged product. It is particularly important to have security measure in the Product. Now in the ever-increasing digital revolution, security flaws are really risk for an organisation as-well as the users. Though we cannot eliminate all the risks, we can always try to address most of them and the important CVEs. Earlier days these security considerations (Security headers in this context) are handled by application itself and coded by the developer in the application code but in the micro-service world it is especially important for developers to focus more on business logic rather than all these auxiliary tasks to reduce time to market of the product.

The good news is, now DevOps team can handle few of these features with help of Kubernetes, Iingress Gateways and Service Meshes. In this blog post we will focus on how to impose the mandatory security headers in Kubernetes NGINX ingress controller.
OWASP (Open Web Application Security Project) is a nonprofit foundation that works to improve the security of software, has recommended to below HTTP headers should be present by default.

Important HTTP headers:

Server - this is the first header which we must impose so the Server label should not be displayed in the browser
server: hide
`X-Frame-Options` - to avoid clickjacking attacks, by ensuring that their content is not embedded into other sites
`X-Frame-Options`: DENY or SAMEORIGIN
`X-XSS-Protection` - stops pages from loading when they detect reflected cross-site scripting (XSS) attacks.
`X-XSS-Protection`: 0 or 1
Content-Type - Indicate the original media type of the resource (prior to any content encoding applied for sending).
`Content-Type`: text/html; charset=UTF-8
`X-Content-Type-Options` - Avoid MIME type sniffing
`X-Content-Type-Options`: nosniff
`Strict-Transport-Security` (HSTS) - Enforce browsers that it should only be accessed using HTTPS, instead of using HTTP.

`Strict-Transport-Security`: max-age=< expire-time-in-sec>; includeSubDomains; preload
`Strict-Transport-Security`: max-age=31536000; includeSubDomains; preload
`Content-Security-Policy` (CSP) - mitigate Cross-Site Scripting (XSS) and data injection attacks
`Content-Security-Policy`: default-src 'self' http://example.com
`Cross-Origin-Resource-Policy` - tells the browser blocks no-cors cross-origin/cross-site requests to the given resource
`Cross-Origin-Resource-Policy`: same-site

Now as we understood the mandatory security headers to be imposed to our application, let's see how we can configure from NGINX ingress add the annotation nginx.ingress.kubernetes.io/configuration-snippet: in the ingress manifest file (ingress.yaml )

```
apiVersion: extensions/v1beta1
kind: Ingress
namespace: my-app
metadata:
  name: app-ingress
  annotations:
    nginx.ingress.kubernetes.io/configuration-snippet: |
      more_set_headers "server: hide";
      more_set_headers "Content-Type: text/html; charset=UTF-8";
      more_set_headers "X-Content-Type-Options: nosniff";
      more_set_headers "X-Frame-Options: DENY";
      more_set_headers "X-Xss-Protection: 0";
      more_set_headers "Strict-Transport-Security: max-age=31536000; includeSubDomains; preload";
      more_set_headers "Content-Security-Policy: default-src 'self' http://example.com";
      more_set_headers "Cross-Origin-Resource-Policy: same-site";
spec:
  rules:
  - http:
      paths:
      - path: /testpath
        pathType: Prefix
        backend:
          service:
            name: test
            port:
              number: 80
```

There are also other interesting and useful annotation which you can checkout and I am sure it will enable you to add more features to your application.

Sources:
mdn Docs
NGINX Ingress controller
OWASP Docs
Hope this helps. Stay tuned for More!
