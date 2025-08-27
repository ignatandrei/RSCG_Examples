// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'RSCG Examples',
    tagline: 'Roslyn Source Code Generator Examples',
    favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://ignatandrei.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/RSCG_Examples/v2/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ignatandrei', // Usually your GitHub org/user name.
  projectName: 'RSCG_Examples', // Usually your repo name.
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: [require.resolve('docusaurus-lunr-search')],
  
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
navbar: {
        title: 'RSCG Examples',
        logo: {
          alt: 'RSCG Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Examples',
          },
          {href: 'http://msprogrammer.serviciipeweb.ro/category/roslyn/', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/ignatandrei/RSCG_Examples',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Examples',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Documentation',
            items: [
              {
                label: 'Roslyn',
                href: 'https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/source-generators-overview',
              }
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                href: 'http://msprogrammer.serviciipeweb.ro/category/roslyn/',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/ignatandrei/RSCG_Examples',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} RSCG Examples. Built with Docusaurus.`,
      },
          prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['csharp']
      },
    }),
};

export default config;
