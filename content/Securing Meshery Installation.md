+++
title = "Securing Meshery Installation: The best practices"
description = "We are delighted that you are loving Meshery, so it is our sole responsibility to make sure that you are in safe hands. The below few lines will describe how can you harden your security for accessing meshery so that you make eventually keep all your infrastructure sharing the same network are safe."
date = 2024-04-30
[taxonomies] 
tags = ["kubernetes", "Linux"]
+++

We are delighted that you are loving Meshery, so it is our sole responsibility to make sure that you are in safe hands. The below few lines will describe how can you harden your security for accessing meshery so that you make eventually keep all your infrastructure sharing the same network are safe.

There are 2 scenario that people use meshery :

A standalone installation (May be in a VM)

A deployment in a Kubernetes cluster.

In general, each of the above installation method would need an IP (public/private IP) for you to access the meshery UI.

To Ensure you are securely accessing meshery below are the few point you should keep in mind.

Best Practices:

It is perfectly fine to expose public endpoint / ip to evaluate Meshey provided the meshery is installed in a isolated environment (do not connect to any of the infra object in your landscape)

If you are installing Meshery in a standalone VM which share the same network of your other infrastructure object, we recommend not to Expose public IP. Instead use the VPN solution with a private endpoint to your meshery installation (the virtual machine). It is very easy to use the VPN solution if you are hosting it in any of the cloud platform

Incase you are installing meshery in side a Kubernetes cluster (which is very common), By default Meshery uses the service type as loadBalancer which creates a public ip and exposes the Meshry service to outside cluster.

This default behaviour keeps in mind that you are evaluating Meshery at the moment . Also you acknowledge, you are well aware about the behaviour of kubernetes loadbalancer and its limitations.

But we recommend that you should always use the kubernetes service type clusterIp while installing meshery in a production grade infrastructure. It is doable by overriding values.yml if you are using helm installation method to install Meshery. It can also be done by the command line installation tool.

Now you can make use of portforward or ingress component to expose and access the meshery services. However portforward can be used for meshery evaluation and for short term usage and ingress can be used to expose meshery from a prod/test/dev environment where you have ingress installed.

The above points are considered to be the more safe-way to use meshery in your infrastructure.

You can find the topic how to configure Meshery behind the ingress in this link: https://ls-lrt.com/configuring-meshery-behind-istio-ingress-gateway

you can find this blog here too : https://discuss.layer5.io/t/securing-meshery-installation-the-best-practices/679
