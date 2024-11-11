+++
title = "SBOM: Know the Software's source of truth"
description = "Over the years, our focus has been on enhancing our software's functionality and striving for vendor neutrality. We've integrated various freely available modules from diverse sources to expand our applications. However, we inadvertently overlooked verifying the authenticity of these sources."
date = 2024-04-27
[taxonomies] 
tags = ["CyberSecurity", "SBOM", "OpenSource"]
+++
Over the years, our focus has been on enhancing our software's functionality and striving for vendor neutrality. We've integrated various freely available modules from diverse sources to expand our applications. However, we inadvertently overlooked verifying the authenticity of these sources.

Nowadays, with privacy concerns escalating across individuals and organisations, we've started scrutinising the origins of each code segment extensively. This scrutiny is aimed at ensuring that we can confidently deliver authentic products to our end-users without compromising on features while maintaining compatibility with other software.

The term SBOM (Software Bill of Materials) has become increasingly prominent in industry discussions over the past year. It's likely that we'll see a surge in demands for this skill set in the near future.

SBOM is to establishing trust, much like how blockchain operates. 
For instance, in a blockchain scenario:

when purchasing a diamond ring, the blockchain ensures the authenticity of the product from its mining origins to its delivery to the customer, despite involving numerous vendors and steps in the supply chain.

Similarly, SBOM applies this logic to software. While we may utilise various modules or dependencies in our codebase to create impressive products, SBOM provides crucial information regarding the authenticity and vulnerabilities of these third-party components.

**So, SBOM is for Whom?**

Technically for Everyone (because privacy is our Rights not an option 😊)
- Primarily for developers, solution architects/Consultants, delivery partners,
- Companies or individuals consuming the software
- Vendors or agencies providing its ongoing support (AMC).

**For whom it is a whistle blower?**

Based on recent analyses from various articles, it's evident that there's a growing trend towards embracing and promoting open source. While this is a positive development, the open nature of such projects means that they attract contributors and collaborators from around the globe who share their code. However, this openness also introduces potential risks. In some cases, developers may not adhere to best coding practices, particularly in popular codebases where thorough code reviews might not occur. Consequently, there's a heightened risk of subpar code being committed to the codebase.

**What's the solution then?**

Indeed, thanks to the global open-source community, initiatives have been taken to develop and promote SBOM tools, enabling meticulous scrutiny of each code segment. These tools can operate during various stages, including raising a PR, building applications, and containerizing code, ensuring thorough checks even when end customers consume the software. This advancement provides developers and technical professionals involved in product development with peace of mind. The SBOM tool space continues to evolve and improve daily. Let's delve into some of these open-source SBOM tools:

1. [Sbomit](https://sbomit.dev)
2. [Fossology](https://www.fossology.org)
3. [Cyclonedx](https://cyclonedx.org)
4. [Tldrlegal](https://www.tldrlegal.com)
5. [Dep Scan](https://github.com/owasp-dep-scan/dep-scan)
6. [BOM for K8S](https://github.com/kubernetes-sigs/bom)
7. [SW360](https://projects.eclipse.org/projects/technology.sw360)
8. [Tern](https://github.com/tern-tools/tern)
9. [scancode-toolkit](https://github.com/nexB/scancode-toolkit)
10. [Fossid](https://fossid.com/open-source-audit-services/)
11. [Leanix](https://www.leanix.net/en/wiki/trm/software-bill-of-materials)
12. [Yoctoproject](https://www.yoctoproject.org)
13. [Bomutils](https://github.com/hogliux/bomutils)

**Popular Reporting Standards:**

- [SPDX](https://spdx.dev/use/tools/open-source-tools/)


Is there a way to ensure End-user Confidence ?

Absolutely, we possess the means to attest and sign our products, thereby offering transparency regarding the risk posture to end customers. Credit goes to the open-source community for dedicating efforts to develop tools capable of attesting and verifying containerized binaries and files. This allows any end customer to verify the risk posture of the software being consumed using the generated certificate.

Few Open Source Attestation Tools are listed below :

### Tools:

1. [Sigstore's Cosign](https://www.sigstore.dev) ([GitHub](https://github.com/sigstore/cosign))
2. [Notary](https://github.com/notaryproject/notary)
3. [DCT (Docker Content Trust)](https://docs.docker.com/engine/security/trust)
4. [In-toto](https://github.com/in-toto/attestation)
5. [Portieris](https://github.com/IBM/portieris)

### Open Source Frameworks:

- [TUF (The Update Framework)](https://theupdateframework.io)

### Open Source Registries:

- [Harbor](https://goharbor.io/docs/2.7.0/working-with-projects/working-with-images/sign-images/)
- Docker Hub: *you know the link right 🤔*


After All, SBOM is becoming indispensable in ensuring software authenticity and security, benefiting stakeholders across the development and consumption spectrum.
Hope you loved reading it. 🍻
