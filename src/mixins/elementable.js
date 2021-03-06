Fossil.Mixins.Elementable = (function ($, Fossil) {
    'use strict';

    var messages = {
        not_initialized: 'The Elementable element is not initialized. Call setElement first.'
    };
    var Elementable = {
        // set the fragment root element.
        // if no template was set, then the element HTML is used.
        setElement: function (el) {
            if (this.$el) {
                this.detachElement();
            }
            this.$el = $(el);
            this.trigger('elementable:attach', this);
            return this;
        },
        // up to now, nothing is done here.
        // when element is changed or detached, this method is and must be called.
        detachElement: function () {
            this.trigger('elementable:detach', this);
            this.$el = null;
        },
        $: function () {
            if (!this.$el) {
                throw new Error(messages.not_initialized);
            }
            return this.$el.find.apply(this.$el, arguments);
        }
    };

    return Elementable;
})(jQuery, Fossil);
