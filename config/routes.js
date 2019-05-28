module.exports.routes = {

    //=========================GET WEB=============================
    'GET /': 'UserController.authenticated',
    'GET /register': 'UserController.viewRegister',
    'GET /dashboard': 'UserController.dashboard',
    'GET /logout': 'UserController.logout',
    'GET /changePass': 'UserController.changePass',
    'GET /profil': 'UserController.profil',
    'GET /change/data/web': 'UserController.update',

    'GET /customer/list': 'CustomerController.view',
    'GET /customer': 'CustomerController.list',
    'GET /detail/customer': 'CustomerController.details',
    'GET /detail/customer/:id': 'CustomerController.detail',

    'GET /role/add': 'RoleController.new',
    'GET /role': 'RoleController.view',
    'GET /list/role': 'RoleController.list',

    'GET /status/product': 'ProductStatusController.new',
    'GET /list/status/product': 'ProductStatusController.view',
    'GET /list/status': 'ProductStatusController.list',

    'GET /category': 'CategoryProductController.new',
    'GET /categories': 'CategoryProductController.view',
    'GET /list/category': 'CategoryProductController.list',

    'GET /status': 'StoreStatusController.new',
    'GET /store/status': 'StoreStatusController.view',
    'GET /list/store': 'StoreStatusController.list',

    'GET /store': 'StoreController.view',
    'GET /stores': 'StoreController.status',
    'GET /store/accept': 'StoreController.list',
    'GET /store/list': 'StoreController.store',
    'GET /detail': 'StoreController.viewDetail',
    'GET /detail/store/:id': 'StoreController.viewDetail',

    'GET /list/product': 'ProductController.list',
    'GET /list/products': 'ProductController.lists',
    'GET /detail/product/web/:id': 'ProductController.detail',

    'GET /transaction/new': 'TransactionStatusController.new',
    'GET /transaction/status/list': 'TransactionStatusController.view',
    'GET /transaction/list': 'TransactionStatusController.list',

    'GET /bank/new': 'BankController.new',
    'GET /bank/lists': 'BankController.view',
    'GET /bank/list': 'BankController.list',

    'GET /confirmation/payment': 'ConfirmController.confirmPayment',
    'GET /confirm/payment': 'ConfirmController.viewPayment',


    'GET /list/shipment/status': 'ShipmentController.view',
    'GET /new/shipment/status': 'ShipmentController.new',

    'GET /list/transaction': 'TransactionController.list',
    'GET /list/trans/view': 'TransactionController.view',

    'GET /new/banner': 'SlideController.new',
    'GET /list/banner': 'SlideController.list',
    'GET /edit/banner/:id': 'SlideController.update',
    'GET /delete/banner/:id': 'SlideController.delete',

    'GET /delete/shipment/status/:id': 'ShipmentController.delete',
    'GET /edit/shipment/:id': 'ShipmentController.update',

    'GET /detail/taransaksi/web/:id': 'TransactionController.detail',

    'GET /list/billing/web': 'BillingController.view',
    'GET /detail/billing/:id': 'BillingController.detail',
    'GET /detail/billing/:id' : 'BillingController.detail',       
    'GET /find/billing/web': 'BillingController.find',
    'GET /confirmation/billing/:id': 'BillingController.viewConfirm',
    //=========================POST WEB===================================

    'POST /register': 'UserController.register',
    'POST /login': 'UserController.login',
    'POST /change/profil/web': 'UserController.upadateProfile',
    'POST /change/password/web': 'UserController.changePassword',
    'POST /change/photo/web': 'UserController.changePhoto',
    'POST /photo': 'UserController.changePhoto',

    'POST /role/add': 'RoleController.add',
    'POST /role/update': 'RoleController.update',
    'POST /role/find': 'RoleController.find',
    'POST /role/delete': 'RoleController.delete',

    'POST /delete/product': 'ProductController.delete',

    'POST /status/product': 'ProductStatusController.add',
    'POST /find/status/product': 'ProductStatusController.find',
    'POST /update/status/product': 'ProductStatusController.update',
    'POST /delete/status/product': 'ProductStatusController.delete',

    'POST /category': 'CategoryProductController.add',
    'POST /update/category': 'CategoryProductController.update',
    'POST /find/category': 'CategoryProductController.find',
    'POST /delete/category': 'CategoryProductController.delete',

    'POST /update/store/status': 'StoreStatusController.update',
    'POST /store/status': 'StoreStatusController.add',
    'POST /find/store/status': 'StoreStatusController.find',
    'POST /delete/store/status': 'StoreStatusController.delete',

    'POST /accept/store': 'StoreController.accept',
    'POST /reject/store': 'StoreController.reject',

    'POST /transaction/add': 'TransactionStatusController.add',
    'POST /transaction/edit': 'TransactionStatusController.edit',
    'POST /transaction/find': 'TransactionStatusController.find',
    'POST /transaction/delete': 'TransactionStatusController.delete',

    'POST /bank/add': 'BankController.add',
    'POST /bank/edit': 'BankController.edit',
    'POST /bank/find': 'BankController.find',
    'POST /bank/delete': 'BankController.delete',


    'POST /accept/payment': 'ConfirmController.accept',
    'POST /reject/payment': 'ConfirmController.reject',

    'POST /new/shipment/status': 'ShipmentController.create',
    'POST /edit/shipment/status': 'ShipmentController.edit',
    
    'POST /create/banner': 'SlideController.create',
    'POST /update/banner': 'SlideController.edit',

    'POST /confirm/billing': 'BillingController.confirm', 
    //================================POST API=================================

    'POST /login/mobile': 'ApiUserController.login',
    'POST /register/mobile': 'ApiUserController.register',
    'POST /logout/mobile': 'ApiUserController.logout',
    'POST /detail/user/mobile': 'ApiUserController.detail',
    'POST /change/password/mobile': 'ApiUserController.changePassword',
    'POST /change/profile/mobile': 'ApiUserController.update',
    'POST /change/profil/mobile': 'ApiUserController.changePhoto',

    'POST /store': 'StoreController.request',
    'POST /update/store': 'StoreController.updateStore',
    'POST /detail/store/mobile': 'StoreController.detailApi',
    'POST /detail/store/mobilecus': 'StoreController.detailApiCus',

    'POST /create/product': 'ProductController.create',
    'POST /update/product': 'ProductController.update',
    'POST /detail/product/mobile': 'ProductController.detailApi',
    'POST /lidt/product/store': 'ProductController.listApiStore',
    'POST /lidt/product/store/name': 'ProductController.listApiStoreName',
    'POST /lidt/product/store/price': 'ProductController.listApiStorePrice',
    'POST /lidt/product/store/price2': 'ProductController.listApiStorePrice2',
    'POST /list/product/category': 'ProductController.listApiCategory',
    'POST /list/product/category/aksesoris': 'ProductController.listApiAksesoris',
    'POST /add/image/product': 'ProductController.addImage',
    'POST /list/product/category': 'ProductController.listProductCategory',
    'POST /search/product': 'ProductController.search',

    'POST /create/address': 'AddressController.address',
    'POST /update/address': 'AddressController.update',
    'POST /detail/address': 'AddressController.detail',

    'POST /belisekarang': 'TransactionController.orderNow',
    'POST /create/confirmPay': 'TransactionController.payment',
    'POST /checkout': 'TransactionController.checkout',
    'POST /list/api/customer': 'TransactionController.listApi',
    'POST /list/store/api': 'TransactionController.listApiStore',
    'POST /update/shipment': 'TransactionController.updateship',
    'POST /detail/transaction/api': 'TransactionController.detailTrans',
    'POST /list/transaction/mobile': 'TransactionController.listTransaction',
    'POST /list/transksi/user': 'TransactionController.listTransaksiUser',
    'POST /list/transaction/store': 'TransactionController.listTransStore',
    'POST /transaction/ongkir': 'TransactionController.ongkir',
    'POST /update/status/transaksi': 'TransactionController.update',
    'POST /update/cart/is_active': 'TransactionController.updateIsActive',
    'POST /list/notif/mobile' : 'TransactionController.listNotif',
    'POST /detail/notif/mobile': 'TransactionController.detailNotif',

    'POST /list/status/transaction': 'TransactionStatusController.listApi',

    'POST /create/chat': 'ChatController.create',

    'POST /create/review': 'ReviewController.create',
    'POST /delete/review': 'ReviewController.delete',
    'POST /list/review': 'ReviewController.list',
    'POST /list/reviewBy': 'ReviewController.listby',

    'POST /create/cart': 'CartController.add',
    'POST /update/cart': 'CartController.update',
    'POST /delete/cart': 'CartController.delete',
    'POST /list/cart': 'CartController.list',

    'POST /list/notif': 'ConfirmController.listNotif',

    'POST /create/blog': 'BlogController.create',
    'POST /update/blog': 'BlogController.update',
    'POST /list/blog': 'BlogController.list',
    'POST /delete/blog': 'BlogController.delete',

    'POST /update/category/api': 'CategoryProductController.uodateApi',

    'POST /listApi/bank': 'BankController.listApi',

    'POST /detail/billing': 'BillingController.detailApi',
    'POST /list/billing': 'BillingController.list',

    //===================================GET API===================================
    
    'GET /list/review': 'ReviewController.list',
    
    'GET /list/chat': 'ChatController.list',
    
    'GET /list/product/mobile': 'ProductController.listApi',
    'GET /list/product/mobile/name': 'ProductController.listApiName',
    'GET /list/product/mobile/price': 'ProductController.listApiPrice',
    'GET /list/product/mobile/price2': 'ProductController.listApiPrice2',
    'GET /list/product/mobile/rekomendasi': 'ProductController.listApiRekomendasi',
    'Get /list/product2/mobile': 'ProductController.coba',
    
    'GET /list/slide': 'SlideController.find',
    
    'GET /list/category/api': 'CategoryProductController.listApi',
    
    'GET /list/payment/status/api': 'PaymentStatusController.listApi',
    'GET /detail/pembayaran/:id': 'PaymentStatusController.detailPay',

    'GET /list/product/status/api': 'ProductStatusController.listApi',

    'GET /list/shipment/status/api': 'ShipmentController.listApi',

    'GET /list/status/transaksi': 'TransactionStatusController.listTransApi',

};