const router = {
  api: [
    { httpRoute: '/status', route: '/routes/api/status/status.route', handler: 'get', method: 'GET', protected: false },
    // Auth
    { httpRoute: '/login', route: '/routes/api/auth/auth.route', handler: 'login', method: 'POST', protected: false },
    { httpRoute: '/logout', route: '/routes/api/auth/auth.route', handler: 'logout', method: 'POST', protected: false },
    { httpRoute: '/validate-email/', route: '/routes/api/auth/auth.route', handler: 'validateEmail', method: 'POST', protected: false },
    { httpRoute: '/validate-account-chatbot', route: '/routes/api/auth/auth.route', handler: 'validateAccountChatbot', method: 'POST', protected: false },
    // Locale
    { httpRoute: '/locale/', route: '/routes/api/locale/locale.route', handler: 'getAllLocales', method: 'GET', protected: false },
    { httpRoute: '/locale/get-idd-countries/', route: '/routes/api/locale/locale.route', handler: 'getAllIDDCountries', method: 'GET', protected: false },
    { httpRoute: '/locale/get-locale/', route: '/routes/api/locale/locale.route', handler: 'getLocale', method: 'GET', protected: false },
    // Notification
    { httpRoute: '/notification/', route: '/routes/api/notification/notification.route', handler: 'get', method: 'GET', protected: false },
    { httpRoute: '/notification/', route: '/routes/api/notification/notification.route', handler: 'create', method: 'POST', protected: false },
    { httpRoute: '/notification/', route: '/routes/api/notification/notification.route', handler: 'update', method: 'PATCH', protected: false },
    // User
    { httpRoute: '/user/', route: '/routes/api/user/user.route', handler: 'get', method: 'GET', protected: false },
    { httpRoute: '/user/', route: '/routes/api/user/user.route', handler: 'create', method: 'POST', protected: false },
    { httpRoute: '/user/', route: '/routes/api/user/user.route', handler: 'update', method: 'PATCH', protected: false },
    // Credit
    { httpRoute: '/credit/', route: '/routes/api/credit/credit.route', handler: 'get', method: 'GET', protected: false },
    { httpRoute: '/credit/', route: '/routes/api/credit/credit.route', handler: 'create', method: 'POST', protected: false },
    { httpRoute: '/credit/', route: '/routes/api/credit/credit.route', handler: 'update', method: 'PATCH', protected: false },
    // Bank
    { httpRoute: '/bank/budget', route: '/routes/api/bank/bank.route', handler: 'get', method: 'GET', protected: false }
  ],
  frontend: [
    { httpRoute: '/', route: '/routes/frontend/home/home.route', handler: 'index' },
    { httpRoute: '/robots.txt', route: '/routes/frontend/seo/seo.route', handler: 'robots' },
    { httpRoute: '/sitemap/master.xml', route: '/routes/frontend/seo/seo.route', handler: 'sitemapMaster' },
    { httpRoute: '/sitemap/latest.xml', route: '/routes/frontend/seo/seo.route', handler: 'sitemapLatest' }
  ]
}

module.exports = router
