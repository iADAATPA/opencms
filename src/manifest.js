/**
 * @see {@link https://developer.chrome.com/extensions/manifest}
 */
module.exports = {
  name: 'open-cms-translator',
  description: 'Open CMS translator',
  author: 'Laurent Bié <l.bie@pangeanic.com>',
  version: '1.0.0',
  icons: {
    '128': 'icons/icon-128x128.png'
  },
  /**
   * @see {@link https://developer.chrome.com/extensions/declare_permissions}
   */
  permissions: [
    '<all_urls>',
    '*://*/*',
    // 'activeTab',
    // 'tabs',
    // 'background',
    // 'unlimitedStorage',
    'storage'
  ],
  browser_action: {
    default_title: 'Open CMS translator',
    default_popup: 'pages/popup.html'
  },
  // background: {
  //   persistent: false,
  //   page: 'pages/background.html'
  // },
  // options_page: 'pages/options.html',
  content_scripts: [{
    js: [
      'js/manifest.js',
      'js/vendor.js',
      'js/content.js'
    ],
    run_at: 'document_end',
    matches: ['*://*/opencms*'], // matches: ['<all_urls>'],
    all_frames: true
  }],
  manifest_version: 2,
  content_security_policy: "script-src 'self'; object-src 'self'",
  web_accessible_resources: [
    'js/content.js'
  ]
}
