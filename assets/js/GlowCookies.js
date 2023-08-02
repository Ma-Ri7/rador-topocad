/*
    GLOW COOKIES
    CREATED BY MANUEL CARRILLO
    https://github.com/manucaralmo/GlowCookies
    2021 - v 3.1.3
*/

class GlowCookies {
    constructor() {
      // Cookies banner
      this.banner = undefined
      // Config
      this.config = undefined
      this.tracking = undefined
      // DOM ELEMENTS
      this.PreBanner = undefined
      this.Cookies = undefined
      this.DOMbanner = undefined
    }
  
    render() {
      this.addCss()
      this.createDOMElements()
      this.checkStatus()
    }
  
    addCss() {
      const stylesheet = document.createElement('link');
      stylesheet.setAttribute('rel', 'stylesheet');
      stylesheet.setAttribute('href', `https://cdn.jsdelivr.net/gh/manucaralmo/GlowCookies@3.1.3/src/glowCookies.min.css`);
      document.head.appendChild(stylesheet);
    }
  
    createDOMElements() {
      // COOKIES BUTTON
      this.PreBanner = document.createElement("div");
      this.PreBanner.innerHTML = `<button type="button" id="prebannerBtn" class="prebanner prebanner__border__${this.config.bannerStyle} glowCookies__${this.config.position} glowCookies__${this.config.border} animation" style="color: ${this.banner.manageCookies.color}; background-color: ${this.banner.manageCookies.background};">
                                      <svg fill="currentColor" style="margin-right: 7px; margin-top: 2px; vertical-align: text-top;" height="15px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                          <path d="M510.52 255.82c-69.97-.85-126.47-57.69-126.47-127.86-70.17 0-127-56.49-127.86-126.45-27.26-4.14-55.13.3-79.72 12.82l-69.13 35.22a132.221 132.221 0 0 0-57.79 57.81l-35.1 68.88a132.645 132.645 0 0 0-12.82 80.95l12.08 76.27a132.521 132.521 0 0 0 37.16 72.96l54.77 54.76a132.036 132.036 0 0 0 72.71 37.06l76.71 12.15c27.51 4.36 55.7-.11 80.53-12.76l69.13-35.21a132.273 132.273 0 0 0 57.79-57.81l35.1-68.88c12.56-24.64 17.01-52.58 12.91-79.91zM176 368c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm32-160c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm160 128c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"/>
                                      </svg>${this.banner.manageCookies.text}</button>`;
      this.PreBanner.style.display = "none";
      document.body.appendChild(this.PreBanner);
  
      // COOKIES BANNER
      this.Cookies = document.createElement("div");
      this.Cookies.innerHTML = `<div 
                                      id="glowCookies-banner" 
                                      class="glowCookies__banner glowCookies__banner__${this.config.bannerStyle} glowCookies__${this.config.border} glowCookies__${this.config.position}"
                                      style="background-color: ${this.banner.background};"
                                  >
                                      <h3 style="color: ${this.banner.color};">${this.banner.heading}</h3>
                                      <p style="color: ${this.banner.color};">
                                          ${this.banner.description} 
                                          <a 
                                              href="${this.banner.link}"
                                              target="_blank" 
                                              class="read__more"
                                              style="color: ${this.banner.color};"
                                          >
                                              ${this.banner.linkText}
                                          </a>
                                      </p>
                                      <div class="btn__section">
                                          <button type="button" id="acceptCookies" class="btn__accept accept__btn__styles" style="color: ${this.banner.acceptBtn.color}; background-color: ${this.banner.acceptBtn.background};">
                                              ${this.banner.acceptBtn.text}
                                          </button>
                                          <button type="button" id="rejectCookies" class="btn__settings settings__btn__styles" style="color: ${this.banner.rejectBtn.color}; background-color: ${this.banner.rejectBtn.background};">
                                              ${this.banner.rejectBtn.text}
                                          </button>
                                      </div>
                                  </div>
                              `;
      document.body.appendChild(this.Cookies);
      this.DOMbanner = document.getElementById('glowCookies-banner')
  
  
      // SET EVENT LISTENERS
      document.getElementById('prebannerBtn').addEventListener('click', () => this.openSelector())
      document.getElementById('acceptCookies').addEventListener('click', () => this.acceptCookies())
      document.getElementById('rejectCookies').addEventListener('click', () => this.rejectCookies())
    }
  
    checkStatus() {
      switch (localStorage.getItem("GlowCookies")) {
        case "1":
          this.openManageCookies();
          this.activateTracking();
          this.addCustomScript();
          break;
        case "0":
          this.openManageCookies();
          break;
        default:
          this.openSelector();
      }
    }
  
    openManageCookies() {
      this.PreBanner.style.display = this.config.hideAfterClick ? "none" : "block"
      this.DOMbanner.classList.remove('glowCookies__show')
    }
  
    openSelector() {
      this.PreBanner.style.display = "none";
      this.DOMbanner.classList.add('glowCookies__show')
    }
  
    acceptCookies() {
      localStorage.setItem("GlowCookies", "1")
      this.openManageCookies()
      this.activateTracking()
      this.addCustomScript()
    }
  
    rejectCookies() {
      localStorage.setItem("GlowCookies", "0");
      this.openManageCookies();
      this.disableTracking();
    }
  
    activateTracking() {
      // Google Analytics Tracking
      if (this.tracking.AnalyticsCode) {
        let Analytics = document.createElement('script');
        Analytics.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${this.tracking.AnalyticsCode}`);
        document.head.appendChild(Analytics);
        let AnalyticsData = document.createElement('script');
        AnalyticsData.text = `window.dataLayer = window.dataLayer || [];
                                  function gtag(){dataLayer.push(arguments);}
                                  gtag('js', new Date());
                                  gtag('config', '${this.tracking.AnalyticsCode}');`;
        document.head.appendChild(AnalyticsData);
      }
  
      // Facebook pixel tracking code
      if (this.tracking.FacebookPixelCode) {
        let FacebookPixelData = document.createElement('script');
        FacebookPixelData.text = `
                                      !function(f,b,e,v,n,t,s)
                                      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                                      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                                      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                                      n.queue=[];t=b.createElement(e);t.async=!0;
                                      t.src=v;s=b.getElementsByTagName(e)[0];
                                      s.parentNode.insertBefore(t,s)}(window, document,'script',
                                      'https://connect.facebook.net/en_US/fbevents.js');
                                      fbq('init', '${this.tracking.FacebookPixelCode}');
                                      fbq('track', 'PageView');
                                  `;
        document.head.appendChild(FacebookPixelData);
        let FacebookPixel = document.createElement('noscript');
        FacebookPixel.setAttribute('height', `1`);
        FacebookPixel.setAttribute('width', `1`);
        FacebookPixel.setAttribute('style', `display:none`);
        FacebookPixel.setAttribute('src', `https://www.facebook.com/tr?id=${this.tracking.FacebookPixelCode}&ev=PageView&noscript=1`);
        document.head.appendChild(FacebookPixel);
      }
  
      // Hotjar Tracking
      if (this.tracking.HotjarTrackingCode) {
        let hotjarTrackingData = document.createElement('script');
        hotjarTrackingData.text = `
                                  (function(h,o,t,j,a,r){
                                      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                                      h._hjSettings={hjid:${this.tracking.HotjarTrackingCode},hjsv:6};
                                      a=o.getElementsByTagName('head')[0];
                                      r=o.createElement('script');r.async=1;
                                      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                                      a.appendChild(r);
                                  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                                  `;
        document.head.appendChild(hotjarTrackingData);
      }
    }
  
    disableTracking() {
      // Google Analytics Tracking ('client_storage': 'none')
      if (this.tracking.AnalyticsCode) {
        let Analytics = document.createElement('script');
        Analytics.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${this.tracking.AnalyticsCode}`);
        document.head.appendChild(Analytics);
        let AnalyticsData = document.createElement('script');
        AnalyticsData.text = `window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());
                          gtag('config', '${this.tracking.AnalyticsCode}' , {
                              'client_storage': 'none',
                              'anonymize_ip': true
                          });`;
        document.head.appendChild(AnalyticsData);
      }
  
      // Clear cookies - not working 100%
      this.clearCookies()
    }
  
    clearCookies() {
      let cookies = document.cookie.split("; ");
      for (let c = 0; c < cookies.length; c++) {
        let d = window.location.hostname.split(".");
        while (d.length > 0) {
          let cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
          let p = location.pathname.split('/');
          document.cookie = cookieBase + '/';
          while (p.length > 0) {
            document.cookie = cookieBase + p.join('/');
            p.pop();
          };
          d.shift();
        }
      }
    }
  
    addCustomScript() {
      if (this.tracking.customScript !== undefined) {
        let customScriptTag
  
        this.tracking.customScript.forEach(script => {
          if (script.type === 'src') {
            customScriptTag = document.createElement('script');
            customScriptTag.setAttribute('src', script.content);
          } else if (script.type === 'custom') {
            customScriptTag = document.createElement('script');
            customScriptTag.text = script.content;
          }
  
          if (script.position === 'head') {
            document.head.appendChild(customScriptTag);
          } else {
            document.body.appendChild(customScriptTag);
          }
        })
      }
    }
  
    start(languaje, obj) {
      if (!obj) obj = {}
      const lang = new LanguagesGC(languaje)
  
      this.config = {
        border: obj.border || 'border',
        position: obj.position || 'left',
        hideAfterClick: obj.hideAfterClick || false,
        bannerStyle: obj.style || 2
      }
  
      this.tracking = {
        AnalyticsCode: obj.analytics || undefined,
        FacebookPixelCode: obj.facebookPixel || undefined,
        HotjarTrackingCode: obj.hotjar || undefined,
        customScript: obj.customScript || undefined
      }
  
      this.banner = {
        description: obj.bannerDescription || lang.bannerDescription,
        linkText: obj.bannerLinkText || lang.bannerLinkText,
        link: obj.policyLink || '#link',
        background: obj.bannerBackground || '#fff',
        color: obj.bannerColor || '#1d2e38',
        heading: obj.bannerHeading !== 'none' ? obj.bannerHeading || lang.bannerHeading : '',
        acceptBtn: {
          text: obj.acceptBtnText || lang.acceptBtnText,
          background: obj.acceptBtnBackground || '#253b48',
          color: obj.acceptBtnColor || '#fff'
        },
        rejectBtn: {
          text: obj.rejectBtnText || lang.rejectBtnText,
          background: obj.rejectBtnBackground || '#E8E8E8',
          color: obj.rejectBtnColor || '#636363'
        },
        manageCookies: {
          color: obj.manageColor || '#1d2e38',
          background: obj.manageBackground || '#fff',
          text: obj.manageText || lang.manageText,
        }
      }
  
      // Draw banner
      window.addEventListener('load', () => { this.render() })
    }
  }
  
  class LanguagesGC {
    constructor(code) {
      this.init()
      let lang = this.arrLang[code] || this.arrLang['en']
      this.bannerHeading = lang['bannerHeading']
      this.bannerDescription = lang['bannerDescription']
      this.bannerLinkText = lang['bannerLinkText']
      this.acceptBtnText = lang['acceptBtnText']
      this.rejectBtnText = lang['rejectBtnText']
      this.manageText = lang['manageText']
    }
  
    init() {
      this.arrLang = {
        af: {
          'bannerHeading': 'Ons gebruik koekies',
          'bannerDescription': 'Ons gebruik ons eie koekies en die van derdepartye, om inhoud te verpersoonlik en om webverkeer te ontleed.',
          'bannerLinkText': 'Lees meer oor koekies',
          'acceptBtnText': 'Aanvaar koekies',
          'rejectBtnText': 'Weier',
          'manageText': 'Koekie-instellings'
        },
        bg: {
          'bannerHeading': 'ĐĐ¸Đľ Đ¸ĐˇĐżĐžĐťĐˇĐ˛Đ°ĐźĐľ ĐąĐ¸ŃĐşĐ˛Đ¸ŃĐşĐ¸',
          'bannerDescription': 'ĐĐˇĐżĐžĐťĐˇĐ˛Đ°ĐźĐľ Đ˝Đ°ŃĐ¸ Đ¸ ĐąĐ¸ŃĐşĐ˛Đ¸ŃĐşĐ¸ Đ˝Đ° ŃŃĐľŃĐ¸ ŃŃŃĐ°Đ˝Đ¸, ĐˇĐ° Đ´Đ° ĐˇĐ°ĐżĐ°ĐˇĐ¸Đź ĐĐ°ŃĐ¸ŃĐľ ĐżŃĐľĐ´ĐżĐžŃĐ¸ŃĐ°Đ˝Đ¸Ń Đ¸ Đ´Đ° ŃŃĐąĐ¸ŃĐ°ĐźĐľ Đ°Đ˝Đ°ĐťĐ¸ŃĐ¸ŃĐ˝Đ¸ Đ´Đ°Đ˝Đ˝Đ¸.',
          'bannerLinkText': 'ĐŃĐžŃĐľŃĐľŃĐľ ĐżĐžĐ˛ĐľŃĐľ ĐˇĐ° ĐąĐ¸ŃĐşĐ˛Đ¸ŃĐşĐ¸ŃĐľ',
          'acceptBtnText': 'ĐŃĐ¸ĐľĐźĐ¸ ĐąĐ¸ŃĐşĐ˛Đ¸ŃĐşĐ¸ŃĐľ',
          'rejectBtnText': 'ĐŃĐşĐ°ĐśĐ¸',
          'manageText': 'ĐĐ°ŃŃŃĐžĐš ĐąĐ¸ŃĐşĐ˛Đ¸ŃĐşĐ¸ŃĐľ'
        },
        de: {
          'bannerHeading': 'Verwendung von Cookies',
          'bannerDescription': 'Wir nutzen Cookies (auch von Drittanbietern), um Inhalte zu personalisieren und Surfverhalten zu analysieren.',
          'bannerLinkText': 'Mehr Ăźber Cookies',
          'acceptBtnText': 'Cookies akzeptieren',
          'rejectBtnText': 'Ablehnen',
          'manageText': 'Cookies verwalten'
        },
        en: {
          'bannerHeading': 'We use cookies',
          'bannerDescription': 'We use our own and third-party cookies to personalize content and to analyze web traffic.',
          'bannerLinkText': 'Mai multe detalii:',
          'acceptBtnText': 'Accept cookies',
          'rejectBtnText': 'Reject',
          'manageText': 'Manage cookies'
        },
        sv: {
          'bannerHeading': 'Vi anvĂ¤nder cookies',
          'bannerDescription' : 'Vi anvĂ¤nder vĂĽra egna och tredjepartscookies fĂśr att personalisera innehĂĽll och till statistik.',
          'bannerLinkText' : 'LĂ¤s mer om cookies',
          'acceptBtnText' : 'Acceptera cookies',
          'rejectBtnText' : 'AvslĂĽ',
          'manageText' : 'Hantera cookies'
        },
        no: {
          'bannerHeading': 'Vi benytter cookies',
          'bannerDescription' : 'Vi benytter vĂĽre egne og tredjepartscookies for ĂĽ personalisere innehold og til statistikk.',
          'bannerLinkText' : 'Les mer om cookies',
          'acceptBtnText' : 'Aksepter cookies',
          'rejectBtnText' : 'AvslĂĽ',
          'manageText' : 'HĂĽndter cookies'
        },
        da: {
          'bannerHeading': 'Vi bruger cookies',
          'bannerDescription' : 'Vi bruger vores egne og tredjepartscookies til at tilpasse indhold og mĂĽle statistik.',
          'bannerLinkText' : 'LĂŚs mere om cookies',
          'acceptBtnText' : 'Accepter cookies',
          'rejectBtnText' : 'Afvis',
          'manageText' : 'Administrer cookies'
        },
        es: {
          'bannerHeading': 'Uso de cookies',
          'bannerDescription': 'Utilizamos cookies propias y de terceros para personalizar el contenido y para analizar el trĂĄfico de la web.',
          'bannerLinkText': 'Ver mĂĄs sobre las cookies',
          'acceptBtnText': 'Aceptar cookies',
          'rejectBtnText': 'Rechazar',
          'manageText': 'Cookies'
        },
        fr: {
          'bannerHeading': 'Nous utilisons des cookies',
          'bannerDescription': 'Nous utilisons nos propres cookies et ceux de tiers pour adapter le contenu et analyser le trafic web.',
          'bannerLinkText': 'En savoir plus sur les cookies',
          'acceptBtnText': 'Accepter les cookies',
          'rejectBtnText': 'Refuser',
          'manageText': 'ParamĂŠtrez les cookies'
        },
        it: {
          'bannerHeading': 'Utilizziamo i cookie',
          'bannerDescription': 'Utilizziamo cookie nostri e di terze parti per personalizzare il contenuto e analizzare il traffico web.',
          'bannerLinkText': 'Per saperne di piĂš riguardo i cookie',
          'acceptBtnText': 'Accetta i cookie',
          'rejectBtnText': 'Rifiuta',
          'manageText': 'Gestisci i cookie'
        },
        mg: {
          'bannerHeading': 'Izahay dia mampiasa cookies',
          'bannerDescription': "Mampiasa ny cookies anay manokana sy ireo an'ny antoko fahatelo izahay hampifanarahana ny atiny sy hamakafaka ny fivezivezena amin'ny tranonkala.",
          'bannerLinkText': 'Maniry halala bebe kokoa momba ny cookies',
          'acceptBtnText': 'Manaiky ireo cookies',
          'rejectBtnText': 'Tsy mety',
          'manageText': 'Hamboarina ny cookies'
        },
        nl: {
          'bannerHeading': 'We gebruiken cookies',
          'bannerDescription': 'We gebruiken onze en third-party cookies om content te personaliseren en web traffic te analyseren.',
          'bannerLinkText': 'Lees meer over cookies',
          'acceptBtnText': 'Cookies accepteren',
          'rejectBtnText': 'Weigeren',
          'manageText': 'Cookies beheren'
        },
        oc: {
          'bannerHeading': 'Utilizam de cookies',
          'bannerDescription': 'Utilizam nĂ˛stres prĂ˛pris cookies e de cookies tĂ¨rces per adaptar lo contengut e analisar lo trafic web.',
          'bannerLinkText': 'Ne saber mai suls cookies',
          'acceptBtnText': 'Acceptar los cookies',
          'rejectBtnText': 'Refusar',
          'manageText': 'Configurar los cookies'
        },        
        pl: {
          'bannerHeading': 'UĹźywamy plikĂłw cookie',
          'bannerDescription': 'Ta strona uĹźywa plikĂłw cookie - zarĂłwno wĹasnych, jak i od zewnÄtrznych dostawcĂłw, w celu personalizacji treĹci i analizy ruchu.',
          'bannerLinkText': 'WiÄcej o plikach cookie',
          'acceptBtnText': 'Zaakceptuj pliki cookie',
          'rejectBtnText': 'OdrzuÄ',
          'manageText': 'Ustawienia plikĂłw cookie'
        },
        pt_BR: {
          'bannerHeading': 'Uso de cookies',
          'bannerDescription': 'Usamos cookies prĂłprios e de terceiros para personalizar o conteĂşdo e analisar o trĂĄfego da web.',
          'bannerLinkText': 'Leia mais sobre os cookies',
          'acceptBtnText': 'Aceitar cookies',
          'rejectBtnText': 'Rejeitar',
          'manageText': 'Gerenciar cookies'
        },
        ru: {
          'bannerHeading': 'ĐĐžĐˇĐ˛ĐžĐťŃŃĐľ Đ¸ŃĐżĐžĐťŃĐˇĐžĐ˛Đ°ŃŃ ĐşŃĐşĐ¸?',
          'bannerDescription': 'ĐŃ Đ¸ŃĐżĐžĐťŃĐˇŃĐľĐź ŃĐžĐąŃŃĐ˛ĐľĐ˝Đ˝ŃĐľ Đ¸ ŃŃĐžŃĐžĐ˝Đ˝Đ¸Đľ ĐşŃĐşĐ¸ Đ´ĐťŃ ĐżĐľŃŃĐžĐ˝Đ°ĐťĐ¸ĐˇĐ°ŃĐ¸Đ¸ ĐşĐžĐ˝ŃĐľĐ˝ŃĐ° Đ¸ Đ°Đ˝Đ°ĐťĐ¸ĐˇĐ° Đ˛ĐľĐą-ŃŃĐ°ŃĐ¸ĐşĐ°.',
          'bannerLinkText': 'ĐŁĐˇĐ˝Đ°ŃŃ ĐąĐžĐťŃŃĐľ ĐżŃĐž ĐşŃĐşĐ¸.',
          'acceptBtnText': 'ĐĐş, Đ¸ŃĐżĐžĐťŃĐˇŃĐšŃĐľ',
          'rejectBtnText': 'ĐĐľ ŃĐ°ĐˇŃĐľŃĐ°Ń',
          'manageText': 'Đ Đ°ĐˇŃĐľŃĐ¸ŃĐľ Đ¸ŃĐżĐžĐťŃĐˇĐžĐ˛Đ°ŃŃ ĐşŃĐşĐ¸?'
        },
        sk: {
          'bannerHeading': 'PouĹžĂ­vame cookies',
          'bannerDescription': 'Na prispĂ´sobenie obsahu a analĂ˝zu webovej strĂĄnky pouĹžĂ­vame vlastnĂŠ cookies a cookies tretĂ­ch strĂĄn.',
          'bannerLinkText': 'Äo sĂş cookies?',
          'acceptBtnText': 'PovoliĹĽ cookies',
          'rejectBtnText': 'NepovoliĹĽ',
          'manageText': 'SpravovaĹĽ cookies'
        },
        th: {
          'bannerHeading': 'Cookies',
          'bannerDescription': 'ŕ¸ŕ¸§ŕ¸ŕšŕ¸Łŕ¸˛ŕšŕ¸ŕšŕ¸ŕ¸¸ŕ¸ŕ¸ŕ¸ľŕšŕ¸ŕ¸¸ŕ¸ŕ¸ŕ¸Ľŕ¸ŕ¸ľŕšŕ¸Şŕ¸˛ŕ¸Ą ŕšŕ¸ŕ¸ˇŕšŕ¸­ŕ¸ŕ¸Łŕ¸ąŕ¸ŕšŕ¸ŕšŕ¸ŕšŕ¸ŕ¸ˇŕšŕ¸­ŕ¸Ťŕ¸˛ŕšŕ¸Ľŕ¸°ŕ¸§ŕ¸´ŕšŕ¸ŕ¸Łŕ¸˛ŕ¸°ŕ¸Ťŕšŕ¸ŕ¸˛ŕ¸Łŕšŕ¸ŕšŕ¸˛ŕ¸ŕ¸Ąŕšŕ¸§ŕšŕ¸',
          'bannerLinkText': 'ŕ¸­ŕšŕ¸˛ŕ¸ŕšŕ¸ŕ¸´ŕšŕ¸Ąŕšŕ¸ŕ¸´ŕ¸Ąŕšŕ¸ŕ¸ľŕšŕ¸˘ŕ¸§ŕ¸ŕ¸ąŕ¸ŕ¸ŕ¸¸ŕ¸ŕ¸ŕ¸ľŕš',
          'acceptBtnText': 'ŕ¸˘ŕ¸­ŕ¸Ąŕ¸Łŕ¸ąŕ¸ŕ¸ŕ¸¸ŕ¸ŕ¸ŕ¸ľŕš',
          'rejectBtnText': 'ŕ¸ŕ¸ŕ¸´ŕšŕ¸Şŕ¸ŕ¸ŕ¸¸ŕ¸ŕ¸ŕ¸ľŕš',
          'manageText': 'Cookies'
        },
        tr: {
          'bannerHeading': 'Ăerez kullanÄąmÄą',
          'bannerDescription': 'Ä°Ă§eriÄi kiĹiselleĹtirmek ve web trafiÄini analiz etmek iĂ§in kendi ve ĂźĂ§ĂźncĂź taraf Ă§erezlerimizi kullanÄąyoruz.',
          'bannerLinkText': 'Ăerezler hakkÄąnda daha fazlasÄąnÄą okuyun',
          'acceptBtnText': 'Ăerezleri kabul et',
          'rejectBtnText': 'Reddet',
          'manageText': 'Ăerezleri yĂśnet'
        },
        uk: {
          'bannerHeading': 'ĐĐ¸ Đ˛Đ¸ĐşĐžŃĐ¸ŃŃĐžĐ˛ŃŃĐźĐž ĐşŃĐşŃ',
          'bannerDescription': 'ĐĐ¸ Đ˛Đ¸ĐşĐžŃĐ¸ŃŃĐžĐ˛ŃŃĐźĐž Đ˛ĐťĐ°ŃĐ˝Ń ŃĐ° ŃŃĐžŃĐžĐ˝Đ˝Ń cookie Đ´ĐťŃ ĐżĐľŃŃĐžĐ˝Đ°ĐťŃĐˇĐ°ŃŃŃ Đ´ĐžŃĐ˛ŃĐ´Ń ĐşĐžŃĐ¸ŃŃŃĐ˛Đ°Đ˝Đ˝Ń ŃĐ° Đ°Đ˝Đ°ĐťŃĐˇŃ Đ˛ĐľĐą-ŃŃĐ°ŃŃĐşŃ.',
          'bannerLinkText': 'ĐŃĐˇĐ˝Đ°ĐšŃĐľŃŃ ĐąŃĐťŃŃĐľ ĐżŃĐž cookie',
          'acceptBtnText': 'ĐŃĐ¸ĐšĐ˝ŃŃĐ¸',
          'rejectBtnText': 'ĐŃĐ´ŃĐ¸ĐťĐ¸ŃĐ¸',
          'manageText': 'ĐĐ°ĐťĐ°ŃŃŃĐ˛Đ°Đ˝Đ˝Ń cookie'
        },
        ja: {
          'bannerHeading': 'Cookies ăä˝żç¨ăăŚăăžă',
          'bannerDescription': 'ç§ăăĄăŻăăłăłăăłăăŽăăźă˝ăăŠă¤ăşăăăŠăăŁăăŻăŽĺćăŽăăăŤăçŹčŞăăăłăľăźăăăźăăŁăźčŁ˝ Cookies ăä˝żç¨ăăŚăăžăă',
          'bannerLinkText': 'CookiesăŤă¤ăăŚčŠłăăčŚă',
          'acceptBtnText': 'CookiesăĺăĺĽăă',
          'rejectBtnText': 'ćĺŚ',
          'manageText': 'cookiesçŽĄç'
        },
        zh_TW: {
          'bannerHeading': 'ćĺä˝żç¨ Cookies',
          'bannerDescription' : 'ćĺä˝żç¨äşčŞĺˇąĺçŹŹä¸ćšç cookies äžĺäşşĺć¨çĺ§ĺŽšĺĺćçś˛é çćľéă',
          'bannerLinkText' : 'éąčŽć´ĺ¤éćź cookies',
          'acceptBtnText' : 'ĺć cookies',
          'rejectBtnText' : 'ćçľ',
          'manageText' : 'çŽĄç cookies'
        },
        zh: {
          'bannerHeading': 'ćäťŹä˝żç¨ Cookies',
          'bannerDescription': 'ćäťŹä˝żç¨äşčŞĺˇąĺçŹŹä¸ćšç cookies ćĽä¸Şć§ĺć¨çĺĺŽšĺĺćç˝éĄľçćľéă',
          'bannerLinkText': 'éčŻťć´ĺ¤ĺłäş cookies',
          'acceptBtnText': 'ĺć cookies',
          'rejectBtnText': 'ćçť',
          'manageText': 'çŽĄç cookies'
        }
      }
    }
  
  }
  
  const glowCookies = new GlowCookies()