import Script from "next/script";

export default function BodyScripts() {
    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GTM_ID}', {
              page_path: window.location.pathname,
            });
          `,
                }}
            />
            {/* End Google tag (gtag.js) (in head)*/}

            {/* Begin Google Tag Manager (in head)*/}
            <noscript>
                <iframe
                    src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM}`}
                    height="0"
                    width="0"
                    style={{ display: "none", visibility: "hidden" }}
                />
            </noscript>
            <Script
                id="gtm-script"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', 'GTM-TTZT4CR');
  `,
                }}
            />
            {/* End Google Tag Manager (in head)*/}

            {/* <!-- Event snippet for Purchase (1) conversion page --> */}
            <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
          gtag('event', 'conversion', {
            'send_to': 'AW-706322979/PGtgCOuaqcoYEKPE5tAC',
            'value': 1.0,
            'currency': 'AED',
            'transaction_id': ''
        });
          `,
                }}
            />

            <Script strategy="afterInteractive">
                {`
          !function (w, d, t) {
            w.TiktokAnalyticsObject = t;
            var ttq = w[t] = w[t] || [];
            ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
            ttq.setAndDefer = function (t, e) {
              t[e] = function () {
                t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
              }
            };
            for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
            ttq.instance = function (t) {
              for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]);
              return e
            };
            ttq.load = function (e, n) {
              var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
              ttq._i = ttq._i || {}, ttq._i[e] = [], ttq._i[e]._u = i, ttq._t = ttq._t || {}, ttq._t[e] = +new Date, ttq._o = ttq._o || {}, ttq._o[e] = n || {};
              var o = document.createElement("script");
              o.type = "text/javascript", o.async = !0, o.src = i + "?sdkid=" + e + "&lib=" + t;
              var a = document.getElementsByTagName("script")[0];
              a.parentNode.insertBefore(o, a)
            };

            ttq.load('CHQVDCJC77U7QBTM7K2G');
            ttq.page();
          }(window, document, 'ttq');
        `}
            </Script>
        </>
    );
}
