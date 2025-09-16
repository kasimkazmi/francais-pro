declare module 'react-select-country-list' {
  export type CountryOption = { label: string; value: string };
  export default function countryList(): {
    getData: () => CountryOption[];
  };
}


