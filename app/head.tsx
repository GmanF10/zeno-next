export default function Head() {
  return (
    <>
      <title>ZENØ – Awaken Intelligence</title>
      <meta
        name="description"
        content="ZENØ: The AI assistant hub where intelligence and machine awaken. Unlock your potential with cutting-edge AI tools, a futuristic interface, and seamless productivity."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Social & Brand SEO */}
      <meta property="og:title" content="ZENØ – Awaken Intelligence" />
      <meta
        property="og:description"
        content="Enter the realm where intelligence breathes. Experience ZENØ: the futuristic AI assistant hub."
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="ZENØ" />

      {/* Favicon & theme color */}
      <link rel="icon" href="/favicon.ico" />
      <meta name="theme-color" content="#0c0c0f" />

      {/* Font preconnect for fast load (optional, if self-hosting fonts or using Google Fonts) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </>
  );
}
