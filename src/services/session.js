// Fossil.Services.Session helps in sharing data between every layer
// this service is exposed to modules as well as application.
//
// ```javascript
// new Fossil.Application({
//   services: {
//     session: Fossil.Services.Session
//   },
//   modules: {
//     '': Fossil.Module.extend({
//         foo: function () {
//             this.services.session.get('user');
//         }
//     })
//   }
// });
// ```
Fossil.Services.Session = (function (Fossil, _, Backbone) {
    'use strict';

    function requireApplicationError () {
        throw new Error();
    }
    var exposed = ['get', 'set', 'has'];

    var Session = Fossil.Service.extend({
        options: {
            expose: true,
            defaults: {}
        },
        _doActivateApplication: function(application, id) {
            var service = this;

            this.model = new Backbone.Model(this.options.defaults || {});
            _.each(exposed, function (method) {
                service[method] = _.bind(service.model[method], service.model);
            });
        },
        _doSuspendApplication: function(application, id) {
            var service = this;

            this.model = null;
            _.each(exposed, function (method) {
                service[method] = requireApplicationError;
            });
        }
    });

    _.each(exposed, function (method) {
        Session.prototype[method] = requireApplicationError;
    });

    return Session;
})(Fossil, _, Backbone);
