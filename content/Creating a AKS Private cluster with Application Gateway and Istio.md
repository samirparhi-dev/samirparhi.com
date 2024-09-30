+++
title = "Creating An Aks Private cluster with Istio and Application Gateway"
description = "Security has been a very key consideration in modern application architecture. When we talk about cloud-native application architecture, people tend to think about security a lot. That is why all the cloud providers have a bunch of features to make your application more secure and robust. For example, Azure provides various gateways like Network security groups, Application gateway, Azure front-door. These azure services provide a secure connection either by introducing a firewall or validating SSL.certificates."
date = 2024-07-04
[taxonomies] 
tags = ["Meshery", "Open -Source", "Kubernetes", "Istio" ]
+++

Security has been a very key consideration in modern application architecture. When we talk about cloud-native application architecture, people tend to think about security a lot. That is why all the cloud providers have a bunch of features to make your application more secure and robust. For example, Azure provides various gateways like Network security groups, Application gateway, Azure front-door. These azure services provide a secure connection either by introducing a firewall or validating SSL certificates.

> people say "Security is a myth over the internet

Among all the various way of the application deployment strategy, Most of the organisation has adopted or are adopting to containerise their application and run in a Kubernetes cluster. This adaptation is influenced by the features and the advantages provided by Kubernetes. Due to this popularity, all the cloud providers had also introduced the managed Kubernetes clusters. In the case of Azure, it is known as Azure Kubernetes services (aka AKS).

In this article, we will talk about how we can create a more secure infrastructure with the azure Kubernetes services and azure application gateway. It has all the information and detailed explanations to get your cluster bootstrapped and start serving your production workload. Let's get started.

### Prerequisite
1. You should have a valid subscription and proper access in Azure to create an AKS service.
Essentially, it better to have a dedicated resource group created for the AKS and you should have the owner permission to that resource group.
2. Understanding of Azure private DNS zone.
3. Understanding of Istio service mesh. In case you don't know how to deploy, make use of Meshery (https://meshery.io/) which will install and configure the service mesh for you.
4. Should know various K8s concepts essentially the POD, Services, Deployment, Namespace, Ingress Controller, and ingress gateway. Helm and kubectl should be installed.
5. Idea about the CIDR block.
6. Of course azure-cli should be installed and have an Idea to run az Command.

#### Networking Concept in AKS:

Before getting into the configuration, let's understand the concept of networking used in the azure Kubernetes cluster which with ease our process of setting up the private cluster. Azure provides two kinds of networking in AKS namely kubenet and azure CNI.

- **Kubenet :**  This is the default networking being used by AKS cluster. This by default takes care of all the networking behind the scene.

> Note: All AKS nodes get an IP address from the Azure virtual network subnet. Pods receive an IP address from a logically different address space to the Azure virtual network subnet of the nodes. Network address translation (NAT) is then configured so that the pods can reach resources on the Azure virtual network.

- **Azure CNI:** This is also termed advance networking. If you choose to go with the CNI route you have to do some more homework but the beauty is you can customize the networking the way you want. We will be using CNI in our context.

> Note:Every pod gets an IP address from the subnet and can be accessed directly. These IP addresses must be unique across your network space, and must be planned in advance. Each node has a configuration parameter for the maximum number of pods that it supports. The equivalent number of IP addresses per node is then reserved upfront for that node. You can configure the maximum pods deployable to a node at cluster create time or when creating new node pools. If you don't specify maxPods when creating new node pools, you receive a default value of 110 for kubenet.

### IP planning

As discussed, Azure CNI assigns all the real IP to both Nodes and the pods from a given subnet space, So the Subnet should be capable enough to hold these IP ranges
The calculation below explains the min requirement of no IPs.

**Assumption :**

• We are creating a 3 node cluster - Means 3 IPs will be taken from the subnet assigned to K8s.

• By default each node can have a max of 30 Pods i.e., 30*3=90 IP should be taken from the same subnet.

• From a subnet, azure reserves 5 IP addresses for its internal use.

• One extra node to be considered for the rolling update which will occupy 31 IPs (considering 30 pods per node by default)

>Note: Maximum Pod per node are limited to 250

By considering the above scenario, the subnet, where we want to create your K8s cluster, should have 90+3+5+31=129 IPs As our intention is to create the AKS Private cluster let's see the private address spaces that we can use.

>✍🏼Tip: Below table shows Private address ranges available for consumption



### CIDRs :

Let's Design our CIDR for various network requirements of AKS cluster via Azure CNI Approach.   Vnet CIDR: 192.168.0.0/20 - total 4,096 Ips (192.168.0.0 to 192.168.15.255)   AKS primary Subnet CIDR: 192.168.0.0/21 - total 2043 IPs (192.168.0.0 - 192.168.7.255)

#### Terminology Used in Azure CNI:

**Virtual network:**  This is the virtual network, where you want to create your K8S Cluster. Here, I have taken my Vnet range as `192.168.0.0/20`.

**Cluster Subnet:** This is the Subnet inside which your K8S cluster will be created. Please note that you Should create the subnet prior to create the AKS cluster and, it should have sufficient address space. The address space requirement explained at the beginning of this document. For example, I am choosing `192.168.0.0/21` range as my subnet for the cluster.

**Kubernetes service address range:** This is the  CIDR or IP range that is the K8S services will be using. Please note that this IP range must not be part of any of the subnets in your cluster. In simple words, it should be different from your subnet IP ranges. Important to note that this IP range should be in the range of your VNET IP range.   

>For example, this address range can not be in 192.168.0.0/21 range, as my cluster subnet is using it, but it should be in 192.168.0.0/20 range. So I am choosing 192.168.8.0/22 (total 1024 IPs (192.168.8.0 - 192.168.11.255))

**Kubernetes DNS service IP address:** This is a Distinct IP address from your Kubernetes service address range. Please note that this should be the first and last IP address of your Kubernetes service address range.   For example,  in Kubernetes service address range is `192.168.8.0/22`. Kubernetes DNS service IP address can not be `192.168.8.0` or `192.168.11.255`. So I am choosing `192.168.8.8`.

Docker Bridge address: this is the address range that will be used for docker bridge networking.

**Few things to remember :**

1. This range should not be in the range of the Kubernetes service address range. In this case `192.168.8.0/22`.
2. Addresses matching the format `...0 or ...255` are reserved and cannot be used.
3. The prefix must be between 1 and 29.
4. The IP address cannot be the first or last address in its CIDR block In my scenario, I am choosing `192.168.12.2/28`(total 16 IPs (`192.168.12.0` - `192.168.12.15`)), which satisfies all the above conditions.

**DNS name prefix:** This is the DNS name that will be resolved for the API server of the Kubernetes cluster. You will use this FQDN to access your API server after you host your AKS cluster and the application.

#### What is Azure Application Gateway?

Azure Application Gateway is a web traffic load balancer that enables you to manage traffic to your web applications. This also provides the firewall capability to secure the traffic to your application. Below image from Microsoft documentation.

##### Our Solution Architecture Diagram:

![Our Architechture](https://raw.githubusercontent.com/samirparhi-dev/samirparhi-dev/main/blog/sol-arch-azure.png)


**Explanation:**

When users request for the website, it reaches the name server from where you have purchased your DNS (it can be azure or any 3rd party). From the name server, it finds A record and directed to the public IP of the Azure application gateway. When the request reaches the Application gateway, it validates the SSL certificate and runs the firewall rules too. then the Rules in the application gateway redirect it to its proper backend. The backend-pool for the application gateway is the istio ingress gateway. As we are constructing a fully private cluster (meaning all the IPs in the AKS cluster are private IPs) we have used DNS private Zone to implement a trusted connection between all the azure services in our VNET.

### Put things to Action:

#### Step 1:
Create a resource group name k8s-rg in centralindia location (make sure to set the subscription first( here I am using my subscription named Azure)

```az account set --subscription "Azure" && az group create -l centralindia -n k8s-rg```


#### Step 2: Create vnet and subnet in the above-created resource group.

```
az network vnet create -g k8s-rg -n k8s-vnet --address-prefix 192.168.0.0/20 \
--subnet-name k8s-subnet --subnet-prefix 192.168.0.0/21
```
>Note: I have used the CIDR that is discussed above. Please refer earlier section.

#### Step 3: Now let's get the ID of the subnet we created earlier

```
    az network vnet subnet list \     
--resource-group k8s-rg \     
--vnet-name k8s-vnet \     
--query "[0].id" --output tsv
```
you will get the below output, save it for use in the next step:

```/subscriptions/<subscriptionID>/resourceGroups/rg-k8s/providers/Microsoft.Network/virtualNetworks/k8s-vnet/subnets/k8s-subnet```

#### Step 4. Let's create our AKS cluster:

```
az aks create \
    --resource-group k8s-rg \
    --name k8s-private \
    --network-plugin azure \
    --vnet-subnet-id /subscriptions/<subscriptionID>/resourceGroups/rg-k8s/providers/Microsoft.Network/virtualNetworks/k8s-vnet/subnets/k8s-subnet \
    --docker-bridge-address 192.168.12.2/28 \
    --dns-service-ip 192.168.8.8 \
    --service-cidr 192.168.8.0/22 \
    --generate-ssh-keys
```

#### Step 5. add node pool to AKS Cluster:

```
az aks nodepool add \
    --cluster-name k8s-private \
    --resource-group \
    --name k8s-pool \ 
    --vnet-subnet-id /subscriptions/<subscriptionID>/resourceGroups/rg-k8s/providers/Microsoft.Network/virtualNetworks/k8s-vnet/subnets/k8s-subnet
```

```
az aks get-credentials --resource-group k8s-rg --name k8s-private \
kubectl get nodes
NAME                               STATUS   ROLES   AGE     VERSION
aks-k8s-pool-63828758-vmss000002   Ready    agent   6d11h   v1.19.11
```


Now the AKS cluster is ready.

#### Step 7. Install Istio through Meshery.

Meshery is an open-source, service mesh management plane that enables the adoption, operation, and management of any service mesh and its workloads.

Install Meshery through Helm: https://meshery.io/#getting-started (click on Helm icon to see the instruction to install meshery via helm)

Install Istio via from meshey UI: https://docs.meshery.io/service-meshes/adapters/istio

Step 8. Making the ingress gateway internal By default the ingress gateway ( in this context Istio Ingress gateway) are internet-facing, meaning they get a public IP. In this case, we are creating a private cluster which means the cluster should only be accessed from VNET internally. To achieve this we have to make our Ingress gateway IP a private IP. This can be done by adding an annotation to our ingress service manifest. the annotation is as follows :

<pre><code class="text-sm">
annotations:
    service.beta.kubernetes.io/azure-load-balancer-internal: "true"
</code></pre>

after applying the above annotation, check your ingress gateway IP now it is a private IP:

<pre><code class="text-sm">
kubectl get svc -n istio-system
NAME                   TYPE           CLUSTER-IP   EXTERNAL-IP   PORT(S)                                      AGE
istio-ingressgateway   LoadBalancer   192.168.9.186   192.168.3.193    15021:30305/TCP,80:32107/TCP,443:32436/TCP   6d10h
</code></pre>

#### Step 9: 

Now let's create an azure private DNS zone and create a CNAME for our Istio Ingress gateway. So that the ingress gateway can be accessed via the azure network. More info on Azure private DNS (https://docs.microsoft.com/en-us/azure/dns/private-dns-overview)

`az network private-dns zone create -g k8s-rg -n privatelink.centralindia.azmk8s.io`

in above the private DNS name is an azure defined name for the k8s services more info (https://docs.microsoft.com/en-us/azure/private-link/private-endpoint-dns)

now let's add an A record for our istio ingress gateway so that it is discoverable by the application gateway in the Azure network. Go to the `privatelink.centralindia.azmk8s.io` private DNS resource that was created and click on recordset and add an ARecord as shown below and save it.

With this, we have successfully created a cluster and it is private. Now it can not receive any request from the web. But this is discoverable in the azure internal network as we have set up a private DNS zone. To enable the request from the internet let's create an application gateway.

#### Step 10. To create an application gateway, you need to create a Public IP first :

`az network public-ip create -g k8s-rg -n k8s-gw-pub-ip --allocation-method Static`

##### Step 11. Let's create the application gateway now with the backend pool as the Istio ingress gateway.

<pre><code class="text-sm">

az network application-gateway create \
  --name k8s-app-gateway \
  --location centralindia \
  --resource-group k8s-rg \
  --capacity 2 \
  --sku Standard_v2 \
  --public-ip-address k8s-gw-pub-ip \
  --vnet-name k8s-vnet \
  --subnet k8s-vnet \
  --servers sdistiogw.privatelink.centralindia.azmk8s.io
</code></pre>

With this, we have successfully created our azure application gateway and also the backend is set to the istio ingress gateway. Now the application gateway will be able to forward traffic to the istio ingress gateway and also get the response from the Istio gateway.

### Credits:

    • Azure Docs
    • Istio
    • Meshery
    • Layer5
I hope you like this blog post. Please let me know your thoughts on it and suggest if you would like me to write on a specific topic.

Cheers !!!





