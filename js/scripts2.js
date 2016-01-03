/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

;(function( $ ){

  'use strict';

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null,
      ignore: null
    };

    if(!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement("div");
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        'iframe[src*="player.vimeo.com"]',
        'iframe[src*="youtube.com"]',
        'iframe[src*="youtube-nocookie.com"]',
        'iframe[src*="kickstarter.com"][src*="video.html"]',
        'object',
        'embed'
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var ignoreList = '.fitvidsignore';

      if(settings.ignore) {
        ignoreList = ignoreList + ', ' + settings.ignore;
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not('object object'); // SwfObj conflict patch
      $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

      $allVideos.each(function(count){
        var $this = $(this);
        if($this.parents(ignoreList).length > 0) {
          return; // Disable FitVids on this video.
        }
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
        {
          $this.attr('height', 9);
          $this.attr('width', 16);
        }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + count;
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+'%');
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );
;/*! jQuery Validation Plugin - v1.13.1 - 10/14/2014
 * http://jqueryvalidation.org/
 * Copyright (c) 2014 Jörn Zaefferer; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.validateDelegate(":submit","click",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(b.target).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(b.target).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.submit(function(b){function d(){var d,e;return c.settings.submitHandler?(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),e=c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),void 0!==e?e:!1):!0}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c;return a(this[0]).is("form")?b=this.validate().form():(b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b})),b},removeAttrs:function(b){var c={},d=this;return a.each(b.split(/\s/),function(a,b){c[b]=d.attr(b),d.removeAttr(b)}),c},rules:function(b,c){var d,e,f,g,h,i,j=this[0];if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(b,c){i[c]=f[c],delete f[c],"required"===c&&a(j).removeAttr("aria-required")}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g),a(j).attr("aria-required","true")),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}),a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){return!!a.trim(""+a(b).val())},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(a,b){(9!==b.which||""!==this.elementValue(a))&&(a.name in this.submitted||a===this.lastElement)&&this.element(a)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date ( ISO ).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c=a.data(this[0].form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!this.is(e.ignore)&&e[d].call(c,this[0],b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']","focusin focusout keyup",b).validateDelegate("select, option, [type='radio'], [type='checkbox']","click",b),this.settings.invalidHandler&&a(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler),a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c=this.clean(b),d=this.validationTargetFor(c),e=!0;return this.lastElement=d,void 0===d?delete this.invalid[c.name]:(this.prepareElement(d),this.currentElements=a(d),e=this.check(d)!==!1,e?delete this.invalid[d.name]:this.invalid[d.name]=!0),a(b).attr("aria-invalid",!e),this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),e},showErrors:function(b){if(b){a.extend(this.errorMap,b),this.errorList=[];for(var c in b)this.errorList.push({message:b[c],element:this.findByName(c)[0]});this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled], [readonly]").not(this.settings.ignore).filter(function(){return!this.name&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in c||!b.objectLength(a(this).rules())?!1:(c[this.name]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([]),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d=a(b),e=b.type;return"radio"===e||"checkbox"===e?a("input[name='"+b.name+"']:checked").val():"number"===e&&"undefined"!=typeof b.validity?b.validity.badInput?!1:d.val():(c=d.val(),"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f=a(b).rules(),g=a.map(f,function(a,b){return b}).length,h=!1,i=this.elementValue(b);for(d in f){e={method:d,parameters:f[d]};try{if(c=a.validator.methods[d].call(this,i,b,e.parameters),"dependency-mismatch"===c&&1===g){h=!0;continue}if(h=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(j){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",j),j}}if(!h)return this.objectLength(f)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a];return void 0},defaultMessage:function(b,c){return this.findDefined(this.customMessage(b.name,c),this.customDataMessage(b,c),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c],"<strong>Warning: No message defined for "+b.name+"</strong>")},formatAndAdd:function(b,c){var d=this.defaultMessage(b,c.method),e=/\$?\{(\d+)\}/g;"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),this.errorList.push({message:d,element:b,method:c.method}),this.errorMap[b.name]=d,this.submitted[b.name]=d},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d,e,f,g=this.errorsFor(b),h=this.idOrName(b),i=a(b).attr("aria-describedby");g.length?(g.removeClass(this.settings.validClass).addClass(this.settings.errorClass),g.html(c)):(g=a("<"+this.settings.errorElement+">").attr("id",h+"-error").addClass(this.settings.errorClass).html(c||""),d=g,this.settings.wrapper&&(d=g.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement(d,a(b)):d.insertAfter(b),g.is("label")?g.attr("for",h):0===g.parents("label[for='"+h+"']").length&&(f=g.attr("id").replace(/(:|\.|\[|\])/g,"\\$1"),i?i.match(new RegExp("\\b"+f+"\\b"))||(i+=" "+f):i=f,a(b).attr("aria-describedby",i),e=this.groups[b.name],e&&a.each(this.groups,function(b,c){c===e&&a("[name='"+b+"']",this.currentForm).attr("aria-describedby",g.attr("id"))}))),!c&&this.settings.success&&(g.text(""),"string"==typeof this.settings.success?g.addClass(this.settings.success):this.settings.success(g,b)),this.toShow=this.toShow.add(g)},errorsFor:function(b){var c=this.idOrName(b),d=a(b).attr("aria-describedby"),e="label[for='"+c+"'], label[for='"+c+"'] *";return d&&(e=e+", #"+d.replace(/\s+/g,", #")),this.errors().filter(e)},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+b+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):!0},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(a){this.pending[a.name]||(this.pendingRequest++,this.pending[a.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),/min|max/.test(c)&&(null===g||/number|range|text/.test(g))&&(d=Number(d)),d||0===d?e[c]=d:g===c&&"range"!==g&&(e[c]=!0);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b);for(c in a.validator.methods)d=f.data("rule"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase()),void 0!==d&&(e[c]=d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0!==e.param?e.param:!0:delete b[d]}}),a.each(b,function(d,e){b[d]=a.isFunction(e)?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:a.trim(b).length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9 \-]+/.test(a))return!1;var c,d,e=0,f=0,g=!1;if(a=a.replace(/\D/g,""),a.length<13||a.length>19)return!1;for(c=a.length-1;c>=0;c--)d=a.charAt(c),f=parseInt(d,10),g&&(f*=2)>9&&(f-=9),e+=f,g=!g;return e%10===0},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||d>=e},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||c>=a},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d){if(this.optional(c))return"dependency-mismatch";var e,f,g=this.previousValue(c);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),g.originalMessage=this.settings.messages[c.name].remote,this.settings.messages[c.name].remote=g.message,d="string"==typeof d&&{url:d}||d,g.old===b?g.valid:(g.old=b,e=this,this.startRequest(c),f={},f[c.name]=b,a.ajax(a.extend(!0,{url:d,mode:"abort",port:"validate"+c.name,dataType:"json",data:f,context:e.currentForm,success:function(d){var f,h,i,j=d===!0||"true"===d;e.settings.messages[c.name].remote=g.originalMessage,j?(i=e.formSubmitted,e.prepareElement(c),e.formSubmitted=i,e.successList.push(c),delete e.invalid[c.name],e.showErrors()):(f={},h=d||e.defaultMessage(c,"remote"),f[c.name]=g.message=a.isFunction(h)?h(b):h,e.invalid[c.name]=!0,e.showErrors(f)),g.valid=j,e.stopRequest(c,j)}},d)),"pending")}}}),a.format=function(){throw"$.format has been deprecated. Please use $.validator.format instead."};var b,c={};a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)}),a.extend(a.fn,{validateDelegate:function(b,c,d){return this.bind(c,function(c){var e=a(c.target);return e.is(b)?d.apply(e,arguments):void 0})}})});;/*********************************************** 
  needPopup 
  - Version 1.0.0
  - Copyright 2015 Dzmitry Vasileuski
	- Licensed under MIT (http://opensource.org/licenses/MIT)
***********************************************/

// popup object
var needPopup = (function() {

	// namespace
	var popup = {};
	// cached nodes
	popup.html = document.documentElement,
  popup.body = document.body,
  popup.window = window,
  // state variables
	popup.target = 0, 
	// window scroll top
  popup.scrollTopVal = 0,
  // window scroll height
  popup.scrollHeight = popup.body.scrollHeight > popup.html.scrollHeight ? popup.body.scrollHeight : popup.html.scrollHeight,
  // html class when popup is opened
  popup.openHtmlClass = popup.scrollHeight > popup.window.innerHeight ? 'needpopup-opened needpopup-scrolled' : 'needpopup-opened';

	// global methods and properties
	return {

		/* Initialization of popup
		***********************************************/
		init : function() {

			// set default config
			popup.options = needPopup.config.default;

			// bind popup show to data-popupshow nodes
			$(popup.body).on('click','[data-needpopup-show]', function(event) {
				event.preventDefault();
				needPopup.show($(this).data('needpopupShow'),$(this));
			})

			// bind popup hide to removers
			$(popup.body).on('click','.needpopup_wrapper .remove, .needpopup_remover', function(event) {
				event.preventDefault();
				needPopup.hide();
			})

			// bind popup hide if clicked outside
			$(popup.body).on('click','.needpopup_wrapper', function(event) {
				if (!$(event.target).is('.needpopup_wrapper')) return;

				if (!popup.options.closeOnOutside) return;

				// check if clicked outside of popup window
				if ($(event.target).closest('.needpopup').length || $(event.target).is('.needpopup, .remove, .needpopup_remover')) return;

				needPopup.hide();
			})

			// hide popup on Esc
			$(document).keydown(function(event){
				if (event.which == 27) {
					needPopup.hide();
				}
			})

			// corrections on window resize
			popup.resizeTimeout = 0;
			popup.resizeAllowed = true;
			$(popup.window).on('resize',function() {
				// throttling
				clearTimeout(popup.resizeTimeout);
				if (popup.resizeAllowed) {
          popup.resizeAllowed = false;

					// centrify popup
					needPopup.centrify();
					// recalculate window scroll height
					popup.scrollHeight = popup.body.scrollHeight > popup.html.scrollHeight ? popup.body.scrollHeight : popup.html.scrollHeight,
					// change open htmml class if needed
			 		popup.openHtmlClass = popup.scrollHeight > popup.window.innerHeight ? 'needpopup-opened needpopup-scrolled' : 'needpopup-opened';
			 	}
        popup.resizeTimeout = setTimeout(function() {
          popup.resizeAllowed = true;
        }, 100);
			})

			// create popup wrapper
			popup.wrapper = document.createElement('div');
			popup.wrapper.className = 'needpopup_wrapper';
			popup.body.appendChild(popup.wrapper);
			popup.wrapper = $(popup.wrapper);
		},

		/* Show popup
		***********************************************/
		show : function(_target, _trigger) {

			// save popup trigger if it exists
			if (!_trigger)
				popup.trigger = 0;
			else
				popup.trigger = _trigger;

			// hide already opened popup
			if (popup.target)
				needPopup.hide(true);
			else {
				// recalculate window scroll top
				popup.scrollTopVal = popup.window.pageYOffset;

				// block page scroll
				$(popup.body).css({'top': -popup.scrollTopVal});
				$(popup.html).addClass(popup.openHtmlClass);
			}
			
			// set target popup
			popup.target = $(_target);

			// reset options if defined
			popup.options = {};
			$.extend( popup.options, needPopup.config['default'] );
			if (!!popup.target.data('needpopupOptions'))
				$.extend( popup.options, needPopup.config[popup.target.data('needpopupOptions')] );


			// cache popup width
			popup.minWidth = popup.target.outerWidth();

			// create layout
			popup.wrapper.append(popup.target);
			if (popup.options.removerPlace == 'outside')
				popup.wrapper.after('<a href="#" class="needpopup_remover"></a>');
			else if (popup.options.removerPlace == 'inside')
				popup.target.append('<a href="#" class="needpopup_remover"></a>'); 

			// on before show callback
			popup.options.onBeforeShow.call(popup,popup.target);
			
			// display popup
			popup.target.show();
			// centrify popup
			needPopup.centrify();
			// add opened class to popup (timeout for transitions)
			setTimeout(function(){
				popup.target.addClass('opened');

				// on show callback
				popup.options.onShow.call(popup,popup.target);
			},10);
		},

		/* Hide popup
		***********************************************/
		hide : function(_partial) {

			// hide popup
			popup.target.hide().removeClass('opened');
			// delete remover
			$('.needpopup_remover').remove();

			// full hiding
			if (!_partial) {

				// unblock page scroll
				$(popup.html).removeClass(popup.openHtmlClass).removeClass('needpopup-overflow');
				$(popup.body).css({'top': 0}).scrollTop(popup.scrollTopVal);
				$(popup.html).scrollTop(popup.scrollTopVal);
			}

			// on hide callback
			popup.options.onHide.call(popup,popup.target);

			// unset property
			popup.target = 0;
		},

		/* Centrify popup and set responsive classes
		***********************************************/
		centrify: function() {
			if (popup.target) {
				// vertical centrification
				if (popup.target.outerHeight() > popup.window.innerHeight)
					popup.target.addClass('stacked');
				else
					popup.target.removeClass('stacked').css({'margin-top':-popup.target.outerHeight()/2, 'top':'50%'});

				// detect width overflow
				popup.minWidth = $(popup.html).hasClass('needpopup-overflow') ? popup.minWidth : popup.target.outerWidth();
				if (popup.minWidth + 30 >= popup.window.innerWidth) {
					$(popup.html).addClass('needpopup-overflow');
				} else {
					$(popup.html).removeClass('needpopup-overflow');
				}
			}
		},

		/* Configuration object which contains all options sets
		***********************************************/
		'config': {
			'default' : {
				// 'outside' to place in wrapper and 'inside' to place in popup
				'removerPlace': 'inside',
				// close on click outside popup
				'closeOnOutside': true,
				// on show callback
				onShow: function() {},
				// on before show callback
				onBeforeShow: function() {},
				// on hide callback
				onHide: function() {}
			}
		}

	}

})();
;/*********************************************** 
  needSectionScroll 
  - Version 1.0.0
  - Copyright 2015 Dzmitry Vasileuski
	- Licensed under MIT (http://opensource.org/licenses/MIT)
***********************************************/

// plugin object
var needSectionScroll = (function() {

	// namespace
	var plugin = {};

	// cached nodes
	plugin.html = document.documentElement,
  plugin.body = document.body,
  plugin.window = window;

  // check if viewport units are supported
  plugin.isVhSupported = function() {
		var vhChecker = document.createElement('vhchecker');
	  vhChecker.setAttribute('style','position:absolute;bottom:100%;display:block;height: 50vh;');
	  document.body.appendChild(vhChecker);
	  var height = parseInt( plugin.window.innerHeight/2,10 ),
	      compStyle = parseInt( (plugin.window.getComputedStyle ? getComputedStyle(vhChecker, null) : vhChecker.currentStyle)['height'], 10 );
	  return compStyle == height;
	};

	// scroll to function
	plugin.scrollTo = function(to, duration, callback) {
		var scrollTop = ( plugin.window.pageYOffset !== undefined ) ? plugin.window.pageYOffset : document.documentElement.scrollTop,
		    scrollChange = to - scrollTop,
		    increment = 20;

		var animateScroll = function(elapsedTime) {        
      elapsedTime += increment;
      var position = easeInOut(elapsedTime, scrollTop, scrollChange, duration);

      plugin.window.scrollTo(0, position);

      if (elapsedTime < duration) {
        setTimeout(function() {
          animateScroll(elapsedTime);
        }, increment);
      } else {
        // update position after Safari bottom bar disappeared
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        	iosAnimateAfterScroll(0, callback, 50, plugin.currentSection.offsetTop - to);
        } else {
      		callback();
      	}
      }
    };

    // ios after scroll additional animation becouse of bottom bar disapperance
    var iosAnimateAfterScroll = function(elapsedTime, callback, iosDuration, iosScrollChange) {
    	elapsedTime += 5;
    	var position = to + iosScrollChange * ( elapsedTime / iosDuration );

      plugin.window.scrollTo(0, position);

			if (elapsedTime < iosDuration) {
        setTimeout(function() {
          iosAnimateAfterScroll(elapsedTime, callback, iosDuration, iosScrollChange);
        }, increment);
      } else {
      	callback();
      }
    }

    // animate scroll
    animateScroll(0);
	}

	// easing
	function easeInOut(currentTime, start, change, duration) {
    currentTime /= duration / 2;
    if (currentTime < 1) {
      return change / 2 * currentTime * currentTime + start;
    }
    currentTime -= 1;
    return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
	}

	// check if element is in viewport
	plugin.isInViewport = function(elem, mode) {
    var scrollTop = ( plugin.window.pageYOffset !== undefined ) ? plugin.window.pageYOffset : document.documentElement.scrollTop,
        scrollBottom = scrollTop + plugin.window.innerHeight,
        elemTop = elem.offsetTop,
        elemBottom = elemTop + elem.offsetHeight;

    if ( mode == 'contain' )
      return ( ((elemBottom <= scrollBottom) && (elemTop >= scrollTop)) || 
               ((elemBottom >= scrollBottom) && (elemTop <= scrollTop)) );
    else if ( mode == 'intersect' )
      return ( ((elemTop < scrollBottom) && (elemTop > scrollTop)) ||
               ((elemBottom < scrollBottom) && (elemBottom > scrollTop)) ||
               ((elemBottom >= scrollBottom) && (elemTop <= scrollTop)) );
  }

	// add css class
	plugin.addClass = function(elem, className) {
    if (elem.className.search(className) == '-1') {
      elem.className = elem.className ? elem.className + ' ' + className : className;
    }
  }

	// remove css class
	plugin.removeClass = function(elem, className) {
    var classPattern = '(^|\\s)' + className,
        re = new RegExp(classPattern, 'g');
    elem.className = elem.className.replace(re, '');
  }

  // lock scroll durin movement functions
  plugin.lockscroll = {};
  plugin.lockscroll.keys = {37: 1, 38: 1, 39: 1, 40: 1};

	plugin.lockscroll.preventDefault = function(e) {
	  e = e || plugin.window.event;
	  if (e.preventDefault)
	    e.preventDefault();
	  e.returnValue = false;  
	}

	plugin.lockscroll.preventDefaultForScrollKeys = function(e) {
    if (plugin.lockscroll.keys[e.keyCode]) {
	    plugin.lockscroll.preventDefault(e);
	    return false;
    }
	}

	plugin.lockscroll.disableScroll = function() {
	  if (plugin.window.addEventListener) // older FF
	    plugin.window.addEventListener('DOMMouseScroll', plugin.lockscroll.preventDefault, false);
	  plugin.window.onwheel = plugin.lockscroll.preventDefault; // modern standard
	  plugin.window.onmousewheel = document.onmousewheel = plugin.lockscroll.preventDefault; // older browsers, IE
	  plugin.window.ontouchmove  = plugin.lockscroll.preventDefault; // mobile
	  document.onkeydown  = plugin.lockscroll.preventDefaultForScrollKeys;
	}

	plugin.lockscroll.enableScroll = function() {
    if (plugin.window.removeEventListener)
      plugin.window.removeEventListener('DOMMouseScroll', plugin.lockscroll.preventDefault, false);
    plugin.window.onmousewheel = document.onmousewheel = null; 
    plugin.window.onwheel = null; 
    plugin.window.ontouchmove = null;  
    document.onkeydown = null;  
	}

	// global methods and properties
	return {

		/* Initialization of plugin
		***********************************************/
		init : function() {

			// set default config
			plugin.options = needSectionScroll.config['default'];

			// breake if lesser then device resolution in options
			if (plugin.window.innerWidth <= plugin.options.mobileOff)
				return

			// create and fill sections object
			plugin.sections = {};
			plugin.sectionsList = document.querySelectorAll('[data-sectionscroll]');
			for (var i = 0; i < plugin.sectionsList.length; i++) {
				var section = plugin.sectionsList[i],
				    name = section.getAttribute('data-sectionscroll');
				plugin.sections[name] = section;
				
				plugin.addClass(section, 'needsectionscroll_section');
				
				// verticalize
				if (plugin.options.verticalize) {
					var sectionContent =  document.createElement('div'),
							sectionVerticalizer =  document.createElement('div');
					plugin.addClass(sectionContent, 'needsectionscroll_section_content');
					plugin.addClass(sectionVerticalizer, 'needsectionscroll_section_verticalizer');
					sectionContent.innerHTML = section.innerHTML;
					section.innerHTML = '';
					section.appendChild(sectionContent);
					section.appendChild(sectionVerticalizer);

					plugin.addClass(section, 'needsectionscroll_section-verticalize');
				}
			}

			// create dotted nav
			/* if (plugin.options.pager) {
				plugin.pager = document.createElement('nav');
				plugin.pager.className = 'needsectionscroll_pager';

				for (var name in plugin.sections) {
					var pagerLink = document.createElement('span');
					pagerLink.setAttribute('data-sectionscroll-link', name);
					plugin.pager.appendChild(pagerLink);
				}

				switch(plugin.options.pagerPosition) {
          case 'top':
            plugin.addClass(plugin.pager, 'needsectionscroll_pager-top');
          break;
          case 'right':
            plugin.addClass(plugin.pager, 'needsectionscroll_pager-right');
          break;
          case 'bottom':
            plugin.addClass(plugin.pager, 'needsectionscroll_pager-bottom');
          break;
          case 'left':
            plugin.addClass(plugin.pager, 'needsectionscroll_pager-left');
          break;
          default:
            plugin.addClass(plugin.pager, 'needsectionscroll_pager-right');
        }

        plugin.sections['1'].parentNode.appendChild(plugin.pager);
			} */

			// set fullheight to sections
			if (plugin.isVhSupported()) {
				for (var name in plugin.sections) {
					plugin.sections[name].style.minHeight = '100vh';
				}
			} else {
				// throttle timeouts
				plugin.resizeTimeout = 0;
      	plugin.finishTimeout = 0;

      	// set initial height to sections
				updateHeight();
				
				// update height on window resize event
				plugin.window.addEventListener('resize',function() {
	        // throttling
	        clearTimeout(plugin.finishTimeout);
	        if (!plugin.resizeTimeout) {
	          updateHeight();
	        } else {
	          plugin.finishTimeout = setTimeout(function() {
	            updateHeight();
	          }, 100);
	        }
	      });
			}

			// update section height on window resize function
			function updateHeight() {
				// set resize timeout
        plugin.resizeTimeout = setTimeout(function() {
          plugin.resizeTimeout = 0;
        }, 100);

				var windowHeight = plugin.window.innerHeight;

				for (var name in plugin.sections) {
					plugin.sections[name].style.minHeight = windowHeight + 'px';
				}

				if (plugin.options.verticalize) {
					plugin.verticalizers = document.querySelectorAll('.needsectionscroll_section_verticalizer');
					for (var i = 0; i < plugin.verticalizers.length; i++) {
						plugin.verticalizers[i].style.minHeight = windowHeight + 'px';
					}
				}
			}

			// bind scroll on default scroll
			plugin.window.addEventListener('scroll', function(event) {

				// move to next section if not moving already
				if (!plugin.moving) {
					var scrollTop = ( plugin.window.pageYOffset !== undefined ) ? plugin.window.pageYOffset : document.documentElement.scrollTop,
	        		scrollBottom = scrollTop + plugin.window.innerHeight,
	        		sectionTop = plugin.currentSection.offsetTop,
	        		sectionBottom = sectionTop + plugin.currentSection.offsetHeight;

	        // check if we reach the end or start of section
					if (scrollBottom > sectionBottom) {
						needSectionScroll.moveNext();
					} else if (scrollTop < sectionTop) {
						needSectionScroll.movePrev();
					}
				} else {
					event.preventDefault();
				}
			});

			// bind scroll to controls
			plugin.navLinks = document.querySelectorAll('[data-sectionscroll-link]');
			for (var i = 0; i < plugin.navLinks.length; i++) {
				var link = plugin.navLinks[i];

				link.addEventListener('click',function() {
					if (!plugin.moving) {
						sectionName = this.getAttribute('data-sectionscroll-link');
						needSectionScroll.move(plugin.sections[sectionName]);
					}
	      });
			}

			// bind to arrows
			if (plugin.options.useArrows) {
	      document.addEventListener('keydown', function(event) {
	      	if (!plugin.moving) {

		        var tag = event.target.tagName.toLowerCase();

	          switch(event.which) {
	            case 38:
	              if (tag != 'input' && tag != 'textarea') {
	            		event.preventDefault();
	              	needSectionScroll.movePrev();
	              }
	            break;
	            case 40:
	              if (tag != 'input' && tag != 'textarea') {
	            		event.preventDefault();
	              	needSectionScroll.moveNext();
	              }
	            break;
	            case 33:
	              if (tag != 'input' && tag != 'textarea') {
	            		event.preventDefault();
	              	needSectionScroll.movePrev();
	              }
	            break;
	            case 34:
	              if (tag != 'input' && tag != 'textarea') {
	            		event.preventDefault();
	              	needSectionScroll.moveNext();
	              }
	            break;
	            case 36:
	            	event.preventDefault();
	              needSectionScroll.move(plugin.sections['1']);
	            break;
	            case 35:
	            	event.preventDefault();
	              needSectionScroll.move(plugin.sections[plugin.sectionsList.length]);
	            break;
	            default: return;
	          }
	      	}

	      });
	    }
			
			// set current section and current link
			needSectionScroll.setCurrentSection();

			// on initializing callback
			plugin.options.onInit.call(plugin);
		},

		/* Move to next section
		***********************************************/
		moveNext : function() {
			var nextSectionName = plugin.currentSectionName * 1 + 1;
			if (!!plugin.sections[nextSectionName]) {
				needSectionScroll.move(plugin.sections[nextSectionName]);
			}
		},

		/* Move to previous section
		***********************************************/
		movePrev : function() {
			var nextSectionName = plugin.currentSectionName * 1 - 1;
			if (!!plugin.sections[nextSectionName]) {
				needSectionScroll.move(plugin.sections[nextSectionName]);
			}
		},

		/* Move to section
		***********************************************/
		move : function(_section) {
			// lock scroll
			plugin.moving = true;
			plugin.lockscroll.disableScroll();

			// set current section
			plugin.currentSection = _section;
			plugin.currentSectionName = _section.getAttribute('data-sectionscroll');

			// on move starts callback
			plugin.options.onMoveStart.call(plugin, _section);

			// modeEnd callback
			function moveEnd() {
	 			// reset classes
	 			for (var name in plugin.sections) {
					// remove current class
					plugin.removeClass(plugin.sections[name], plugin.options.currentSectionClass);
				}
				// add current class
				plugin.addClass(_section, plugin.options.currentSectionClass);

				// update links
				needSectionScroll.updateNavLinks();

				// unlock scroll when timeout ends
				setTimeout(function() {
					plugin.moving = false;
					plugin.lockscroll.enableScroll();
				}, plugin.options.moveTimeout);

				// on move ends callback
				plugin.options.onMoveEnd.call(plugin, _section);
			}

			// scroll to element
			plugin.scrollTo(_section.offsetTop, 1000, moveEnd);

		},

		/* Update state of navigation links
		***********************************************/
		updateNavLinks: function() {
			for (var i = 0; i < plugin.navLinks.length; i++) {
				var link = plugin.navLinks[i];

				if (link.getAttribute('data-sectionscroll-link') == plugin.currentSectionName) {
					// add current class
					plugin.addClass(link, plugin.options.currentNavLinkClass);
				} else {
					// remove current class
					plugin.removeClass(link, plugin.options.currentNavLinkClass);
				}

			}
		},

		/* Set current section
		***********************************************/
		setCurrentSection: function() {
			for (var name in plugin.sections) {
				if (plugin.isInViewport(plugin.sections[name],'intersect')) {
					plugin.currentSection = plugin.sections[name];
					plugin.currentSectionName = name;

					// add current class
					plugin.addClass(plugin.currentSection, plugin.options.currentSectionClass);

					// update links
					needSectionScroll.updateNavLinks();
				} else {
					// remove current class
					plugin.removeClass(plugin.sections[name], plugin.options.currentSectionClass);
				}
			}
		},

		/* Configuration object which contains all options sets
		***********************************************/
		'config': {
			'default' : {
				// verticalize align to middle
				'verticalize': true,
				// default scrolling for screens with resolution lesser than option value 
				'mobileOff': false,
				// create pager
				'pager': true,
				// pager position ( top, botom, right, left )
				'pagerPosition': 'right',
				// control sections scrolling with arrows
				'useArrows': true,
				// timeout for the next move ( ms )
				'moveTimeout': 300,
				// classname for current section
				'currentSectionClass': 'current',
				// classname for current nav link
				'currentNavLinkClass': 'current',
				// on plugin initializing
				onInit: function() {},
				// on start of moving to section callback
				onMoveStart: function() {},
				// on finish of moving to section callback
				onMoveEnd: function() {}
			}
		}

	}

})();;!function ($) {
  "use strict";

  /*********************************************** 
   FUNCTIONS
  ***********************************************/

  /* MOBILE DETECTION
  ***********************************************/
  function isMobile() {
    return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) );
  };

  /* RESPONSIVE BACKGROUND VIDEO (IMAGE)
  ***********************************************/
  $.fn.resizeBG = function() {
    return this.each(function() {
      var $el = $(this),
          el = this,
          $parent = $el.parent(),
          minWidth = 300,
          elWidth = el.tagName == 'VIDEO' ? el.videoWidth : el.naturalWidth,
          elWidth = !elWidth ? el.clientWidth : elWidth,
          elHeight = el.tagName == 'VIDEO' ? el.videoHeight : el.naturalHeight,
          elHeight = !elHeight ? el.clientHeight : elHeight,
          parentWidth = $parent.outerWidth(),
          parentHeight = $parent.outerHeight(),
          scaleWidth = parentWidth / elWidth,
          scaleHeight = parentHeight / elHeight,
          scale = scaleWidth > scaleHeight ? scaleWidth : scaleHeight,
          newElWidth, newElHeight, offsetTop, offsetLeft;

        if ( scale * elWidth < minWidth ) {
          scale = minWidth / elWidth;
        };

        newElWidth = scale * elWidth;
        newElHeight = scale * elHeight;
        offsetLeft = ( newElWidth - parentWidth ) / 2 * -1;
        offsetTop  = ( newElHeight - parentHeight ) / 2 * -1;

        $el.css({
          'width': newElWidth,
          'height': newElHeight,
          'marginTop': offsetTop,
          'marginLeft': offsetLeft
        });
    });
  };

  /* PERCEN PRELOADER
  ***********************************************/
  var imgList = [],
      currentPercent = 0,
      imgArray = isMobile() ? mobileResources : desktopResources;
  $.extend({
    preload: function(imgArr, option) {
      var setting = $.extend({
        init: function(loaded, total) {},
        loaded: function(img, loaded, total) {},
        loaded_all: function(loaded, total) {}
      }, option);

      var total = imgArr.length,
          loaded = 0;
      
      setting.init(0, total);

      for(var i in imgArr) {
        var source = imgArr[i];
        if (source.type == 'img') {
          imgList.push($("<img />")
            .attr("src", source.src)
            .load(function() {
              loaded++;
              setting.loaded(this, loaded, total);
              if(loaded == total) {
                setting.loaded_all(loaded, total);
              }
            }).error(function() {
              loaded++;
              setting.loaded(this, loaded, total);
              if(loaded == total) {
                setting.loaded_all(loaded, total);
              }
            })
          );
        } else {
          var video = document.createElement('video');
          video.src = source.src;
          video.oncanplay = function() {
            loaded++;
            setting.loaded(this, loaded, total);
            if(loaded == total) {
              setting.loaded_all(loaded, total);
            }

            $('.cover-background_resize').resizeBG();
          }

          $(video).error(function() {
            loaded++;
            setting.loaded(this, loaded, total);
            if(loaded == total) {
              setting.loaded_all(loaded, total);
            }
          });

          imgList.push(video);
        }
      }
      
    }
  });

  $(function() {

    $.preload(imgArray, {
      init: function(loaded, total) {
        if (!imgArray.length)
          documentLoad();
      },
      loaded: function(img, loaded, total) {
        var percent = Math.round(loaded/total*100);
        $('#preloader_percent').html(percent + '%');
      },
      loaded_all: function(loaded, total) {
        documentLoad();
      }
    });

  });

  /*********************************************** 
   ON LOAD CALLBACK
  ***********************************************/

  function documentLoad() {

    /* LOAD BACKGROUNDS FOR MOBILE
    ***********************************************/
    if (isMobile()) {
      $('[data-bg-mobile]').each(function() {
        this.style.backgroundImage = 'url(' + this.getAttribute('data-bg-mobile') + ')';
      })
    } else {
      $('[data-bg]').each(function() {
        this.style.backgroundImage = 'url(' + this.getAttribute('data-bg') + ')';
      })
    }

    /* VIDEO RESIZE
    ***********************************************/
    $('video').each(function() {
      var video = this,
          $video = $(this);

      video.addEventListener('canplay', function() {
        console.log('canplay');
        $video.resizeBG();
      }, false);

      video.addEventListener('loadeddata', function() {
        console.log('loadeddata');
        $video.resizeBG();
      }, false);

      video.addEventListener('loadstart', function() {
        console.log('loadstart');
        $video.resizeBG();
      }, false);

      video.addEventListener('loadedmetadata', function() {
        console.log('loadedmetadata');
        $video.resizeBG();
      }, false);
      
      video.addEventListener('canplaythrough', function() {
        console.log('canplaythrough');
        $video.resizeBG();
      }, false);
    })

    /* POPUP INITIALIZATION
    ***********************************************/
    needPopup.init();

    /* SECTION SCROLL INITIALIZATION
    ***********************************************/
    needSectionScroll.config.default.onInit = function() {
      $('#preloader').delay(100).fadeOut();
      console.log('1');
      setTimeout(function() {
        $('.cover-background_resize').resizeBG();
      }, 2000);
    }
    needSectionScroll.config.default.onMoveEnd = function() {
      $('video').resizeBG();
    }
    
    needSectionScroll.init();

    /* RESPONSIVE BG FUNCTION AND ASPECT RATIO FOR IFRAMES
    ***********************************************/
    $(window).on( 'load', function() {
      $('.cover-background_resize').resizeBG();
    });

    $(window).on( 'resize', function() {
      $('.cover-background_resize').resizeBG();
    });

    /* INIT DEFAULT VIDEO
    ***********************************************/
    if ($.fn.mediaelementplayer)
      $('.video-default, .audio-default').mediaelementplayer();
  }

}(jQuery);