+++
title = "Which service to Use Azure Kubernetes Services or Azure App service (A curated topic)"
description = "Getting started with Azure App-service is quite easy and a best place to start with.  configuration through Azure dashboard with few click is the most liked feature of this Azure service. But when we talk about a production grade application and an infrastructure for the same , App service lacks in various perspective. This article highlights all the pros and cons of using App-service for a application hosting and Azure Kubernetes with facts."
date = 2024-04-12
[taxonomies] 
tags = ["CyberSecurity", "vendor-lockin"]
+++

Following aspects are taken in to account in this article:

    • Deployment and Administration
    • Cost analysis
    • Value addition
    
Deployment and administration:

Deploying with the AKS is encapsulated still distributed. Which means all the workload stay inside the cluster and also the work space has a very fine grain separation with Namespaces. So In case of any issues related to workload it is quite easier to spot the bug because the issues lies in the same enclosed areas. However if we deploy in the app services , which is a black box for the developer or end user. Spotting of issue only lies on the logs that we obtain form the log stream which is time taking and tedious .  Some times log streams takes time to show the logs. and Sometime it does not show logs.  In the same line, if we deployment our Work load with AKS, we can have a upper-hand control of what we want to do in the system, With the help of open-source monitoring tool stack with (prometheus, loki and grafana) , we now have the each and every-log streamed our dash board for the near real time visualization (refresh rate 10s max). And also we can customize our metrics based on our requirement which is not doable by the azure metrics service.

The compute resource perspective:
App services essentially runs on app service plan. In the current scenario, The Maximum spec for the premium app service i,e  lets say P2V2  you will get max of 4 core and the cost is too high, will be discussing the cost part in the cost section. However, if you consider the price of P2V2  with V4 cpu you can build a very powerful AKS cluster which will perform better.
Deployment and CI/CD :
The Deployment of the Kubernetes work loads are more controlled, It allows out-of-the-box deployment strategy (rolling update) to ensure there is zero-downtime. However this feature is there in The App service but that seems not to be that effective than  AKS.
Workload management in the AKS cluster (any Kubernetes cluster) is a beauty of migrating to Kubernetes. its brings better and fine-grained  auto scaling , POD lifecycle-management ,out of the box load-balancing capacity and more abstracted way to deploy your application and internal micro-service networking. You can even secure your AKS application in the way you want but few flexibility are restricted in app service.
To summarize, Management of the Azure workload are more effort less than the app services. More customization can be done to get most out of K8s cluster but limited in App service. You can not integrate different type of services with App service, in the other-hand most of the today's services and workload are K8s compatible. Service-mesh, which provide a lots of functionality in today’s infrastructure word and mandatory to have in your infrastructure to address a lot of infrastructure common best practices are compatible with K8s but no with App services. When we tall about powerful  monitoring and logging system (Prometheus, loki, Grafana ) are pluggable or can be integrated seamlessly with K8s but it is bit tedious to integrate the monitoring stack with App Services. Form my point of view App services are not design for mid range Production grade Application however it is recommended to develop and test something in App-service for short term.
Cost analysis:
In App service , all the app services shares the same app service plan , which means they consume the resources defined in an app service plan. Think of a situation where you have increased no of app services that are not more accommodated in the existing app service plan, you may end of buying more app service plan which is a very costly option. In the same time you Kubernetes cluster can have a lot more capacity to deploy micro services in much much lesser price and you can even reduce this price lesser with better planning and opting for reserved instances like 1 year or 3 year Reserved instance which will reduce the cost to 60%
Below section elaborates the costing for AKS as well as App Service with Example:
AKS Costing for various buying option:
AKS is most cost effective as it does not charge on the Cluster management. It only charges for the node you use and the storage you use. Nodes are the basically VMs, One or more node combines together to create a VM scale set which in AKS term called as NodePool . You can always have a option to save money by choosing reserved instances which will save up to 60% cost.



For more info on VM price please visit to https://azure.microsoft.com/en-in/pricing/details/virtual-machines/linux/

App Services Buying option:
you can relate App Services to the ready made VM which has a common pool of compute resources. All the VM consumes the resource from a app service plan. For example if there is app service plan with  2 V cpu and 5 GB ram , and your are running 2 app services. If one app service is using 1.5 core of cpu and another workload now want to run and it needs at-least 1 core cpU then then the app can not work. in this case you have to by a new app-service plan. Autoscaling option is also not that effective as auto scaling effects on the app-service. So once you auto scale all the App-service will again start consuming which not a controlled way of resource management. Imp: Please not that there is no way you can reduce cost on App service as there is no concept of reserved resources like AKS.


For more info on App Service pricing visit to https://azure.microsoft.com/en-in/pricing/details/app-service/linux/

Value Addition:

There are a lot of value addition when you use Kubernetes.
    • Be proud that you are using proven and test infrastructure architecture  used by the global Companies.
    • You will get a lot of Open source utility tool to work with Kubernetes cluster which will help to administrate the cluster  better, also increase your productivity and keeping your cluster healthy.
    • Fantastic community support , so that you wont feel left out .
    • Better management of your workload and its supporting component
    • You can drill down to the very details of your workload component to investigate . Nothing is Black-box
    • You can create your Custom controller for your specific need with is a feature from K8s.
As per the above analysis we can conclude that App service are good to start with but not ideal for real/ production workload and limited in various features. So moving to AKS/Kubernetes based workload deployment is more effective and smartest way to deliver superior product experience to end users.
Now Let's do your Bit:
    • As this is mentioned is a curated topic, I would encourage all the reader to add as many information here, so that it could be one stop information for the people.
    • Please comment if anything wrong and anything can be improved
    • Do let me know what you want me write next.
Hope this Help !!!
