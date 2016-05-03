;(function($, window, document, undefined) {

  'use strict';

  var pluginName = 'bsFormValidate';
  var defaults = {
    formGroupClass: 'form-group',
    errorClass: 'has-error'
  };

  function Plugin(element, options) {
    this.element = element;
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.$form = $(element);
    this.$fields = $(element).find('input, select');
    this.hasErrors = false;
    this.init();
  }

  $.extend(Plugin.prototype, {

    init: function() {
      this.addListeners();
    },

    addListeners: function() {
      this.$form.submit(this.handleSubmit.bind(this));

      this.$fields.on('blur', this.handleInputBlur.bind(this));
    },

    handleInputBlur: function(e) {
      var $field = $(e.target);
      this.validateField($field);
    },

    handleSubmit: function(e) {
      return this.validate();
    },

    validate: function() {
      var self = this;

      this.$fields.each(function() {
        self.validateField($(this));
      });

      if(this.hasErrors) {
        return false;
      }

      return true;
    },

    validateField: function($field) {
      if($field.attr('required') && !$field.val()) {
        this.addErrorClass($field);
        this.hasErrors = true;
      } else {
        this.removeErrorClass($field);
        this.hasErrors = false;
      }
    },

    addErrorClass: function($field) {
      $field.closest('.' + this.settings.formGroupClass).addClass(this.settings.errorClass);
    },

    removeErrorClass: function($field) {
      $field.closest('.' + this.settings.formGroupClass).removeClass(this.settings.errorClass);
    }

  });

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if(!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  };

})(jQuery, window, document);;

