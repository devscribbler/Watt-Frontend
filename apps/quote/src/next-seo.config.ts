import { DefaultSeoProps } from 'next-seo'

const seo: DefaultSeoProps = {
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://watt.co.uk/',
    site_name: 'Watt.co.uk portal',
  },
  twitter: {
    handle: '@wattutilities',
    site: '@wattutilities',
    cardType: 'summary_large_image',
  },
  defaultTitle: 'Quotation Tool',
  titleTemplate: '%s | Watt.co.uk',
  description: 'Quotation tool for Watt.co.uk clients',
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/assets/img/favicon-32x32.png',
    },
    {
      rel: 'apple-touch-icon',
      href: '/assets/img/apple-touch-icon.png',
    },
  ],
}

export default seo
