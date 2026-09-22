/**
 * PRIVACY POLICY CONTENT
 * ---------------------------------------------------------------------------
 * The policy at /privacy, transcribed from the supplied design export
 * (LegalDocument-standalone.html). Eighteen sections, fifty paragraphs, all
 * verbatim.
 *
 * THIS IS A DRAFT, AND THE PAGE SAYS SO. The source is labelled "Design
 * preview \u2014 policy wording pending" and versioned "v1.0 (draft)". Eleven
 * paragraphs carry bracketed reviewer notes such as "[Insert monitored
 * privacy or grievance email]".
 *
 * The effective and last-updated dates below were supplied by the client;
 * the export had them unset. The WORDING is still the draft, so the banner
 * and the notes stay until legal sign-off.
 *
 * THOSE NOTES ARE RENDERED, NOT HIDDEN. A privacy policy is a legal
 * commitment, and quietly dropping the brackets would make unfinished wording
 * read as approved. The component styles them as visible editorial marks and
 * the page carries a notice, so nobody \u2014 reader or reviewer \u2014 can mistake
 * this for final text. Replace the wording and delete `draft` below when
 * legal sign-off lands.
 */

/** One section of the policy. */
export interface PrivacySection {
  /** Stable key \u2014 also the anchor id and the "on this page" link target. */
  id: string;
  heading: string;
  paragraphs: readonly string[];
}

export const privacy = {
  meta: {
    title: "Privacy Policy",
    description:
      "How personal information is collected, used and shared, and how to contact us about privacy.",
    path: "/privacy",
  },

  /** The header above the sections, from the export's document fields. */
  document: {
    title: "Privacy Policy",
    summary:
      "How personal information is collected, used and shared, and how to contact us about privacy.",
    docType: "Policy",
    version: "v1.0 (draft)",
    /* Supplied by the client; the export left both unset. */
    effective: "9 July 2024",
    lastUpdated: "18 August 2026",
  },

  /** The "on this page" heading, as the export labels it. */
  tocLabel: "On this page",

  sections: [
    {
      id: "about",
      heading: "About this policy",
      paragraphs: [
        "Lurny Innovative Labs Pvt. Ltd. (Lurny, we, us or our) provides enterprise learning, knowledge, practice, capability and performance services. This policy explains how personal information is handled when you visit our websites, contact us, attend our events or use services that link to this policy.",
        "Personal information means information that identifies you or can reasonably be linked to you. The information processed depends on the service, the features enabled and, for organisation accounts, your organisation’s configuration. We do not collect every category described below from every person.",
        "This policy provides information about our practices. Visiting a website or accepting this policy does not, by itself, give consent to every use of personal information. Where consent is needed, it must be obtained separately for the relevant activity.",
      ],
    },
    {
      id: "who-responsible",
      heading: "Who is responsible for your information",
      paragraphs: [
        "For website enquiries, our business contacts, marketing subscriptions and the administration of our own business, Lurny determines why and how information is used. In this role, we act as a controller or Data Fiduciary, as applicable.",
        "When your employer, educational institution or another organisation provides access to Lurny, that organisation generally determines the purposes of processing its users’ information. Lurny processes that information on the organisation’s instructions under the applicable service agreement and data processing terms. The organisation’s privacy notice explains its purposes, legal basis, monitoring arrangements and retention decisions.",
        "For example, an organisation may instruct Lurny to maintain training records, analyse a recorded customer conversation or produce capability reports. This policy describes those service activities for transparency; it does not replace the organisation’s notice or authorise new uses of its data.",
        "Contact your organisation first about records held in its account. You may also contact us, and we will help route your request. Information about Lurny employees and applicants may be covered by separate employment or recruitment notices.",
      ],
    },
    {
      id: "info-you-provide",
      heading: "Information you provide",
      paragraphs: [
        "We may receive your name, business email, telephone number, organisation, role, country and the information you include in enquiries, demo requests, support tickets or event registrations. Account information may include a user identifier, profile details, authentication information and preferences. Commercial records may include billing contacts, invoice details and payment status.",
        "Content you submit may include documents, images, audio, video, prompts, chat messages, questions, feedback and files used to create learning or knowledge resources. Please avoid including passwords, payment-card credentials, government identifiers, health information or other sensitive information unless an authorised workflow specifically requires it.",
      ],
    },
    {
      id: "info-generated",
      heading: "Information generated by the services",
      paragraphs: [
        "Learning and capability features may generate enrolment records, attendance, course progress, assessment answers and scores, completion records, certificates, practice attempts, competency ratings, coaching feedback and recommended learning paths. Gamification features may generate points, badges, streaks and leaderboard positions.",
        "Conversation and meeting features may process recordings, transcripts, speaker labels, summaries, evaluation scores, feedback and identified follow-up actions. These records may contain information about employees, customers and other participants, including people who do not have a Lurny account.",
        "Technical information may include IP address, browser and device characteristics, operating system, access times, pages or features used, diagnostic events and security logs. Device permissions such as microphone or camera access apply only to features that need them; permissions can be managed through your device or browser settings.",
      ],
    },
    {
      id: "info-other-sources",
      heading: "Information from your organisation and other sources",
      paragraphs: [
        "Your organisation may provide your employee or learner identifier, department, job role, reporting relationships and assigned learning. Integrations enabled by it may supply relevant information from HR systems, identity providers, customer-management systems, meeting tools or other connected applications.",
        "We may receive business contact information from a referral partner, an event organiser or a professional interaction. Any use must be consistent with the purpose for which it was shared and applicable law. The final scope of these sources is described in the confirmation schedule at the end of this document.",
      ],
    },
    {
      id: "how-used",
      heading: "How information is used",
      paragraphs: [
        "We use relevant information to respond to enquiries; arrange demonstrations; establish and administer accounts; provide contracted services; manage subscriptions and billing; answer support requests; and communicate service changes.",
        "Within organisation accounts, we process information to deliver the enabled learning, authoring, knowledge-search, simulation, coaching, assessment and reporting functions. This can include recommending content, tracking completion, evaluating practice and presenting performance insights to authorised users.",
        "We also use operational information to diagnose faults, maintain availability, prevent misuse, investigate security incidents and improve service usability. Any use of identifiable customer content for a separate purpose requires an appropriate legal basis and must respect our customer agreements.",
        "We may send relevant product or event communications where permitted. You can stop promotional emails using the unsubscribe method in the message or by contacting us. Essential account, security and service communications may continue.",
      ],
    },
    {
      id: "basis",
      heading: "The basis for processing",
      paragraphs: [
        "We process information only where applicable law permits it. In India, the relevant basis depends on the law in force and the activity involved, including consent where required and other specifically permitted uses. We do not treat the European concept of legitimate interests as a general substitute for Indian consent requirements.",
        "Where the EU or UK GDPR applies to Lurny’s own processing, handling an individual’s service request or contract may rely on contractual necessity; business relationship management, troubleshooting and fraud prevention may rely on legitimate interests, subject to balancing individual rights; mandatory records rely on legal obligations; and optional marketing or tracking relies on consent where required. An employer’s contract does not automatically create a contractual basis for processing every employee’s information.",
      ],
    },
    {
      id: "ai-features",
      heading: "AI features and performance insights",
      paragraphs: [
        "Lurny uses AI-enabled features to help create content, answer questions, transcribe and summarise conversations, support practice and generate feedback. Depending on the feature, relevant prompts, retrieved content, recordings or transcripts may be sent to a contracted AI or speech-processing provider to generate the response.",
        "Outputs can contain personal information and may be inaccurate or incomplete. Capability scores and conversation feedback are estimates based on the available material and configured criteria. They may influence learning recommendations and the information a manager reviews; they should be checked in context and can be challenged through your organisation.",
        "Proposed commitment for confirmation: Lurny does not use identifiable customer content to train general-purpose AI models, or permit its AI providers to do so, unless a separate, expressly authorised arrangement and lawful basis apply.",
        "Proposed commitment for confirmation: Lurny does not itself make solely automated decisions about employment, promotion, lending or other matters with legal or similarly significant effects. Customers must assess their own use of reports and provide any required notice, human review and appeal process.",
      ],
    },
    {
      id: "recordings",
      heading: "Recordings and participant information",
      paragraphs: [
        "An organisation enabling conversation recording or analysis is responsible for identifying a lawful basis, informing everyone affected and obtaining consent where required before recording begins. A participant may be a customer, employee or other person. Device microphone permission is not a substitute for informing participants or obtaining any required consent.",
        "Recording notices should explain the purpose, who can access the results, retention and how to raise concerns. An organisation must also consider an appropriate alternative where a person declines consent. If Lurny records its own demonstration, support or business call, we provide the necessary notice and obtain consent where required.",
      ],
    },
    {
      id: "recipients",
      heading: "Who can receive information",
      paragraphs: [
        "Authorised people within your organisation may access account information, assigned learning, scores, recordings and reports according to the access and visibility settings it configures. Shared activities and leaderboards may show selected information to other participants. Ask your administrator which visibility settings apply to you.",
        "We use service providers for functions such as hosting, storage, AI and transcription, communications, technical support and business administration. Providers receive the information needed for their function under appropriate contractual restrictions. Our personnel access information where needed for their work and subject to confidentiality and access controls.",
        "Information may be disclosed to professional advisers or authorities where required or permitted by law, or where necessary to investigate abuse or protect legal rights. A proposed financing, merger or business transfer may involve limited disclosure under confidentiality safeguards, with further notice where required.",
        "Integrations enabled by you or your organisation may transfer information to the connected provider. Its independent processing is covered by its own notice. A link to another website does not make that website part of Lurny.",
      ],
    },
    {
      id: "cookies",
      heading: "Cookies and similar technologies",
      paragraphs: [
        "Websites and services may use cookies or similar storage for sign-in, security, preferences and session continuity. Optional analytics, embedded media or advertising technologies, if deployed, must be described in the cookie information presented on the relevant website.",
        "Where consent is required, optional technologies are used only after your choice. You can change that choice through the website’s cookie settings where available, or contact us. Browser controls can also block or remove cookies, although this may affect essential functionality. See the Cookie Policy for full detail.",
      ],
    },
    {
      id: "processing-location",
      heading: "Where information is processed",
      paragraphs: [
        "Information may be processed in India and in other locations used for an agreed deployment or by contracted providers. A hosting region does not necessarily determine every location from which support is provided or AI processing occurs. Customer-specific hosting and transfer restrictions are governed by the applicable agreement.",
        "Where applicable law restricts international transfers, the relevant legal mechanism and safeguards must be in place before transfer. For EU or UK data, these may include an applicable adequacy decision or approved contractual safeguards with any additional measures required. Contact us for information about safeguards applicable to your data.",
        "",
      ],
    },
    {
      id: "retention",
      heading: "How long information is retained",
      paragraphs: [
        "We retain information for the purpose for which it is needed, subject to applicable legal duties and contractual commitments. For enquiries and business contacts, we consider whether the enquiry remains open, whether there is an ongoing relationship and whether further contact is appropriate. Marketing records are retained while the subscription or other lawful marketing basis remains valid; a minimal suppression record may be retained to respect an opt-out.",
        "Organisation account records, learning evidence and recordings are retained according to the agreed service terms and configured retention rules. Ending an individual’s access does not automatically delete the organisation’s training or business records. Customer instructions and applicable law determine whether those records must be retained, returned or deleted.",
        "Billing, dispute and security records may need different retention periods based on legal requirements, investigation needs or limitation periods. Deleted information may remain in restricted backups until those backups expire. Information retained for legal reasons is restricted to that purpose.",
      ],
    },
    {
      id: "security",
      heading: "Security and incident handling",
      paragraphs: [
        "We apply technical and organisational measures appropriate to the information and the risks involved. These include access restrictions, authentication controls and procedures for managing security incidents. Specific service safeguards depend on the deployment and agreed responsibilities. No internet service can guarantee absolute security.",
        "If a personal data incident occurs, we assess it, take steps to contain and address it, and make notifications required by applicable law and customer agreements. Please report a suspected exposure or unauthorised account activity through the contact details below.",
      ],
    },
    {
      id: "choices",
      heading: "Your choices and requests",
      paragraphs: [
        "You may contact us to ask about your personal information, request access or correction, request deletion, withdraw consent or raise a complaint. Additional rights, including restriction, portability, objection and safeguards for automated decisions, depend on the law that applies and the circumstances. Where applicable Indian law provides a right to nominate another person to exercise rights in the event of death or incapacity, you may contact us about that process.",
        "You can withdraw consent for consent-based processing without affecting the lawfulness of earlier processing. We will explain if withdrawal means a requested feature can no longer be provided. Required fields should be identified when information is collected; without necessary account or enquiry details, we may be unable to provide access or respond.",
        "You may object to direct marketing at any time. Where EU or UK law applies, you may also object to processing based on legitimate interests for reasons relating to your circumstances.",
        "Send requests to the contact below, identifying the service and the information concerned. We may ask for proportionate identity verification and will respond within the applicable legal period. If we cannot fulfil a request in full, we will explain the reason and any available complaint route. We will not ask for unnecessary identity documents.",
        "For information controlled by your organisation, contact its administrator or privacy contact first. We assist the organisation with requests under our agreement rather than changing its records independently. If your complaint remains unresolved, you may approach the relevant supervisory authority or statutory grievance body where that right is available. UK individuals may contact the Information Commissioner’s Office at ico.org.uk; EU individuals may contact their competent data protection authority.",
      ],
    },
    {
      id: "children",
      heading: "Children and younger learners",
      paragraphs: [
        "The general business website and enterprise services are intended for adult business users. An institution wishing to use Lurny with children or younger learners must agree an appropriate arrangement before that use begins, including age-appropriate notices, permissions and safeguards required by applicable law.",
        "Please contact us if you believe a child’s information has been provided without the necessary authority. We will assess the report with the responsible organisation where applicable and take appropriate action. This policy is not, by itself, permission to enrol children.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      paragraphs: [
        "We may update this policy as our services, practices or legal requirements change. The effective date identifies the current version. Where a change materially affects how personal information is used, we will provide appropriate additional notice and seek new consent where required.",
      ],
    },
    {
      id: "contact",
      heading: "Contact and grievances",
      paragraphs: [
        "Lurny Innovative Labs Pvt. Ltd. D702, Mantri Tranquil, Gubbala Main Road, Subramanyapura, Bangalore 560061, Karnataka, India.",
        "Privacy and grievance contact: Sreerag Nair. Email: sreerag@lurny.ai. Privacy request method: Email the above address or write to the postal address.",
      ],
    },
  ] as const satisfies readonly PrivacySection[],
} as const;
