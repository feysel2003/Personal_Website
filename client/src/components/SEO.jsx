import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, url, image, type = "website", schema }) => {
  // 1. GLOBAL DEFAULTS
  const siteTitle = "Feysel Mifta | Software Engineering Student & Web3 Developer";
  const defaultDescription = "Portfolio of Feysel Mifta, a 4th Year Software Engineering Student at Wachemo University (WCU) and Full Stack Web3 Developer based in Addis Ababa, Ethiopia.";
  const siteUrl = "https://feysel-mifta.vercel.app"; // Your Vercel Domain
  const defaultImage = "https://feysel-mifta.vercel.app/resume.jpg"; // Points to the image in public folder

  // 2. STRUCTURED DATA (The code Robots/AI read)
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Feysel Mifta",
    "jobTitle": "Software Engineer",
    "url": siteUrl,
    "image": defaultImage,
    "nationality": "Ethiopian",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Addis Ababa",
      "addressCountry": "Ethiopia"
    },
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Wachemo University"
    },
    "knowsAbout": [
      "Software Engineering",
      "Full Stack Development",
      "MERN Stack",
      "Web3",
      "Solidity",
      "Java",
      "C++"
    ],
    "sameAs": [
      "https://github.com/feysel2003",
      "https://x.com/mifta_feys66399"
    ]
  };

  return (
    <Helmet>
      {/* --- Standard Metadata --- */}
      <title>{title ? `${title} | Feysel Mifta` : siteTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <link rel="canonical" href={url || siteUrl} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Feysel Mifta" />
      <meta name="keywords" content="Feysel Mifta, Software Engineer Ethiopia, Wachemo University, Web3 Developer, MERN Stack, Solidity, Wolkite, Addis Ababa, React Developer" />

      {/* --- Facebook / LinkedIn (Open Graph) --- */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url || siteUrl} />
      <meta property="og:site_name" content="Feysel Mifta Portfolio" />

      {/* --- Twitter Cards --- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@mifta_feys66399" />
      <meta name="twitter:title" content={title || siteTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* --- Structured Data (JSON-LD) --- */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;