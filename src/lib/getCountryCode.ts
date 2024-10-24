const countryNameToISO: { [key: string]: string } = {
  brazil: 'BR',
  brasil: 'BR',
  'united states': 'US',
  usa: 'US',
  canada: 'CA',
  germany: 'DE',
  france: 'FR',
  india: 'IN',
  argentina: 'AR',
  poland: 'PL',
  ukraine: 'UA',
  mexico: 'MX',
};

export function getCountryCode(countryName: string): string | undefined {
  const formattedCountryName = countryName.toLowerCase();
  return countryNameToISO[formattedCountryName];
}
