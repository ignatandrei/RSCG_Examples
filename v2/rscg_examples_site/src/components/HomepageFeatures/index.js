import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
title: '229 Examples (14 from MSFT)',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
         <a href='docs/List-of-RSCG/'>Examples</a> with code source and instructions to run them.
      </>
    ),
  },
  {
    title: 'Convenient - category and search',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        You can search for keywords( see upper right textbox).


        Also, you have the items organized by <a href='docs/List-of-RSCG'>time</a> or by <a href='docs/rscg-examples'>category</a>

      </>
    ),
  },
  {
    title: 'New to Source Code Generation?',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        See <a href='docs/intro'>Intro</a> to start with the basics in C#.
      </>
    ),
  },
];


function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
