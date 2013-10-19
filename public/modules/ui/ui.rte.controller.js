/**
 * fourfivesix
 *
 * User: sean
 * Date: 08/06/13
 * Time: 10:13 PM
 *
 */
define(['sf1', 'modules/ui/ui.rte.models', 'modules/ui/ui.rte.views', 'text!modules/ui/ui.rte.templates.html', 'wysiwyg', 'wysiwygconfig'],
  function (sf1, Model, View, template, wysiwyg, wysiwygconfig) {
    var anchorSelector = '#TemplateContainer';

    _.templateSettings.variable = 'S';
    var baseMarkup = $(template);
    // attach the module template markup to the DOM
    $(anchorSelector).append(baseMarkup);

    // var mySettings = rteconfig;
    var rteView = function () {
      var rteComponentView = new View.RTEView();
      rteComponentView.on('show', function () {
        //CKEDITOR.replace( 'editor' );
        // $("#sf1RTEEditor").raptor();

        var editor = new wysiwyg.Editor("wysihtml5-textarea", { // id of textarea element
          toolbar: "wysihtml5-toolbar", // id of toolbar element
          parserRules: wysiwygconfig // defined in parser rules set
        });
        sf1.logger.info('sean here');


        //$("#sf1RTEEditor").markItUp(mySettings);
      });


      return rteComponentView;
    };

    return{
      RTE: rteView,
      RTEModel: Model.RTEModel
    };
  }
);