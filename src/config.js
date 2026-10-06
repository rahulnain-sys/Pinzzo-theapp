// ================================================================
//  PINZZO SITE SETTINGS — edit these values, the whole site updates
// ================================================================
export const SITE = {
  // WhatsApp number: country code + number, no "+" or spaces
  whatsapp: '917303106001', // TODO: replace with real Pinzzo WhatsApp number
  phone: '+91 73031 06001', // TODO: replace
  email: 'care@pinzzo.in', // TODO: replace
  hours: '24 X 7', // TODO: confirm
  city: 'Gurugram',

  // Legal details (shown in footer & policy pages) — TODO: fill in real values
  legalName: 'Pinzzo [Legal Entity Name] Pvt. Ltd.',
  address: '[Registered address], Gurugram, Haryana – 1220XX',
  drugLicence: 'XXXX-XXXX',
  grievanceOfficer: '[Name], Grievance Officer',
  policyUpdated: '6 October 2026',

  // Default message pre-filled when someone taps "Order on WhatsApp"
  waMessage: 'Hi Pinzzo! I would like to order medicines.',

  // Pincodes we deliver to (Gurugram). Add/remove freely.
  pincodes: [
    '122001', '122002', '122003', '122004', '122005', '122006', '122007', '122008',
    '122009', '122010', '122011', '122015', '122016', '122017', '122018', '122022',
    '122050', '122051', '122052', '122101', '122102', '122103',
  ],
  // Pincode prefixes for "coming soon" (Delhi, Noida, Ghaziabad, Faridabad)
  comingSoon: ['110', '201', '121'],
};

export const waLink = (msg = SITE.waMessage) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
