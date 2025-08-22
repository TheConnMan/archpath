# Company Architecture Reference Material

## Overview

This document provides detailed reference material for each company's architectural evolution to be used in the ArchPath game. Each company section includes their actual architectural phases, enterprise considerations, and learning resources.

---

## Netflix

### Company Background
- Founded: 1997 (DVD-by-mail) → 2007 (Streaming launch) → 2016 (Global expansion)
- Scale: 230M+ subscribers in 190 countries, ~15% of global internet traffic
- Core Business: Video streaming, content recommendation, original content production

### Architecture Evolution

#### Phase 1: DVD Monolith (1997-2008)
**Core Components:**
- Monolithic Java application
- Single PostgreSQL database
- Physical data centers
- Basic web server (user accounts, DVD catalog)

**Breaking Point:** Database corruption in August 2008 - prevented DVD shipping for 3 days

#### Phase 2: Cloud Migration & Basic Streaming (2009-2012) 
**Solutions Added:**
- AWS EC2 migration
- Basic video streaming infrastructure
- CDN for content delivery
- Load balancers for web traffic
- Horizontal database scaling

**Enterprise Considerations:**
- Multi-region deployment for availability
- Content licensing compliance systems
- Basic analytics for viewing patterns

#### Phase 3: Microservices Transformation (2013-2016)
**Solutions Added:**
- 700+ microservices
- API Gateway for service orchestration  
- Cassandra for user data at scale
- Kafka for event streaming
- Service mesh for inter-service communication

**Enterprise Considerations:**  
- SOC2 Type II compliance
- Region-specific content restrictions
- Advanced monitoring and observability

#### Phase 4: Global Scale & AI (2017-Present)
**Solutions Added:**
- 1000+ microservices
- Machine learning recommendation engine
- Open Connect CDN (custom)
- Chaos engineering tools
- Real-time data processing

**Enterprise Considerations:**
- GDPR compliance for EU users
- Content regulation per country
- Advanced security and DRM
- Cost optimization for global infrastructure

### Key Learning Resources

**Official Netflix Tech Blog:**
- [Netflix Tech Blog](https://netflixtechblog.com/) - Architecture insights and engineering practices
- [Microservices at Netflix](https://netflixtechblog.com/a-microscope-on-microservices-923b906103f4)
- [Netflix API Re-Architecture](https://netflixtechblog.com/engineering-trade-offs-and-the-netflix-api-re-architecture-64f122b277dd)
- [GraphQL Federation at Scale](https://netflixtechblog.com/how-netflix-scales-its-api-with-graphql-federation-part-1-ae3557c187e2)

**System Design Resources:**
- [Netflix Architecture Deep Dive](https://talent500.com/blog/netflix-streaming-architecture-explained/)
- [Scaling Netflix History](https://blog.bytebytego.com/p/a-brief-history-of-scaling-netflix)

---

## Slack

### Company Background
- Founded: 2013 (evolved from internal gaming company tool)
- Scale: 18M+ daily active users, millions of concurrent WebSocket connections
- Core Business: Real-time workplace communication and collaboration

### Architecture Evolution

#### Phase 1: MVP Real-time Chat (2013-2014)
**Core Components:**
- LAMP stack (Linux, Apache, MySQL, PHP)  
- WebSockets for real-time messaging
- Single database for users and messages
- Simple file upload storage

**Breaking Point:** Message history queries becoming slow, limited concurrent users

#### Phase 2: Scaling WebSockets (2014-2016)
**Solutions Added:**
- Channel servers (stateful, in-memory)
- Gateway servers for WebSocket management
- Message persistence before broadcasting
- Load balancing for WebSocket connections

**Enterprise Considerations:**
- Basic user management and permissions
- File storage and sharing capabilities
- Simple search functionality

#### Phase 3: Enterprise Features (2016-2019)
**Solutions Added:**  
- Multiple data centers for reliability
- Cassandra for message history at scale
- Advanced search with Elasticsearch
- Enterprise admin controls

**Enterprise Considerations:**
- SOC2 Type II compliance
- Enterprise Key Management (EKM)
- Data Loss Prevention (DLP)
- Advanced audit logging
- Single Sign-On (SSO) integration

#### Phase 4: Shared Channels & Enterprise Grid (2019-Present)
**Solutions Added:**
- Unified Grid architecture for large organizations
- Flannel edge caching service  
- Envoy proxy for millions of WebSocket connections
- Cross-organization shared channels

**Enterprise Considerations:**
- Information barriers for compliance
- Advanced enterprise security features
- Data residency controls
- FedRAMP authorization for government
- GDPR and HIPAA compliance options

### Key Learning Resources

**Official Slack Engineering Blog:**
- [Slack Engineering](https://slack.engineering/) - Real-time messaging architecture
- [Real-time Messaging at Scale](https://slack.engineering/real-time-messaging/)
- [WebSocket Migration to Envoy](https://slack.engineering/migrating-millions-of-concurrent-websockets-to-envoy/)
- [Unified Grid Architecture](https://slack.engineering/unified-grid-how-we-re-architected-slack-for-our-largest-customers/)

**System Design Resources:**
- [Slack Architecture Overview](https://talent500.com/blog/slack-architecture-real-time-messaging/)
- [Scaling Real-time Systems](https://scaleyourapp.com/system-design-case-study-real-time-messaging-architecture/)

---

## Uber

### Company Background  
- Founded: 2009 (San Francisco) → 2014 (Global expansion)
- Scale: 10,000+ cities worldwide, millions of rides daily
- Core Business: Ride-sharing, food delivery, logistics, autonomous vehicles

### Architecture Evolution

#### Phase 1: Monolith MVP (2009-2013)
**Core Components:**
- Python monolith with single PostgreSQL database
- Basic mobile apps for riders and drivers
- Simple location tracking
- Manual dispatch system

**Breaking Point:** Slow matching algorithm, limited geographic scalability

#### Phase 2: Geographic Scaling (2013-2015) 
**Solutions Added:**
- City-based service partitioning
- Real-time location services
- Google S2 library for geospatial queries
- Basic supply-demand matching (DISCO v1)

**Enterprise Considerations:**
- Regulatory compliance per city/country
- Driver background check systems
- Payment processing infrastructure

#### Phase 3: Microservices Architecture (2015-2018)
**Solutions Added:**
- 100+ microservices  
- API Gateway for service orchestration
- Kafka for event streaming
- Real-time matching optimization
- Advanced geofencing service

**Enterprise Considerations:**
- SOC2 compliance for enterprise customers
- Advanced fraud detection
- Multi-region data compliance
- Enterprise admin dashboards

#### Phase 4: Global Platform (2018-Present)
**Solutions Added:**
- 4,500+ microservices
- Kubernetes orchestration
- Domain-Oriented Microservice Architecture (DOMA)
- ML-powered demand prediction
- Autonomous vehicle platform integration

**Enterprise Considerations:**
- GDPR compliance in Europe
- Data localization requirements
- Advanced security and background checks
- Enterprise expense management
- Regulatory reporting automation

### Key Learning Resources

**Official Uber Engineering Blog:**
- [Uber Engineering](https://eng.uber.com/) - Microservices and scaling insights
- [Domain-Oriented Microservices](https://eng.uber.com/microservice-architecture/)
- [Geofence Service Architecture](https://eng.uber.com/go-geofence-highest-query-per-second-service/)
- [API Gateway Architecture](https://eng.uber.com/architecture-api-gateway/)

**System Design Resources:**
- [Uber System Design Deep Dive](https://www.geeksforgeeks.com/system-design/system-design-of-uber-app-uber-system-architecture/)
- [Real-time Location Architecture](https://systemdesignschool.io/problems/uber/solution)

---

## Spotify

### Company Background
- Founded: 2006 (Sweden) → 2011 (US launch)  
- Scale: 400M+ users, 30M+ songs, autonomous squad organization
- Core Business: Music streaming, podcast distribution, personalized recommendations

### Architecture Evolution  

#### Phase 1: Music Streaming MVP (2006-2010)
**Core Components:**
- Basic music streaming infrastructure
- User accounts and playlists
- Simple music catalog database
- Desktop-focused application

**Breaking Point:** Mobile adoption, personalization needs, global expansion

#### Phase 2: Mobile & Personalization (2010-2014)
**Solutions Added:**
- Mobile streaming optimization
- Basic recommendation algorithms  
- Collaborative filtering
- Offline music caching

**Enterprise Considerations:**
- Music licensing per region
- Artist payment systems
- Content moderation tools

#### Phase 3: Microservices & ML (2014-2018)
**Solutions Added:**
- 100+ autonomous microservices
- Event-driven architecture with Kafka
- Advanced ML recommendation engine (The Echo Nest acquisition)
- Apache Cassandra for user data
- Real-time analytics pipeline

**Enterprise Considerations:**
- SOC2 compliance
- GDPR compliance for EU users  
- Enterprise Spotify accounts
- Advanced analytics for record labels

#### Phase 4: AI-Powered Platform (2018-Present)
**Solutions Added:**
- 1000+ ML models for recommendations
- Hybrid streaming & batch processing
- Google Bigtable for recommendation storage
- Developer platform (Backstage open-source)
- Podcast platform integration

**Enterprise Considerations:**
- Advanced content moderation
- Regulatory compliance for different markets
- Enterprise analytics and reporting
- Advanced security for high-profile content

### Key Learning Resources

**Official Spotify Engineering Blog:**  
- [Spotify Engineering](https://engineering.atspotify.com/) - Microservices and ML insights
- [ML Personalization at Scale](https://engineering.atspotify.com/2021/11/the-rise-and-lessons-learned-of-ml-models-to-personalize-content-on-home-part-i/)
- [Event Delivery Architecture](https://engineering.atspotify.com/2019/11/spotifys-event-delivery-life-in-the-cloud)
- [Testing Microservices](https://engineering.atspotify.com/2018/01/testing-of-microservices)

**System Design Resources:**
- [Spotify Recommendation System](https://www.techaheadcorp.com/blog/spotify-recommendation-system/)
- [Home Architecture Evolution](https://www.infoq.com/presentations/evolution-spotify-arch/)

---

## Instagram  

### Company Background
- Founded: 2010 → 2012 (Facebook acquisition)
- Scale: 2B+ daily active users, 100M+ media uploads daily  
- Core Business: Photo/video sharing, social media, Stories, Reels

### Architecture Evolution

#### Phase 1: Django MVP (2010-2012)
**Core Components:**
- Django monolith (Python)
- PostgreSQL database
- Basic photo upload and sharing
- Simple social features (likes, comments)
- AWS hosting

**Breaking Point:** Viral growth from 0 to 100M users in 2 years

#### Phase 2: Scaling the Monolith (2012-2015)
**Solutions Added:**
- Multiple Django servers
- PostgreSQL read replicas  
- Cassandra for activity feeds
- CDN for image delivery
- Memcached for caching
- Sharded databases by user ID

**Enterprise Considerations:**
- Basic content moderation
- Advertiser accounts and analytics
- Business profile features

#### Phase 3: Facebook Integration (2015-2018)
**Solutions Added:**
- Migration to Facebook data centers
- Multi-data center architecture
- Advanced recommendation systems
- Video processing infrastructure
- Stories feature architecture

**Enterprise Considerations:**
- Enterprise business accounts
- Advanced advertising platform
- SOC2 compliance
- Brand safety tools

#### Phase 4: AI-Powered Social Platform (2018-Present)  
**Solutions Added:**
- 1000+ ML models for recommendations
- Advanced video processing (94% compute reduction)
- Real-time content analysis
- Explore recommendation system
- Reels architecture

**Enterprise Considerations:**
- GDPR compliance
- Advanced content moderation AI
- Enterprise creator tools
- Regulatory compliance per country
- Advanced security and privacy controls

### Key Learning Resources

**Official Instagram/Meta Engineering:**
- [Instagram Engineering](https://instagram-engineering.com/) - Scaling and infrastructure
- [Meta Engineering Blog](https://engineering.fb.com/tag/instagram/) - Latest innovations
- [Scaling Recommendations](https://engineering.fb.com/2023/08/09/ml-applications/scaling-instagram-explore-recommendations-system/)
- [Infrastructure Scaling](https://instagram-engineering.com/instagration-pt-2-scaling-our-infrastructure-to-multiple-data-centers-5745cbad7834)

**System Design Resources:**
- [Instagram Architecture Deep Dive](https://newsletter.systemdesign.one/p/instagram-infrastructure)
- [Django Scaling Story](https://medium.com/@priyanshu011109/how-instagram-originally-used-django-to-scale-to-millions-of-users-a31bcba39c97)

---

## Common Enterprise Architecture Patterns

### Security & Compliance
- **SOC2 Type II**: Operational security controls
- **GDPR**: EU data protection and user rights  
- **Data Residency**: Storing data in specific geographic regions
- **Enterprise Key Management**: Customer-controlled encryption keys
- **Single Sign-On (SSO)**: SAML/OIDC integration
- **Multi-factor Authentication**: Additional security layers

### Enterprise Features
- **On-premises/Hybrid Deployment**: Private cloud options
- **Advanced Admin Controls**: User management and permissions
- **Audit Logging**: Comprehensive activity tracking
- **Data Loss Prevention (DLP)**: Prevent sensitive data leaks
- **Information Barriers**: Compliance-driven user separation
- **Service Level Agreements (SLAs)**: Guaranteed uptime/performance

### Regulatory Considerations
- **Industry Compliance**: HIPAA, FINRA, FedRAMP
- **Content Moderation**: AI-powered harmful content detection
- **Regional Restrictions**: Country-specific feature limitations
- **Financial Regulations**: PCI DSS for payment processing
- **Export Controls**: Technology transfer restrictions

---

## Game Implementation Notes

### Difficulty Progression
- **Easy**: Netflix, Instagram (clear scaling patterns)
- **Medium**: Slack, Spotify (domain-specific challenges)  
- **Hard**: Uber (complex geospatial and regulatory requirements)

### Common Scaling Bottlenecks
1. **Database**: Single point of failure → Read replicas → Sharding
2. **Application**: Monolith → Load balancing → Microservices  
3. **Storage**: Local files → CDN → Object storage
4. **Real-time**: Polling → WebSockets → Message queues
5. **Geography**: Single region → Multi-region → Global edge

### Service Equivalency Examples
- **Load Balancer**: ALB, Azure Load Balancer, GCP Load Balancer, HAProxy, Nginx
- **Database**: RDS, Azure SQL, Cloud SQL, PostgreSQL, MySQL
- **Message Queue**: SQS, Service Bus, Pub/Sub, RabbitMQ, Kafka
- **Cache**: ElastiCache, Azure Redis, Cloud Memory, Redis, Memcached
- **Object Storage**: S3, Azure Blob, Cloud Storage, MinIO

This reference material ensures game levels are based on real architectural decisions and provides players with authentic learning resources to deepen their understanding.